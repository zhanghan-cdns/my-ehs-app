<template>
  <div>
    <basicDialog
      :icon="icon"
      :title="title"
      width="50%"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="content">
          <!-- 右侧  -->
          <div class="container">
            <el-form
              :model="form"
              label-width="auto"
              class="demo-ruleForm"
              ref="formRef"
              :rules="formRules"
              :disabled="true"
            >
            <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="公用工程名称"
                    prop="name"
                    class="is-required"
                  >
                    <el-input clearable v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="公用工程编号">
                    <el-input v-model="form.code"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="公用工程类型"
                    prop="type"
                    class="is-required"
                  >
                    <el-select
                      v-model="form.type"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option v-for="item in certificateTypeData" :key="item.id" :label="item.dictValueName" :value="item.dictValue">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="公用工程位置">
                    <el-input v-model="form.location"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="公用工程功能">
                    <el-input v-model="form.func"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="主要介质"
                  >
                    <el-input clearable v-model="form.mainMaterial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="主要设备设施">
                    <el-input v-model="form.majFacEquipment"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="周围环境"
                  >
                    <el-input clearable v-model="form.surrounding"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="应急处理方法">
                    <el-input v-model="form.emeDisMethod"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="自动化控制方法">
                    <el-input v-model="form.autConMode"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="经度"
                  >
                    <el-input v-model="form.longitude"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="纬度">
                    <el-input v-model="form.latitude"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button class="leftButton" type="primary" size="small">定位</el-button>
              </el-form-item>
              <el-row>
                <el-col>
                  <el-form-item label="图片">
                    <el-image
                      v-for="item in form.attPhotos"
                      :key="item.url"
                      style="width: 100px; height: 100px"
                      :src="imgUrl+ item.url"
                      :preview-src-list="[imgUrl+item.url]"
                    ></el-image>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                  </el-form-item>
            </el-form>
          </div>
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
// import "@/assets/icon/editorPage/iconfont.css";
// import "@/assets/icon/editDialog/iconfont.css";
import { fastGetDictAPI } from "@/api/system/dictionary";//字典
import {publicWorksCreateAPI,publicWorksUpdateAPI,publicWorksGetAPI } from '@/api/enterprise/publicWorks/index'
import {imgUrl} from "@/router/axios";

export default {
  inject: ["index"],
  data() {
    return {
      imgUrl,
      value1: "",
      active: 0,
      type: "add",
      openEdit: false,
      certificateTypeData:[],
      rowData: {},
      form: {
        id: "",
        dictKeyName: "",
        dictKey: "",
        dictKeyType: "",
      },
      formRules: {
        name: [
          { required: true, message: "请输入公用工程名称", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择公用工程类型", trigger: "change" }],
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "新增公用工程信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {
    this.initLoadDict()
  },
  methods: {
    // 打开
    open(row) {
      console.log('open123',row)
      this.openEdit = true
      this.form = {}
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id)
      }
    },
    // 关闭
    close() {
      this.openEdit = false
      this.reset()
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields()
      this.form = {}
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.rowData.id) this.modify()
          else this.add()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
        const res = await publicWorksCreateAPI(this.form);
        console.log('res.data公用工程',res.data)
        if (res.code === 200) {
          this.close()
          this.$emit('refresh')
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 修改
    async modify() {
      try {
        const res = await publicWorksUpdateAPI({...this.form, id: this.rowData.id});
        if (res.code === 200) {
          this.close()
          this.$emit('refresh')
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await publicWorksGetAPI({id})
        console.log('公用工程查看',res.data)
        if (res.code === 200) {
          this.form = {...res.data,type:res.data.type&&res.data.type.key}
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("ENT_PUBLIC_WORK_TYPE").then((res) => {//项目性质
         this.certificateTypeData = res.data
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
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
  // margin-left: 10px;
  // box-shadow: 0 0 20px #979696;
}

.content {
  display: flex;
  flex-wrap: wrap;
  .leftContent {
    width: 235px;
    height: 1000px;
    background: white;
    box-shadow: 0 0 20px #979696;
    border-radius: 3px;
    position: relative;
  }
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}

/deep/ .el-steps {
  width: 90%;
  .el-step {
    left: 35px;
  }
  .el-step__icon {
    // width:56px;
    // height:56px;
  }
  .el-step__line {
    width: 0px;
  }
  .el-step__title.is-process {
    color: #0c66ff;
    font-size: 18px;
  }
  .el-step__head.is-process {
    color: #0c66ff;
  }
  // .el-step__head.is-finish{
  //   border-color: #285edf;
  // }
  .el-step__title.is-finish {
    color: #285edf;
  }
  .el-step__icon.is-icon {
    background: transparent;
  }
  .el-step__title.is-wait {
    color: #c0c4cc;
    font-size: 18px;
  }
}

/deep/ .el-step.is-vertical {
  margin-left: -24px;
  background: #eef4ff;
  width: 214px;
  position: absolute;
  height: 42px;
}

/deep/ .el-step.is-vertical .el-step__head {
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  width: 24px;
  padding-top: 10px;
  padding-left: 47px;
}

.card {
  margin-left: 20px;
}

/deep/ .el-step.is-vertical .el-step__title {
  margin-top: 9px !important;
}

/deep/ .contentInput {
  .el-input__inner {
    height: 85px;
  }
}

// /deep/ .el-upload-dragger {
//   background: white;
//   border: 0px;
//   width: 323px;
//   height: 161px;
// }

// /deep/ .el-upload--picture-card {
//   background: white;
//   border: 0px;
//   width: 120px;
//   height: 120px;
// }


</style>
