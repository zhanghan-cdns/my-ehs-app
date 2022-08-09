<template>
  <div class="operateButton">
    <div
      @click="handleClick('bangdingbiaodian')"
      v-if="operateButtonList.some((item) => item === 'bangdingbiaodian')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="绑定标点"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-location-full" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <div
      @click="handleClick('tianjiabanci')"
      v-if="operateButtonList.some((item) => item === 'tianjiabanci')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="添加班次"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-tianjia" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 字典 -->
    <div
      class="zidian"
      @click="handleClick('dictionary')"
      v-permission="'dictionary'"
      v-if="operateButtonList.some((item) => item === 'dictionary')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="字典"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-pingtai_zidian"></i>
      </el-tooltip>
    </div>
    <!-- 分配权限 -->
    <div
      @click="handleClick('fenpeiquanxian')"
      v-if="operateButtonList.some((item) => item === 'fenpeiquanxian')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="分配权限"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fenpeishebei"></i>
      </el-tooltip>
    </div>

    <!-- 会议纪要 -->
    <div
      @click="handleClick('huiyijiyao')"
      v-permission="'view'"
      v-if="operateButtonList.some((item) => item === 'huiyijiyao')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="会议纪要"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 推迟 -->
    <div
      @click="handleClick('tuichi')"
      v-permission="'view'"
      v-if="operateButtonList.some((item) => item === 'tuichi')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="推迟"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fenpeishebei" style="color: #faad14"></i>
      </el-tooltip>
    </div>
    <!-- 发布 -->
    <div
      @click="handleClick('fabu2')"
      v-permission="'view'"
      v-if="operateButtonList.some((item) => item === 'fabu2')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="发布"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 查看 -->
    <div
      @click="handleClick('chakan')"
      v-permission="'view'"
      v-if="operateButtonList.some((item) => item === 'chakan')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="查看"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-chakan2" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 编辑 -->
    <div
      @click="handleClick('bianji')"
      v-permission="'update'"
      v-if="operateButtonList.some((item) => item === 'bianji')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="编辑"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-bianji2" style="color: #faad14"></i>
      </el-tooltip>
    </div>
    <!-- 关联隐患 -->
    <div
      @click="handleClick('guanlianyinhuan')"
      v-permission="'update'"
      v-if="operateButtonList.some((item) => item === 'guanlianyinhuan')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="关联隐患"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-baoyang" style="color: #faad14"></i>
      </el-tooltip>
    </div>

    <!-- 保养 -->
    <div
      @click="handleClick('baoyang')"
      v-if="operateButtonList.some((item) => item === 'baoyang')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="保养"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-baoyang" style="color: #00caae"></i>
      </el-tooltip>
    </div>
    <!-- 监测 -->
    <div
      @click="handleClick('jiance1')"
      v-if="operateButtonList.some((item) => item === 'jiance1')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="监测"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-jiance1" style="color: #1577f8"></i>
      </el-tooltip>
    </div>
    <!-- 检查 -->
    <div
      @click="handleClick('jiancha')"
      v-if="operateButtonList.some((item) => item === 'jiancha')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="检查"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-jiancha" style="color: #2195e2"></i>
      </el-tooltip>
    </div>
    <!-- 检测 -->
    <div
      @click="handleClick('jiance2')"
      v-if="operateButtonList.some((item) => item === 'jiance2')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="检测"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-jiance" style="color: #4079ff"></i>
      </el-tooltip>
    </div>
    <!-- 维修 -->
    <div
      @click="handleClick('weixiu')"
      v-if="operateButtonList.some((item) => item === 'weixiu')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="维修"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-weixiu" style="color: #0089ff"></i>
      </el-tooltip>
    </div>
    <!-- 停用 -->
    <div
      @click="handleClick('tingyong')"
      v-if="operateButtonList.some((item) => item === 'tingyong')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="停用"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-tingyong" style="color: #ff8000"></i>
      </el-tooltip>
    </div>
    <!-- 恢复 -->
    <div
      @click="handleClick('huifu')"
      v-if="operateButtonList.some((item) => item === 'huifu')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="恢复"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-huifu" style="color: #00d8b4"></i>
      </el-tooltip>
    </div>
    <!-- 报废 -->
    <div
      @click="handleClick('baofei')"
      v-if="operateButtonList.some((item) => item === 'baofei')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="报废"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-baofei" style="color: #ff2c02"></i>
      </el-tooltip>
    </div>
    <!-- 更多 -->
    <div
      @click="handleClick('gengduo')"
      v-if="operateButtonList.some((item) => item === 'gengduo')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="更多"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-gengduo" style="color: #ff2c02"></i>
      </el-tooltip>
    </div>
    <!-- 处置 -->
    <div
      @click="handleClick('chuzhi')"
      v-if="operateButtonList.some((item) => item === 'chuzhi')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="处置"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 自评 -->
    <div
      @click="handleClick('ziping')"
      v-if="operateButtonList.some((item) => item === 'ziping')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="自评"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 考核 -->
    <div
      @click="handleClick('kaohe')"
      v-if="operateButtonList.some((item) => item === 'kaohe')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="考核"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 下发 -->
    <div
      @click="handleClick('xiafa')"
      v-if="operateButtonList.some((item) => item === 'xiafa')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="下发"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 签订 -->
    <div
      @click="handleClick('qianding')"
      v-if="operateButtonList.some((item) => item === 'qianding')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="签订"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!--  评估 -->
    <div
      @click="handleClick('pinggu')"
      v-if="operateButtonList.some((item) => item === 'pinggu')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="评估"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 修改状态 -->
    <div
      @click="handleClick('xiugaizhuangtai')"
      v-if="operateButtonList.some((item) => item === 'xiugaizhuangtai')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="修改状态"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 查看单元 -->
    <div
      @click="handleClick('chakandanyuan')"
      v-if="operateButtonList.some((item) => item === 'chakandanyuan')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="查看单元"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 执行 -->
    <div
      @click="handleClick('zhixing')"
      v-if="operateButtonList.some((item) => item === 'zhixing')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="执行"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 检查记录 -->
    <div
      @click="handleClick('jianchajilu')"
      v-if="operateButtonList.some((item) => item === 'jianchajilu')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="检查记录"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 延期记录 -->
    <div
      @click="handleClick('yanqijilu')"
      v-if="operateButtonList.some((item) => item === 'yanqijilu')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="延期记录"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 查看审批 -->
    <div
      @click="handleClick('chakanshenpi')"
      v-if="operateButtonList.some((item) => item === 'chakanshenpi')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="查看审批"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-shenpi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!--隐患审核  -->
    <div
      @click="handleClick('yinhuanshenhe')"
      v-if="operateButtonList.some((item) => item === 'yinhuanshenhe')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="隐患审核"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 隐患整改 -->
    <div
      @click="handleClick('yinhuanzhenggai')"
      v-if="operateButtonList.some((item) => item === 'yinhuanzhenggai')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="隐患整改"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 隐患复查 -->
    <div
      @click="handleClick('fucha')"
      v-if="operateButtonList.some((item) => item === 'fucha')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="隐患复查"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 隐患验收 -->
    <div
      @click="handleClick('yanshou')"
      v-if="operateButtonList.some((item) => item === 'yanshou')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="隐患验收"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 奖励 -->
    <div
      @click="handleClick('jiangli')"
      v-if="operateButtonList.some((item) => item === 'jiangli')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="奖励"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 惩罚 -->
    <div
      @click="handleClick('chengfa')"
      v-if="operateButtonList.some((item) => item === 'chengfa')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="惩罚"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 识别 -->
    <div
      @click="handleClick('shibie')"
      v-if="operateButtonList.some((item) => item === 'shibie')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="识别"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #0894f1"></i>
      </el-tooltip>
    </div>
    <!-- 未识别 -->
    <div
      @click="handleClick('weishibie')"
      v-if="operateButtonList.some((item) => item === 'weishibie')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="未识别"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #ed4b4b"></i>
      </el-tooltip>
    </div>
    <!-- 投票 -->
    <div
      @click="handleClick('toupiao')"
      v-if="operateButtonList.some((item) => item === 'toupiao')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="投票"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="el-icon-collection" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 审批 -->
    <div
      @click="handleClick('shenpi')"
      v-if="operateButtonList.some((item) => item === 'shenpi')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="审批"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-shenpi" style="color: #0894f1"></i>
      </el-tooltip>
    </div>
    <!-- 作废 -->
    <div
      @click="handleClick('zuofei')"
      v-if="operateButtonList.some((item) => item === 'zuofei')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="作废"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-baofei" style="color: #ff4c1e"></i>
      </el-tooltip>
    </div>
    <!-- 添加审批人 -->
    <div
      @click="handleClick('tianjiashenpiren')"
      v-if="operateButtonList.some((item) => item === 'tianjiashenpiren')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="添加审批人"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-jiaoseguanli" style="color: #0894f1"></i>
      </el-tooltip>
    </div>
    <!-- 已关联隐患 -->
    <div
      @click="handleClick('yiguanlianyinhuan')"
      v-if="operateButtonList.some((item) => item === 'yiguanlianyinhuan')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="已关联隐患"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-jiaoseguanli" style="color: #0894f1"></i>
      </el-tooltip>
    </div>
    <!-- 维保 -->
    <div
      @click="handleClick('weibao')"
      v-if="operateButtonList.some((item) => item === 'weibao')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="维保"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-jiance" style="color: #0894f1"></i>
      </el-tooltip>
    </div>
    <!-- 维保记录 -->
    <div
      @click="handleClick('weibaojilu')"
      v-if="operateButtonList.some((item) => item === 'weibaojilu')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="维保记录"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-shijian" style="color: #0894f1"></i>
      </el-tooltip>
    </div>

    <!-- 查看凭证 -->
    <div
      @click="handleClick('pingzheng')"
      v-if="operateButtonList.some((item) => item === 'pingzheng')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="查看凭证"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-renyuanzhengjian" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 关联信息 -->
    <div
      @click="handleClick('guanlianxinxi')"
      v-if="operateButtonList.some((item) => item === 'guanlianxinxi')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="关联信息"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-a-lujing10096" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 复查 -->
    <div
      @click="handleClick('ccfucha')"
      v-if="operateButtonList.some((item) => item === 'ccfucha')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="新增演练整改"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-baoyang" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 新增演练评价 -->
    <div
      @click="handleClick('xinzengpingjia')"
      v-permission="'view'"
      v-if="operateButtonList.some((item) => item === 'xinzengpingjia')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="新增演练评价"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 查看演练评价 -->
    <div
      @click="handleClick('chakanpingjia')"
      v-permission="'view'"
      v-if="operateButtonList.some((item) => item === 'chakanpingjia')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="查看演练评价"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 上移 -->
    <div
      @click="handleClick('shangyi')"
      v-if="operateButtonList.some((item) => item === 'shangyi')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="上移"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
        <!-- <i class="iconfont icon-CZ_023" style="color: #3399FF"></i> -->
      </el-tooltip>
    </div>
    <!-- 下移 -->
    <div
      @click="handleClick('xiayi')"
      v-if="operateButtonList.some((item) => item === 'xiayi')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="查看演练评价"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-renyuanzhengjian" style="color: #4a80fc"></i>
        <!-- <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i> -->
        <!-- <i class="iconfont icon-CZ_021" style="color: #3399FF"></i> -->
      </el-tooltip>
    </div>
    <!-- 开始检查 -->
    <div
      @click="handleClick('ksjiancha')"
      v-if="operateButtonList.some((item) => item === 'ksjiancha')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="开始检查"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #12ce81"></i>
      </el-tooltip>
    </div>
    <!-- 应急响应 -->
    <div
      @click="handleClick('yjxiangying')"
      v-if="operateButtonList.some((item) => item === 'yjxiangying')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="应急响应"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #0894f1"></i>
      </el-tooltip>
    </div>
    <!-- 应急发布 -->
    <div
      @click="handleClick('fabu')"
      v-if="operateButtonList.some((item) => item === 'fabu')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="发布"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #52c41a"></i>
      </el-tooltip>
    </div>
    <!-- 分析 -->
    <div
      @click="handleClick('fenxi')"
      v-if="operateButtonList.some((item) => item === 'fenxi')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="分析"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-zhexiantu" style="color: #52c41a"></i>
      </el-tooltip>
    </div>
    <!-- 措施确认 -->
    <div
      @click="handleClick('cuoshiqueren')"
      v-if="operateButtonList.some((item) => item === 'cuoshiqueren')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="措施确认"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-qingdan" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 验收申请 -->
    <div
      @click="handleClick('yanshoushenqing')"
      v-if="operateButtonList.some((item) => item === 'yanshoushenqing')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="验收申请"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 验收 -->
    <div
      @click="handleClick('yanshou2')"
      v-if="operateButtonList.some((item) => item === 'yanshou2')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="验收"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-fujiaxinxi" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 巡检轨迹 -->
    <div
      @click="handleClick('xunjianguiji')"
      v-if="operateButtonList.some((item) => item === 'xunjianguiji')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="巡检轨迹"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-xunjianguiji" style="color: #4a80fc"></i>
      </el-tooltip>
    </div>
    <!-- 删除 -->
    <div
      @click="handleClick('shanchu')"
      v-if="operateButtonList.some((item) => item === 'shanchu')"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="删除"
        placement="top"
        popper-class="testtooltip"
      >
        <i class="iconfont icon-caozuo--shanchu" style="color: #ff4d4f"></i>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
// import { getAuthInfo } from "@/util/auth";
import config from "@/config/systemConfig";
export default {
  name: "operateButton",
  data() {
    return {
      config,
      // authInfo: getAuthInfo(this.$store.state.user.menu, this.$route.fullPath),
    };
  },
  computed: {
    operateButtonList() {
      /**
       * 如果是弹窗中的表格 因为路由唯一键在页面配置文件已经被list表格占用
       * 所以需要在组件上手动传入operateButtonList（按钮列表）进行配置按钮
       * 无多表格页面可以在页面文件pageconfig上进行配置
       **/
      if (this.$attrs.operateButtonList) {
        return this.$attrs.operateButtonList;
      } else {
        return this.$pageConfig(this.$route.path).operationButtons;
      }
    },
  },
  created() {},
  methods: {
    handleClick(type) {
      this.$emit("operateButtonClick", type);
    },
  },
};
</script>

<style scoped lang="scss">
.operateButton {
  display: flex;
  justify-content: space-around;
  div {
    width: 22px;
    height: 18px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 箭头(不起作用)
  /deep/ .testtooltip .el-tooltip__popper[x-placement^="top"] .popper__arrow {
    border-bottom-color: red !important;
  }
  // 箭头(不起作用)
  /deep/
    .testtooltip
    .el-tooltip__popper[x-placement^="top"]
    .popper__arrow:after {
    border-bottom-color: red !important;
  }
  // 内容(不起作用)
  .testtooltip {
    background: red !important;
    box-shadow: 1px 1px 10px 3px #d3d3d6;
  }
  div:hover {
    cursor: pointer;
  }
}
</style>
