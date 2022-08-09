<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="80%"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-tabs v-model="focusIndex" type="card">
            <el-tab-pane v-for="(val, key, index) in code" :label="key" :key="key" :name="index">

              <highlight-code lang="javascript" :code="val"></highlight-code>

            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>

import {projectPreviewAPI} from "@/api/develop/gen/project/project";

export default {
  data() {
    return {
      code: [],
      openFlag: false,
      focusIndex: 0
    };
  },
  props: {
    title: {
      type: String,
      default: "代码预览",
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
      this.openFlag = true;
      if(id){
        projectPreviewAPI({"projectId": id}).then((res)=>{
          this.code = res.data
        })
      }
    },
    close() {
      this.openFlag = false
    },
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
