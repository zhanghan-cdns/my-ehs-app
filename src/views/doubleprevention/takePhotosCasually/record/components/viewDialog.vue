<template>
  <basic-dialog
    :title="title"
    :icon="icon"
    :width="1013"
    :height="'80%'"
    v-bind="$attrs"
    @close="openFlag = false"
    :openFlag="openFlag"
    show-zoom
    resize
    :showFooter="true"
  >
    <template #content>
      <div class="wrap">
        <el-form ref="form" :model="form" label-width="108px" :inline="true">
          <el-row>
            <el-col :span="12">
              <el-form-item label="隐患发现时间">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.sj"
                  type="date"
                  :style="width"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="隐患发现人">
                <el-select
                  v-model="form.ry"
                  :style="width"
                  :disabled="disabled"
                >
                  <el-option label="一" value="shanghai"></el-option>
                  <el-option label="二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="隐患描述">
                <el-input
                  v-model="form.courseName"
                  :style="width2"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="上传检查记录"
                :style="width2"
                :disabled="disabled"
              >
                <el-image
                  style="width: 100px; height: 100px;margin:0 10px"
                  src="https://img0.baidu.com/it/u=567569280,1708557676&fm=253&fmt=auto?w=200&h=200"
                  :preview-src-list="[
                    'https://img0.baidu.com/it/u=567569280,1708557676&fm=253&fmt=auto?w=200&h=200',
                  ]"
                ></el-image>
                <el-image
                  style="width: 100px; height: 100px;margin:0 10px"
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-04-23%2F5add84fa3acde_120_80.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659342970&t=db8054ee60c380d5d3976217dccab3a2"
                  :preview-src-list="[
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-04-23%2F5add84fa3acde_120_80.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659342970&t=db8054ee60c380d5d3976217dccab3a2',
                  ]"
                ></el-image>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <template #bottom>
      <div>
        <el-button type="warning" @click="openFlag=false">取消</el-button>
      </div>
    </template>
  </basic-dialog>
</template>
<script>
export default {
  props: {
    dict: Object,
    default: {},
  },
  data() {
    return {
      openFlag: true,
      isEditId: "",
      width: "width:320px",
      width2: "width:794px",
      disabled: true,
      form: {},
    };
  },
  mounted() {
    console.log(this.dict);
  },
  methods: {
    open(type, row) {
      if (type == "chakan") {
        this.icon = "icon-fujiaxinxi";
        this.title = "查看随手拍记录";
      }
      this.openFlag = true;
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .vxe-modal--content {
  background: #eeeeee;
}
.wrap {
  padding: 20px;
  background: white;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.title {
  width: 100%;
  border-bottom: 1px solid #4a80fc;
  height: 30px;
  margin: 0px auto;
  line-height: 30px;
  white-space: normal;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 22px;
}
.detail_title {
  border-bottom: 1px solid #4a80fc;
  font-size: 14px;
  color: #212121;
  width: 95%;
  margin: 30px auto;
  font-weight: bold;
  .line {
    display: inline-block;
    width: 2px;
    height: 12px;
    background-color: #4a80fc;
    margin-right: 8px;
  }
}
</style>
