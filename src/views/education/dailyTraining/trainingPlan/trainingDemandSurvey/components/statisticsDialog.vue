<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="70%"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <basic-charts
          id="statisticsId"
          :option="statisticsOption"
        ></basic-charts>
      </template>
      <template #bottom>
        <div>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
export default {
  name: "courseDialogRef",
  mixins: [tableMixins],
  data() {
    return {
      title: "培训课程投票调查统计",
      icon: "icon-xinzeng",
      openFlag: false,
      statisticsOption:"",
    }
  },
  methods: {
    // 打开
    open(row) {
      // row={
      //   courseNames:[
      //     {
      //       courseName:"测试",
      //       voteNum:12,
      //     },
      //     {
      //       courseName:"测试2",
      //       voteNum:23,
      //     },
      //     {
      //       courseName:"测试3",
      //       voteNum:40,
      //     },
      //   ]
      // }
      this.openFlag = true;
      let xAxisData=[];
      let data=[];
      row.courseNames.map((item)=>{
        xAxisData.push(item.courseName);
        data.push(item.voteNum);
      })
      this.statisticsOption={
        color:"#3C81E6",
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data,
            type: 'bar',
            barWidth:"20%",
          }
        ]
      }
    },
    // 关闭
    close() {
      this.openFlag = false;
    },
  },
};
</script>
<style scoped lang="scss">
/deep/.statisticsId {
  width: 500px;
  height: 500px;
}
</style>
