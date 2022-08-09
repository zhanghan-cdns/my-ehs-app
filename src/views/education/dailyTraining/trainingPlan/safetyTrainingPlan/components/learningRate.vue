<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          label-width="auto"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item
            label="培训计划名称"
            label-width="auto"
            prop="courseName"
          >
            <el-input
              v-model="form.courseName"
              placeholder="请输入培训计划名称"
              style="width: 812px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="实施日期" label-width="auto">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="请选择实施日期"
              style="width: 320px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="计划完成日期" label-width="auto">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="请选择计划完成日期"
              style="width: 320px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="计划年度" label-width="auto">
            <el-date-picker
              v-model="form.birth"
              type="year"
              placeholder="请选择计划年度"
              style="width: 320px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="编制人" label-width="auto" prop="trainCategory">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择编制人"
              style="width: 320px"
              :disabled="disabled"
            >
              <!-- <el-option
                v-for="item in 10"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
            label="组织部门"
            label-width="auto"
            prop="trainCategory"
          >
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择组织部门"
              style="width: 320px"
              :disabled="disabled"
            >
              <!-- <el-option
                v-for="item in 10"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
            label="培训课程"
            label-width="auto"
            prop="trainCategory"
          >
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择培训课程"
              style="width: 320px"
              :disabled="disabled"
            >
              <!-- <el-option
                v-for="item in 10"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
            label="培训部门"
            label-width="auto"
            prop="trainCategory"
          >
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择培训部门"
              style="width: 320px"
              :disabled="disabled"
            >
              <!-- <el-option
                v-for="item in 10"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
            label="培训人员"
            label-width="auto"
            prop="trainCategory"
          >
            <el-select
              v-model="value1"
              multiple
              placeholder="请选择培训人员"
              style="width: 812px"
            >
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              > 
              </el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item
            label="培训学时(时)"
            label-width="auto"
            prop="courseName"
          >
            <el-input
              v-model="form.courseName"
              placeholder="请输入培训学时"
              style="width: 330px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="培训类别"
            label-width="auto"
            prop="trainCategory"
          >
            <el-select
              v-model="value1"
              multiple
              placeholder="请选择培训类别"
              style="width: 330px"
            >
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              > 
              </el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="是否需要考试" label-width="auto">
            <el-radio-group
              v-model="form.isPicture"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in dict.commonJudge"
                :label="item.dictValue"
                :key="item.id"
                :value="item.dictValue"
                >{{ item.dictValueName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考核部门" label-width="auto" prop="courseName">
            <el-input
              v-model="form.courseName"
              placeholder="请输入考核部门"
              style="width: 330px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="培训费用（元）"
            label-width="auto"
            prop="courseName"
          >
            <el-input
              v-model="form.courseName"
              placeholder="请输入考核部门"
              style="width: 330px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="培训类型"
            label-width="auto"
            prop="trainCategory"
          >
            <el-select
              v-model="value1"
              multiple
              placeholder="请选择培训类型"
              style="width: 330px"
            >
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              > 
              </el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item
            label="培训讲师"
            label-width="auto"
            prop="trainCategory"
          >
            <el-select
              v-model="value1"
              multiple
              placeholder="请选择培训讲师"
              style="width: 330px"
            >
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              > 
              </el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="培训地点" label-width="auto" prop="courseName">
            <el-input
              v-model="form.courseName"
              placeholder="请输入培训地点"
              style="width: 330px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训内容" label-width="auto" prop="courseName">
            <el-input
              v-model="form.courseName"
              placeholder="请输入培训内容"
              style="width: 812px"
              type="textarea"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="auto" prop="courseName">
            <el-input
              v-model="form.courseName"
              placeholder="请输入备注"
              style="width: 812px"
              type="textarea"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="上传课件"
            label-width="auto"
            style="width: 812px"
          >
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
              :photos="form.courseWare"
              :limit="10"
              :disabled="isDisabled"
            ></basic-upload>
          </el-form-item>
        </el-form>
        <div class="table_wrap">
          <div class="title">
            <i class="iconfont icon-kecheng"></i>
            <span>学习名单</span>
          </div>
          <div class="num_wrap">
            <div>
              <span>学习中：</span>
              <span style="color: #2c9bff; font-size: 18px">0</span>
            </div>
            <div>
              <span>未学习：</span>
              <span style="color: #ff6d2c; font-size: 18px">0</span>
            </div>
            <div>
              <span>已学习：</span>
              <span style="color: #3cb700; font-size: 18px">2</span>
            </div>
          </div>
          <div class="table_list">
            <render-table
              :height="260"
              :data="tableData"
              :columns="columns"
              @currentChange="currentChange"
            />
            <basicPager :page="page" @pageChange="pageChange"></basicPager>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="close">导出</el-button>
          <el-button type="warning" @click="close">关闭</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  props: {
    dict: Object,
    default: {},
  },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      title: "查看学习进度",
      icon: "icon-fujiaxinxi",
      openFlag: false,
      isDisabled: true,
      form: {
        courseName: "",
      },
      tableData: [
        {
          gh: "121212",
          xm: "张三",
          bm: "安保部门",
          zt: 0,
        },
      ],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "gh",
          title: "工号",
          align: "center",
        },
        {
          field: "xm",
          title: "姓名",
          align: "center",
        },
        {
          field: "bm",
          title: "部门",
          align: "center",
        },
        {
          field: "zt",
          title: "学习状态",
          align: "center",
          render: (h, { row }) => {
            if (row.zt === 0) {
              return <div style="color:#2C9BFF">学习中</div>;
            } else if (row.zt === 1) {
              return <div style="color:#FF4646">未学习</div>;
            } else if (row.zt === 2) {
              return <div style="color:#3CB700">已学习</div>;
            }
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {
    getList() {},
    // 打开
    open(type, row) {
      if (type === "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增培训计划信息";
        this.isDisabled = false;
      } else if (type === "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑培训计划信息";
        this.isDisabled = false;
      } else if (type === "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看培训计划信息";
        this.isDisabled = true;
      }
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
    },
    // 页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px !important;
}

/deep/ .el-form-item__label-wrap label {
  line-height: 20px;
  // white-space: nowrap;
}

/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 20px 30px;
}
/deep/.el-checkbox {
  padding-top: 10px;
}
/deep/.table_wrap {
  .title {
    font-size: 18px;
    font-weight: 500;
    color: #444444;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #0a8def;
    i {
      font-size: 18px;
      color: #0a8def;
      margin-right: 20px;
      margin-left: 10px;
    }
  }
  .num_wrap {
    display: flex;
    margin: 20px 0px;
    div {
      margin-right: 30px;
    }
  }
  .table_list {
    height: 260px;
    width: 100%;
  }
}
</style>
