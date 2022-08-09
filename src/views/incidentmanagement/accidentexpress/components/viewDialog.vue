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
              <el-form-item label="事故名称" prop="accidentName">
                <el-input
                  placeholder="事故名称"
                  clearable
                  v-model="form.accidentName"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故部门" prop="accidentDep">
                <el-select
                  placeholder="事故部门"
                  clearable
                  v-model="form.accidentDep"
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
              <el-form-item label="发生地点" prop="occurPlace">
                <el-input
                  placeholder="发生地点"
                  clearable
                  v-model="form.occurPlace"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="发生时间" prop="occurTime">
                <el-date-picker
                  v-model="form.occurTime"
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
              <el-form-item label="伤害等级" prop="damageLevel">
                <el-select
                  placeholder="伤害等级"
                  clearable
                  v-model="form.damageLevel"
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
              <el-form-item label="事故等级" prop="accidentLevel">
                <el-select
                  placeholder="事故等级"
                  clearable
                  v-model="form.accidentLevel"
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
              <el-form-item label="事故类型" prop="accidentType">
                <el-select
                  placeholder="事故类型"
                  clearable
                  v-model="form.accidentType"
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
              <el-form-item label="隐患因素" prop="hiddenFactor">
                <el-select
                  placeholder="隐患因素"
                  clearable
                  v-model="form.hiddenFactor"
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
              <el-form-item label="事故原因" prop="accidentCause">
                <el-select
                  placeholder="事故原因"
                  clearable
                  v-model="form.accidentCause"
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
              <el-form-item label="事故原因分析" prop="accidentCauseAnalysis">
                <el-input
                  placeholder="事故原因分析"
                  clearable
                  v-model="form.accidentCauseAnalysis"
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
              <el-form-item label="事故描述" prop="accidentDescription">
                <el-input
                  placeholder="事故描述"
                  clearable
                  v-model="form.accidentDescription"
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
              <el-form-item label="上报人" prop="reporter">
                <el-select
                  v-model="form.reporter"
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
              <el-form-item label="事故性质" prop="accidentNature">
                <el-select
                  placeholder="事故性质"
                  clearable
                  v-model="form.accidentNature"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="sgxzChange"
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
              <el-form-item label="事故类别" prop="accidentCategory">
                <el-select
                  placeholder="事故类别"
                  clearable
                  v-model="form.accidentCategory"
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
              <el-form-item label="经济损失（万元）" prop="economicLoss">
                <el-input
                  placeholder="经济损失（万元）"
                  clearable
                  v-model="form.economicLoss"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故发现项" prop="accidentDiscoveryItem">
                <el-input
                  placeholder="事故发现项"
                  clearable
                  v-model="form.accidentDiscoveryItem"
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
              <el-form-item label="救援情况" prop="rescue">
                <el-input
                  placeholder="救援情况"
                  clearable
                  v-model="form.rescue"
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
              <el-form-item label="事故教训" prop="accidentLessons">
                <el-input
                  placeholder="事故教训"
                  clearable
                  v-model="form.accidentLessons"
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
              <el-form-item label="事故责任人处理" prop="handling">
                <el-input
                  placeholder="事故责任人处理"
                  clearable
                  v-model="form.handling"
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
              <el-form-item label="相关人员教育情况" prop="personnelEducation">
                <el-input
                  placeholder="相关人员教育情况"
                  clearable
                  v-model="form.personnelEducation"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="隐患因素" prop="hiddenFactor">
                <el-select
                  placeholder="隐患因素"
                  clearable
                  v-model="form.hiddenFactor"
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
              <el-form-item
                label="事故现场照片/视频"
                prop="accidentScenePhotosOrVideo"
              >
                <img-upload
                  :fileList="form.accidentScenePhotosOrVideo"
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
              <el-form-item
                label="事故调查报告"
                prop="accidentInvestigationReport"
              >
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="
                    (fileList) =>
                      onSuccess(fileList, 'accidentInvestigationReport')
                  "
                  @onRemove="
                    (fileList) =>
                      onRemove(fileList, 'accidentInvestigationReport')
                  "
                  :photos="form.accidentInvestigationReport"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item
                label="事故树分析表"
                prop="accidentTreeAnalysisTable"
              >
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="
                    (fileList) =>
                      onSuccess(fileList, 'accidentTreeAnalysisTable')
                  "
                  @onRemove="
                    (fileList) =>
                      onRemove(fileList, 'accidentTreeAnalysisTable')
                  "
                  :photos="form.accidentTreeAnalysisTable"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="事故证据链" prop="accidentEvidenceChain">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="
                    (fileList) => onSuccess(fileList, 'accidentEvidenceChain')
                  "
                  @onRemove="
                    (fileList) => onRemove(fileList, 'accidentEvidenceChain')
                  "
                  :photos="form.accidentEvidenceChain"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row v-if="isDisabled">
            <el-col>
              <div>
                <span class="safeBook">附件</span>
                <span class="downloadPdf" @click="downloadPdf">{{
                  pdfName
                }}</span>
              </div>
            </el-col>
          </el-row> -->
          <div class="person-info">
            <span><img :src="listTitle[2].img" alt="" /></span
            ><span>{{ listTitle[2].text }}</span>
          </div>
          <table-list :tableData="tableData" @refresh="upDate"></table-list>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
          <div class="person-info">
            <span><img :src="listTitle[3].img" alt="" /></span
            ><span>{{ listTitle[3].text }}</span>
          </div>
          <div class="table-info">
            <div @click="addBtn()" class="addBtn">
              <span><img src="../../../../assets/images/add.png" alt="" /></span
              ><span>新增</span>
            </div>
          </div>
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
  dcInfoCreateAPI,
  dcInfoUpdateAPI,
} from "@/api/incidentmanagement/accidentexpress/index";
import { jobInfoListAPI } from "@/api/duty/duty_assess_record/index";

import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";
import imgUpload from "./imgUpload.vue";
import tableDialog from "./tableDialog.vue";
import tableList from "./tableList.vue";

export default {
  mixins: [dictMixin],
  components: {
    imgUpload,
    tableDialog,
    tableList,
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
      },
      rules: {
        job: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入安全职责", trigger: "blur" },
        ],
        editor: [{ required: true, message: "请输入编制人", trigger: "blur" }],
      },
      rowData: {},
      departmentList: [], //部门
      listSelect: [], //指标名称列表
      entPersonList: [],
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
      casualtiesInfoList: [],
      surveyInfo: {
        accidentNature: "",
        accidentCategory: "",
        economicLoss: "",
        accidentDiscoveryItem: "",
        rescue: "",
        accidentLessons: "",
        handling: "",
        personnelEducation: "",
        hiddenFactor: "",
        remark: "",
        accidentScenePhotosOrVideo: "",
        accidentInvestigationReport: "",
        accidentTreeAnalysisTable: "",
        accidentEvidenceChain: "",
      },
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
      default: "调查快报",
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
      console.log(row, "row");
      this.form = row;

      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        // this.getDetail(row.id);
      }
    },
    // 接收选中的数据
    upDate(data) {
      this.tableData = data;
      this.tableData.forEach((item) => {
        this.casualtiesInfoList.push({
          ...item,
          accidentId: this.form.id,
          entPersonnelId: item.id,
          injuryLevel: "ACCIDENT_DECLARATION_DAMAGE_LEVEL:ONE",
        });
      });
      console.log(this.casualtiesInfoList, "lll");
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
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
        let params = {
          ...this.form,
          accidentReport: {
            id: this.form.id, //事故快报标识
            correctiveMeasureDetail: lists,
          },
          surveyInfo: this.form.surveyInfo,
          casualtiesInfoList: this.casualtiesInfoList,
        };
        console.log(params, params);
        const res = await dcInfoCreateAPI(params);
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
        console.log(this.form, "form");
        let accidentReport = {
          id: this.form.id, //事故快报标识
          correctiveMeasureDetail: this.lists,
        };

        for (var i in this.form) {
          this.surveyInfo.accidentNature = this.form.accidentNature;
          this.surveyInfo.accidentNature = this.form.accidentNature;
          this.surveyInfo.accidentCategory = this.form.accidentCategory;
          this.surveyInfo.economicLoss = this.form.economicLoss;
          this.surveyInfo.accidentDiscoveryItem =
            this.form.accidentDiscoveryItem;
          this.surveyInfo.rescue = this.form.rescue;
          this.surveyInfo.accidentLessons = this.form.accidentLessons;
          this.surveyInfo.handling = this.form.handling;
          this.surveyInfo.personnelEducation = this.form.personnelEducation;
          this.surveyInfo.hiddenFactor = this.form.hiddenFactor;
          this.surveyInfo.remark = this.form.remark;
          this.surveyInfo.accidentScenePhotosOrVideo =
            this.form.accidentScenePhotosOrVideo;
          this.surveyInfo.accidentInvestigationReport =
            this.form.accidentInvestigationReport;
          this.surveyInfo.accidentTreeAnalysisTable =
            this.form.accidentTreeAnalysisTable;
          this.surveyInfo.accidentEvidenceChain =
            this.form.accidentEvidenceChain;
        }
        console.log(this.surveyInfo,'this.surveyInfo')

        const res = await dcInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
          accidentReport: accidentReport,
          surveyInfo: this.surveyInfo,
          casualtiesInfoList: this.casualtiesInfoList,
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
    // async getDetail(id) {
    //   try {
    //     const res = await sdpInfoViewAPI({ id });
    //     if (res.code === 200) {
    //       this.form = {
    //         ...res.data,
    //       };
    //       //   this.pdfName = res.data.attachment[0].originalFilename;
    //       //   this.pdfUrl = res.data.attachment[0].url;
    //       this.selectCourseType(res.data.attachment);
    //     }
    //   } catch (e) {
    //     this.$message.error(e);
    //   }
    // },
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

    downloadPdf() {
      //查看是显示文件
      let url = this.IMG_URL + this.pdfUrl;
      let a = document.createElement("a");
      a.href = url;
      a.click();
    },
    // 添加管控措施
    addBtn() {
      this.lists.push({ name: "" });
    },
    // 删除管控措施
    delBtn(index) {
      this.lists.splice(--index, 1);
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
    padding: 4px 10px 0px 15px;
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
    padding: 4px 10px 0px 15px;
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
      padding: 3px 10px 0px 15px;
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
</style>
