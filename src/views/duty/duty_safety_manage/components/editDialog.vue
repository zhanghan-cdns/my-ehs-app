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
              <el-form-item label="节点名称" prop="nodeName">
                <el-input
                  placeholder="请输入节点名称"
                  clearable
                  v-model="form.nodeName"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-row>
                <el-col span="24">
                  <el-form-item label="所属上级" prop="superior">
                    <el-select
                      :style="`width:${width}`"
                      v-model="form.superior"
                      placeholder="请选择所属上级"
                      @change="changeDept"
                      clearable
                      :size="size"
                      value-key="id"
                    >
                      <el-option
                        v-for="item in treeList"
                        :key="item.id"
                        :label="item.manager"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="主要负责人" prop="manager">
                <el-input
                  placeholder="请输入主要负责人"
                  clearable
                  v-model="form.manager"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="负责人联系方式" prop="phone">
                <el-input
                  placeholder="负责人联系方式"
                  clearable
                  v-model="form.phone"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="安全职责" prop="duty">
                <el-input
                  placeholder="请输入安全职责"
                  clearable
                  v-model="form.duty"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
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
                  :disabled="isDisabled"
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
import { safeInfoCreateAPI,safeInfoUpdateAPI, safeInfoViewAPI,listSelectAPI} from "@/api/duty/duty_safety_manage/index.js";

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled:false,
      width: "260px",
      size: "small",
      gridList: [],
      form: {
        id: "",
        parentIcon:'',
        parentId:'',
        superior:'',
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
      treeList:[],
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
      default: "安全管理网格",
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
      this.getListSelect()//获取所属上级
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
    // 获取所属上级数据
    changeDept(val){
      console.log(val,'val')
      this.form.parentIcon = val.parentIcon;
      this.form.parentId = val.id;
      this.form.superior = val.manager;

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
        console.log(this.form,'this.form')
        const res = await safeInfoCreateAPI(this.form);
        if (res.code === 200) {
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
        const res = await safeInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
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
        const res = await safeInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
            accidentType: res.data.accidentType
              ? res.data.accidentType.key
              : "",
          };
          // 为图片添加名字
          this.form.file = res.data.file.map((item) => {
            return {
              ...item,
              name: item.originalFilename,
            };
          });
          console.log(this.form);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

      // 获取所属上级
    async getListSelect() {
      try {
        const res = await listSelectAPI();
        if (res.code === 200) {
          this.treeList = res.data;
        }
      } catch (e) {
        this.$message.error(e);
      }
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
