import Vue from "vue";
// dom元素动态尺寸监听器
import domSizeListen from '@/components/dom-size-listen';
// table表格组件
import renderTable from '@/components/render-table/index';
// 分页组件
import renderPagenation from '@/components/render-pagenation/index';
// 上传组件
import renderUpload from '@/components/render-upload/index';
import basicBlock from '@/components/basic-block/main';
// 基础容器组件
import basicContainer from '@/components/basic-container/main';
// 列表容器容器
import listContainer from '@/components/list-page-container/index.vue'
// 第三方注册
import thirdRegister from '@/components/third-register/main';
// 头部按钮组件
import headerButton from '@/components/header-button'
// 头部搜索
import headerSearch from '@/components/header-search/';
// 操作列按钮组件
import operateButton from '@/components/operate-button'
// svg组件
import svgIcon from '@/components/svg-icon/index.vue'
// 弹窗组件
import basicDialog from "@/components/basic-dialog/index.vue";
// 弹窗内容头部组件
import dialogHeader from '@/components/basic-dialog/dialogHeader'
// 搜索树
import SearchTree from "@/components/search-tree/index";
//导入面板
import exportDialog from "@/components/export-dialog/exportDialog.vue";
// 锚点定位
import anchorRoll from '@/components/basic-dialog/anchorRoll'
// 基础分页
import basicPager from '@/components/basic-pager'
// 上传
import basicUpload from "@/components/basic-upload";
// 地图定位
import locationSelection from "@/components/location-selection";
// 收缩按钮
import CollapseSpan from "@/components/search-tree/collapseSwitch.vue";
// 左侧字典序列表
import dictionariesList from "@/components/dictionaries-list/index.vue";
// echarts
import basicCharts from '@/components/basic-charts/index.vue'
// pdf
import renderPdf from '@/components/render-pdf'
// 视频
import renderVideo from '@/components/render-video'
// 附件回显
import basicEnclosure from '@/components/basic-enclosure'
// 字典
import DictSelect from '@/components/basic-dict'
//水平收缩组件
import HorizontalContraction from "@/components/horizontal-contraction";
// 地址选择
import addressSelect from "@/components/address-select";
//通用审批流程
import basicApproval from '@/components/basic-approval';
//富文本组件
import basicEditor from '@/components/basic-editor';
// 步骤条
import commonSteps from "@/components/common-steps"
// 选择按钮
import buttonSelect from "@/components/button-select"
// 删除按钮
import buttonDelete from "@/components/button-delete"
//docx预览
import renderDocx from '@/components/render-docx';
// 签字组件
import signDialog from "@/components/sign-dialog";
// 表单上传图片组件
import uploadPhotos from "@/components/upload-photos";
const components = [
  basicEnclosure,
  CollapseSpan,
  domSizeListen,
  renderPagenation,
  renderTable,
  basicContainer,
  renderUpload,
  listContainer,
  headerButton,
  headerSearch,
  operateButton,
  basicBlock,
  thirdRegister,
  svgIcon,
  basicDialog,
  dialogHeader,
  SearchTree,
  exportDialog,
  anchorRoll,
  basicPager,
  basicUpload,
  locationSelection,
  dictionariesList,
  basicCharts,
  renderPdf,
  renderVideo,
  DictSelect,
  HorizontalContraction,
  addressSelect,
  basicApproval,
  basicEditor,
  commonSteps,
  buttonSelect,
  buttonDelete,
  renderDocx,
  signDialog,
  uploadPhotos
]
components.forEach(component => {
  Vue.component(component.name, component);
});
// 引入svg执行上下文环境
import '@/components/svg-icon/svgIcon.js'
