<template>
  <div id=""></div>
</template>
<script>
import { mapGetters } from "vuex";
import { systemConfigAPI } from "@/api/system/config";
import { getUserType } from "@/util/auth";
import { setSystemConfigInfo, getSystemConfigInfo } from "@/util/auth";
export default {
  data() {
    return {};
  },
  created() {
    this.getSysConfig().then(() => {
      this.loginIn();
    });
  },
  computed: {
    ...mapGetters(["tagWel"]),
  },
  methods: {
    async getSysConfig() {
      const res = await systemConfigAPI();
      if (res.code === 200) {
        let params = {
          bgPic1: res.data.bgPic1.url,
          bgPic2: res.data.bgPic2.url,
          logo: res.data.logo.url,
          sysName: res.data.sysName,
          copyright: res.data.copyright,
          treeConfigs: res.data.treeConfigs,
          appId: res.data.appId,
        };
        this.sysconfig = params;
        setSystemConfigInfo(JSON.stringify(params));
      }
    },
    loginIn() {
      this.$store
        .dispatch("LoginByUsername", { ...this.$route.query })
        .then(() => {
          this.$store.dispatch("getCurrentUserInfo").then(() => {
            console.log(
              `当前登录角色为${getUserType()}是${
                getUserType() === 2 ? "企业端" : "非企业端"
              }`
            );
            // 1是政府 2是企业
            if (getUserType() == 1 || getUserType() == 0) {
              this.$router.push({ path: "/bigData" });
            } else if (getUserType() == 2) {
              this.$router.push({ path: this.tagWel.value });
            } else if (getUserType() == 3) {
              this.$router.push({ path: this.tagWel.value });
            } else if (getUserType() == 4) {
              this.$router.push({ path: this.tagWel.value });
            }
            // this.$router.push({ path: "/bigData" });
          });
        });
    },
  },
};
</script>

<style scoped lang='scss'>
</style>