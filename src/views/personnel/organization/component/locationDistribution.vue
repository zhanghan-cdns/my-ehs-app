<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/positioning.png" alt="">
      <span>位置分布人员信息</span>
    </div>
    <!-- 内容 -->
    <!-- 定位图片 -->
    <div class="imgPositioning">
      <map-picker
        ref="mapPicker"
        style="width: 100%; height: 100%;"
      ></map-picker>
    </div>
    <!-- 定位地址 -->
    <!-- 列表内容 -->
    <div class="dataList">
      <div class="listD">
        <div>经度：{{ dataInfo.entLongitude }}</div>
        <div>纬度：{{ dataInfo.entLatitude }}</div>
        <div>是否在化工园区内:
          <span class="greenSpan" :style="dataInfo.isIndustrialPark && dataInfo.isIndustrialPark.value==='是'?'color:#00CE0E':'color:red'">{{ dataInfo.isIndustrialPark && dataInfo.isIndustrialPark.value }}</span>
        </div>
        <div>所属化工园区名称：{{ dataInfo.chemicalIndustrialParkName }}</div>
        <div>园区标识：{{ dataInfo.parkLogo }}</div>
        <div>区域位置分布：{{ dataInfo.regionalLocationDistribution }}</div>
      </div>
      <div class="listT">
        <div>企业控制室或机柜间面向具有火灾、爆炸危险性装置一侧是否满足国家标准关于防火防爆的要求：
          <span :style="dataInfo.isCheckStandard && dataInfo.isCheckStandard.value==='是'?'color:#00CE0E':'color:red'" class="redSpan">{{ dataInfo.isCheckStandard && dataInfo.isCheckStandard.value }}</span>
        </div>
        <div>企业甲、乙类火灾危险性装置内是否设置办公室、操作室、固定操作岗位或休息室：
          <span :style="dataInfo.isRoomAAndB && dataInfo.isRoomAAndB.value==='是'?'color:#00CE0E':'color:red'" class="redSpan">{{ dataInfo.isRoomAAndB && dataInfo.isRoomAAndB.value }}</span>
        </div>
        <div>企业甲、乙类仓库内是否设有办公室、休息室：
          <span :style="dataInfo.isClassAAndB && dataInfo.isClassAAndB.value==='是'?'color:#00CE0E':'color:red'" class="redSpan">{{ dataInfo.isClassAAndB && dataInfo.isClassAAndB.value }}</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import mapPicker from "@/components/mars3d-earth/editor/picker";

export default {
  components: {
    mapPicker
  },
  props: {
    dataInfo: {
      type: Object,
      default: {},
    }
  },
  methods:{
    returnWall(mapRegion){
      console.log('this.dataInfo',mapRegion);
      this.$refs.mapPicker.returnPolygon(mapRegion)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  padding: 14px;
  border-bottom: 1px solid #D3D3D3;
  align-items: center;
  font-weight: bold;
  font-size: 20px ;
  span {
    margin-left: 10px;
  }
}

.imgPositioning {
  width: 96%;
  height: 317px;
  // background: goldenrod;
  border: 1px solid rgb(160, 160, 159);
  margin: 15px;
}

.dataList {
  padding: 22px;
  line-height: 54px;
  //margin-left: 50px;
  .listD {
    display: flex;
    flex-wrap: wrap;

    div {
      width: 50%;
    }

  }


}

.redSpan {
  color: red;
}

.greenSpan {
  color: green;
}
</style>
