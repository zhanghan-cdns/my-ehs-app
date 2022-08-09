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
      width="80%"
      height="55%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-row>
          <el-col>基本信息</el-col>
        </el-row>
        <el-form
          label-width="80px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <el-row>
            <el-col span="8">
              <el-form-item label="考核部门" prop="department">
                <!-- <el-select
                  placeholder="考核部门"
                  clearable
                  v-model="form.accidentType"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="true"
                >
                  <el-option
                    v-for="item in departmentList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select> -->
                <el-input
                  placeholder="考核部门"
                  clearable
                  v-model="form.department"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="年度" prop="year">
                <el-select
                  placeholder="年度"
                  clearable
                  v-model="form.year"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationYear"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="月度" prop="month">
                <el-select
                  placeholder="月度"
                  clearable
                  v-model="form.month"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="true"
                  @change="monthChange"
                >
                  <el-option
                    v-for="item in dutyTargetAssessMonth"
                    :key="item.dictKeyId"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>自评信息</el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table
                border
                :data="selfInfo"
                style="width: 100%"
                :header-cell-style="headerCellStyle"
                :header-row-style="headerRowStyle"
                :cell-style="{ 'text-align': 'center' }"
              >
                <el-table-column
                  type="index"
                  width="50"
                  label="序号"
                ></el-table-column>
                <el-table-column label="自评项目" prop="project" align="center">
                </el-table-column>
                <el-table-column
                  label="指标类别"
                  prop="targetType"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  label="自评值/完成指标"
                  prop="self"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div v-if="!isDisabled">
                      <el-input
                        size="mini"
                        v-model="scope.row.self"
                        placeholder="自评值/完成指标"
                      />
                    </div>
                    <div v-else>{{ scope.row.self }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="自评人" prop="people" align="center">
                  <template slot-scope="scope">
                    <div v-if="!isDisabled">
                      <el-input
                        size="mini"
                        v-model="scope.row.people"
                        placeholder="自评人"
                      />
                    </div>
                    <div v-else>{{ scope.row.people }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="自评附件"
                  prop="uploadFilePath"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div v-if="!isDisabled">
                      <el-upload
                        ref="uploadRef"
                        class="upload-demo"
                        name="file"
                        action="#"
                        :file-list="scope.row.uploadFilePath"
                        :http-request="
                          (params) => {
                            handleUploadPreview(params);
                          }
                        "
                        :before-remove="beforeRemove"
                        :on-remove="handleRemove(file)"
                        :limit="1"
                        :on-exceed="onExceed"
                        :on-success="
                          (
                            response,
                            file,
                            fileList //改造图片上传成功函数
                          ) => handleSuccess()
                        "
                      >
                        <el-button size="small" type="primary" v-show="isShow"
                          >点击上传</el-button
                        >
                      </el-upload>
                    </div>
                    <div v-else class="downloadPdf" @click="downloadPdf">
                      {{ pdfName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="附件上传人"
                  prop="uplink"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div v-if="!isDisabled">
                      <el-input
                        size="mini"
                        v-model="scope.row.uplink"
                        placeholder="附件上传人"
                      />
                    </div>
                    <div v-else>{{ scope.row.uplink }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="自评结果"
                  prop="result"
                  width="260"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-radio-group
                      v-model="scope.row.result"
                      @change="resultChange"
                    >
                      <el-radio label="0">达标</el-radio>
                      <el-radio label="1">不达标</el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <div>
            <el-row>
              <el-col>考核信息</el-col>
            </el-row>
            <el-row>
              <dom-size-listen style="flex: 1" v-model="sizeCon">
                <render-table
                  :data="tableData"
                  :columns="columns"
                  height="200px"
                />
              </dom-size-listen>
            </el-row>
          </div>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  astInfoCreateAPI,
  astInfoViewAPI,
  astInfoUpdateAPI,
  assessmentInfoCreateAPI,
} from "@/api/duty/duty_indicator";
import {imgUrl} from "@/router/axios";
import { uploadAPI } from "@/api/system/common";
import { sdDepartmentAPI } from "@/api/duty/duty_standard_allocation";
import dictMixin from "@/mixins/dict";
import { returnDictKeyDataAPI } from "@/api/system/dictionary";
export default {
  mixins: [dictMixin],
  name: "editDialog",
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
  data() {
    return {
      selfInfo: [],
      isShow: true,
      fileList: [],
      openEdit: false,
      isDisabled: false,
      width: "260px",
      size: "small",
      form: {
        id: "",
        month: "",
      },
      IMG_URL:imgUrl,
      pdfUrl:'',
      rules: {
        // 有限空间名称
        restrictSpaceName: [
          { required: true, message: "请输入有限空间", trigger: "blur" },
        ],
        // 易导致事故类型
        accidentType: [
          {
            required: true,
            message: "请选择易导致事故类型",
            trigger: "change",
          },
        ],
      },
      rowData: {},
      departmentList: [], //部门
      dutyTargetAssessMonth: [], //月度
      type: "", //接收弹窗类型
      tableData: [{ project: "1" }],
      result: "",
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "project",
          title: "考核项目",
          align: "center",
        },
        {
          field: "value",
          title: "考核值",
          align: "center",
          render: (h, { row }) => {
            if (!this.isDisabled) {
              return (
                <span>
                  <el-input
                    type="text"
                    size="mini"
                    placeholder="考核值"
                    v-model={row.value}
                  />
                </span>
              );
            } else {
              return <span>{row.value}</span>;
            }
          },
        },
        {
          field: "way",
          title: "考核办法",
          align: "center",
          render: (h, { row }) => {
            if (!this.isDisabled) {
              return (
                <span>
                  <el-input
                    type="text"
                    size="mini"
                    placeholder="考核办法"
                    v-model={row.way}
                  />
                </span>
              );
            } else {
              return <span>{row.way}</span>;
            }
          },
        },
        {
          field: "title",
          title: "标准标题",
          align: "center",
          render: (h, { row }) => {
            if (!this.isDisabled) {
              return (
                <span>
                  <el-input
                    type="text"
                    size="mini"
                    placeholder="标准标题"
                    v-model={row.title}
                  />
                </span>
              );
            } else {
              return <span>{row.title}</span>;
            }
          },
        },
        {
          field: "range",
          title: "适用范围",
          align: "center",
          render: (h, { row }) => {
            if (!this.isDisabled) {
              return (
                <span>
                  <el-input
                    type="text"
                    size="mini"
                    placeholder="适用范围"
                    v-model={row.range}
                  />
                </span>
              );
            } else {
              return <span>{row.range}</span>;
            }
          },
        },
        {
          field: "float",
          title: "绩效浮动情况",
          align: "center",
          render: (h, { row }) => {
            if (!this.isDisabled) {
              return (
                <span>
                  <el-input
                    type="text"
                    size="mini"
                    placeholder="绩效浮动情况"
                    v-model={row.float}
                  />
                </span>
              );
            } else {
              return <span>{row.float}</span>;
            }
          },
        },
        {
          field: "remark",
          title: "考核备注",
          align: "center",
          render: (h, { row }) => {
            if (!this.isDisabled) {
              return (
                <span>
                  <el-input
                    type="text"
                    size="mini"
                    placeholder="考核备注"
                    v-model={row.remark}
                  />
                </span>
              );
            } else {
              return <span>{row.remark}</span>;
            }
          },
        },
        {
          field: "result",
          title: "考核结果",
          align: "center",
          width: "300px",
          render: (h, { row }) => {
            return (
              <span>
                <el-radio-group
                  v-model={row.result}
                  onChange={(e) => this.downCheckNum(e, row)}
                >
                  <el-radio label="0">达标</el-radio>
                  <el-radio label="1">不达标</el-radio>
                </el-radio-group>
              </span>
            );
          },
        },
      ],
      result: "", //达标结果
      status: "", //自评结果
      pdfName: "", //附件
    };
  },
  created() {
    // 获取月度
    returnDictKeyDataAPI({ dictKey: "DUTY_TARGET_ASSESS_MONTH" }).then(
      (res) => {
        this.dutyTargetAssessMonth = res.data.sysDictValue;
      }
    );
  },

  methods: {
    edit(row, index) {
      row.iseditor = true;
    },
    save(row, index) {
      row.iseditor = false;
    },
    onExceed() {
      this.$message.error("只能上传一个");
    },

    handleUploadPreview(params, value) {
      let formData = new FormData();
      formData.append("file", params.file);
      uploadAPI(formData).then((res) => {
        if (res.code === 200) {
          if (!this.fileList) {
            this.fileList = [];
          }
          this.fileList.push({
            ...res.data,
            name: res.data.originalFilename,
          });
          this.selfInfo[0].uploadFilePath = this.fileList;
          // this.handleSuccess(res.data);
        }
      });
    },
    handleRemove(file, value) {
      // this[value] = this[value].filter((item) => item.uid !== file.uid);
      // this.fileList = [];
      // this.tableData[index].uploadFilePath = []
      // this.tableData[index].uploadFilePath.push(fileList);
      // for (let i = 0; i < this.tableData[index].uploadFilePath1.length; i++) {
      //   let element = this.tableData[index].uploadFilePath1[i];
      //   if (element.uploadFilePath == file.uploadFilePath) {
      //     this.tableData[index].uploadFilePath1.splice(i, 1);
      //   }
      // }
      // this.tableData[index].uploadFilePath1.push(fileList);
      // this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
      // this.$emit("onRemove", this.fileList);
    },
    headerCellStyle() {
      return {
        background: "#ECF3FF",
        color: "#333",
        fontWeight: "bold",
      };
    },
    headerRowStyle() {
      return {
        background: "#ECF3FF",
      };
    },
    // 打开
    open(row, type) {
      // 默认回填数据
      this.rowData = row;
      this.form.year = row.allocationYear ? row.allocationYear.key : "";
      this.form.department = row.department;
      this.selfInfo = [
        {
          project: row.standardName,
          targetType: row.targetType ? row.targetType.value : "",
        },
      ];
      this.tableData[0].project = row.standardName;
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
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
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
        const res = await astInfoCreateAPI({
          ...this.form,
          targetCode: this.rowData.allocationId,
          year: this.rowData.year ? this.rowData.year.key : "",
          department: this.rowData.department,
          selfInfo: this.selfInfo,
          status: "0",
          result: this.result,
        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
          this.$message.success("保存成功");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    myFunction() {
      //上传附件
      console.log(324124);
    },
    // 修改
    async modify() {
      try {
        const res = await astInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
          checkInfo: this.tableData,
          status: "1",
          result: this.result,
        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
          this.$message.success("编辑成功");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await astInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
            year: res.data.year ? res.data.year.key : "",
            month: res.data.month,
            department: res.data.department,
            selfInfo: res.data.selfInfo,
          };
          this.selfInfo = res.data.selfInfo;
          this.pdfName = res.data.selfInfo[0].uploadFilePath[0].originalFilename;
          this.pdfUrl = res.data.selfInfo[0].uploadFilePath[0].url;
          console.log(this.pdfName);
          if (res.data.checkInfo.length == 0) {
            return;
          } else {
            this.tableData = res.data.checkInfo;
          }
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取责任部门
    async getDepartment() {
      try {
        const res = await sdDepartmentAPI();
        if (res.code === 200) {
          this.departmentList = res.data;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取月度的id
    monthChange(val) {
      this.form.month = val;
    },
    //达标结果
    downCheckNum(e, row) {
      console.log(e, "row");
      this.result = e;
    },
    // 自评结果
    resultChange(val) {
      this.status = val;
    },
    downloadPdf() {
      //查看是显示文件
      let url = this.IMG_URL + this.pdfUrl;
      let a = document.createElement("a");
      a.href = url;
      a.click();
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
</style>
