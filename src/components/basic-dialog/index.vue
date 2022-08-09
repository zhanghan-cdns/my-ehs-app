<template>
  <vxe-modal
    v-model="openFlag"
    :id="dialogId"
    :width="width"
    :height="height"
    show-zoom
    remember
    storage
    className="common_dialog"
    @close="close"
    :showFooter="showFooter"
    esc-closable
  >
    <template #title>
      <i class="iconfont" :class="icon"></i>
      <span style="margin-left: 10px">{{ title }}</span>
    </template>
    <template #default>
      <dialog-header v-bind="$attrs"></dialog-header>
      <slot name="content"></slot>
    </template>
    <template #footer>
      <slot name="bottom"></slot>
    </template>
  </vxe-modal>
</template>
<script>
import { getUuid } from "@/util/index";
export default {
  name: "basicDialog",
  props: {
    // 开关
    // openFlag:{
    //   type:Boolean,
    //   default:false,
    //   require:true
    // },
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 头部图标
    icon: {
      type: String,
      default: "",
    },
    // 宽度
    width: {
      type: Number,
      default: 724,
    },
    // 高度
    height: {
      type: Number,
      default: 570,
    },
    // 是否显示尾部
    showFooter: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    openFlag() {
      return this.$attrs.openFlag;
    },
    dialogId(){
      return this.$route.fullPath + getUuid()
    }
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
  },
};
</script>

<style scoped lang='scss'>
.common_dialog {
  z-index: 2001 !important;
}
/deep/ .vxe-modal--header {
  background: #3c81e6;
  color: #fff;
}
/deep/ .vxe-modal--box {
  border: none !important;
}
/deep/ .vxe-modal--footer {
  text-align: center;
}
</style>