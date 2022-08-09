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
                  :disabled="true"
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
                <el-table-column label="指标类别" prop="targetType" align="center">
                </el-table-column>
                <el-table-column label="自评值/完成指标" prop="self" align="center">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.self"
                      placeholder="自评值/完成指标"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="自评人" prop="people" align="center">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.people"
                      placeholder="自评人"
                    />
                  </template>
                </el-table-column>

                <el-table-column label="自评附件" prop="uploadFilePath" align="center">
                  <template slot-scope="scope">
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
                      :on-remove="
                        handleRemove(
                          file,
                          scope.$index,
                          'scope.row.uploadFilePath'
                        )
                      "
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
                  </template>
                </el-table-column>
                <el-table-column label="附件上传人" prop="uplink" align="center">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.uplink"
                      placeholder="附件上传人"
                    />
                  </template>
                </el-table-column>

                <el-table-column label="自评结果" prop="result" width="260" align="center">
                  <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.result" @change="resultChange">
                      <el-radio label="0">达标</el-radio>
                      <el-radio label="1">不达标</el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')" v-if="!isDisabled">保存
          </el-button>
          <el-button type="success" @click="reset('form')" v-if="!isDisabled">重置 </el-button>
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
import { imgUrl } from "@/router/axios";
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
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        month: "",
      },
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
      status:'',//自评状态
    };
  },
  created() {
    // 获取月度
    returnDictKeyDataAPI({ dictKey: "DUTY_TARGET_ASSESS_MONTH" }).then(
      (res) => {
        this.dutyTargetAssessMonth = res.data.sysDictValue;
        console.log(this.dutyTargetAssessMonth, "kk");
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
    handleRemove(file, index, value) {
      // this.selfInfo[value].splice(index, 1);
      // let index = this.fileList.findIndex((item,index)=>{
      //   return file.name == item.originalFilename
      // })
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
      console.log(row,'row')
      this.rowData = row;
      this.form.year = row.allocationYear ? row.allocationYear.value : "";
      this.form.department = row.department;
      this.selfInfo = [
        {
          project: row.standardName,
          targetType: row.targetType ? row.targetType.value : "",
        },
      ];
      this.openEdit = true;
      // this.form.id = row.id;
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
      // allocationId: row.allocationId,
      try {
        const res = await astInfoCreateAPI({
          ...this.form,
          targetCode: this.rowData.allocationId,
          year: this.rowData.allocationYear ? this.rowData.allocationYear.key : "",
          department: this.rowData.department,
          selfInfo: this.selfInfo,
          status: '0',
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
          status: '1',
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
            year: res.data.allocationYear ? res.data.allocationYear.key : "",
            month: res.data.month,
            department: res.data.department,
            selfInfo: res.data.selfInfo,
          };
          this.selfInfo = res.data.selfInfo;
          // this.pdfName = res.data.dutyDoc[0].originalFilename;
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
    downCheckNum(e, row) {
      console.log(row, "123");
    },
    // 自评结果
    resultChange(val){
      this.status = val;
    }
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
</style>
