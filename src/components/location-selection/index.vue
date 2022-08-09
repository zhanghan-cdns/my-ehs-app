<template>
  <div style="width: 100%" :style="show ? 'height: 350px' : ''">
    <div style="width: 100%; height: 100%" class="map_container">
      <el-input
        v-if="show"
        placeholder="请输入地址"
        clearable
        class="search_input"
        id="input"
        ref="inputRef"
        v-model="search"
        size="mini"
      ></el-input>
      <div
        v-if="show"
        id="map"
        ref="mapRef"
        style="width: 100%; height: 100%"
      ></div>
      <el-input
        v-model="mapLng"
        size="mini"
        style="width: 150px; margin-left: 5px"
        placeholder="经度"
        disabled
      ></el-input>
      <el-input
        v-model="maplat"
        size="mini"
        style="width: 150px; margin-left: 5px"
        placeholder="纬度"
        disabled
      ></el-input>
      <el-button
        style="margin-left: 5px"
        type="primary"
        size="mini"
        @click="open"
        >定位</el-button
      >
    </div>
  </div>
</template>
<script>
import { BMPGL } from "./bmapGL";
export default {
  name: "locationSelection",
  data() {
    return {
      search: "",
      mapLng: "", //经度
      maplat: "", //纬度
      baiduMap: {},
      address: "",
      BMapGL: {},
      show: false,
    };
  },
  props: ["lngLat","mapType"],
  model: {
    prop: "lngLat",
    event: "change",
  },
  watch: {
    lngLat(val) {
      if (!val) {
        this.mapLng = "";
        this.maplat = "";
      } else {
        this.mapLng = val[0];
        this.maplat = val[1];
      }
    },
  },
  mounted() {},
  methods: {
    open() {
      this.show = !this.show;
      if (this.show) {
        let lng = 115.492049;
        let lat = 30.356326;
        this.initMap(lng, lat);
      }
    },
    // 初始化地图
    initMap(lng, lat) {
      BMPGL().then((BMapGL) => {
        this.BMapGL = BMapGL;
        //创建地图
        this.baiduMap = new BMapGL.Map("map");
        // this.baiduMap.setMapType(BMAP_HYBRID_MAP);
        // 地图类型
        this.baiduMap.addControl(new BMapGL.MapTypeControl())
        
        let point1 = new BMapGL.Point(lng, lat);
        this.baiduMap.centerAndZoom(point1, 15); //设置中心点
        let zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
        this.baiduMap.addControl(zoomCtrl);
        this.baiduMap.enableScrollWheelZoom(true); //允许鼠标滚动缩放
        // 监听地图点击事件 显示经纬度
        this.baiduMap.addEventListener("click", (e) => {
          this.baiduMap.clearOverlays(); //删除所有点
          this.mapLng = e.latlng.lng;
          this.maplat = e.latlng.lat;
          let point2 = new BMapGL.Point(this.mapLng, this.maplat);
          this.baiduMap.setCenter(point2, 15);
          this.$emit("change", [this.mapLng, this.maplat]);
          // 创建标注对象并添加到地图
          var marker = new BMapGL.Marker(point2);
          this.baiduMap.addOverlay(marker);
          // this.show = false;
        });
        let ac = new BMapGL.Autocomplete({
          //建立一个自动完成的对象
          input: this.$refs.inputRef.$el.querySelector("input"),
          location: this.baiduMap,
        });
        // 监听下拉框点击事件
        ac.addEventListener("onconfirm", (e) => {
          //鼠标点击下拉列表后的事件
          // 拼接选取的地址
          let _value = e.item.value;
          this.address =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.streetNumber +
            _value.business;
          // 将选中的地址解析成经纬度
          this.location(BMapGL, this.address, this.baiduMap);
        });
      });
    },
    // 根据点位定位
    location(BMapGL, addr, map) {
      let geoc = new BMapGL.Geocoder();
      geoc.getPoint(addr, (point) => {
        // 重新设置地图中心点
        map.centerAndZoom(point, 15);
        const { lat, lng } = point;
        this.baiduMapLng = lng;
        this.baiduMaplat = lat;
        let point3 = new BMapGL.Point(lng, lat);
        this.baiduMap.centerAndZoom(point3, 15); //设置中心点
        // 创建标注对象并添加到地图
        var marker3 = new BMapGL.Marker(point3);
        this.baiduMap.addOverlay(marker3);
      });
    },
    setNewMapCenter(lng, lat) {
      // this.baiduMap.clearOverlays(); //删除所有点
      BMPGL().then((BMapGL) => {
        let point = new BMapGL.Point(lng, lat);
        this.baiduMap.setCenter(point, 15);
      });
    },
  },
};
</script>

<style scoped lang='scss'>
/deep/ .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  color: #606266;
}
.map_container {
  position: relative;
  .search_input {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 9999;
    width: 200px;
  }
}

// /deep/ .BMap_cpyCtrl{
//   display: none;
// }
// /deep/ .anchorBL{
//   display: none;
// }
</style>
<style lang="scss">
.tangram-suggestion-main {
  z-index: 9999 !important;
}
</style>