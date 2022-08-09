<template>
  <div class="swiper_wrap">
    <div class="top-menu-prev">
      <i class="el-icon-caret-left"></i>
    </div>
    <swiper
      ref="mySwiper"
      :options="swiperOption"
      style="width: 95%; height: 100%"
    >
      <swiper-slide
        v-for="item in menuData"
        :key="item.id"
        @click.native="selectTopMenu(item.id)"
      >
        <div
          :style="menuActive === item.id ? 'background:#2D8CF0' : ''"
          class="top-menu-item"
        >
          <div
            class="top-menu"
          >
            <i
              :class="item.icon ? item.icon : 'icon-caidan'"
              class="iconfont"
            ></i>
          </div>
          <div>
            {{ item.name }}
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="top-menu-next">
      <i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {searchTreeParentId} from "@/util";

export default {
  name: "headerMenu",
  inject: ["index"],
  computed: mapGetters([
    "menu"
  ]),

  data() {
    return {
      // swiper配置
      swiperOption: {
        slidesPerView: 8,
        grid: {
          fill: "column",
          rows: 2,
        },
        // loop: true,
        navigation: {
          nextEl: ".top-menu-next",
          prevEl: ".top-menu-prev",
        },
      },
      menuActive: "",
      menuData:[]
    }
  },
  mounted() {
    this.$EventBus.$on("initMenu",()=>{
      this.initMenu()
    });
  },
  methods: {
    //初始化顶级菜单
    initMenu() {
      // 传入菜单
      this.menuData = this.menu || this.menuData
      // 获取缓存的topMenuId
      let cacheMenuId = window.sessionStorage.getItem("topMenuId")
      this.menuActive = (cacheMenuId ? cacheMenuId : this.menuData[0] && this.menuData[0].id) || ""
      this.selectTopMenu( this.menuActive)
    },
    // 点击选择
    selectTopMenu(menuId) {
      this.menuActive = menuId;
      window.sessionStorage.setItem("topMenuId", menuId);
      let menus = searchTreeParentId(this.menuData, menuId);
      if (Array.isArray(menus) && menus.length > 0) this.index.getcurrentMenu(menus[0].children)
    },
  }
}
</script>

<style lang="scss" scoped>
.swiper_wrap {
  height: 40px;
  background: #214e8f;
  border-top: 1px solid #1e55a7;
  border-bottom: 1px solid #02265b;
  display: flex;
  justify-content: space-between;

  .top-menu-prev, .top-menu-next {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
  }

  .top-menu-item {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 23px;
    line-height: 43px;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    padding: 0 20px;
    color: #fff;
    font-weight: bold;
    box-shadow: 3px 0px 6px 1px rgba(0, 0, 0, 0.16);
    //background: #103A7D;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #305a97;
    white-space: nowrap;
    user-select: none;

    .top-menu {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
    }
  }
}

/deep/ .swiper-slide {
  display: flex;
  align-items: center;
  // width: 170px!important;
}
</style>
