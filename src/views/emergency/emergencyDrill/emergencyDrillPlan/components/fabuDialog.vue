<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="title"
      width="500px"
      height="30%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="content">
          <img src="../../../../../assets/images/fabu.png" alt="" />
          <p>确定要发布信息吗?</p>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">确定 </el-button>
          <el-button @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      outerVisible: false,
      innerVisible: false,
      form: {
        value1: "",
        postponement: "",
      },
      rules: {
        value1: [{ required: true, trigger: "blur" }],
        postponement: [{ required: true, trigger: "blur" }],
      },
    };
  },
  components: {  },

  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "提示",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    submitForm() {
      this.close();
      console.log('发布');
    },
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      } else {
        this.form = {};
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style scoped lang="scss">
.content {
display: flex;
justify-content: center;
align-items: center;
height: 100%;
}
.content img{
    width: 40px;
    margin-right: 10px;
}
.content p{
    font-size: 18px;
}

/deep/ .el-form-item {
  margin-bottom: 20px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
