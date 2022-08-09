<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="850px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form label-width="140px" label-position="right" :model="form" :rules="rules" ref="formRef">
          <el-row>
            <el-col span="12">
              <el-form-item label="库区名称" prop="resAreaName">
                <el-input placeholder="仓库一" clearable v-model="form.resAreaName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="库区编号" prop="resAreaNo">
                <el-input placeholder="丙类仓库一" clearable v-model="form.resAreaNo" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="在厂区的位置">
                <el-input placeholder="货门西侧" clearable v-model="form.factoryPosition" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="所处环境功能区">
                <el-input placeholder="装卸台" clearable v-model="form.envFunArea" :style="`width:${width}` "
                                 :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="库区面积">
                <el-input placeholder="库区面积" v-model="form.measure" :style="`width:${width}` " :size="size"></el-input>

              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="库房个数">
                <el-input placeholder="库房个数" v-model.number="form.number" :style="`width:${width}` " :size="size"></el-input>

              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col span="12">
              <el-form-item label="相邻库房最小间距" prop="minDistance">
                <el-input placeholder="相邻库房最小间距" clearable v-model.number="form.minDistance" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="所属危险化学品">  
                <el-input placeholder="相邻库房最小间距" clearable v-model="form.majHazSouCode" :style="`width:${width}` "
                          :size="size"></el-input>              
              </el-form-item>
            </el-col>
          </el-row>          
          <el-row>
            <el-col span="12">
              <el-form-item label="经度">
                <el-input placeholder="经度" clearable v-model="form.longitude" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="纬度">
                <el-input placeholder="纬度" clearable v-model="form.latitude" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="location">
            <el-button type="success" size="mini">定位按钮</el-button>
          </el-form-item>
            
          <el-row>
            <el-col>
              <el-form-item label="现场照片">
                <basic-upload
                  key="picture"
                  @onSuccess="(fileList)=>onSuccess(fileList,'scenePhotos')"
                  @onRemove="(fileList)=>onRemove(fileList,'scenePhotos')"
                  :photos="form.scenePhotos"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row>
            <el-col>
          <el-form-item label="备注">
                <el-input placeholder="备注" clearable v-model="form.remark" style="width:100%;"
                          :size="size"></el-input>
          </el-form-item> 
        </el-col>
          </el-row>  
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
          >保存
          </el-button
          >
          <el-button type="success" @click="reset('form')"
          >重置
          </el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {warehouseAreaCreateAPI, warehouseAreaViewAPI,warehouseAreaUpdateAPI} from '@/api/enterprise/warehouseArea/index'

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '新增仓库区信息',
      openEdit: false,
      width: "260px",
      size: "small",
      certificateTypeData:[],
      form: {},
      rules: {
        resAreaName: [
          {required: true, message: "请输入库区名称", trigger: "blur"},
        ],
        resAreaNo: [
          {required: true, message: "请输入库区编号", trigger: "blur"},
        ]
      },
      rowData: {}
    }
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created(){
  },
  methods: {
    // 打开
    open(row) {
      this.openEdit = true
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
        const res = await warehouseAreaCreateAPI(this.form);
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
        const res = await warehouseAreaUpdateAPI({...this.form, id: this.rowData.id});
        if (res.code === 200) {
          this.close()
          this.$emit('refresh')
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await warehouseAreaViewAPI({id})
        if (res.code === 200) {
          this.form ={...res.data}
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}



</style>
