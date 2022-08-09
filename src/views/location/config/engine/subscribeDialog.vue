<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="50%"
      height="50%"
      v-bind="$attrs"
      @close="close"
      :openFlag="visible"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-row>
            <el-col span="6">
                <dict v-model="subscribeType" dictKey="LOCATION_ENGINE_SUBSCRIBE"></dict>
            </el-col>
            <el-col span="6">
              <el-button type="primary" @click="subscribe" plain>订阅</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="subscribeLog"
            style="width: 100%">
            <el-table-column
              prop="subscribeType.value"
              label="订阅类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="params"
              label="订阅参数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="subscribeTime"
              label="订阅时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="status"
              label="订阅状态"
              width="180">
            </el-table-column>
            <el-table-column
              prop="response"
              label="返回内容"
              width="180">
            </el-table-column>
          </el-table>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>

import Dict from "@/components/basic-dict";
import {engineSubscribeAPI, engineSubscribeLogAPI} from "@/api/location/config/engine/engine";

export default {

  name: "subscribeDialog",

  components: {Dict},

  data() {
    return {
      visible: false,
      engineId: 0,
      subscribeType: {},
      subscribeLog: [],
    };
  },
  props: {
    title: {
      type: String,
      default: "引擎订阅面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {

  },
  methods: {
    open(id) {
      this.engineId = id
      //加载历史订阅记录
      this.visible = true
      this.refreshSubscribeList()
    },
    // 订阅接口
    async subscribe(){
      let params = {"engineId": this.engineId, "subscribeType": this.subscribeType}
      const res = await engineSubscribeAPI(params);
      if(res.code === 200){
        this.$message("订阅成功！")
      }else{
        this.$message("订阅失败！")
      }
      await this.refreshSubscribeList()
    },
    // 刷新订阅列表
    async refreshSubscribeList(){
      let params = {
        "engineId": this.engineId,
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 999999
      };
      const res = await engineSubscribeLogAPI(params);
      if (res.code === 200) {
        this.subscribeLog = res.data.content
      }
    }
  },
};
</script>

<style scoped lang='scss'>
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}
.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>
