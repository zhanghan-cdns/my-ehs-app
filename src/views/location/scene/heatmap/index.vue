<template>
  <div class="container">
    <mars3d-viewer ref="location-viewer" url="/api/location/config/map/load" @mapLoaded="mapLoaded"></mars3d-viewer>
    <el-card class="box-card" style="width: 15%;height: 400px; position: absolute; top: 50px; left: 10px; opacity: 80%">
      <div slot="header" class="clearfix">
        <span>区域建筑</span>
        <!--        <el-button style="float: right; padding: 3px 0" type="text">收起</el-button>-->
      </div>
      <div class="text item" style="overflow-y: scroll">
        <el-tree
          class="filter-tree"
          show-checkbox
          :data="buildingData"
          :props="{children: 'children', label: 'name'}"
          default-expand-all
          @check-change="showBuilding"
          ref="tree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>&nbsp;
            <span  style="float: right;color: #1E90FF">
              <i class="el-icon-crop" v-if="data.area && data.area.length > 0" title="已勾画区域"></i>
              <i class="el-icon-office-building" v-if="data.modelConfig && data.modelConfig != '{}'" title="已配置建筑"></i>
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>

    <el-card class="box-card" style="width: 15%;height: 200px; position: absolute; top: 460px; left: 10px; opacity: 80%">
      <div slot="header" class="clearfix">
        <span>查询条件</span>
      </div>
      <div class="text item" style="text-align: center">

        <el-date-picker style="width: 200px"
                        format="MM-dd HH:mm"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="queryTime"
                        type="datetimerange"
                        :picker-options="dateOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="mini"
                        align="right">
        </el-date-picker>

        <el-row>

          <dict dict-key="LOCATION_OBJTYPE" tips="类型" v-model="queryType" style="width: 50%; margin-top: 10px" @change="getThing"></dict>

          <el-select v-model="queryThingId" placeholder="对象" style="width: 50%; margin-top: 10px" filterable>
            <el-option
              v-for="item in thingList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-button type="primary" size="medium" round @click="getHeatmapData" style="margin-top: 10px">活动热力图</el-button>

        </el-row>
        <span style="font-size: 12px">*不选择人员即查询所有</span>
      </div>

    </el-card>

  </div>
</template>
<script src="src/components/mars3d-earth/lib/heatmap.js"></script>
<script>

import Mars3dViewer from "@/components/mars3d-earth/map/show";
import {buildingAreaListAPI} from "@/api/location/buildingarea/buildingarea";
import {getThingAPI, heatMapAPI} from "@/api/location/scene/scene";
import PlayController from "@/components/mars3d-earth/ui/play-controller";
import Dict from "@/components/basic-dict";
import heatMap from "mars3d-heatmap"

export default {

  name: 'locationTrail',

  components: {Dict, PlayController, Mars3dViewer},

  data() {
    return {
      baseHeight: 0,//地图基准高度
      buildingData: [],//建筑参数信息
      buildingShowList: {},//显示的建筑清单
      tilesetClipList: {},//模型开挖列表

      queryTime: '',//查询参数时间
      queryType: '',//查询对象类型
      queryThingId: '',//查询物体ID

      thingList: [],//对象列表

      dateOptions: {
        shortcuts: [{
          text: '两小时内',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 2);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '六小时内',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 6);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '一天内',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }]
      },

      pathList: [],

    };
  },

  created() {

  },

  methods: {
    //地图加载完成回调
    mapLoaded(map, options){
      this.graphicLayer = new mars3d.layer.GraphicLayer({
        popup: (e)=>{
          return mars3d.Util.getTemplateHtml({
            title: e.graphic.attr.thing.name,
            template: "all",
            attr: {"名称": e.graphic.attr.thing.name, "类型": this.getThingType(e.graphic.attr.thing.type), "时间": e.graphic.attr.time}
          })
        }
      })
      this.baseHeight = options.layers[6].baseHeight?options.layers[6].baseHeight:0
      this.loadBuildings()
      map.addLayer(this.graphicLayer)
    },
    //添加定位物体
    addThing(location){
      let url = '';
      switch (location.thing.type){
        case '2':
          url = "//data.mars3d.cn/gltf/mars/car/aodi1.gltf"
          break;
        default:
          url = "//data.mars3d.cn/gltf/mars/man/walk.gltf"
      }
      const thing = new mars3d.graphic.ModelPrimitive({
        name: location.thing.id,
        position: new mars3d.LatLngPoint(location.position.lng, location.position.lat, this.baseHeight + (location.position.height?location.position.height:0) ),
        style: {
          url: url,
          scale: 1,
          highlight: {
            type: mars3d.EventType.click,
            silhouette: true,
            silhouetteColor: "#FFF",
            silhouetteSize: 2
          },
          label: {
            text: location.thing.name,
            scale: 0.8,
            fontsize: 12,
            outline: true,
            outlineColor: "#FFF",
            pixelOffsetY: -20,
            distanceDisplayCondition_far: 500,
            distanceDisplayCondition_near: 0,
            visibleDepth: false,
            distanceDisplayCondition: true,
          },
        },
        attr: location,
      })
      this.graphicLayer.addGraphic(thing)
    },
    //加载建筑
    loadBuildings(){
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 99999999
      };
      buildingAreaListAPI(params).then(res => {
        this.buildingData = res.data.content
      });
      let tileLayer = this.map.getLayers("layers", "true")[0]
      let clip = new mars3d.thing.TilesetClip({
        layer: tileLayer
      });
      this.map.addThing(clip)
      this.tilesetClip = clip
    },
    //显示建筑
    showBuilding(building, display){
      if(!building.area || building.area.length === 0){
        //this.$message("未绘制区域！")
        return
      }
      if(display){
        this.buildingShowList[building.id] = building
        if(!this.tilesetClipList[building.id]){
          let tempEdge = [];
          for(let i in building.area){
            tempEdge.push(new mars3d.LatLngPoint(building.area[i]._lng, building.area[i]._lat, building.area[i]._alt))
          }
          this.tilesetClipList[building.id] = (this.tilesetClip.addArea(tempEdge)).id
          this.graphicLayer.loadGeoJSON(JSON.parse(building.modelConfig))
        }
        this.tilesetClip.showArea(this.tilesetClipList[building.id])
      }else{
        this.tilesetClip.hideArea(this.tilesetClipList[building.id])
        delete this.buildingShowList[building.id]
      }
    },
    //获取物体类型
    getThingType(type){
      switch (type){
        case '0':
          return "员工"
        case '1':
          return "外来人员"
        case '2':
          return "车辆"
        default:
          return "未知"
      }
    },
    //根据类型获取定位对象
    getThing(){
      let params = {
        "type": this.queryType,
      }
      getThingAPI(params).then(res => {
        this.thingList = res.data
      })
    },
    //获取时间场景
    getHeatmapData(){
      this.graphicLayer.clear()
      let params = {
        "startTime": this.queryTime[0],
        "endTime": this.queryTime[1],
        "thingId": this.queryThingId,
      }
      heatMapAPI(params).then(res => {
        this.pathList = res.data
        this.showHeatMap()
      })
    },
    //显示热力图
    showHeatMap(){
      if(this.heatLayer){
        this.heatLayer.clear()
      }
      this.heatLayer = new mars3d.layer.HeatLayer({
        positions: this.pathList,
        heatStyle: {
          radius: 10,
          blur: 0.8
        },
        style: {
          opacity: 0.6,
          classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
          clampToGround: true
        }
      })
      this.map.addLayer(this.heatLayer)
    }
  }

};
</script>

<style scoped lang='scss'>

</style>
