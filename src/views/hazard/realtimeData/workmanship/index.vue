<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <top-tab>
          <template #list>
            <list></list>
          </template>
          <template #graph>
            <graph></graph>
          </template>
        </top-tab>
      </template>
    </list-container>
  </div>
</template>

<script>
import topTab from "../components/topTab.vue";
import list from "./components/list.vue";
import graph from "./components/graph.vue";

export default {
  components: {
    topTab,
    list,
    graph,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>