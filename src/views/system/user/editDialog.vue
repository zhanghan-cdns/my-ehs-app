<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="700px"
      height="65%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form
            :model="form"
            label-width="200px"
            class="demo-ruleForm"
            ref="ruleForm"
            :rules="formRules"
          >
            <el-row>
              <el-col span="24">
                <el-form-item
                  label="用户名"
                  prop="userName"
                  class="is-required"
                >
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.userName"
                    placeholder="请输入用户名"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="昵称" prop="nickName" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.nickName"
                    placeholder="请输入昵称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="getUserType !== 2">
              <el-col span="24">
                <el-form-item label="角色" prop="orderNum">
                  <el-select
                    v-model="form.sysRoles"
                    multiple
                    placeholder="请选择角色"
                    style="width: 330px"
                  >
                    <el-option
                      v-for="item in roleList"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="所属部门" prop="deptId">
                  <el-select
                    style="width: 330px"
                    v-model="form.deptId"
                    placeholder="请选择所属部门"
                    clearable
                  >
                    <el-option
                      v-for="item in $attrs.deptList"
                      :key="item.id"
                      :label="item.deptName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row
              v-if="
                treeConfigs &&
                treeConfigs.some((item) => item.id === '1') &&
                getUserType !== 2
              "
            >
              <el-col>
                <el-form-item prop="ad" label="所属网格">
                  <el-cascader
                    v-model="form.ad"
                    :options="adOptions"
                    clearable
                    :show-all-levels="false"
                    style="width: 330px"
                    :props="adProps"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              v-if="
                treeConfigs &&
                treeConfigs.some((item) => item.id === '3') &&
                getUserType !== 2
              "
            >
              <el-col>
                <el-form-item label="监管分局" prop="sl">
                  <el-cascader
                    :props="slProps"
                    v-model="form.sl"
                    :options="slOptions"
                    filterable
                    style="width: 330px"
                    clearable
                    :show-all-levels="false"
                    ref="slOptionRef"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="手机号" prop="phoneNum">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.phoneNum"
                    placeholder="请输入手机号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="text-align: center;color:red">*默认密码:123456</div>
            <!-- <el-row>
              <el-col span="24">
                <el-form-item label="启用状态" prop="enabledState" class="is-required">
                  <el-select
                    v-model="form.enabledState"
                    style="width: 330px"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option label="启用" :value="0"></el-option>
                    <el-option label="停用" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row> -->
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button type="success" @click="resetForm('ruleForm')"
            >重置</el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import {
  createUserFormDataAPI,
  updateUserFormDataAPI,
  returnUserFormDataAPI,
} from "@/api/system/user";
import { roleListNopageAPI } from "@/api/system/role";
import { copyObj } from "@/util/index";
import { getTreeConfigInfo, getUserType } from "@/util/auth";

import { treeListAPI, getAllTreeAPI } from "@/api/system/common";
export default {
  data() {
    return {
      getUserType: getUserType(),
      treeConfigs: getTreeConfigInfo(), //读取本地配置 获取树配置
      slOptions: [],
      adOptions: [],
      slProps: {
        label: "name",
        value: "code",
        children: "childTree",
        checkStrictly: true,
      },
      adProps: {
        label: "name",
        value: "code",
        children: "childTree",
        checkStrictly: true,
      },
      type: "add",
      openEdit: false,
      roleList: [],
      form: {
        id: "",
        userName: "",
        nickName: "",
        sysRoles: [],
        enabledState: 0, //启用状态,可用值:0,1
      },
      formRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        sysRoles: [{ required: true, message: "请选择角色", trigger: "blur" }],
        enabledState: [
          { required: true, message: "请选择启用状态", trigger: "blur" },
        ],
        phoneNum: [
          { required: true, message: "请选择启用状态", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "用户编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {
    this.getRoleList();
    this.getGridTreeInfo();
    this.getGridTreeInfo2();
  },
  methods: {
    async getGridTreeInfo(nodeId = "0") {
      const res = await getAllTreeAPI({
        nodeId: nodeId,
        // nodeNames: "AD0,AD1,AD2,AD3",
        nodeNames: this.treeConfigs.some((item) => item.id === "1")
          ? this.treeConfigs.filter((item) => item.id === "1")[0].treeNodeNames
          : "AD0,AD1,AD2,AD3",
      });
      if (res.code === 200) {
        this.adOptions = res.data;
      }
    },
    async getGridTreeInfo2(nodeId = "0") {
      const res = await getAllTreeAPI({
        nodeId: nodeId,
        // nodeNames: "SL0,SL1,SL2,SL3",
        nodeNames: this.treeConfigs.some((item) => item.id === "3")
          ? this.treeConfigs.filter((item) => item.id === "3")[0].treeNodeNames
          : "AD0,AD1,AD2,AD3",
      });
      if (res.code === 200) {
        this.slOptions = res.data;
      }
    },
    open(row) {
      this.openEdit = true;
      this.form = {
        id: "",
        userName: "",
        nickName: "",
        sysRoles: [],
        enabledState: 0, //启用状态,可用值:0,1
      };
      if (row && row.id) {
        this.type = "edit";
        this.getRetuenForm(row.id);
      }
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id) {
      const res = await returnUserFormDataAPI({ id });
      if (res.code == 200) {
        let sysRoles = [];
        res.data.sysRoles.map((item) => {
          sysRoles.push(item.id);
        });
        let ad = [];
        let sl = [];
        let domain = res.data.domain;
        for (let k in domain) {
          if (k.indexOf("AD") !== -1) {
            ad.push(domain[k]);
          }
          if (k.indexOf("SL") !== -1) {
            sl.push(domain[k]);
          }
        }
        this.form = {
          version: res.data.version,
          password: res.data.password,
          gender: res.data.gender,
          id: id,
          userName: res.data.userName,
          nickName: res.data.nickName,
          sl: sl,
          ad: ad,
          sysRoles: sysRoles,
          enabledState: res.data.enabledState,
          deptId: res.data.deptId,
        };
      }
    },
    // 保存
    submitForm(formName) {
      let sysRoles = copyObj(this.form.sysRoles);
      this.form.sysRoles = [];
      sysRoles.map((item) => {
        this.form.sysRoles.push({
          id: item,
          version: 0,
        });
      });
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let obj = this._.cloneDeep(this.form);
          delete obj.ad;
          delete obj.sl;
          // 编辑保存
          if (this.type == "edit") {
            updateUserFormDataAPI({
              ad: this.form.ad,
              sl: this.form.sl,
              sysUser: {
                ...obj,
              },
            }).then((res) => {
              if (res.code === 200) {
                this.$message.success("编辑成功!");
                this.$emit("refreshDataList");
                this.close();
              }
            });
          } else {
            createUserFormDataAPI({
              ad: this.form.ad,
              sl: this.form.sl,
              sysUser: {
                ...obj,
              },
            }).then((res) => {
              if (res.code === 200) {
                this.$message.success("新增成功!");
                this.$emit("refreshDataList");
                this.close();
              }
            });
          }
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取角色下拉
    getRoleList() {
      roleListNopageAPI().then((res) => {
        if (res.code == 200) {
          this.roleList = res.data;
        }
      });
    },
  },
};
</script>

<style scoped lang='scss'>
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
  padding-top: 20px;
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>