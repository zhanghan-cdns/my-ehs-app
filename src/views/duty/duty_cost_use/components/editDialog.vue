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
      height="65%"
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
          <el-row>
            <el-col span="12">
              <el-form-item label="日期" prop="useDate">
                <el-date-picker
                  v-model="form.useDate"
                  type="date"
                  placeholder="选择日期"
                  :style="`width:${width}`"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="使用部门" prop="department">
                <!-- <el-select
                  placeholder="使用部门"
                  clearable
                  v-model="form.department"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in departmentList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select> -->
                <el-input
                  placeholder="使用部门"
                  clearable
                  v-model="form.department"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="24">
              <el-form-item label="支出项目类别" prop="type">
                <el-select
                  v-model="form.type"
                  placeholder="请选择支出项目类别"
                  ref="selectTree"
                  style="width: 98.5%"
                  clearable
                >
                  <el-option
                    :key="form.type"
                    :value="form.type"
                    :label="form.label"
                  >
                  </el-option>
                  <el-tree
                    :data="datalist"
                    :props="defaultProps"
                    @node-click="handleClickNode"
                    node-key="id"
                  ></el-tree>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="24">
              <el-form-item label="具体用途" prop="useOf">
                <el-input
                  placeholder="请输入具体用途"
                  clearable
                  v-model="form.useOf"
                  style="width: 98.5%"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="金额（万元）" prop="value">
                <el-input
                  placeholder="请输入金额（万元）"
                  clearable
                  v-model="form.value"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="经办人" prop="manager">
                <el-select
                  placeholder="请选择经办人"
                  clearable
                  v-model="form.manager"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in tableData"
                    :key="item.id"
                    :value="item.id"
                    :label="item.nickName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="审核人" prop="checker">
                <!-- <el-input
                  placeholder="审核人"
                  clearable
                  v-model="form.checker"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input> -->
                <el-select
                  placeholder="请选择审核人"
                  clearable
                  v-model="form.checker"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in tableData"
                    :key="item.id"
                    :value="item.id"
                    :label="item.nickName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="批准人" prop="approver">
                <el-select
                  placeholder="请选择批准人"
                  clearable
                  v-model="form.approver"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in tableData"
                    :key="item.id"
                    :value="item.id"
                    :label="item.nickName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="票据附件(图片)" prop="attachment">
                <basic-upload
                  key="picture"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <el-form-item label="票据附件(图片)">
                <el-image
                  v-for="item in form.attachment"
                  :key="item.url"
                  style="width: 100px; height: 100px"
                  :src="imgUrl+ item.url"
                  :preview-src-list="[imgUrl+item.url]"
                ></el-image>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input
                  placeholder="备注"
                  clearable
                  v-model="form.remark"
                  style="width: 98.5%"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
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
  dcuInfoCreateAPI,
  dcuInfoViewAPI,
  dcuInfoUpdateAPI,
  userListAPI,
} from "@/api/duty/duty_cost_use/index";
import { sdDepartmentAPI } from "@/api/duty/duty_standard_allocation";
import dictMixin from "@/mixins/dict";
import {imgUrl} from "@/router/axios";
export default {
  mixins: [dictMixin],
  name: "editDialog",
  data() {
    return {
      imgUrl,
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      // form: {
      //   id: "",
      //   dictValueName: "",
      // },
      type: {
        dictValue: "",
        dictValueName: "",
      },
      rules: {
        department: [
          { required: false, message: "请选择使用部门", trigger: "blur" },
        ],
        value: [
          {
            required: true,
            message: "请输入金额",
            trigger: "blur",
          },
        ],
      },
      rowData: {},
      tableData: [],
      departmentList: [], //部门
      // defaultProps: {
      //   /** 唯一标识 **/
      //   value: "dictValue",
      //   /** 标签显示 **/
      //   label: "dictValueName",
      //   /** 子级 **/
      //   children: "children",
      // },
      form: {
        type:"",
        label: "一级 1",
      },
      datalist: [
        {
          Id: 1,
          label: "一级 1",
          children: [
            {
              Id: 11,
              label: "二级 1-1",
              children: [{ Id: 111, label: "三级 1-1-1" }],
            },
          ],
        },
        {
          Id: 2,
          label: "一级 2",
          children: [
            {
              Id: 21,
              label: "二级 2-1",
              children: [
                {
                  Id: 211,
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              Id: 22,
              label: "二级 2-2",
              children: [
                {
                  Id: 221,
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        /** 唯一标识 **/
        value: "Id",
        /** 标签显示 **/
        label: "label",
        /** 子级 **/
        children: "children",
      },
      page:{
        currentPage:1,
        pageSize:10,
      }
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
      default: "费用使用",
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
      // this.form.id = row.id;
      this.getTableData();
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    // 获取列表数据
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await userListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        console.log(this.tableData, "this.tableData");

        // this.page.totalResult = res.data.totalElements;
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
        const res = await dcuInfoCreateAPI(this.form);
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
          his.$message.success("保存成功");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await dcuInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
          his.$message.success("编辑成功");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await dcuInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data
          }
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取使用部门
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
    //节点点击事件
    handleClickNode(data) {
      this.form.Id = data.Id;
      this.form.label = data.label;
      // this.form.label = data.label;
      // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
      // this.$refs.selectTree.blur();
      // this.$refs[`${data.id}tree`][index].blur();  // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
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
</style>
