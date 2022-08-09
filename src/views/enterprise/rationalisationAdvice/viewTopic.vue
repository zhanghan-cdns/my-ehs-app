<template>
  <div>
    <basic-dialog
      icon="icon-chakan2"
      :title="'查看' + title"
      width="1100px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
          <div>
              <div class="topic-title-box">{{rowData.safeDynamicTopic}}</div>
              <div class="line"></div>
              <div class="content" v-html="rowData.editorContent"></div>
              <div class="border-line"></div>
              <div class="remark">备注：{{rowData.content}}</div>
              <div class="border-line"></div>
              <div class="remark">
                  <div>附件下载</div>
                  <basic-enclosure></basic-enclosure>
              </div>
          </div>
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
import {
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
} from "@/api/duty/duty_standard_provide";

export default {
  name: "viewTopic",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        file:'',
      },
      rules: {
      },
      rowData: {},
          
    };
  },
  props: {
    title: {
      type: String,
      default: "主题文件",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
    //   this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        // this.getDetail(row.id);
      } else {
        this.form={}
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
    },

    // 获取详情
    async getDetail(id) {
      try {
        // const res = await sdpInfoViewAPI({ id });
        // if (res.code === 200) {
        // }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.topic-title-box{
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #355E92;
    line-height: 48px;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2196078431372549);
    margin-top:10px;
}
.line{
    width: 90%;
    height: 2px;
    background: #355E92;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    margin:20px auto 0px auto;
}
.content{
    width:90%;
    margin:50px auto;
    height: 30vh;
}
/deep/ .MsoNormal{
    margin: 0 !important;
}
.border-line{
    width:90%;
    height: 1px;
    background: #D4D4D4;
    border-radius: 2px 0px 0px 0px;
    opacity: 0.45;
    margin:0 auto;
}
.remark{
    width:90%;
    margin:10px auto;
    padding-left:10px;
}
.title{
    margin-left:20px;
    font-weight: bold;
}
</style>
