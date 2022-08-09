<template>
  <div>
    <dom-size-listen style="flex: 1" v-model="sizeCon">
      <render-table :data="tableData" :columns="columns" />
    </dom-size-listen>

    <div style="margin-top: 16px">
      <el-form
        label-width="220px"
        label-position="right"
        :model="form"
        :rules="rules"
        size="small"
        ref="formRef"
      >
        <el-row>
          <el-col span="24">
            <el-form-item label="是否通过" prop="pass">
              <el-radio-group v-model="form.pass">
                <el-radio :label="0">通过</el-radio>
                <el-radio :label="1">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="审批意见" prop="approvalComments">
              <el-input
                placeholder="请输入审批意见"
                type="textarea"
                :rows="6"
                clearable
                v-model="form.approvalComments"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="现场照片" prop="livePhotos">
              <basic-upload
                key="picture"
                :mode="false"
                :photos="form.livePhotos"
                :limit="99"
                @onRemove="(fileList) => onRemove(fileList, 'livePhotos')"
                @onSuccess="(fileList) => onSuccess(fileList, 'livePhotos')"
              ></basic-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="线上签字" prop="onlineSignature">
              <img
                v-if="form.onlineSignature && form.onlineSignature !== ''"
                :src="form.onlineSignature"
                style="width: 133px; height: 50px"
              />
              <button-select v-else @click="sign">签字</button-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center; margin-top: 50px">
        <el-button type="primary" @click="startWork">开始作业</el-button>
        <el-button type="danger" @click="endWork">终止作业</el-button>
        <el-button type="success" @click="reset">重置</el-button>
        <el-button type="warning" @click="close">取消</el-button>
      </div>
    </div>
    <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
export default {
  mixins: [tableMixins],

  data() {
    return {
      tableData: [
        {
          id: "1",
          checkItems:
            "作业前检查安全作业票。安全作业票应与作业内容相符并在有效期内；核查安全作业票中各项安全措施已得到落实。",
          pass: 1,
        },
        {
          id: "2",
          checkItems: "确认相关作业人员持有效资格证书上岗。",
          pass: 0,
        },
      ],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "checkItems",
          title: "检查项",
          align: "center",
          render: (h, { row }) => {
            return (
              <div style="text-align:left;padding:0px 40px">
                {row.checkItems}
              </div>
            );
          },
        },
        {
          field: "operation",
          title: "操作",
          align: "center",
          width: 287,
          render: (h, { row }) => {
            return (
              <div>
                <el-radio-group v-model={row.pass}>
                  <el-radio label={1}>是</el-radio>
                  <el-radio label={0}>
                    <span style="color:#FF4646">否</span>
                  </el-radio>
                </el-radio-group>
              </div>
            );
          },
        },
      ],
      form: {
        onlineSignature: "",
      },
      rules: {},
    };
  },

  methods: {
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    sign() {
      this.$refs.signDialogRef.open();
    },

    getSignImg(imgSrc) {
      this.form.onlineSignature = imgSrc;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
</style>