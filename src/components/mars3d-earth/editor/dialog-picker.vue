<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="60%"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-button
            class="map-button"
            type="primary"
            @click="markMap"
            v-if="btns.some(item=>item==='point')">图上标注
          </el-button>
          <el-button
            class="map-button"
            type="primary"
            v-if="btns.some(item=>item==='polygon')"
            @click="drawBoundary">绘制边界
          </el-button>
          <el-input
            v-if="btns.some(item=>item==='polygon')"
            clearable
            placeholder="请输入区域名称"
            size="small"
            style="width:200px;top:80px;"
            class="map-button"
            v-model="pickerLabel"></el-input>
          <map-picker
            v-if="openEdit"
            ref="mapPicker"
            @loaded="loaded"
            @drawCallback="drawCallback"
          ></map-picker>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()"
          >保存
          </el-button
          >
          <el-button type="success" @click="resetForm()"
          >重置
          </el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import mapPicker from "@/components/mars3d-earth/editor/picker";

export default {
  components: {mapPicker},
  data() {
    return {
      type: "add",
      openEdit: false,
      view: {
        center: "",
        edge: "",
        initView: "",
        img: "",
        imgPoint: "",
      },
      position: {},
      pointLayer: "",
      entity: [],//平面点位
      pickerLabel: "",//区域名称
    };
  },
  props: {
    title: {
      type: String,
      default: "定位编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
    btns: {
      type: Array,
      default: () => ["point"]
    }
  },
  created() {
  },
  methods: {
    open(row) {
      this.openEdit = true;
      if (row && row.id !== "") {
        this.type = "edit";
      }
    },
    close() {
      this.openEdit = false;
    },
    markMap() {
      let that = this;
      if (this.pointLayer) {
        this.map.graphicLayer.clear();
        this.pointLayer = "";
      }
      this.pointLayer = this.map.graphicLayer.startDraw({
        type: "point",
        name: "矢量",
        style: {
          pixelSize: 12,
          color: "#E6A23C",
        },
      });
      this.map.graphicLayer.on(this.mars3d.EventType.drawCreated, function (e) {
        that.position = _.assign(that.position, e.graphic.point);
      });
    },
    // 绘制边界
    drawBoundary() {
      this.$refs.mapPicker.drawPolygon(this.pickerLabel);
    },
    //保存
    submitForm() {
      if (this.btns.some(item => item === 'polygon')) {
        this.$emit('getPolygon', this.entity)
      } else {
        this.$emit('getPoint', this.position)
      }
      this.openEdit = false;
    },
    // 重置
    resetForm() {
      this.map.graphicLayer.clear();
      this.pointLayer = "";
    },
    // 绘制完成回调
    drawCallback(e) {
      console.log('eeee',e.graphic.points);
      // let positions = this.$refs.mapPicker.getGraphics()
      // console.log('123',positions)
      this.entity = e.graphic.points
    }
  },
};
</script>

<style scoped lang="scss">
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}

.container {
  position: relative;
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  //   padding: 10px 15px;
  //   padding-top: 20px;
  display: flex;
  flex-direction: row;
}

.map-button {
  position: absolute;
  left: 23px;
  top: 23px;
  z-index: 99;
}
</style>
