<template>
  <div class="view-dialog">
    <basic-dialog
      :icon="icon"
      :title="title"
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
          :disabled="true"
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="报警设备名称" prop="name">
                <el-input
                  clearable
                  v-model="form.name"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="报警触发通道号" prop="channelNumber">
                <el-input
                  clearable
                  v-model="form.channelNumber"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="报警开始时间" prop="starTime">
                <el-input
                  clearable
                  v-model="form.starTime"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="报警结束时间" prop="endTime">
                <el-input
                  clearable
                  v-model="form.endTime"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="报警推送人" prop="alarmPusher">
                <el-input
                  clearable
                  v-model="form.alarmPusher"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="报警记录" prop="alarmRecord">
                <el-input
                  clearable
                  v-model="form.alarmRecord"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="背景图" prop="backgroundMap">
                <el-image
                  v-for="item in form.backgroundMap"
                  :key="item.url"
                  style="width: 100%; height: 100%"
                  :src="imgUrl + item.url"
                  :preview-src-list="[imgUrl + item.url]"
                ></el-image>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="抓拍图" prop="snapshot">
                <el-image
                  v-for="item in form.snapshot"
                  :key="item.url"
                  style="width: 100%; height: 100%"
                  :src="imgUrl + item.url"
                  :preview-src-list="[imgUrl + item.url]"
                ></el-image>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注" prop="remark">
                <el-input
                  clearable
                  v-model="form.remark"
                  style="width: 98.5%"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import { hazardVoidEquipAlarmViewAPI } from "@/api/hazard/hazardVoidEquipAlarm/index";
import { imgUrl } from "@/router/axios";
export default {
  data() {
    return {
      imgUrl,
      icon: "icon-bianji",
      title: "查看重大危险源报警信息",
      openEdit: false,
      width: "260px",
      size: "small",
      form: {},
      row: {},
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 打开
    open(row) {
      this.openEdit = true;
      if (row && row.id) {
        this.row = row;
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
    // 获取详情
    async getDetail(id) {
      try {
        const res = await hazardVoidEquipAlarmViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
            accidentType: res.data.accidentType.value,
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.view-dialog {
  /deep/ .el-input__inner {
    color: #606266;
  }
  /deep/ .el-textarea__inner {
    color: #606266;
  }
}
</style>
