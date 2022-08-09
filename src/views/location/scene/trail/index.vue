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

          <el-select v-model="queryThingId" placeholder="对象" style="width: 50%; margin-top: 10px" filterable clearable>
            <el-option
              v-for="item in thingList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-button type="primary" size="medium" round @click="getTrailData" style="margin-top: 10px">轨迹回放</el-button>

        </el-row>

      </div>

    </el-card>

    <play-controller ref="playController" v-if="pathList.length > 0" @changeViewPort="changeViewPort" @changeProgress="changeProgress" @pause="pausePlay" @proceed="proceedPlay" @changeSpeed="changeSpeed" style="width: 15%;height: 150px; position: absolute; top: 670px; left: 10px; opacity: 80%"> </play-controller>

  </div>
</template>
<script>

import Mars3dViewer from "@/components/mars3d-earth/map/show";
import {buildingAreaListAPI} from "@/api/location/buildingarea/buildingarea";
import {getThingAPI, historyPathAPI} from "@/api/location/scene/scene";
import PlayController from "@/components/mars3d-earth/ui/play-controller";
import Dict from "@/components/basic-dict";

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
      queryObjName: '',//查询物体名称

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
    getTrailData(){
      this.graphicLayer.clear()
      let params = {
        "startTime": this.queryTime[0],
        "endTime": this.queryTime[1],
        "thingId": this.queryThingId,
      }
      historyPathAPI(params).then(res => {
        this.pathList = res.data
        this.showRoamLine(this.pathList)
      })
    },
    //显示历史轨迹
    showRoamLine(positions){
      this.roamLine = new mars3d.graphic.RoamLine({
        name: "轨迹回放",
        positions: positions,
        timeField: 'time',
        offsetHeight: this.baseHeight + 0.5,
        multiplier: 100,
        label: {
          text: "名称",
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
        path: {
          show: true,
          width: 5,
          color: "#76ff0e"
        },
        model: {
          show: true,
          url: this.queryType === 'LOCATION_TYPE:CAR'?"//data.mars3d.cn/gltf/mars/car/aodi1.gltf":"//data.mars3d.cn/gltf/mars/man/walk.gltf",
          scale: 1,
          minimumPixelSize: 20
        },
        camera: {
          type: "ds",
          radius: 100
        },
        clampToGround: false,
        clockLoop: true
      })
      this.graphicLayer.addGraphic(this.roamLine)
      this.roamLine.bindPopup(`<div style="width: 200px">
      <div>总 距 离：<span id="lblAllLen"> </span></div>
      <div>总 时 间：<span id="lblAllTime"> </span></div>
      <div>开始时间：<span id="lblStartTime"> </span></div>
      <div>剩余时间：<span id="lblRemainTime"> </span></div>
      <div>剩余距离：<span id="lblRemainLen"> </span></div>
      </div>`)
      this.roamLine.on(mars3d.EventType.postRender, (event)=>{
        const container = event.container
        const params = this.roamLine?this.roamLine.info:null
        if(!params){
          return
        }
        const lblAllLen = container.querySelector("#lblAllLen")
        if (lblAllLen) {
          lblAllLen.innerHTML = mars3d.MeasureUtil.formatDistance(this.roamLine.alllen)
        }
        const lblAllTime = container.querySelector("#lblAllTime")
        if (lblAllTime) {
          lblAllTime.innerHTML = mars3d.Util.formatTime(this.roamLine.alltimes / this.map.clock.multiplier)
        }
        const lblStartTime = container.querySelector("#lblStartTime")
        if (lblStartTime) {
          lblStartTime.innerHTML = mars3d.Util.formatDate(Cesium.JulianDate.toDate(this.roamLine.startTime), "yyyy-M-d HH:mm:ss")
        }
        const lblRemainTime = container.querySelector("#lblRemainTime")
        if (lblRemainTime) {
          lblRemainTime.innerHTML = mars3d.Util.formatTime((this.roamLine.alltimes - params.time) / this.map.clock.multiplier)
          this.$refs.playController.changeIndex(params.time/this.roamLine.alltimes)
          if((this.roamLine.alltimes - params.time) <= 2){
            this.$refs.playController.pause()
          }
        }
        const lblRemainLen = container.querySelector("#lblRemainLen")
        if (lblRemainLen) {
          lblRemainLen.innerHTML = mars3d.MeasureUtil.formatDistance(this.roamLine.alllen - params.len)
        }
      })
      this.startPlay()
    },
    //开始播放轨迹
    startPlay(){
      this.roamLine.start()
      this.roamLine.openPopup()
    },
    //暂停播放
    pausePlay(){
      this.roamLine.pause()
    },
    //继续播放
    proceedPlay(){
      this.roamLine.proceed()
    },
    //改变速度
    changeSpeed(rate){
      this.roamLine.multiplier = rate
    },
    //移动到某个位置
    changeProgress(progress){
      this.roamLine.flyToPoint({
        duration: this.roamLine.alltimes * progress / 100
      })
    },
    //改变视角
    changeViewPort(type){
      this.roamLine.setCameraOptions({type: type})
    }
  }

};
</script>

<style scoped lang='scss'>

</style>
