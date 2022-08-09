<template>
  <div>
    <basic-dialog
      :icon="
        isDisabled
          ? 'icon-chakan2'
          : form.id
          ? 'icon-bianji'
          : 'icon-xinzengfabu'
      "
      :title="(isDisabled ? '查看' : form.id ? '编辑' : '新增') + title"
      width="850px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
          :disabled="isDisabled"
        >
          <div class="news-info">
            <span><img :src="listTitle[0].img" alt="" /></span
            ><span>{{ listTitle[0].text }}</span>
          </div>
          <el-row>
            <el-col span="12">
              <el-form-item label="事故名称" prop="editor">
                <el-input
                  placeholder="事故名称"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故部门" prop="job">
                <el-select
                  placeholder="事故部门"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="发生地点" prop="editor">
                <el-input
                  placeholder="发生地点"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="发生时间" prop="editor">
                <el-date-picker
                  v-model="form.editor"
                  type="date"
                  placeholder="选择发生时间"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="伤害等级" prop="job">
                <el-select
                  placeholder="伤害等级"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故等级" prop="job">
                <el-select
                  placeholder="事故等级"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="事故类型" prop="job">
                <el-select
                  placeholder="事故类型"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="隐患因素" prop="job">
                <el-select
                  placeholder="隐患因素"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="事故原因" prop="job">
                <el-select
                  placeholder="事故原因"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="事故原因分析" prop="safetyDuty">
                <el-input
                  placeholder="事故原因分析"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="事故描述" prop="safetyDuty">
                <el-input
                  placeholder="事故描述"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="上报人" prop="editor">
                <el-select
                  v-model="form.editor"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="上报人"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="news-info">
            <span><img :src="listTitle[1].img" alt="" /></span
            ><span>{{ listTitle[1].text }}</span>
          </div>
          <el-row>
            <el-col span="12">
              <el-form-item label="事故性质" prop="job">
                <el-select
                  placeholder="事故性质"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故类别" prop="job">
                <el-select
                  placeholder="事故类别"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="经济损失（万元）" prop="editor">
                <el-input
                  placeholder="经济损失（万元）"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故发现项" prop="job">
                <el-input
                  placeholder="事故发现项"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="救援情况" prop="safetyDuty">
                <el-input
                  placeholder="救援情况"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="事故教训" prop="safetyDuty">
                <el-input
                  placeholder="事故教训"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="事故责任人处理" prop="safetyDuty">
                <el-input
                  placeholder="事故责任人处理"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="相关人员教育情况" prop="editor">
                <el-input
                  placeholder="相关人员教育情况"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故部门" prop="job">
                <el-select
                  placeholder="事故部门"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注" prop="remark">
                <el-input
                  placeholder="备注"
                  clearable
                  v-model="form.remark"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="事故现场照片/视频" prop="attachment">
                <img-upload
                  :fileList="form.attachment"
                  @uploadSuccess="picUploadSuccess"
                  @handleRemove="handleRemovePic"
                  ref="renderImgRef"
                  v-if="type == 'image'"
                >
                </img-upload>
                <render-video
                  ref="renderVideofRef"
                  v-if="type == 'mp4'"
                ></render-video>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="事故调查报告" prop="attachment">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <el-form-item label="事故调查报告">
                <show-file :data="form.attachment"></show-file>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="事故树分析表" prop="attachment">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <el-form-item label="事故树分析表">
                <show-file :data="form.attachment"></show-file>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="事故证据链" prop="attachment">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <el-form-item label="事故证据链">
                <show-file :data="form.attachment"></show-file>
              </el-form-item>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first"
              ><span slot="label" class="img-head">
                <img :src="listTitle[2].img" alt="" />伤亡人员</span
              >
              <table-list :tableData="tableData"></table-list>
              <basicPager :page="page" @pageChange="pageChange"></basicPager
            ></el-tab-pane>
            <el-tab-pane name="second"
              ><span slot="label" class="img-head"
                ><img :src="listTitle[3].img" alt="" /> 整改措施</span
              >
              <div v-for="(list, index) in lists" :key="index">
                <div class="detail-info">
                  <el-input
                    :placeholder="++index + '. 整改措施详情'"
                    v-model="list.name"
                  >
                    <template slot="append">
                      <div class="del-info" @click="delBtn(index)">
                        <span
                          ><img
                            src="../../../../assets/images/del.png"
                            alt=""
                          /> </span
                        ><span>删除</span>
                      </div>
                    </template>
                  </el-input>
                </div>
              </div></el-tab-pane
            >
            <el-tab-pane name="third"
              ><span slot="label" class="img-head">
                <img :src="listTitle[3].img" alt="" />审批确认</span
              >
              <list-tab></list-tab>
            </el-tab-pane>
          </el-tabs>
          <div v-for="(list, index) in lists" :key="index">
            <div class="detail-info">
              <el-input
                :placeholder="++index + '. 整改措施详情'"
                v-model="list.name"
              >
                <template slot="append">
                  <div class="del-info" @click="delBtn(index)">
                    <span
                      ><img
                        src="../../../../assets/images/del.png"
                        alt=""
                      /> </span
                    ><span>删除</span>
                  </div>
                </template>
              </el-input>
            </div>
          </div>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button
            type="primary"
            @click="submitForm('form')"
            v-if="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')" v-if="!isDisabled"
            >重置
          </el-button>
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
} from "@/api/incidentmanagement/accidentfile/index";
import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";
import imgUpload from "./imgUpload.vue";
import tableDialog from "./tableDialog.vue";
import tableList from "./tableList.vue";
import listTab from "./listTab.vue";

export default {
  mixins: [dictMixin],
  components: {
    imgUpload,
    tableDialog,
    tableList,
    listTab,
  },
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      IMG_URL: imgUrl,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        targetName: "", //指标名称
      },
      rules: {
        job: [{ required: true, message: "请输入事故名称", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请选择事故部门", trigger: "blur" },
        ],
        editor: [{ required: true, message: "请选择发生地点", trigger: "blur" }],
        job: [{ required: true, message: "请输入发生时间", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入发生地点", trigger: "blur" },
        ],
        editor: [{ required: true, message: "请输入伤害等级", trigger: "blur" }],
        job: [{ required: true, message: "请输入事故等级", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入事故类型", trigger: "blur" },
        ],
        editor: [{ required: true, message: "请输入隐患因素", trigger: "blur" }],
        job: [{ required: true, message: "请输入事故原因", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入事故原因分析", trigger: "blur" },
        ],
        editor: [{ required: true, message: "请输入上报人", trigger: "blur" }],
      },
      rowData: {},
      departmentList: [], //部门
      listSelect: [], //指标名称列表
      pdfName: "",
      pdfUrl: "",
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      jobList: [],
      listTitle: [
        {
          img: require("../../../../assets/images/pen.png"),
          text: "快报信息",
        },
        {
          img: require("../../../../assets/images/pen.png"),
          text: "调查信息",
        },
        {
          img: require("../../../../assets/images/head.png"),
          text: "伤亡人员",
        },
        {
          img: require("../../../../assets/images/txt.png"),
          text: "整改措施",
        },
      ],
      sizeCon: {
        height: "300px",
      },
      tableData: [], //表格
      lists: [], //管控措施
      type: "image", //默认
      activeName: "first",
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "指标配备",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {},
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      // this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.rowData.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
        const res = await sdpInfoCreateAPI(this.form);
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await sdpInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await sdpInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
          this.selectCourseType(res.data.attachment);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    selectCourseType(item) {
      this.type = item.ext;
      if (item.ext != "img" && item.ext != "mp4") {
        return this.$message.warning("只能在线预览pdf文档和MP4视频！");
      }
      let pdfUrl = this.imgUrl + item.url;
      if (item.ext == "img") {
        this.$nextTick(() => {
          this.$refs.renderImgRef.open(pdfUrl);
        });
      } else if (item.ext == "mp4") {
        this.$nextTick(() => {
          this.$refs.renderVideofRef.open(pdfUrl);
        });
      }
    },
    // 添加管控措施
    addBtn() {
      this.lists.push({ name: "" });
    },
    // 删除管控措施
    delBtn(index) {
      this.lists.splice(--index, 1);
    },
    handleClick(tab) {
      this.activeName = tab.name;
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/.safeBook {
  margin: 0px 15px 0px 40px;
}
/deep/.downloadPdf {
  cursor: pointer;
  color: #409eff;
  width: 160px;
  height: 39px;
  background: #f0f5ff;
  border-radius: 2px 2px 2px 2px;
  border: 1px dashed #4a80fc;
  padding: 3px 5px;
}
.news-info {
  width: 100%;
  height: 30px;
  display: flex;
  padding-bottom: 20px;
  span:nth-of-type(1) {
    width: 23px;
    padding: 4px 10px 0px 45px;
  }
  span:nth-of-type(2) {
    width: 81px;
    font-size: 20px;
  }
}
.person-info {
  width: 100%;
  height: 30px;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #1c84ec;
  span:nth-of-type(1) {
    width: 23px;
    padding: 4px 10px 0px 45px;
  }
  span:nth-of-type(2) {
    width: 81px;
    font-size: 20px;
  }
}
.table-info {
  width: 100%;
  height: 30px;
  display: flex;
  padding: 10px 0px;
  .addBtn {
    width: 100px;
    display: flex;
    padding-right: 10px;
    span:nth-of-type(1) {
      width: 23px;
      padding: 3px 10px 0px 45px;
    }
    span:nth-of-type(2) {
      width: 81px;
      font-size: 14px;
    }
  }
}
/deep/.del-info {
  width: 154px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  span:nth-of-type(1) {
    width: 23px;
    padding: 3px 0px 0px 0px;
  }
  span:nth-of-type(2) {
    width: 81px;
    font-size: 14px;
  }
}
.detail-info {
  padding-bottom: 12px;
}
/deep/ .el-tabs {
  .el-tabs__header {
    border-bottom: 1px solid #1c84ec;
    .el-tabs__nav-wrap {
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          .el-tabs__active-bar {
            display: none;
          }
          .el-tabs__item {
            width: 146px;
            height: 34px;
            padding: 0;
            text-align: center;
            line-height: 28px;
            font-size: 16px;
            color: #595959;
            border-radius: 4px;
            .img-head {
              display: flex;
              justify-content: center;
              padding-top: 4px;
              img {
                width: 19px;
                height: 22px;
                padding-right: 10px;
                padding-top: 4px;
              }
            }
          }
          .el-tabs__item.is-active {
            width: 146px;
            height: 34px;
            border-radius: 0px 0px 0px 0px;
            color: #595959;
            background: #E1EDFC;
          }
        }
      }
    }
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
}
</style>
