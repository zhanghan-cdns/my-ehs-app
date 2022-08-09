<template>
  <basic-dialog
    :icon="'icon-bianji'"
    :openFlag="openEdit"
    :title="title"
    height="40%"
    v-bind="$attrs"
    width="550px"
    @close="close"
  >
    <template #content>
      <div style="color: red;font-weight: bold;padding: 5px 0">注：填写等级的范围，相邻等级之间必须连续</div>
      <div v-for="(rowItem,index) in setLecGridData" :key="index" class="lec-row">
        <div v-for="(colItem,colIndex) in rowItem" :key="colIndex"
             :style="colItem.background?`background:${colItem.background}`:''"
             class="lec-col">
          <div v-if="colItem.text">{{ colItem.text }}</div>
          <el-input-number v-if="!colItem.text&&colItem.input" v-model="form[colItem.value]" :min="0"
                           size="mini" style="width: 110px"></el-input-number>
        </div>
      </div>
    </template>
    <template #bottom>
      <div>
        <el-button type="primary" @click="submit"
        >保存
        </el-button>
        <el-button type="warning" @click="close">取消</el-button>
      </div>
    </template>
  </basic-dialog>
</template>

<script>
import {setLecGridData} from './scoreStandard'
import {lecLevelCreateAPI, lecLevelListAPI, lecLevelUpdateAPI} from "@/api/doubleprevention/riskevent";

export default {
  name: "setLecLevelDialog",
  data() {
    return {
      openEdit: false,
      title: '设置Lec等级',
      setLecGridData,
      form: {},
      updateFlag: false
    }
  },
  methods: {
    // 打开
    open() {
      this.openEdit = true;
      this.getDetail()
    },
    // 关闭
    close() {
      this.openEdit = false;
      for (let k in this.form) {
        if (k) {
          this.$set(this.form, k, "")
        }
      }
    },
    async getDetail() {
      const res = await lecLevelListAPI()
      if (res && res.code) {
        console.log(res)
        this.updateFlag = res.data.length !== 0;
        if(this.updateFlag){
          this.form=res.data[0]
        }
      }
    },
    async add() {
      const res = await lecLevelCreateAPI(this.form)
      if (res && res.code === 200) {
        this.$message.success("创建成功")
        this.close()
      }
    },
    async modify() {
      const res = await lecLevelUpdateAPI(this.form)
      if (res && res.code === 200) {
        this.$message.success("修改成功")
        this.close()
      }
    },
    // 保存
    async submit() {
      // 一般风险验证连续
      // 一般风险低值应该高于低风险值  并且低值不能高于高值
      if ((this.form.lowGeneralRisk !== this.form.lowRisk + 1) || (this.form.lowGeneralRisk >= this.form.generalHighRisk)) {
        return this.$message.error("一般风险阈值存在不连续，请重新填写")
      }
      // 较大风险低值=== 一般风险高值
      if ((this.form.highRiskLowValue !== this.form.generalHighRisk + 1) || (this.form.highRiskLowValue >= this.form.highRisk)) {
        return this.$message.error("较大风险阈值存在不连续，请重新填写")
      }
      // 重大风险值===较大风险高值
      if (this.form.significantValueAtRisk !== this.form.highRisk + 1) {
        return this.$message.error("重大风险阈值存在不连续，请重新填写")
      }
      if(this.updateFlag){
        await this.modify()
      }else{
        await this.add()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lec-row {
  display: flex;
  height: 50px;

  .lec-col {
    width: 150px;
    padding: 5px;
    border: 1px solid #DEE0E7;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #000;
    box-sizing: border-box;
  }
}
</style>
