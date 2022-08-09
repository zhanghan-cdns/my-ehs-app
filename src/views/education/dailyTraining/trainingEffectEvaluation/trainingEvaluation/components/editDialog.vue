<template>
  <div>
    <basic-dialog :icon="icon" :title="title" width="1000px" height="70%" v-bind="$attrs" @close="close" :openFlag="openFlag">
      <template #content>
        <el-table :data="tableData" style="width: 100%" border header-row-class-name="headerName">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="评估项" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.evaluationItem }}</span>
            </template>
          </el-table-column>
          <el-table-column label="评估" width="400px" align="center">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.grade" @change="assessmentChange">
                <el-radio :label="item.optionGrade" v-for="item in scope.row.assessment" :key="item.optipnName">{{ item.optipnName }}</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column label="得分" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.grade }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="finalScore">
          总体评价
          <span v-if="finalScore>= 85" style="color: #52c41a">{{ finalScore }}（优）</span>
          <span v-else-if="finalScore <= 84 && finalScore >= 70" style="color: #4a80fc">{{ finalScore }}（良）</span>
          <span v-else-if="finalScore <= 69 && finalScore >= 60" style="color: #faad14">{{ finalScore }}（中）</span>
          <span v-else-if="finalScore < 60 && finalScore > 0" style="color: #ff4646">{{ finalScore }}（差）</span>
        </div>
        <div class="remarks">
          <div>备注</div>
          <textarea v-model="remark" placeholder="请输入备注"></textarea>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="close">关闭</el-button>
          <el-button type="warning" @click="submit">确定</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
export default {
  name: "detailsDialog",
  data() {
    return {
      tableHeight: {
        height: 250,
      },
      title: "培训评估",
      icon: "icon-fujiaxinxi",
      openFlag: true,
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "xm",
          title: "评估项",
          align: "center",
        },
        {
          field: "xm",
          title: "评估",
          align: "center",
        },
        {
          field: "xm",
          title: "得分",
          align: "center",
          width: 100,
        },
      ],
      tableData: [
        {
          evaluationItem: "培训内容1",
          assessment: [
            {
              optipnName: "优",
              optionGrade: 100,
            },
            {
              optipnName: "良",
              optionGrade: 80,
            },
            {
              optipnName: "中",
              optionGrade: 70,
            },
            {
              optipnName: "一般",
              optionGrade: 60,
            },
            {
              optipnName: "差",
              optionGrade: 50,
            },
          ],
          grade: 0,
        },
        {
          evaluationItem: "培训内容2",
          assessment: [
            {
              optipnName: "优",
              optionGrade: 100,
            },
            {
              optipnName: "良",
              optionGrade: 80,
            },
            {
              optipnName: "中",
              optionGrade: 70,
            },
            {
              optipnName: "一般",
              optionGrade: 60,
            },
            {
              optipnName: "差",
              optionGrade: 50,
            },
          ],
          grade: 0,
        },
        {
          evaluationItem: "培训内容3",
          assessment: [
            {
              optipnName: "优",
              optionGrade: 100,
            },
            {
              optipnName: "良",
              optionGrade: 80,
            },
            {
              optipnName: "中",
              optionGrade: 70,
            },
            {
              optipnName: "一般",
              optionGrade: 60,
            },
            {
              optipnName: "差",
              optionGrade: 50,
            },
          ],
          grade: 0,
        },
        {
          evaluationItem: "培训内容4",
          assessment: [
            {
              optipnName: "优",
              optionGrade: 100,
            },
            {
              optipnName: "良",
              optionGrade: 80,
            },
            {
              optipnName: "中",
              optionGrade: 70,
            },
            {
              optipnName: "一般",
              optionGrade: 60,
            },
            {
              optipnName: "差",
              optionGrade: 50,
            },
          ],
          grade: 0,
        },
      ],
      finalScore: 0,
      remark: "",
    };
  },
  methods: {
    // 打开
    open(type, row) {
      this.openFlag = true;
      // this.getDetail(row.id);
    },
    // 关闭
    close() {
      this.openFlag = false;
    },
    // 获取详情
    async getDetail(id) {},
    submit() {},
    assessmentChange() {
      let len = this.tableData.length;
      this.finalScore = 0;
      this.tableData.map((item) => {
        this.finalScore += item.grade;
      });
      this.finalScore = Math.floor(this.finalScore / len);
    },
  },
};
</script>

<style scoped lang="scss">
.tab_wrap {
  margin-top: 20px;
  display: flex;
  border-bottom: 1px solid #1890ff;
  .tab {
    cursor: pointer;
    width: 126px;
    height: 38px;
    margin: 0px 10px;
    line-height: 38px;
    text-align: center;
    white-space: normal;
  }
  .tab_now {
    color: white;
    background: url("../../../../../../assets/images/education/tab_bg.png")
      no-repeat center/cover;
  }
}
/deep/.el-radio-group {
  display: flex;
  align-items: center;
  font-size: 14px;
}
/deep/.headerName th {
  background: #d0e0ff !important;
  color: #333333 !important;
}
.finalScore {
  height: 48px;
  border: 1px solid #ebeef5;
  text-align: center;
  line-height: 48px;
  font-size: 14px;
  white-space: normal;
  span {
    margin-left: 10px;
  }
}
.remarks {
  display: flex;
  align-items: center;
  margin-top: 14px;
  div {
    width: 10%;
    font-size: 14px;
    color: #595959;
    text-align: center;
  }
  textarea {
    width: 90%;
    height: 100px;
    border: 1px solid #d5d5d5;
    resize: none;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
