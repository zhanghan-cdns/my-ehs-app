<template>
  <div class="container">
    <mars3d-viewer
      ref="location-viewer"
      url="/api/location/config/map/load"
      @mapLoaded="mapLoaded"
    ></mars3d-viewer>
    <div class="left-part">
      <left-index></left-index>
    </div>
    <div class="right-part">
      <right-index></right-index>
    </div>
    <person-detail
      ref="personDetailRef"
      :visible="visible"
      @handleClose="handleClose"
    ></person-detail>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>区域建筑</span>
        <!--        <el-button style="float: right; padding: 3px 0" type="text">收起</el-button>-->
      </div>
      <div class="text item" style="overflow-y: scroll">
        <el-tree
          class="filter-tree"
          show-checkbox
          :data="buildingData"
          :props="{ children: 'children', label: 'name' }"
          default-expand-all
          @check-change="showBuilding"
          ref="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span
            >&nbsp;
            <span style="float: right; color: #1e90ff">
              <i
                class="el-icon-crop"
                v-if="data.area && data.area.length > 0"
                title="已勾画区域"
              ></i>
              <i
                class="el-icon-office-building"
                v-if="data.modelConfig && data.modelConfig != '{}'"
                title="已配置建筑"
              ></i>
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
    <el-card
      class="box-card"
      style="
        display: none;
        width: 15%;
        height: 400px;
        position: absolute;
        top: 460px;
        left: 10px;
        opacity: 80%;
      "
    >
      <div slot="header" class="clearfix">
        <span>定位统计</span>
      </div>
      <div class="text item">
        <div ref="chart" style="width: 100%; height: 200px"></div>
      </div>
    </el-card>
    <location-engine
      ref="location-engine"
      v-show="false"
      @initScene="initScene"
      @location="location"
    ></location-engine>
  </div>
</template>
<script>
import Mars3dViewer from "@/components/mars3d-earth/map/show";
import LocationEngine from "./engine";
import LeftIndex from "./leftPart/leftIndex.vue";
import RightIndex from "./rightPart/rightIndex.vue";
import PersonDetail from "./personDetail.vue";
import { buildingAreaListAPI } from "@/api/location/buildingarea/buildingarea";
import tableMixins from "@/mixins/table";

export default {
  mixins: [tableMixins],

  name: "locationViewer",

  components: {
    Mars3dViewer,
    LocationEngine,
    LeftIndex,
    RightIndex,
    PersonDetail,
  },

  data() {
    return {
      allData: {}, //全部定位数据
      allDepInfo: {}, //全部统计信息
      baseHeight: 0, //地图基准高度
      buildingData: [], //建筑参数信息
      buildingShowList: {}, //显示的建筑清单
      tilesetClipList: {}, //模型开挖列表
      visible: false,
    };
  },

  created() {},

  methods: {
    //地图加载完成回调
    mapLoaded(map, options) {
      let that = this;
      //this.$refs["location-engine"].getConnection("ws://" + document.location.host + "/api/location/websocket/location")  // 线上
      this.$refs["location-engine"].getConnection(
        "ws://192.168.1.144:18012/websocket/location"
      ); // 线下
      // this.$refs["location-engine"].getConnection("ws://192.168.2.15:18012/websocket/location")  // 线下
      this.graphicLayer = new mars3d.layer.GraphicLayer({
        popup: (e) => {
          console.log("e---e", e.graphic.attr);
          return mars3d.Util.getTemplateHtml({
            title: e.graphic.attr.thing.name,
            template: `<div style='height:130px;'>
            <div style='display: flex;justify-content:space-between;align-items: stretch;'>
            <div>
            <img style='width:81px;height:90px;margin-right:10px;'  src='./img/rydw/rydw_actor.png'/></div>
            <div>
            名称：${e.graphic.attr.thing.name}<br/>
            部门：${e.graphic.attr.thing.type.value}<br/>
            楼层：${
              e.graphic.attr.position.floor &&
              e.graphic.attr.position.floor !== 0
                ? e.graphic.attr.position.floor
                : "无"
            }<br/>
            时间：${e.graphic.attr.time}</div></div>
            <div style='display:flex;justify-content:space-around;margin-top:6px;'>
            <button id="recallBtn" style='color:#fff;border:none;height:26px;width:80px;text-align:center;line-height:26px;background: linear-gradient(180deg, #06457F 0%, #082A4B 100%);'>轨迹回访</button>
            <button id="detailBtn" style='color:#fff;border:none;height:26px;width:80px;text-align:center;line-height:26px;background: linear-gradient(180deg, #06457F 0%, #082A4B 100%);'>详细信息</button>
            </div></div>`,
            attr: {},
            // template: "all",
            // attr: {
            //   名称: e.graphic.attr.thing.name,
            //   类型: e.graphic.attr.thing.type.value,
            //   楼层:
            //     e.graphic.attr.position.floor &&
            //     e.graphic.attr.position.floor !== 0
            //       ? e.graphic.attr.position.floor
            //       : "无",
            //   时间: e.graphic.attr.time,
            // },
          });
        },
      });

      this.baseHeight = options.layers[6].baseHeight
        ? options.layers[6].baseHeight
        : 0;
      this.loadBuildings();
      map.addLayer(this.graphicLayer);
      this.graphicLayer.on(mars3d.EventType.popupOpen, function (e) {
        const container = e.container; // popup对应的DOM
        console.log("打开了popup", container);
        const recallBtns = container.querySelector("#recallBtn");
        const detailBtns = container.querySelector("#detailBtn");
        if (recallBtns) {
          recallBtns.addEventListener("click", (e) => {
            console.log("我是轨迹回放，我被点击了");
          });
        }
        if (detailBtns) {
          detailBtns.addEventListener("click", function (e) {
            console.log("我是详情信息，我被点击了");
            that.visible = true;
          });
        }
      });
      map.on(mars3d.EventType.click, function (e) {
        let p = that.mars3d.LatLngPoint.fromCartesian(e.cartesian);
        that.recursiveData(p,that.buildingData);
      });
    },
    // 递归所有的建筑区域list
    recursiveData(p,array) {
      for (let i in array) {
        let data=array[i];
        let status = this.isPointInPolygon(p, data["area"]);
        if (status) {
          this.showBuilding(data, true);
        } else {
          this.showBuilding(data, false);
        }
        if(data.children){
          this.recursiveData(p,data.children)
        }

      }
    },
    // 判断点击的经纬度是否在建筑区域内
    isPointInPolygon(point, pts) {
      var N = pts.length; //pts [{_lat:xxx,_lng:xxx},{_lat:xxx,_lng:xxx}]
      var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
      var intersectCount = 0; //cross points count of x
      var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
      var p1, p2; //neighbour bound vertices
      var p = point; //point {_lat:xxx,_lng:xxx}

      p1 = pts[0]; //left vertex
      for (var i = 1; i <= N; ++i) {
        //check all rays
        if (p._lat == p1._lat && p._lng == p1._lng) {
          return boundOrVertex; //p is an vertex
        }
        p2 = pts[i % N]; //right vertex
        if (
          p._lat < Math.min(p1._lat, p2._lat) ||
          p._lat > Math.max(p1._lat, p2._lat)
        ) {
          //ray is outside of our interests
          p1 = p2;
          continue; //next ray left point
        }
        if (
          p._lat > Math.min(p1._lat, p2._lat) &&
          p._lat < Math.max(p1._lat, p2._lat)
        ) {
          //ray is crossing over by the algorithm (common part of)
          if (p._lng <= Math.max(p1._lng, p2._lng)) {
            //x is before of ray
            if (p1._lat == p2._lat && p._lng >= Math.min(p1._lng, p2._lng)) {
              //overlies on a horizontal ray
              return boundOrVertex;
            }
            if (p1._lng == p2._lng) {
              //ray is vertical
              if (p1._lng == p._lng) {
                //overlies on a vertical ray
                return boundOrVertex;
              } else {
                //before ray
                ++intersectCount;
              }
            } else {
              //cross point on the left side
              var xinters =
                ((p._lat - p1._lat) * (p2._lng - p1._lng)) /
                  (p2._lat - p1._lat) +
                p1._lng; //cross point of _lng
              if (Math.abs(p._lng - xinters) < precision) {
                //overlies on a ray
                return boundOrVertex;
              }
              if (p._lng < xinters) {
                //before ray
                ++intersectCount;
              }
            }
          }
        } else {
          //special case when ray is crossing through the vertex
          if (p._lat == p2._lat && p._lng <= p2._lng) {
            //p crossing over p2
            var p3 = pts[(i + 1) % N]; //next vertex
            if (
              p._lat >= Math.min(p1._lat, p3._lat) &&
              p._lat <= Math.max(p1._lat, p3._lat)
            ) {
              //p._lat lies between p1._lat & p3._lat
              ++intersectCount;
            } else {
              intersectCount += 2;
            }
          }
        }
        p1 = p2; //next ray left point
      }
      if (intersectCount % 2 == 0) {
        //偶数在多边形外
        return false;
      } else {
        //奇数在多边形内
        return true;
      }
    },
    // pInQuadrangle(a, b, c, d, p) {
    //   //点p是那个点，a、b、c、d是区域的四个点
    //   let dTriangle =
    //     this.triangleArea(a, b, p) +
    //     this.triangleArea(b, c, p) +
    //     this.triangleArea(c, d, p) +
    //     this.triangleArea(d, a, p);
    //   let dQuadrangle = this.triangleArea(a, b, c) + this.triangleArea(c, d, a);
    //   return dTriangle == dQuadrangle;
    // },

    // //
    // triangleArea(a, b, c) {
    //   return Math.abs(
    //     (a._lng * b._lat +
    //       b._lng * c._lat +
    //       c._lng * a._lat -
    //       b._lng * a._lat -
    //       c._lng * b._lat -
    //       a._lng * c._lat) /
    //       2.0
    //   );
    // },
    //场景初始化
    initScene(locations) {
      console.log("locations", locations);
      for (let i in locations) {
        if (locations[i].status) {
          this.allData[locations[i].thing.id] = locations[i];
          this.addThing(locations[i]);
        }
      }
      this.calcDepCount();
    },
    //更新定位
    location(location) {
      if (this.allData[location.thing.id]) {
        //已存在定位数据
        switch (location.status) {
          case "0": //移除并离线
            this.removeThing(location);
            this.updateDepCount(location);
            delete this.allData[location.thing.id];
            break;
          case "1": //移动位置
            this.allData[location.thing.id] = location;
            this.moveThing(location);
            break;
          case "2": //设置静止
            this.allData[location.thing.id] = location;
            this.silentThing(location);
            break;
          default:
        }
      } else {
        switch (location.status) {
          case "0": //忽略
            break;
          case "1": //加入到地图
            this.allData[location.thing.id] = location;
            this.addThing(location);
            this.updateDepCount(location);
            break;
          case "2": //加入并设置静止
            this.allData[location.thing.id] = location;
            this.silentThing(location);
            this.updateDepCount(location);
            break;
          default:
        }
      }
    },
    //计算统计信息
    calcDepCount() {
      for (let i in this.allData) {
        switch (this.allData[i].thing.type.key) {
          case "LOCATION_OBJTYPE:EMP":
            if (this.allData[i].thing.dep) {
              this.addDepInfo(this.allData[i].thing.dep.name);
            } else {
              this.addDepInfo("未知部门");
            }
            break;
          case "LOCATION_OBJTYPE:OUTER":
            this.addDepInfo(this.allData[i].thing.type.value);
            break;
          case "LOCATION_OBJTYPE:CAR":
            this.addDepInfo(this.allData[i].thing.type.value);
            break;
        }
      }
      this.refreshCountChart();
    },
    //更新统计信息
    updateDepCount(location) {
      if (location.status === "0") {
        switch (location.thing.type.key) {
          case "LOCATION_OBJTYPE:EMP":
            if (location.thing.dep) {
              this.subDepInfo(location.thing.dep.name);
            } else {
              this.subDepInfo("未知部门");
            }
            break;
          case "LOCATION_OBJTYPE:OUTER":
            this.subDepInfo(location.type.value);
            break;
          case "LOCATION_OBJTYPE:CAR":
            this.subDepInfo(location.type.value);
            break;
        }
      } else {
        switch (location.thing.type.key) {
          case "LOCATION_OBJTYPE:EMP":
            if (location.thing.dep) {
              this.addDepInfo(location.thing.dep.name);
            } else {
              this.addDepInfo("未知部门");
            }
            break;
          case "LOCATION_OBJTYPE:OUTER":
            this.addDepInfo(location.type.value);
            break;
          case "LOCATION_OBJTYPE:CAR":
            this.addDepInfo(location.type.value);
            break;
        }
      }
      this.refreshCountChart();
    },
    //添加定位物体
    addThing(location) {
      let url = "";
      let imageUrl = "";
      switch (location.thing.type.key) {
        case "LOCATION_OBJTYPE:CAR":
          url = "//data.mars3d.cn/gltf/mars/car/aodi1.gltf";
          imageUrl = "img/rydw/rydw_car.png";
          break;
        case "LOCATION_OBJTYPE:EMP":
          url = "//data.mars3d.cn/gltf/mars/man/ren.glb";
          imageUrl = "img/rydw/rydw_cnry.png";
          break;
        default:
          url = "//data.mars3d.cn/gltf/mars/man/walk.gltf";
          imageUrl = "img/rydw/rydw_wlry.png";
      }
      const thing = new mars3d.graphic.ModelPrimitive({
        name: location.thing.id,
        position: new mars3d.LatLngPoint(
          location.position.lng,
          location.position.lat,
          this.baseHeight +
            (location.position.height ? location.position.height : 0)
        ),
        style: {
          url: url,
          scale: 1,
          highlight: {
            type: mars3d.EventType.click,
            silhouette: true,
            silhouetteColor: "#FFF",
            silhouetteSize: 2,
          },
          // clampToGround: true,
          clampToTileset: true,
          setHeight: 15,
          distanceDisplayCondition: true,
          distanceDisplayCondition_near: 0,
          distanceDisplayCondition_far: 300,
          distanceDisplayBillboard: {
            // 当视角距离超过一定距离(distanceDisplayCondition_far定义的) 后显示为图标对象的样式
            image: imageUrl,
            scale: 1,
            visibleDepth: false,
          },
          label: {
            text: location.thing.name,
            scale: 0.8,
            background: true,
            backgroundColor: "#042236",
            backgroundPadding: 6,
            font_family: "微软雅黑",
            fontsize: 12,
            color: "#3AF8F8",
            outline: true,
            outlineColor: "#001A46",
            outlineWidth: 5,
            pixelOffsetY: -20,
            distanceDisplayCondition_far: 1000,
            distanceDisplayCondition_near: 0,
            visibleDepth: false,
            distanceDisplayCondition: true,
          },
        },
        attr: location,
      });
      this.graphicLayer.addGraphic(thing);
    },
    //移动物体
    moveThing(location) {
      const thing = this.graphicLayer.getGraphicByAttr(
        "name",
        location.thing.id
      );
      if (
        thing.attr.position.lng === location.position.lng &&
        thing.attr.position.lat === location.position.lat
      ) {
      } else {
        thing.addDynamicPosition(
          new mars3d.LatLngPoint(
            location.position.lng,
            location.position.lat,
            this.baseHeight +
              (location.position.height ? location.position.height : 0)
          ),
          2
        );
        thing.attr = location;
      }
    },
    //移除物体
    removeThing(location) {
      const thing = this.graphicLayer.getGraphicByAttr(
        "name",
        location.thing.id
      );
      this.graphicLayer.removeGraphic(thing);
    },
    //静止物体
    silentThing(location) {
      //thing.attr = location
    },
    //加载建筑
    loadBuildings() {
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 99999999,
      };
      buildingAreaListAPI(params).then((res) => {
        this.buildingData = res.data.content;
        console.log("this.buildingData", this.buildingData);
      });
      let tileLayer = this.map.getLayers("layers", "true")[0];
      let clip = new mars3d.thing.TilesetClip({
        layer: tileLayer,
      });
      this.map.addThing(clip);
      this.tilesetClip = clip;
    },
    //显示建筑
    showBuilding(building, display) {
      if (!building.area || building.area.length === 0) {
        //this.$message("未绘制区域！")
        return;
      }
      if (display) {
        this.buildingShowList[building.id] = building;
        if (!this.tilesetClipList[building.id]) {
          let tempEdge = [];
          for (let i in building.area) {
            tempEdge.push(
              new mars3d.LatLngPoint(
                building.area[i]._lng,
                building.area[i]._lat,
                building.area[i]._alt
              )
            );
          }
          this.tilesetClipList[building.id] =
            this.tilesetClip.addArea(tempEdge).id;
          if (building.modelConfig) {
            this.graphicLayer.loadGeoJSON(JSON.parse(building.modelConfig));
          }
        }
        this.tilesetClip.showArea(this.tilesetClipList[building.id]);
      } else {
        this.tilesetClip.hideArea(this.tilesetClipList[building.id]);
        delete this.buildingShowList[building.id];
      }
    },
    //创建或加统计信息
    addDepInfo(key) {
      if (this.allDepInfo[key]) {
        this.allDepInfo[key] += 1;
      } else {
        this.allDepInfo[key] = 1;
      }
    },
    //减或删除统计信息
    subDepInfo(key) {
      this.allDepInfo[key] -= 1;
      if (this.allDepInfo[key] <= 0) {
        delete this.allDepInfo[key];
      }
    },
    //刷新统计信息图
    refreshCountChart() {
      let tempData = [];
      for (let i in this.allDepInfo) {
        tempData.push({ name: i, value: this.allDepInfo[i] });
      }
      const chart = this.$refs.chart;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            bottom: "0",
            left: "center",
          },
          series: [
            {
              name: "定位统计",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "40",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: tempData,
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }
    },
    handleClose() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
.mars3d-popup-background {
  border: 1px solid #139991 !important;
}
</style>
<style scoped lang="scss">
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
.custom-tree-node {
  font-size: 12px;
}
.left-part {
  width: 20%;
  min-height: 785px;
  position: absolute;
  top: 50px;
  left: 10px;
  opacity: 80%;
}
.right-part {
  width: 20%;
  min-height: 400px;
  position: absolute;
  top: 50px;
  right: 10px;
  opacity: 80%;
}
</style>
