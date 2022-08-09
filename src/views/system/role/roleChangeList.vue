<script src="../../../router/router.js"></script>
<template>
  <div class="left-role-list">
    <div class="content-wrapper" style="padding: 0 10px;">
      <div class="title">
        <span class="title-icon"></span>角色名称
      </div>
      <ul class="role-list">
        <li
          v-for="item in roleList"
          :key="item.id"
          :class="active===item.id?'role-active':''"
          @click="handleRoleClick(item)">{{ item.roleName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from "@vue/composition-api/dist/vue-composition-api";
import {roleListAPI} from "@/api/system/role";

export default {
  name: "roleChangeList",
  setup(props, {emit,root}) {
    const active = ref(root._route.query.id)
    const state = reactive({
      roleList:[]
    })
    const getRoleList = async () => {
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 1000,
      };
      const res = await roleListAPI(params);
      if (res.code === 200) {
        state.roleList = res.data.content
      }
    }
    getRoleList()
    const handleRoleClick = (item) => {
      emit("handleRoleClick", item)
    }
    return {
      handleRoleClick,
      active,
      getRoleList,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.left-role-list {
  width: 100%;
  height: 100%;
  //background: pink;
  box-sizing: border-box;
  padding-right: 5px;

  .content-wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
    box-sizing: border-box;

    .title {
      padding: 10px 15px;
      font-size: 16px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: bold;
      color: #161616;

      .title-icon {
        padding: 2px;
        background: #597EF7;
        margin-right: 10px;
      }
    }

    .role-list {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin: 10px 0;
        padding: 10px 10px 10px 60px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN,serif;
        color: #161616;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none;
      }

      .role-active {
        border: 1px solid #597EF7;
        border-radius: 4px;
        background: #F0F5FF;
        color: #4A80FC;
      }
    }


  }
}
</style>
