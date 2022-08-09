<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="800"
      height="411"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <vue-esign
          ref="esign"
          :width="800"
          :height="300"
          :isCrop="isCrop"
          :lineWidth="lineWidth"
          :lineColor="lineColor"
          :bgColor.sync="bgColor"
        />
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="confirmSign">确定</el-button>
          <el-button type="success" @click="handleReset">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openEdit: false,
      icon: "icon-bianji",
      title: "签名板",
      lineWidth: 6,
      lineColor: "#000000",
      bgColor: "",
      resultImg: "",
      isCrop: false,
    };
  },
  methods: {
    open() {
      this.openEdit = true;
    },

    close() {
      this.openEdit = false;
      this.handleReset();
    },

    // 清空画布
    handleReset() {
      this.$refs.esign.reset();
    },

    // 确认生成图片
    confirmSign() {
      this.$refs.esign
        .generate()
        .then((res) => {
          this.resultImg = res;
          this.$emit("getSignImg", this.resultImg);
          this.openEdit = false;
          this.handleReset();
        })
        .catch((err) => {
          this.$message.warning("签名为空"); // 画布没有签字时会执行这里 'Not Signned'
        });
    },
  },
};
</script>

<style>
</style>