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
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="safe-info">
          <div class="title">安全责任书</div>
          <div class="time">修订时间: 2021-12-22 01:40:24</div>
          <div class="rules">
            <p>1.参与制定、修订安全生产管理制度，并监督检查执行情况；</p>
            <p>
              2.协助有关部门做好新入职员工的安全教育和职工消防安全宣传、教育培训工作；
            </p>
            <p>
              3.负责日常安全、消防、职业卫生监督检查工作，遇有危及安全生产和环境保护工作的紧急情况有权责令其停止作业，并立即报告；
            </p>
            <p>
              4.制止和纠正和考核违章指挥、强令冒险作业、违反操作规程的行为；
            </p>
            <p>
              5.做好消防管理资料，监督检查特种设备、安全附件、消防设施的维护保养和管理
            </p>
            <p>6.参与事故事件的调查、处理和统计上报和培训；</p>
            <p>7.负责外协单位进场施工的培训和办理作业票相关事宜；</p>
            <p>8.完成上级部门和公司领导安排的其他相关工作。</p>
          </div>
          <div class="remark">备注:<span></span></div>
          <div class="remark">制定人：张岚</div>
        </div>
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
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
} from "@/api/duty/duty_standard_provide";

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
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
      default: "责任回执书",
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
        const res = await sdpInfoCreateAPI(this.form);
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
        const res = await sdpInfoUpdateAPI({
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
        const res = await sdpInfoViewAPI({ id });
        if (res.code === 200) {
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.safe-info {
  width: 796px;
  height: 764px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  border: 1px solid #f0f0f0;
  margin: 15px;
  overflow-x: hidden;
  .time {
    color: #999999;
    padding-left: 69%;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #1858b2;
    position: relative;
    font-size: 28px;
    margin-top: 35px;
    &::before {
      position: absolute;
      background: linear-gradient(90deg, #1858b2 1%, #ffffff 100%);
      right: 29%;
      top: 19px;
      content: "";
      display: block;
      width: 82px;
      height: 2px;
      opacity: 0.78;
    }
    &::after {
      position: absolute;
      background: linear-gradient(90deg, #ffffff 0%, #1858b2 100%);
      left: 29%;
      top: 19px;
      content: "";
      display: block;
      width: 82px;
      height: 2px;
      opacity: 0.78;
    }
  }
  .rules {
    width: 706px;
    font-size: 16px;
    font-weight: 400;
    margin: 0px 20px;
  }
  .remark {
    width: 706px;
    height: 40px;
    line-height: 40px;
    margin: 15px 20px;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>
