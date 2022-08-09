<template>
  <div>
    <basic-dialog
      :openFlag="openEdit"
      :title="title"
      height="45%"
      icon="icon-bianji"
      v-bind="$attrs"
      width="850px"
      @close="closeMethods(reset)"
    >
      <template #content>
        <el-form :model="form" :disabled="disabledForm" label-width="120px">
          <el-row>
            <el-col span="12">
              <el-form-item label="隐患级别">
                <el-select
                  v-model="form.riskLevel"
                  :size="size"
                  clearable
                  placeholder="请选择风险级别"
                  style="width: 100%;">
                  <el-option
                    v-for="item in dictConfig.doublePreventionRiskLevel"
                    :key="item.id"
                    :label="item.dictValueName"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12" v-if="isEnt">
              <el-form-item label="措施分类">
                <el-input :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="检查单元">
                <el-input :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="检查项目">
                <el-input :size="size" rows="4" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="隐患内容">
                <el-input :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="正常内容">
                <el-input :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="success" @click="reset">重置</el-button>
        <el-button type="warning" @click="closeMethods(reset)">取消</el-button>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from "@vue/composition-api/dist/vue-composition-api";
import {useDialog} from "@/hooks/useDialog";
import {useForm} from "@/hooks/useForm";

export default {
  name: "viewPublicCheckList",
  props: ['dictConfig','isEnt','disabledForm'],
  setup(props) {
    const {size} = useForm()
    const {openMethods, closeMethods, openEdit} = useDialog()
    const title = ref('查看公共检查表')
    if(props.isEnt){
      title.value='企业自增信息'
    }
    const state = reactive({
      form: {},
      rowData: {},
    })
    // 保存
    const save = () => {

    }
    // 重置
    const reset = () => {

    }
    return {
      title,
      openMethods,
      closeMethods,
      openEdit,
      reset,
      size,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-col {
  margin-bottom: 0;
}
</style>
