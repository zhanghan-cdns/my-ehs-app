<template>
    <div class="operation">
        <list-container>
            <template #left> </template>
            <template #right>
                <header>
                    <header-search :searchData="search_data" :searchItem="search_item" />
                    <header-button @headerButtonClick="headerButtonMethods" />
                </header>
            
                <dom-size-listen style="flex: 1" v-model="sizeCon">
                    <render-table @checkbox-change="selectChangeEvent" @checkbox-all="selectChangeEvent"
                        :height="sizeCon.height" :data="tableData" :columns="columns" />
                </dom-size-listen>
                <basicPager :page="page" @pageChange="pageChange"></basicPager>
            </template>
        </list-container>
        <edit-dialog ref="editDialogRef" @refreshDataList="update"> </edit-dialog>
    </div>
</template>
<script>
import {
    equipmentPageAPI,
    equipmentDeleteAPI,
} from "@/api/emergency/equipment";

import editDialog from "./components/editDialog.vue";

import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
export default {
    mixins: [tableMixins, commonMixin, dictMixin],
    components: { editDialog},
    data() {
        return {
            tableData: [{}],
            ids: [],
            query: {
                equipmentName: "",
            },
            columns: [
                {
                    type: "checkbox",
                    width: 50,
                    align: "center",
                    fixed: "left",
                },
                {
                    type: "seq",
                    title: "序号",
                    width: 50,
                    align: "center",
                },
                {
                    field: "drilltName",
                    title: "演练名称",
                    align: "center",
                },
                {
                    field: "rectificationStaff",
                    title: "整改人员",
                    width: 250,
                    align: "center",
                },
                {
                    field: "problem",
                    title: "演练中存在问题",
                    align: "center",
                },
                {
                    field: "state",
                    title: "状态",
                    width: 110,
                    align: "center",
                    render: (h, { row, column, $index }) => {
                        return (
                            <div style="width:90;height:90;border-radius:5px;border:1px #1081EA solid ; color:#1081EA;">已关联隐患</div>
                            // <el-button type="primary" plain style="height:50px; width:90px;text-align:center;">已关联隐患</el-button>
                        );
                    },
                },
                {
                    title: "操作",
                    align: "center",
                    width: 160,
                    fixed: "right",
                    render: (h, { row, column, $index }) => {
                        return (
                            <operate-button
                                on-operateButtonClick={(type) => {
                                    this.operateButtonClick(type, row);
                                }}
                            ></operate-button>
                        );
                    },
                },
            ],
            search_item: [
                {
                    prop: "courseName",
                    type: "Input",
                    placeholder: "请输入演练名称",
                    disabled: false,
                    width: "200px",
                    children: "commonJudge",
                },
            ],
            search_data: {},
        };
    },
    created() {
        this.getTableData();
    },
    methods: {
        // 头部按钮
        headerButtonMethods(type) {
            switch (type) {
                case "chaxun":
                    this.getTableData();
                    break;
                case "xinzeng":
                    this.$refs.editDialogRef.open();
                    // this.getTableData();
                    break;
                case "chongzhi":
                    this.query = {
                        equipmentName: "",
                    };
                    this.getTableData();
                    break;
                case "piliangshanchu":
                    this.deleteSomeTable();
                    break;
            }
        },
        // 表格操作按钮
        operateButtonClick(type, row) {
            switch (type) {
                case "chakan":
                    this.$refs.editDialogRef.open(row, "chakan");
                    break;
                case "bianji":
                    this.$refs.editDialogRef.open(row);
                    break;
                case "shanchu":
                    this.ids = [row.id];
                    this.deleteTableData();
                    break;
                case "weibao":
                    this.$refs.addRecordDialogRef.open(row, "weibao");
                    break;
                case "weibaojilu":
                    this.$refs.viewRecordDialogRef.open();
                    break;
            }
        },

        // 获取列表数据
        async getTableData() {
            let params = {
                ...this.query,
                "queryParams[pageNum]": this.page.currentPage,
                "queryParams[pageSize]": this.page.pageSize,
            };
            // const res = await equipmentPageAPI(params);
            // if (res.code !== 200) {
            //     return this.$message.error("获取列表数据失败");
            // }
            // this.tableData = res.data.content;
            // this.page.totalResult = res.data.totalElements;
        },

        // 删除列表数据
        deleteTableData() {
            this.$confirm("你确定要删除此条记录吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                // equipmentDeleteAPI({ ids: this.ids.join(",") }).then((res) => {
                //     if (res && res.code === 200) {
                //         this.getTableData();
                //         return this.$message.success("删除成功");
                //     } else {
                //         return this.$message.error("删除失败");
                //     }
                // });
            });
        },

        // 批量删除
        deleteSomeTable() {
            if (this.ids.length == 0) {
                return this.$message.warning("请勾选需要删除的数据");
            }
            this.deleteTableData();
        },

        // 分页改变
        pageChange() {
            this.getTableData();
        },

        // 刷新
        update() {
            this.getTableData();
        },

        // 复选框选中
        selectChangeEvent({ records }) {
            let ids = records.map((item) => item.id);
            this.ids = ids;
        },
    },
};
</script>

<style scoped lang="scss">

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
