<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-tab-task
          :tabButtonList="tabButtonList"
          @headerButtonMethods="headerButtonMethods"
          @setType="setType"
        ></header-tab-task>
        <patrol-shift-task-settings
          ref="patrolShiftTaskSettingsRef"
        ></patrol-shift-task-settings>
        <team-setting
          v-if="tabType === 0"
          @operateButtonClick="operateButtonClick"
        ></team-setting>
        <my-task-setting v-if="tabType === 1"></my-task-setting>
      </template>
    </list-container>
  </div>
</template>

<script>
import teamSetting from "@views/doubleprevention/riskclamancon/shifttasksettings/components/teamSetting";
import { reactive, ref, toRefs } from "@vue/composition-api";
import myTaskSetting from "@views/doubleprevention/riskclamancon/shifttasksettings/components/myTaskSetting";
import patrolShiftTaskSettings from "@views/doubleprevention/riskclamancon/shifttasksettings/components/patrolShiftTaskSettings";
import headerTabTask from "@views/doubleprevention/riskclamancon/components/headerTab/headerTab.vue";
import { handleTab } from "@views/doubleprevention/riskclamancon/components/headerTab/headerTab";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "shifttasksettings",
  components: {
    teamSetting,
    myTaskSetting,
    patrolShiftTaskSettings,
    headerTabTask,
  },
  setup() {
    const { tabType } = handleTab();
    const patrolShiftTaskSettingsRef = ref(null);
    const setType = (value) => {
      tabType.value = value;
    };
    const state = reactive({
      tabButtonList: [
        {
          title: "班次设置",
          searchData: {},
          searchItem: [
            {
              prop: "courseName",
              type: "Select",
              placeholder: "班次类型",
              disabled: false,
              width: "180px",
              children: [],
            },
          ],
        },
        {
          title: "我的任务",
          searchData: {},
          searchItem: [
            {
              prop: "courseName",
              type: "Select",
              placeholder: "班次类型",
              disabled: false,
              width: "180px",
              children: [],
            },

            {
              prop: "courseName",
              type: "Select",
              placeholder: "任务类型",
              disabled: false,
              width: "180px",
              children: [],
            },
            {
              prop: "courseName",
              type: "Input",
              placeholder: "班次名称",
              disabled: false,
              width: "180px",
            },
            {
              prop: "courseName",
              type: "Input",
              placeholder: "班次名称",
              disabled: false,
              width: "180px",
            },
            {
              prop: "courseName",
              type: "Input",
              placeholder: "检查人姓名",
              disabled: false,
              width: "180px",
            },
            {
              prop: "courseName",
              type: "Input",
              placeholder: "巡检点名称",
              disabled: false,
              width: "180px",
            },
          ],
        },
      ],
    });

    const headerButtonMethods = (type) => {
      console.log(type, "type");
    };
    const operateButtonClick = ({ type, row }) => {
      if (type === "chakan") {
        patrolShiftTaskSettingsRef.value.openMethods(row, () => {
          patrolShiftTaskSettingsRef.value.rowData = row;
        });
      } else if (type === "bianji") {
        patrolShiftTaskSettingsRef.value.openMethods(row, () => {
          patrolShiftTaskSettingsRef.value.rowData = row;
        });
      } else if (type === "shanchu") {
        console.log(type);
      }
    };
    return {
      ...toRefs(state),
      headerButtonMethods,
      patrolShiftTaskSettingsRef,
      operateButtonClick,
      tabType,
      setType,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  padding: 10px 0;
}

.header-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
