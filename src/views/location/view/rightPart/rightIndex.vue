<template>
  <div >
    <search-index :serchIconList="serchIconList"></search-index>
  </div>
</template>

<script>
import SearchIndex from "./searchIndex.vue";
export default {
  name: "rightIndex",
  components:{
    SearchIndex,
  },
  data() {
      return {
        serchIconList: [
        {
            // 1
            name: "电子围栏",
            id: "1",
            description: "",
            icon: "/img/rydw/dzwl_icon.png",
            actived: true, //是否是激活状态
        },
        {
            // 2
            name: "风险分区",
            id: "2",
            description: "",
            icon: "/img/rydw/fxfq_icon.png",
            actived: true, //是否是激活状态
        },
        {
            // 3
            name: "人员定位",
            id: "3",
            description: "",
            icon: "/img/rydw/rydw_icon.png",
            actived: true, //是否是激活状态
        },
        ]
      }

  },
};
</script>

<style lang="scss" scoped></style>
