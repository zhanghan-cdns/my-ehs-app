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
        <el-form label-width="120px" label-position="right" disabled :model="form" :rules="rules" ref="formRef">
          <el-row>
            <el-col span="24">
              <el-form-item label="物料名称" prop="materialsId">
                <el-select placeholder="请选择物料" clearable :size="size" v-model="form.materialsId"  :style="`width:${width}` ">
                  <el-option v-for="item in dictConfig.entAccessType" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="类型" prop="type">
                <el-select placeholder="请选择类型" :size="size" clearable v-model="form.type"  :style="`width:${width}` ">
                  <el-option v-for="item in dictConfig.entAccessType" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="记录时间">
                <el-date-picker
                  v-model="form.time"
                  type="date"
                  :size="size"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  :style="`width:${width}` "
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="重量（吨）">
                <el-input placeholder="重量（吨）" clearable v-model="form.value" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="用途描述">
                <el-input type="textarea" :rows="4" placeholder="用途描述" clearable v-model="form.useDesc" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="备注" >
                <el-input type="textarea"  :rows="4" placeholder="备注" clearable v-model="form.remark" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>     <el-form label-width="120px" label-position="right" :model="form" :rules="rules" ref="formRef">
        <el-row>
          <el-col span="24">
            <el-form-item label="物料名称" prop="materialsId">
              <el-select placeholder="请选择物料" clearable :size="size" v-model="form.materialsId"  :style="`width:${width}` ">
                <el-option v-for="item in dictConfig.entAccessType" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="类型" prop="type">
              <el-select placeholder="请选择类型" :size="size" clearable v-model="form.type"  :style="`width:${width}` ">
                <el-option v-for="item in dictConfig.entAccessType" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="记录时间">
              <el-date-picker
                v-model="form.time"
                type="date"
                :size="size"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                :style="`width:${width}` "
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="重量（吨）">
              <el-input placeholder="重量（吨）" clearable v-model="form.value" :style="`width:${width}` "
                        :size="size"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="用途描述">
              <el-input type="textarea" :rows="4" placeholder="用途描述" clearable v-model="form.useDesc" style="width:100%;"
                        :size="size"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="备注" >
              <el-input type="textarea"  :rows="4" placeholder="备注" clearable v-model="form.remark" style="width:100%;"
                        :size="size"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>     <el-form label-width="120px" label-position="right" :model="form" :rules="rules" ref="formRef">
        <el-row>
          <el-col span="24">
            <el-form-item label="物料名称" prop="materialsId">
              <el-select placeholder="请选择物料" clearable :size="size" v-model="form.materialsId"  :style="`width:${width}` ">
                <el-option v-for="item in dictConfig.entAccessType" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="类型" prop="type">
              <el-select placeholder="请选择类型" :size="size" clearable v-model="form.type"  :style="`width:${width}` ">
                <el-option v-for="item in dictConfig.entAccessType" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="记录时间">
              <el-date-picker
                v-model="form.time"
                type="date"
                :size="size"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                :style="`width:${width}` "
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="重量（吨）">
              <el-input placeholder="重量（吨）" clearable v-model="form.value" :style="`width:${width}` "
                        :size="size"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="用途描述">
              <el-input type="textarea" :rows="4" placeholder="用途描述" clearable v-model="form.useDesc" style="width:100%;"
                        :size="size"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="备注" >
              <el-input type="textarea"  :rows="4" placeholder="备注" clearable v-model="form.remark" style="width:100%;"
                        :size="size"></el-input>
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
import {chemicalsViewAPI} from '@/api/enterprise/chemicals'

import {imgUrl} from "@/router/axios";

export default {
  name: "editDialog",
  data() {
    return {
      imgUrl,
      icon: 'icon-bianji',
      title: '查看应急装备',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {
        keyProductionUnit: {
          photos: [],
        }
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
      this.form = {
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await chemicalsViewAPI({id})
        if (res.code === 200) {
          this.form = {
            ...res.data,
          }
        }
      } catch (e) {
        this.$message.error(e)
      }
    }
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

.fujian {
  display: flex;
  border-bottom: 1px solid #4A80FC;
  margin: 8px;
  margin-bottom: 18px;

  .fujianOne {
    width: 2px;
    height: 20px;
    margin-top: 3px;
    background: #4A80FC;
    border-radius: 1px 1px 1px 1px;
    opacity: 1;
  }

  .fujianTwo {
    margin-left: 7px;
    font-size: 16px;
    margin-bottom: 3px;
  }
}

</style>
