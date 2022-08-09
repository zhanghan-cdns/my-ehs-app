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
        <el-form :model="form" label-width="170px">
          <el-row>
            <el-col span="12">
              <el-form-item label="巡检点(区域/设备)名称">
                <el-input :size="size" :style="`width:${width}`"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="綁定二维码">
                <el-input :size="size" :style="`width:${width}`"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="绑定rfid">
                <el-input :size="size" :style="`width:${width}`"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="rfid卡批次代码">
                <el-input :size="size" :style="`width:${width}`"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="绑定区域">
                <el-select :size="size" :style="`width:${width}`">
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">

            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="巡检点位置（经度）">
                <el-input :size="size" :style="`width:${width}`"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="巡检点位置（纬度）">
                <el-input :size="size" :style="`width:${width}`"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="my-button">
          <el-button :size="size" icon="el-icon-circle-plus-outline" type="primary" @click="openInspectContent">添加巡检内容
          </el-button>
          <el-button :size="size" icon="el-icon-remove-outline" type="danger">批量删除</el-button>
        </div>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          >
          </render-table>
        </dom-size-listen>
        <add-inspection-content ref="addInspectionContentRef"></add-inspection-content>
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
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import addInspectionContent
  from "@views/doubleprevention/riskclamancon/inspectionpointsettings/components/addInspectionContent";

export default {
  mixins: [tableMixins, commonMixin],
  name: "addedCustomInspection",
  components: {addInspectionContent},
  data() {
    return {
      openEdit: false,
      title: '自定义巡检新增',
      form: {},
      size: 'small',
      width: '260px',
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
      ],
      rowData:{}
    }
  },
  methods: {
    open(row) {
      this.openEdit = true
      if (row) {
        this.rowData = row
      }
    },
    close() {
      this.openEdit = false
    },
    // 打开巡检内容
    openInspectContent() {
      this.$refs.addInspectionContentRef.open(this.rowData)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-col {
  margin-bottom: 0 !important;
}

.my-button {
  display: flex;
  padding: 10px 0;
  justify-content: center;
}
</style>
