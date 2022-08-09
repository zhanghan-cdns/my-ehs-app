<template>
  <div>
    <basic-dialog
      :openFlag="openEdit"
      :title="title"
      height="70%"
      icon="icon-bianji"
      v-bind="$attrs"
      width="1000px"
      @close="close"
    >
      <template #content>
        <header>
          <el-input :size="size" placeholder="请输入管控措施" style="width:200px"></el-input>
          <div>
            <el-button :size="size" type="success" @click="handleHeaderClick('bind')">绑定</el-button>
            <el-button :size="size" @click="handleHeaderClick('reset')">重置</el-button>
            <el-button :size="size" type="primary" @click="handleHeaderClick('check')">查询</el-button>
          </div>
        </header>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          >
          </render-table>
        </dom-size-listen>
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
import {defineComponent, reactive, ref, toRefs} from '@vue/composition-api'
export default defineComponent({
  name: "addInspectionContent",
  setup() {
    const size = ref('small')
    const state = reactive({
      openEdit: false,
      title: "绑定巡检内容",
      tableData: [],
      sizeCon: {
        height: 450
      },
      columns: [
        {
          type: "checkbox",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "管控措施",
          align: "center",
        },
      ]
    })
    // 打开
    const open = (row) => {
      state.openEdit = true
    }
    // 关闭
    const close = () => {
      state.openEdit = false
    }
    // 点击
    const handleHeaderClick = (type) => {

    }
    return {
      open,
      ...toRefs(state),
      close,
      size,
      handleHeaderClick
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>
