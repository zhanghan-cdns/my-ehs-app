<template>
  <div>
    <!-- 数量统计开始 -->
    <div class="first-line">
      <div class="first-line-item">
        <div>内部员工数</div>
        <div style="color: #1890ff">31</div>
      </div>
      <div class="first-line-item">
        <div>承包商数</div>
        <div style="color: #f8b83a">31</div>
      </div>
      <div class="first-line-item">
        <div>访客数</div>
        <div style="color: #00ffff">31</div>
      </div>
    </div>
    <!-- 数量统计结束 -->
    <!-- 部门人员在线率开始 -->
    <department-online-rate></department-online-rate>
    <!-- 部门人员在线率结束 -->
    <!-- 报警信息开始 -->
    <danger-information></danger-information>
    <!-- 报警信息结束 -->
    <!-- 电子围栏开始 -->
    <electronic-fence></electronic-fence>
    <!-- 电子围栏结束 -->
  </div>
</template>

<script>
import departmentOnlineRate from "./departmentOnlineRate.vue";
import dangerInformation from './dangerInformation.vue';
import electronicFence from './electronicFence.vue';
export default {
  name: "leftPosition",
  components: { departmentOnlineRate, dangerInformation,electronicFence },
};
</script>

<style lang="scss" scoped>
.first-line {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  .first-line-item {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    justify-content: center;
    font-size: 14px;
    border: 1px solid #1a6aa7;
    background: linear-gradient(180deg, #06457f 0%, #082a4b 100%);
    border-radius: 8px;
    width: 90px;
    height: 65px;
    text-align: center;
  }
  .first-line-item div:first-child {
    color: #ceffff;
    font-size: 14px;
  }
}
</style>
