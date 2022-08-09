<template>
  <div class="container">
    <mars3d-viewer :url="url" @mapLoaded="mapLoaded"></mars3d-viewer>
  </div>
</template>
<script>
import Mars3dViewer from "@/components/mars3d-earth/map/show";

export default {
  name: "mapPicker",

  components: { Mars3dViewer },

  props: {
    url: {
      type: String,
      default: "/config/config.json",
    },
  },

  data() {
    return {
      loaded: false,
      graphicLayerEdit: {},
      point: {},
      line: [],
      polygon: [],
      mode: "point", //选择模式 point:单点 line:连线 polygon:多边形
      modelId: "",
    };
  },
  created() {},
  methods: {
    //加载完成回调
    mapLoaded(e) {
      this.loaded = true;
      this.initEditLayer();
    },
    // 获取视角
    getView() {
      return this.map.getCameraView();
    },
    //加载倾斜摄影
    load3dTiles(name, url) {
      const tiles3dTiles = new this.mars3d.layer.TilesetLayer({
        name: name,
        url: url,
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        flyTo: true,
      });
      this.map.addLayer(tiles3dTiles);
      tiles3dTiles.on(this.mars3d.EventType.load, (event) => {
        this.$emit("loaded", event.sourceTarget.orginCenterPoint);
      });
    },
    //绘制平面
    drawPolygon() {
      this.graphicLayerEdit.startDraw({
        type: "polygon",
        style: {
          color: "#ffff00",
          opacity: 0.3,
          clampToGround: true,
        },
      });
    },
    //绘制边界
    drawWall() {
      this.graphicLayerEdit.startDraw({
        type: "wall",
        style: {
          color: "#ffff00",
          opacity: 0.3,
          clampToGround: true,
        },
      });
    },
    // 回填地图边界

    // position测试数据：
    //  [
    //   [119.966749, 31.970044],
    //   [119.968574, 31.969103],
    //   [119.96655, 31.967258],
    //   [119.96496, 31.967917],
    //   [119.966665, 31.970053],
    // ],
    returnWall(edge) {
      const primitive = new mars3d.graphic.WallEntity({
        positions: this.getEdgePosition(edge),

        style: {
          height: 10,
          diffHeight: 20,
          // materialType: mars3d.MaterialType.PolyGradient,
          color: "#f8f816",
          alphaPower: 1.5,
          // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
          highlight: {
            color: "#ff0000",
          },
        },
        attr: { remark: "地图边界" },
      });
      this.graphicLayerEdit.addGraphic(primitive);
    },

    returnDrawModel(position,url) {
      const model = new mars3d.graphic.ModelEntity({
        name: "汽车",
        position: [position.lng, position.lat, position.alt],
        style: {
          url:url,
          scale: 0.5,
          minimumPixelSize: 50,
          silhouette: false,

          // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
          highlight: {
            silhouette: true,
            silhouetteColor: "#ff0000",
            silhouetteSize: 4,
          },
        },
        attr: { remark: "示例3" },
      });
      this.graphicLayerEdit.addGraphic(model);
    },

    // 回填建筑区域的建筑区域边界
    returnPolygon(area) {
      const graphic = new mars3d.graphic.PolygonEntity({
        positions: this.getEdgePosition(area),
        style: {
          height: 10,
          diffHeight: 30,
          color: "#f8f816",
          opacity: 0.5,
          outline: true,
          outlineWidth: 3,
          outlineColor: "#f8f816",
          // label: {
          //   text: "我是火星科技",
          //   font_size: 18,
          //   color: "#ffffff",
          //   distanceDisplayCondition: true,
          //   distanceDisplayCondition_far: 500000,
          //   distanceDisplayCondition_near: 0,
          // },
        },
        attr: { remark: "示例1" },
      });
      this.graphicLayerEdit.addGraphic(graphic);
    },

    // 求地图边界的position
    getEdgePosition(edge) {
      let positions = [];
      _.forEach(edge, function (value, key) {
        let item_position = [value._lng, value._lat];
        positions.push(item_position);
      });
      return positions;
    },
    //绘制矩形
    drawRect() {
      this.graphicLayerEdit.startDraw({
        type: "rectangle",
        style: {
          color: "#ffff00",
          opacity: 0.3,
          clampToGround: true,
        },
      });
    },
    //绘制模型
    drawModel(url) {
      this.graphicLayerEdit.startDraw({
        type: "model",
        drawShow: true,
        style: {
          scale: 1,
          url: url,
        },
      });
    },
    //3dtiles模型开挖
    digTileSet(edge) {
      console.log('this--this',this.graphicLayerEdit);
      let tileLayer = this.map.getLayers("layers", "true")[0];
      console.log("tileLayer", tileLayer);
      let clip = new this.mars3d.thing.TilesetClip({
        positions: this.getEdgePosition(edge),
        layer: tileLayer,
      });
      this.map.addThing(clip);
      return clip;
    },
    //改变模型
    changeModel(type, value) {
      let model = this.graphicLayerEdit.getGraphicById(this.modelId);
      console.log(model);
      let temp = model.getCoordinate(false);
      switch (type) {
        case "lng":
          temp[0] = parseFloat(value);
          model.position = new this.mars3d.LatLngPoint(
            temp[0],
            temp[1],
            temp[2]
          );
          break;
        case "lat":
          temp[1] = parseFloat(value);
          model.position = new this.mars3d.LatLngPoint(
            temp[0],
            temp[1],
            temp[2]
          );
          break;
        case "alt":
          model.height = value;
          break;
        case "heading":
          model.heading = value;
          break;
        case "pitch":
          model.pitch = value;
          break;
        case "roll":
          model.roll = value;
          break;
        case "scale":
          model.scale = value;
          break;
      }
    },
    //初始化绘制
    initEditLayer() {
      this.graphicLayerEdit = new this.mars3d.layer.GraphicLayer({
        hasEdit: false,
        isAutoEditing: true, // 绘制完成后是否自动激活编辑
        symbol: {
          type: "polygon",
          styleOptions: {
            color: "rgba(255, 255, 0, 0.4)",
            clampToGround: true,
          },
        },
      });
      this.map.addLayer(this.graphicLayerEdit);
      this.bindLayerContextMenu();
      this.graphicLayerEdit.on(this.mars3d.EventType.drawCreated, (e) => {
        this.$emit("drawCallback", e);
        if (e.drawtype == "model") {
          this.modelId = e.graphic.uuid;
        }
      });
      this.graphicLayerEdit.on(this.mars3d.EventType.editMouseMove, (e) => {
        this.$emit("drawCallback", e);
      });
    },
    //绑定右键菜单
    bindLayerContextMenu() {
      this.graphicLayerEdit.bindContextMenu([
        {
          text: "开始编辑对象",
          iconCls: "fa fa-edit",
          show: function (e) {
            const graphic = e.graphic;
            if (!graphic || !graphic.startEditing) {
              return false;
            }
            return !graphic.isEditing;
          },
          callback: (e) => {
            const graphic = e.graphic;
            if (!graphic) {
              return false;
            }
            if (graphic) {
              this.graphicLayerEdit.startEditing(graphic);
            }
          },
        },
        {
          text: "停止编辑对象",
          iconCls: "fa fa-edit",
          show: function (e) {
            const graphic = e.graphic;
            if (!graphic) {
              return false;
            }
            return graphic.isEditing;
          },
          callback: (e) => {
            const graphic = e.graphic;
            if (!graphic) {
              return false;
            }
            if (graphic) {
              this.graphicLayerEdit.stopEditing(graphic);
            }
          },
        },
        {
          text: "删除对象",
          iconCls: "fa fa-trash-o",
          show: (event) => {
            const graphic = event.graphic;
            if (!graphic || graphic.isDestroy) {
              return false;
            } else {
              return true;
            }
          },
          callback: (e) => {
            const graphic = e.graphic;
            if (!graphic) {
              return;
            }
            this.graphicLayerEdit.removeGraphic(graphic);
          },
        },
        {
          text: "计算周长",
          iconCls: "fa fa-medium",
          show: (e) => {
            const graphic = e.graphic;
            if (!graphic) {
              return false;
            }
            return (
              graphic.type === "circle" ||
              graphic.type === "circleP" ||
              graphic.type === "rectangle" ||
              graphic.type === "rectangleP" ||
              graphic.type === "polygon" ||
              graphic.type === "polygonP"
            );
          },
          callback: (e) => {
            const graphic = e.graphic;
            const strDis = this.mars3d.MeasureUtil.formatDistance(
              graphic.distance
            );
            this.$message("该对象的周长为:" + strDis);
          },
        },
        {
          text: "计算面积",
          iconCls: "fa fa-reorder",
          show: (e) => {
            const graphic = e.graphic;
            if (!graphic) {
              return false;
            }
            return (
              graphic.type === "circle" ||
              graphic.type === "circleP" ||
              graphic.type === "rectangle" ||
              graphic.type === "rectangleP" ||
              graphic.type === "polygon" ||
              graphic.type === "polygonP" ||
              graphic.type === "scrollWall" ||
              graphic.type === "water"
            );
          },
          callback: (e) => {
            const graphic = e.graphic;
            const strArea = this.mars3d.MeasureUtil.formatArea(graphic.area);
            this.$message("该对象的面积为:" + strArea);
          },
        },
      ]);
    },
    //点击取点
    pickPoint() {
      this.map.on(this.mars3d.EventType.click, (e) => {
        this.$emit(
          "pickPoint",
          this.mars3d.LatLngPoint.fromCartesian(e.cartesian)
        );
      });
    },
    //获取模型的GeoJSON
    getModelGeoJSON() {
      return this.graphicLayerEdit.getGraphicById(this.modelId).toGeoJSON();
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  height: calc(100% - 62px);
  display: block;
}
</style>
