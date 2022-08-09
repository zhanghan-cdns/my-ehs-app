<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="800px"
      height="40%"
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
          <el-form-item label="评估类别" label-width="108px" prop="type">
            <el-select
              v-model="form.type"
              placeholder="请选择评估类别"
              style="width: 100%"
              :disabled="disabled"
              @change="selectChange"
            >
              <el-option
                v-for="item in courseList"
                :label="item.courseName"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-for="(item, index) in form.optionArr" :key="item.id">
            <el-form-item label="评估项" label-width="108px">
              <el-input
                v-model="item.content"
                placeholder="请输入评估项"
                style="width: 90%"
                :disabled="disabled"
              ></el-input>
              <img
                src="@/assets/images/add_icon.png"
                alt=""
                class="icon"
                v-show="index === 0"
                @click="add"
              />
              <img
                src="@/assets/images/remove_icon.png"
                alt=""
                class="icon"
                v-show="index !== 0"
                @click="remove(index)"
              />
            </el-form-item>
          </div>
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
export default {
  name: "editDialog",
  mixins: [tableMixins],
  props: {
    dict: Object,
    default: {},
  },
  data() {
    return {
      courseList:[
        {courseName:"111",id:1},
        {courseName:"22222",id:2}
      ],
      title: "",
      icon: "",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {
        type: "",
        optionArr: [
          { id: 1, content: "" },
        ],
      },
      rules: {
        type: [
          { required: true, message: "请选择评估项", trigger: "change" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增评估项";
        this.isDisabled = false;
      } else if (type == "bianji") {
        // this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑评估项";
        this.isDisabled = false;
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看评估项";
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
      this.form ={
        type: "",
        optionArr: [
          { id: 1, content: "" },
        ],
      };
    },
    // 保存
    async submitForm() {
      if(this.form.optionArr[0].content===""){
        this.$message.warning("请至少输入一个评估项！")
        return
      }
      this.form.optionArr=this.form.optionArr.filter((item)=>{
        return item.content!=""
      })
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
      }
    },
    add() {
      let obj = { id: 1, content: "" };
      this.form.optionArr.push(obj);
    },
    remove(index) {
      this.form.optionArr.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/form.scss";
/deep/.icon {
  width: 34px;
  margin-left: 10px;
  vertical-align: middle;
}
</style>
