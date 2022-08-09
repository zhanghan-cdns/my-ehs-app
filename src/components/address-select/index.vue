<template>
  <el-cascader
    ref="adRef"
    :props="adProps"
    v-model="ad"
    :options="adOptions"
    filterable
    style="width: 97%"
    :show-all-levels="true"
    clearable
    size="small"
    @change="selectChagne"
  ></el-cascader>
</template>

<script>
import { addressListAPI } from "@/api/tool/address";

export default {
  name: "address-select",

  data() {
    return {
      ad: [],
      adProps: {
        lazy: true,
        label: "name",
        value: "code",
        checkStrictly: true,
        lazyLoad(node, resolve) {
          if (node.level === 0) {
            return resolve([]);
          }
          addressListAPI({
            parentCode: node.value,
          }).then((res) => {
            let data = res.data.map((item) => {
              if (Number(item.childNum) > 0) {
                return item;
              } else {
                return {
                  ...item,
                  leaf: item.code,
                };
              }
            });
            resolve(data);
          });
        },
      },
      adOptions: [],
    };
  },
  created() {
    this.getAddressInfo();
  },

  methods: {
    // 获取注册地址下拉网格
    async getAddressInfo() {
      const res = await addressListAPI({
        parentCode: 100000,
      });
      if (res && res.code === 200) {
        this.adOptions = res.data;
      }
    },

    selectChagne(val) {
      console.log(val, "selectval");
      if (this.ad.length > 0) {
        let adArr = this.$refs.adRef.getCheckedNodes()[0].pathLabels; // 获取选中地址label
        console.log(this.ad, "val", adArr.toString(), "adArr");
        this.$emit("selectAddress", adArr.toString(), this.ad.toString());
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>