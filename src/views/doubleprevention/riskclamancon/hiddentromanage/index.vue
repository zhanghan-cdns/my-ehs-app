  <template>
  <div class="hiddenTroManage">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="height:100%;display: flex;flex-direction: column;">
      <el-tab-pane label="所有隐患" name="first">
        <first-tab ref="firstTabRef"></first-tab>
      </el-tab-pane>
      <el-tab-pane label="要我处理" name="second">
        <second-tab ref="secondTabRef"></second-tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import firstTab from "./components/firstTab"
import secondTab from "./components/secondTab"
export default {
  components:{firstTab,secondTab},
  data() {
    return {
      activeName: 'first'
    };
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      if(tab.label=='所有隐患'){
        this.$refs.firstTabRef.getTableData()
      }else{
        this.$refs.secondTabRef.getTableData()
      }
    }
  },
};
</script>

<style scoped lang='scss'>
/deep/ .el-tabs__content {
  flex: 1;
}
/deep/ .el-tab-pane{
  height: 100%;
}
</style>
