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
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          tab-position="left"
          stretch
          style="height: 100%"
        >
          <el-tab-pane name="inspect">
            <span slot="label"
              ><i class="icon-jichuxinxi1 tab-icon"></i>检查信息</span
            >
            <el-form
              ref="form"
              :model="form"
              label-width="108px"
              :inline="true"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item label="检查名称">
                    <el-input
                      v-model="form.mc"
                      placeholder="请输入检查名称"
                      :style="width2"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="检查时间">
                    <el-date-picker
                      style="width: 100%"
                      v-model="form.sj"
                      type="date"
                      :style="width"
                      placeholder="选择检查时间"
                      :disabled="disabled"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="整改期限">
                    <el-date-picker
                      style="width: 100%"
                      v-model="form.qx"
                      type="date"
                      placeholder="选择整改期限"
                      :style="width"
                      :disabled="disabled"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="检查人员" prop="projectType">
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
                <el-col :span="12">
                  <el-form-item label="整改负责人" prop="projectType">
                    <el-select
                      v-model="form.fzr"
                      :style="width"
                      :disabled="disabled"
                    >
                      <el-option label="一" value="shanghai"></el-option>
                      <el-option label="二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="detail_title" v-show="detail.length > 0">
                <span class="line"></span>
                <span>检查情况</span>
              </div>
              <div
                class="item"
                v-for="(item, index) in detail"
                :key="index"
                style="
                  display: flex;
                  border-bottom: 1px solid #4a80fc;
                  margin-bottom: 20px;
                "
              >
                <div>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="存在问题">
                        <el-input
                          v-model="detail[index].wt"
                          placeholder="请输入检查名称"
                          :style="width2"
                          :disabled="disabled"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item
                        label="现场图片"
                        :style="width2"
                        :disabled="disabled"
                      >
                        <basic-upload
                          key="file"
                          @onSuccess="
                            (fileList) => onSuccess(fileList, 'pic', index)
                          "
                          @onRemove="
                            (fileList) => onRemove(fileList, 'pic', index)
                          "
                          :photos="form.courseWare"
                          :limit="2"
                          :disabled="disabled"
                        ></basic-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="上传检查记录"
                    :style="width2"
                    :disabled="disabled"
                  >
                    <basic-upload
                      key="file"
                      @onSuccess="
                        (fileList) => onSuccess(fileList, 'courseWare')
                      "
                      @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
                      :photos="form.courseWare"
                      :limit="2"
                      :disabled="disabled"
                    ></basic-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注">
                    <el-input
                      v-model="form.courseName"
                      placeholder="请输入备注"
                      :style="width2"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="review">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>复查信息</span
            >
            <el-form
              ref="form"
              :model="form"
              label-width="108px"
              :inline="true"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="复查时间">
                    <el-date-picker
                      style="width: 100%"
                      v-model="form.qx"
                      type="date"
                      placeholder="选择整改期限"
                      :style="width"
                      :disabled="disabled2"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="复查人员" prop="projectType">
                    <el-select
                      v-model="form.ry"
                      :style="width"
                      :disabled="disabled2"
                    >
                      <el-option label="一" value="shanghai"></el-option>
                      <el-option label="二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <div
                class="item"
                v-for="(item, index) in detail"
                :key="index"
                style="border-bottom: 1px solid #4a80fc; margin-bottom: 20px"
              >
                <div class="detail_title">
                  <span class="line"></span>
                  <span>隐患信息-{{ index + 1 }}</span>
                </div>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="隐患信息">
                      <el-input
                        v-model="detail[index].wt"
                        :style="width2"
                        :disabled="disabled"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      label="初查图片"
                      :style="width2"
                      :disabled="disabled"
                    >
                      <basic-upload
                        key="file"
                        @onSuccess="
                          (fileList) => onSuccess(fileList, 'pic', index)
                        "
                        @onRemove="
                          (fileList) => onRemove(fileList, 'pic', index)
                        "
                        :photos="detail[index].pic"
                        :limit="5"
                        :disabled="disabled"
                      ></basic-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="detail_title">
                  <span class="line"></span>
                  <span>复查信息-{{ index + 1 }}</span>
                </div>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="是否整改">
                      <el-radio-group
                        v-model="detail[index].zg"
                        :style="width"
                        :disabled="disabled2"
                      >
                        <el-radio
                          v-for="item in dict.commonJudge"
                          :label="item.dictValue"
                          :key="item.id"
                          :value="item.dictValue"
                          >{{ item.dictValueName }}</el-radio
                        >
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="复查信息">
                      <el-input
                        v-model="detail[index].fcxx"
                        :style="width2"
                        :disabled="disabled2"
                        type="textarea"
                        rows="3"
                        resize="none"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      label="复查图片"
                      :style="width2"
                      :disabled="disabled2"
                    >
                      <basic-upload
                        key="file"
                        @onSuccess="
                          (fileList) => onSuccess(fileList, 'fcpic', index)
                        "
                        @onRemove="
                          (fileList) => onRemove(fileList, 'fcpic', index)
                        "
                        :photos="detail[index].fcpic"
                        :limit="5"
                        :disabled="disabled2"
                      ></basic-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="上传检查记录"
                    :style="width2"
                    :disabled="disabled"
                  >
                    <basic-upload
                      key="file"
                      @onSuccess="
                        (fileList) => onSuccess(fileList, 'courseWare')
                      "
                      @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
                      :photos="form.courseWare"
                      :limit="2"
                      :disabled="disabled"
                    ></basic-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <template #bottom>
      <div>
        <el-button type="primary" @click="submitForm()" v-show="!disabled2"
          >保存
        </el-button>
        <el-button type="success" @click="reset()" v-show="!disabled2"
          >重置
        </el-button>
        <el-button type="warning" @click="close">取消</el-button>
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
      activeName: "review",
      openFlag: false,
      isEditId: "",
      width: "width:200px",
      width2: "width:580px",
      disabled: true,
      disabled2: false,
      form: {},
      detail: [
        {
          wt: "",
          pic: "",
          zg: "",
          fcxx: "",
          fcpic: "",
        },
      ],
    };
  },
  mounted() {
    console.log(this.dict);
  },
  methods: {
    open(type, row) {
      if (type == "zcfucha") {
        this.icon = "icon-xinzeng";
        this.title = "再次复查";
        this.disabled = false;
      }else if(type="fucha"){
          this.icon = "icon-xinzeng";
        this.title = "复查";
      }
      this.openFlag = true;
    },
    submitForm() {
      console.log(this.formArr);
    },
    reset() {},
    close() {},
    // 删除记录
    delItem(index) {
      this.formArr.splice(index, 1);
    },
    addItem() {
      let obj = {
        mc: "",
        sj: "",
        qx: "",
        ry: "",
        fzr: "",
      };
      this.formArr.push(obj);
    },
    submitForm() {
      console.log(this.detail);
    },
    // 上传图片成功
    onSuccess(fileList, params, index) {
      this.detail[index][params] = fileList;
      console.log(this.detail);
    },
    // 删除图片
    onRemove(fileList, params, index) {
      this.detail[index][params] = fileList;
      console.log(this.detail);
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
/deep/ .el-tabs__content {
  height: 100%;
  overflow: scroll;
}

/deep/ .el-tabs--left .el-tabs__item.is-left {
  width: 160px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin: 0px 10px 20px 0px;
}

/deep/ .el-tabs .is-active {
  background: rgba(70, 133, 249, 0.09);
}

.tab-icon {
  font-size: 18px !important;
  vertical-align: bottom;
  margin-right: 10px;
}

/deep/ .el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  display: none;
}
.detail_title {
  border-bottom: 1px solid #4a80fc;
  font-size: 14px;
  color: #212121;
  font-weight: bold;
  width: 95%;
  margin: 20px auto;
  .line {
    display: inline-block;
    width: 2px;
    height: 12px;
    background-color: #4a80fc;
    margin-right: 8px;
  }
}
/deep/.el-form--inline .el-form-item {
  margin-right: 0px;
}
</style>
