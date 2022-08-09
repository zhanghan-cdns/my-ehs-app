<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          label-width="108px"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item label="奖惩类型" prop="type">
            <el-select
              v-model="form.type"
              placeholder="请选择奖惩类型"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option label="奖励" :value="0"></el-option>
              <el-option label="惩罚" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="被奖惩人" prop="person.personName">
            <el-autocomplete
              :fetch-suggestions="querySearch"
              v-model="form.person.personName"
              placeholder="请选择被奖惩人"
              style="width: 320px"
              :disabled="disabled"
              @select="selectChange"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="奖惩金额" prop="amount">
            <el-input
              v-model="form.amount"
              placeholder="请输入奖惩金额"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="奖惩日期" prop="date">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="请选择奖惩日期"
              style="width: 320px"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="奖惩内容" prop="content">
            <el-input
              v-model="form.content"
              placeholder="请输入奖惩内容"
              :disabled="disabled"
              style="width: 823px"
              type="textarea"
              rows="3"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="奖惩依据" prop="reason">
            <el-input
              v-model="form.reason"
              placeholder="请输入奖惩依据"
              :disabled="disabled"
              style="width: 823px"
              type="textarea"
              rows="3"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              placeholder="请输入备注"
              :disabled="disabled"
              style="width: 823px"
              type="textarea"
              rows="3"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="!isDisabled"
            >重置
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import {
  createAPI,
  getDetailAPI,
  updateAPI,
} from "@/api/education/rewardPunishmentRecords/rewardPunishmentRecords";
import { userListAPI } from "@/api/system/user";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  data() {
    return {
      title: "",
      icon: "",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {
        type: "",
        person: {
          personName: "",
          id: "",
        },
        amount: "",
        date: "",
        content: "",
        reason: "",
        remark: "",
      },
      rules: {
        type: [
          { required: true, message: "请选择奖惩类型", trigger: "change" },
        ],
        "person.personName": [
          { required: true, message: "请输入被奖惩人", trigger: "change" },
        ],
        amount: [{ required: true, message: "请输入金额", trigger: "blur" }],
        date: [
          { required: true, message: "请选择奖惩日期", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入奖惩内容", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请输入奖惩原因", trigger: "blur" },
        ],
      },
      userList: [],
    };
  },
  props: {
    dict: Object,
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增奖惩记录";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑奖惩记录";
        this.isDisabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看奖惩记录";
        this.isDisabled = true;
      }
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.editId = "";
      this.isDisabled = "";
      this.reset();
    },
    // 重置
    reset() {
      // this.form = {
      //   type: "",
      //   person: {
      //     personName: "",
      //     id: "",
      //   },
      //   amount: "",
      //   date: "",
      //   content: "",
      //   reason: "",
      //   remark: "",
      // };
      this.$refs.basicFormRef.resetFields();
    },
    // 保存
    async submitForm() {
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          if (this.editId) {
            let params = {
              id: this.editId,
              ...this.form,
            };
            updateAPI(params).then((res) => {
              this.$message.success("编辑成功");
              this.close();
              this.$emit("refresh");
            });
          } else {
            let params = {
              ...this.form,
            };
            createAPI(params).then((res) => {
              this.$message.success("新增成功");
              this.close();
              this.$emit("refresh");
            });
          }
        }
      });
    },
    // 获取详情
    async getDetail(id) {
      const res = await getDetailAPI({ id });
      if (res.code === 200) {
        this.form = res.data;
        this.form.type =res.data.type;
      }
    },
    selectChange(data) {
      this.form.person.personName = data.nickName;
      this.form.person.id = data.id;
      console.log(this.form);
    },
    //获取人员列表
    getUserList() {
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 1000,
      };
      userListAPI(params).then((res) => {
        res.data.content.map((item) => {
          if (item.nickName) {
            item.value = item.nickName;
          }
        });
        this.userList = res.data.content;
        console.log(this.userList);
      });
    },
    querySearch(queryString, cb) {
      var userList = this.userList;
      var results = queryString
        ? userList.filter(this.createFilter(queryString))
        : userList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (userList) => {
        return (
          userList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px !important;
}

/deep/ .el-form-item__label-wrap label {
  line-height: 20px;
  // white-space: nowrap;
}

/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 20px 30px;
}
/deep/.el-checkbox {
  padding-top: 10px;
}
</style>
