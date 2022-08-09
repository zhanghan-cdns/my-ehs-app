<template>
  <div class="div-headerbutton">
    <!-- 修改审核意见 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('xiugaishenhe')"
      v-if="buttonList.some((item) => item === 'xiugaishenhe')"
    >
      <i class="iconfont icon-bianji" style="font-size: 13px"></i>
      修改审核意见
    </el-button>
    <!--    查询-->
    <el-button
      size="small"
      type="primary"
      @click="handleClick('chaxun')"
      v-if="buttonList.some((item) => item === 'chaxun')"
    >
      <i class="iconfont icon-chaxun" style="font-size: 13px"></i>
      查询
    </el-button>
    <!--    新增-->
    <el-button
      size="small"
      type="primary"
      @click="handleClick('xinzeng')"
      v-if="buttonList.some((item) => item === 'xinzeng')"
      v-permission="'create'"
    >
      <i class="iconfont icon-jia" style="font-size: 13px"></i>
      新增
    </el-button>
    <!--    重置-->
    <el-button
      size="small"
      class="primary_btn reset_btn"
      @click="handleClick('chongzhi')"
      v-if="buttonList.some((item) => item === 'chongzhi')"
    >
      <i class="iconfont icon-zhongzhi" style="font-size: 13px"></i>
      重置
    </el-button>
    <!--    导入-->
    <el-button
      size="small"
      class="primary_btn"
      @click="handleClick('daoru')"
      v-if="buttonList.some((item) => item === 'daoru')"
    >
      <i class="iconfont icon-daoru" style="font-size: 13px"></i>
      导入
    </el-button>
    <!--导出-->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('daochu')"
      v-if="buttonList.some((item) => item === 'daochu')"
    >
      <i class="iconfont icon-daochu" style="font-size: 13px"></i>
      导出
    </el-button>
    <!--导出合规性报告-->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('daochubaogao')"
      v-if="buttonList.some((item) => item === 'daochubaogao')"
    >
      <i class="iconfont icon-daochu" style="font-size: 13px"></i>
      导出合规性报告
    </el-button>
    <!--批量删除-->
    <el-button
      size="small"
      class="warning_btn"
      @click="handleClick('piliangshanchu')"
      v-if="buttonList.some((item) => item === 'piliangshanchu')"
    >
      <i class="iconfont icon-shanchutianchong" style="font-size: 13px"></i>
      批量删除
    </el-button>
    <!--架构图-->
    <el-button
      size="small"
      type="primary"
      @click="handleClick('jiagoutu')"
      v-if="buttonList.some((item) => item === 'jiagoutu')"
    >
      <i class="iconfont icon-bofang" style="font-size: 13px"></i>
      架构图
    </el-button>
    <!--批量下发-->
    <el-button
      size="small"
      type="primary"
      @click="handleClick('piliangxiafa')"
      v-if="buttonList.some((item) => item === 'piliangxiafa')"
    >
      <i class="iconfont icon-bofang" style="font-size: 13px"></i>
      批量下发
    </el-button>

    <!-- 统计 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('tongji')"
      v-if="buttonList.some((item) => item === 'tongji')"
    >
      <i class="iconfont icon-daochu" style="font-size: 13px"></i>
      统计
    </el-button>

    <!-- 小类别管理 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('xiaoleibie')"
      v-if="buttonList.some((item) => item === 'xiaoleibie')"
    >
      <i class="iconfont icon-a-fujiajiben" style="font-size: 13px"></i>
      小类别管理
    </el-button>

    <!-- 查看 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('chakan')"
      v-if="buttonList.some((item) => item === 'chakan')"
    >
      <i class="iconfont icon-chakan2" style="font-size: 13px"></i>
      查看
    </el-button>

    <!-- 修订 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('xiuding')"
      v-if="buttonList.some((item) => item === 'xiuding')"
    >
      <i class="iconfont icon-bianji" style="font-size: 13px"></i>
      修订
    </el-button>
    <!-- 评审 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('pingshen')"
      v-if="buttonList.some((item) => item === 'pingshen')"
    >
      <i class="iconfont icon-bianji1" style="font-size: 13px"></i>
      评审
    </el-button>
    <!--  作业票申请  -->
    <el-button
      size="small"
      @click="handleClick('zuoyepiao')"
      v-if="buttonList.some((item) => item === 'zuoyepiao')"
      v-permission="'create'"
      style="background: #52c41a; color: #fff"
    >
      <i class="iconfont icon-xinzeng" style="font-size: 13px"></i>
      作业票申请
    </el-button>

    <!-- 评定内容设置 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('pingdingneirongshezhi')"
      v-if="buttonList.some((item) => item === 'pingdingneirongshezhi')"
    >
      <i class="iconfont icon-bianji1" style="font-size: 13px"></i>
      评定内容设置
    </el-button>

    <!-- 评定 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('pingding')"
      v-if="buttonList.some((item) => item === 'pingding')"
    >
      <i class="iconfont icon-bianji1" style="font-size: 13px"></i>
      评定
    </el-button>

    <!-- 发送 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('fasong')"
      v-if="buttonList.some((item) => item === 'fasong')"
    >
      <i class="iconfont icon-bianji1" style="font-size: 13px"></i>
      发送
    </el-button>

    <!-- 查看审批意见 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('shenpiyijian')"
      v-if="buttonList.some((item) => item === 'shenpiyijian')"
    >
      <i class="iconfont icon-shenpi" style="font-size: 13px"></i>
      查看审批意见
    </el-button>
    

    <!-- 委派 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('weipai')"
      v-if="buttonList.some((item) => item === 'weipai')"
    >
      <i class="iconfont icon-bianji1" style="font-size: 13px"></i>
      委派
    </el-button>

    <!-- 签订 -->
    <el-button
      size="small"
      class="export_btn primary_btn"
      @click="handleClick('qianding')"
      v-if="buttonList.some((item) => item === 'qianding')"
    >
      <i class="iconfont icon-bianji1" style="font-size: 13px"></i>
      签订
    </el-button>
    <!--自定义按钮-->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "headerButton",
  data() {
    return {};
  },
  computed: {
    buttonList() {
      if (this.$attrs.headerButtonList) {
        return this.$attrs.headerButtonList;
      } else {
        return this.$pageConfig(this.$route.path).headerButtons
          ? this.$pageConfig(this.$route.path).headerButtons
          : [];
      }
    },
  },
  created() {},
  methods: {
    handleClick(type) {
      this.$emit("headerButtonClick", type);
    },
  },
};
</script>

<style scoped lang='scss'>
.div-headerbutton {
  text-align: right;
  margin: 10px 0px;
}

.warning_btn {
  background: #fde6df;
  border: 1px solid #f2734c;
  font-weight: 400;
  color: #666;

  i {
    color: #f2734c;
  }

  &:hover {
    background: #fddfd6;
  }
}

.primary_btn {
  background: #ecf5ff;
  border: 1px solid #409eff;
  font-weight: 400;
  color: #666;

  i {
    color: #409eff;
  }

  &:hover {
    background: #cedae9 !important;
  }
}
</style>
