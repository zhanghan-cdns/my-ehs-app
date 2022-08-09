<template>
  <div id>
    <basicDialog
      :icon="'icon-bianji'"
      :title="'菜单权限'"
      width="880"
      height="55%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form
            label-width="100px"
            :model="form"
            :rules="rules"
            ref="formRef"
          >
            <el-row>
              <el-col span="12">
                <el-form-item label="菜单名称" prop="permissionName">
                  <el-input
                    clearable
                    v-model="form.permissionName"
                    style="width: 300px"
                    placeholder="请输入菜单名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="菜单类型" prop="permissionType">
                  <el-select style="width: 300px" v-model="form.permissionType">
                    <el-option
                      v-for="item in index.systemPermissionType"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="启用状态" prop="isEnable">
                  <el-radio-group v-model="form.isEnable">
                    <el-radio
                      :label="item.dictValue"
                      v-for="item in index.commonUse"
                      :key="item.id"
                    >
                      {{ item.dictValueName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="路由地址" class="route" prop="url">
                  <el-input
                    clearable
                    v-model.trim="form.url"
                    style="width: 300px"
                    placeholder="请输入路由地址"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="排序编号" prop="orderNum">
                  <el-input-number
                    clearable
                    v-model="form.orderNum"
                    style="width: 300px"
                    placeholder="请输入排序编号"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="权限编码" prop="permissionCode">
                  <el-input
                    clearable
                    v-model.trim="form.permissionCode"
                    style="width: 300px"
                    placeholder="请输入权限编码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="父级菜单" prop="parentId">
                  <el-cascader
                    clearable
                    v-model="form.parentId"
                    style="width: 300px"
                    :options="menuOptions"
                    :show-all-levels="false"
                    :props="{
                      children: 'children',
                      value: 'id',
                      label: 'name',
                      checkStrictly: true,
                    }"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="图标" prop="icon">
                  <el-input
                    clearable
                    v-model="form.icon"
                    style="width: 300px"
                    placeholder="请输入图标编码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="是否显示" prop="isVisible">
                  <el-radio-group v-model="form.isVisible">
                    <el-radio
                      :label="item.dictValue"
                      v-for="item in index.commonJudge"
                      :key="item.id"
                    >
                      {{ item.dictValueName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="请求类型"
                  prop="requestMethod"
                  v-if="form.permissionType === 'SYSTEM_PERMISSION_TYPE:BUTTON'"
                >
                  <el-select
                    clearable
                    v-model="form.requestMethod"
                    style="width: 300px"
                    placeholder="请选择请求类型"
                  >
                    <el-option
                      v-for="item in index.systemReqType"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="备注">
                  <el-input
                    :rows="4"
                    type="textarea"
                    v-model="form.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <el-button
          type="primary"
          size="medium"
          @click="handleBottomClick('save')"
          >保存
        </el-button>
        <el-button
          type="warning"
          size="medium"
          @click="handleBottomClick('cancel')"
          >取消
        </el-button>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import {
  permissionListAPI,
  permissionCreateAPI,
  permissionViewAPI,
  permissionUpdateAPI,
} from "@/api/system/permission";
import { searchTreeParentId } from "@/util/index";

export default {
  mixins: [],
  inject: ["index"],
  data() {
    return {
      openEdit: false,
      menuOptions: [],
      rowData: {},
      form: {
        isEnable: "COMMON_USE:ENABLE",
        isVisible: "COMMON_JUDGE:TRUE",
        permissionType: "",
        requestMethod: "",
      },
      rules: {
        permissionName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: " blur",
          },
        ],
        permissionType: [
          {
            required: true,
            message: "请输入菜单类型",
            trigger: " blur",
          },
        ],
        url: [
          {
            required: true,
            message: "请输入路由地址",
            trigger: " blur",
          },
        ],
        orderNum: [
          {
            required: true,
            message: "请输入排序编号",
            trigger: " blur",
          },
        ],
        parentId: [
          {
            required: false,
            message: "请选择父级菜单",
            trigger: "change",
          },
        ],
        permissionCode: [
          {
            required: true,
            message: "请输入权限编码",
            trigger: " blur",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    async open(row) {
      this.rowData = {};
      await this.getMenuList();
      if (row) {
        this.rowData = row;
        this.getMenuDetailInfo(row.id);
      }
      this.openEdit = true;
    },
    async getMenuDetailInfo(id) {
      const res = await permissionViewAPI({ id: id });
      if (res.code === 200) {
        const { isVisible, isEnable, permissionType, requestMethod } = res.data;
        this.form = {
          ...res.data,
          isVisible: isVisible && isVisible.key,
          isEnable: isEnable && isEnable.key,
          permissionType: permissionType && permissionType.key,
          requestMethod: requestMethod && requestMethod.key,
        };
        // 查找所有父亲id
        let parentId = searchTreeParentId(this.menuOptions, res.data.id).map(
          (item) => item.id
        );
        // 如果parentId的length为1 就取空
        // 如果不为1 就取上一位
        this.$set(
          this.form,
          "parentId",
          parentId.length > 1 ? parentId[parentId.length - 2] : ""
        );
      }
    },

    // 获取父级菜单列表
    async getMenuList() {
      const res = await permissionListAPI();
      this.recursionMenu(res.data);
      this.menuOptions = res.data;
    },

    // 递归菜单
    recursionMenu(data) {
      data.forEach((item) => {
        if (
          item.permissionType &&
          item.permissionType.key === "SYSTEM_PERMISSION_TYPE:BUTTON"
        ) {
          item.disabled = true;
        }
        if (item.children) {
          this.recursionMenu(item.children);
        } else {
          return;
        }
      });
    },
    close() {
      this.openEdit = false;
      this.reset();
    },
    reset() {
      this.form = {
        isEnable: "",
        isVisible: "",
        permissionType: "",
        requestMethod: "",
      };
      this.$refs.formRef.resetFields();
    },
    handleBottomClick(type) {
      if (type === "save") {
        this.$refs.formRef.validate(async (valid) => {
          if (valid) {
            let res;
            if (!this.rowData.id) {
              res = await permissionCreateAPI({
                ...this.form,
                parentId: this.form.parentId
                  ? this.form.parentId[this.form.parentId.length - 1]
                  : "",
              });
            } else {
              res = await permissionUpdateAPI({
                id: this.rowData.id,
                ...this.form,
                parentId:
                  this.form.parentId instanceof Array
                    ? this.form.parentId[this.form.parentId.length - 1]
                    : this.form.parentId,
              });
            }
            if (res.code === 200) {
              this.$emit("update");
              this.close();
              this.$store.dispatch("GetMenu");
            }
          }
        });
      } else if (type === "cancel") {
        this.openEdit = false;
        this.reset();
      }
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}

.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 30px;
}

.route /deep/ .el-form-item__label {
  color: rgb(255, 152, 0);
  font-weight: bold;
}
</style>
