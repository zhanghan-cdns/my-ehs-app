import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import './cache'; //页面缓存
import store from './store';
import {
  loadStyle
} from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
// import {
//   iconfontUrl,
//   iconfontVersion
// } from '@/config/env';
import i18n from './lang'; // Internationalization

import 'mars3d/dist/mars3d.css'
import * as mars3d from 'mars3d'
Vue.prototype.mars3d = mars3d
Vue.prototype.Cesium = mars3d.Cesium

import avueUeditor from 'avue-plugin-ueditor';
import website from '@/config/website';
import pageConfig from '@/config/pageConfig/index'
// // 加载本地阿里图标库
import
  '@/assets/icon/iconfont.css'
import
  '@/assets/icon/iconfont.js'
// 动态加载阿里云字体库（正式上线开放）
// iconfontVersion.forEach(ele => {
//   loadStyle(iconfontUrl.replace('$key', ele));
// });
import '../public/style/animate.css'
//vxe-table引入
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import dayjs from 'dayjs'
import '@/mock/index'
import lodash from 'lodash'
// 组件公共样式
import './styles/common.scss';
import './styles/components.scss'
//引入echarts
import * as echarts from 'echarts';
//引入权限指令
import {
  permission
} from '@/directives/permission'
Vue.config.devtools = true
// 注册vxe-table
Vue.use(VXETable)
VXETable.use(VXETablePluginElement)
import VueHighlightJS from 'vue-highlight.js'
import 'vue-highlight.js/lib/allLanguages'
import 'highlight.js/styles/idea.css'
Vue.use(VueHighlightJS)
//swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);
// 全局混入
import commonMinxin from '@/mixins/common.js'
//引入视频插件
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
const hls = require('videojs-contrib-hls') // 兼容.m3u8格式的视频
Vue.use(hls)
Vue.use(VideoPlayer)
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
Vue.mixin(commonMinxin);
// 注册全局crud驱动
// window.$crudCommon = crudCommon;
// 加载Vue拓展
Vue.use(router);
Vue.use(VueAxios, axios);
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
// 电子签名插件
import vueEsign from 'vue-esign'
Vue.use(vueEsign)


// 时间总线
Vue.prototype.$EventBus = new Vue()

Vue.use(window.AVUE, {
  size: 'small',
  tableSize: 'small',
  calcHeight: 65,
  i18n: (key, value) => i18n.t(key, value)
});
// 挂载组件
// Vue.use(Vant);
// 注册全局容器
import '@/components/global-components'
Vue.component('avueUeditor', avueUeditor);
//引入excel导出插件
// import JsonExcel from 'vue-json-excel'
// Vue.component('downloadExcel', JsonExcel)

// 注册权限指令
Vue.directive('permission', permission)
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
});
// 加载website
Vue.prototype.website = website;
// 加载页面配置
Vue.prototype.$pageConfig = (path) => {
  let newPath = path.replace('/index', '')
  return pageConfig[newPath]
}
// 挂载原型
Vue.prototype.$dayjs = dayjs
Vue.prototype._ = lodash
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
export default vue
