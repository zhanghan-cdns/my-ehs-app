<template>
  <basic-dialog
    :openFlag="openEdit"
    :title="title"
    height="50%"
    icon="icon-bianji"
    v-bind="$attrs"
    width="900px"
    @close="closeMethods(reset)"
  >
    <template #content>
      <el-form :model="form" label-width="160px">
        <el-row>
          <el-col span="24">
            <el-form-item label="班次名称">
              <el-input v-model="form.name" :size="size" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="班次类型">
              <el-radio-group v-model="form.group" :size="size">
                <el-radio-button label="日检"></el-radio-button>
                <el-radio-button label="周检"></el-radio-button>
                <el-radio-button label="月检"></el-radio-button>
                <el-radio-button label="年检"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in taskTimeList" :key="item.id">
          <el-col span="12">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="item['startTime']"
                :size="size"
                placeholder="开始时间"
                style="width:200px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" label-width="140px">
              <el-date-picker
                v-model="item['endTime']"
                :size="size"
                placeholder="结束时间"
                style="width:200px;margin-right: 5px"
              ></el-date-picker>
              <el-button :size="size" circle icon="el-icon-plus" type="primary" @click="plus"></el-button>
              <el-button :size="size" circle icon="el-icon-minus" type="danger" @click="minus(index)"></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="巡检点（区域/设备）">
              <el-select v-model="form.area" :size="size" multiple style="width: 100%;">
                <el-option label="叉车作业" value="1"></el-option>
                <el-option label="搅拌作业" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="巡检人员">
              <el-select v-model="form.area" :size="size" multiple style="width: 100%;">
                <el-option label="叉车作业" value="1"></el-option>
                <el-option label="搅拌作业" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #bottom>
      <div>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="success" @click="reset">重置</el-button>
        <el-button type="warning" @click="closeMethods(reset)">取消</el-button>
      </div>
    </template>
  </basic-dialog>
</template>

<script>
import {useDialog} from "@/hooks/useDialog";
import {reactive, ref, toRefs} from "@vue/composition-api/dist/vue-composition-api";
import {getUuid} from "@/util";
import {useForm} from "@/hooks/useForm";

export default {
  name: "patrolShiftTaskSettings",
  setup() {
    const {openMethods, closeMethods, openEdit} = useDialog()
    const title = ref('巡检班次任务设置')
    const {size} = useForm()
    const state = reactive({
      form: {},
      rowData: {},
      timeList: [],
      taskTimeList: [
        {
          id: getUuid(),
          startTime: '',
          endTime: ''
        }
      ]
    })
    // 保存
    const save = () => {

    }
    // 重置
    const reset = () => {
      state.form = {}
      state.taskTimeList = [{
        id: getUuid(),
        startTime: '',
        endTime: ''
      }]
    }
    // 添加
    const plus = () => {
      state.taskTimeList.push({
        id: getUuid(),
        startTime: '',
        endTime: ''
      })
    }
    // 删除
    const minus = (index) => {
      state.taskTimeList.splice(index, 1);
    }
    return {
      save,
      reset,
      openMethods,
      openEdit,
      title,
      size,
      minus,
      plus,
      closeMethods,
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
