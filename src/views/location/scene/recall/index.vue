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

        <el-button type="primary" size="medium" round @click="getRecallScene" style="margin-top: 20px">场景回溯</el-button>

      </div>
    </el-card>
  </div>
</template>
<script>

import Mars3dViewer from "@/components/mars3d-earth/map/show";
import {buildingAreaListAPI} from "@/api/location/buildingarea/buildingarea";
import {sceneRecallAPI} from "@/api/location/scene/scene";

export default {

  name: 'locationRecall',

  components: {Mars3dViewer},

  data() {
    return {
      baseHeight: 0,//地图基准高度
      buildingData: [],//建筑参数信息
      buildingShowList: {},//显示的建筑清单
      tilesetClipList: {},//模型开挖列表

      queryTime: '',//查询参数时间

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
      switch (location.thingType){
        case 'LOCATION_OBJTYPE:CAR':
          url = "//data.mars3d.cn/gltf/mars/car/aodi1.gltf"
          break;
        default:
          url = "//data.mars3d.cn/gltf/mars/man/walk.gltf"
      }
      const thing = new mars3d.graphic.ModelPrimitive({
        name: location.id,
        position: new mars3d.LatLngPoint(location.lng, location.lat, this.baseHeight + (location.height?location.height:0) ),
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
            text: location.name,
            scale: 0.8,
            fontsize: 12,
            color: "#FFFFFF",
            outline: true,
            outlineColor: "#000000",
            outlineWidth: 5,
            pixelOffsetY: -20,
            distanceDisplayCondition_far: 1000,
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
          this.tilesetClipList[building.id] = (this.tilesetClip.addArea(tempEdge)).id;
          if(building.modelConfig){
          this.graphicLayer.loadGeoJSON(JSON.parse(building.modelConfig))
          }
        }
        this.tilesetClip.showArea(this.tilesetClipList[building.id])
      }else{
        this.tilesetClip.hideArea(this.tilesetClipList[building.id])
        delete this.buildingShowList[building.id]
      }
    },
    //获取时间场景
    getRecallScene(){
      this.graphicLayer.clear()
      let params = {
        "startTime": this.queryTime[0],
        "endTime": this.queryTime[1]
      }
      sceneRecallAPI(params).then(res => {
        for(let i in res.data){
          this.addThing(res.data[i])
        }
      })
    }
  }

};
</script>

<style scoped lang='scss'>
/deep/ .el-card {
  width: 15%;
  max-height: 400px;
  position: absolute;
  color: #fff;
  top: 280px;
  right: 10px;
  opacity: 80%;
  border: 1px solid #0162b3;
  background-color: #051734;
}
/deep/ .el-card__header {
  border-bottom: 1px solid #0162b3;
}
/deep/ .el-tree {
  background-color: #051734;
  color: #fff;
}

/deep/ .el-tree-node__content:hover {
  background: linear-gradient(180deg, #06457f 0%, #082a4b 100%);
  box-shadow: inset 0px -3px 6px 1px rgba(75, 178, 254, 0.5019607843137255);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
}

/deep/ .el-tree-node.is-current > .el-tree-node__content {
  background: linear-gradient(180deg, #06457f 0%, #082a4b 100%);
  box-shadow: inset 0px -3px 6px 1px rgba(75, 178, 254, 0.5019607843137255);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
}
.custom-tree-node{
  font-size: 12px;
}

</style>
