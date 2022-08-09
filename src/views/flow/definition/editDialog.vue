<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="90%"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="container">
          <bpmn-modeler
            ref="refNode"
            :xml="xml"
            :users="users"
            :groups="groups"
            :categorys="categorys"
            :is-view="false"
            @save="save"
            @showXML="showXML"
            @dataType="dataType"
          />
          <!--在线查看xml-->
          <el-dialog
            show-close
            :title="xmlTitle"
            :visible.sync="xmlOpen"
            width="60%"
            :modal-append-to-body="false"
            append-to-body
          >
            <div>
              <pre v-highlight>
                <code class="xml">
                      {{xmlContent}}
                </code>
              </pre>
            </div>
          </el-dialog>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import { fastGetDictAPI } from "@/api/system/dictionary.js";
import {
  readXml,
  roleList,
  saveXml,
  userList,
} from "@/api/flowable/definition";
import bpmnModeler from "@/components/Process/index";
import vkbeautify from "vkbeautify";
import Hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default {
  components: {
    bpmnModeler,
    vkbeautify,
  },
  // 自定义指令
  directives: {
    highlight: (el) => {
      let blocks = el.querySelectorAll("pre code");
      blocks.forEach((block) => {
        Hljs.highlightBlock(block);
      });
    },
  },
  data() {
    return {
      type: "add",
      openEdit: false,
      xml: "", // 后端查询到的xml
      modeler: "",
      xmlOpen: false,
      xmlTitle: "",
      xmlContent: "",
      users: [],
      groups: [],
      categorys: [],
    };
  },
  props: {
    title: {
      type: String,
      default: "流程定义编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {
    fastGetDictAPI("SYS_PROCESS_CATEGORY").then((res) => {
      this.categorys = res.data;
      console.log(this.categorys,'this.categorys')
    });
  },
  methods: {
    open(row) {
      this.openEdit = true;
      if (row && row.deploymentId) {
        this.type = "edit";
        this.getModelDetail(row.deploymentId); // 查询流程xml
      }
      this.getDataList();
    },
    close() {
      this.openEdit = false;
    },
    /** xml 文件 */
    getModelDetail(deployId) {
      // 发送请求，获取xml
      readXml(deployId).then((res) => {
        this.xml = res.data;
        this.modeler = res.data;
      });
    },
    /** 保存xml */
    save(data) {
      const params = {
        name: data.process.name,
        category: data.process.category,
        xml: data.xml,
      };
      saveXml(params).then((res) => {
        this.$message.success("保存成功!");
        this.$emit("refreshDataList");
        this.close();
      });
    },
    /** 指定流程办理人员列表 */
    getDataList() {
      // todo 待根据部门选择人员
      userList().then((res) => {
        res.data.forEach((val) => {
          val.userId = val.id;
        });
        this.users = res.data;
        let arr = { nickName: "流程发起人", userId: "${INITIATOR}" };
        this.users.push(arr);
      });
      roleList().then((res) => {
        res.data.forEach((val) => {
          val.roleId = val.id;
        });
        this.groups = res.data;
      });
    },
    /** 展示xml */
    showXML(data) {
      this.xmlTitle = "xml查看";
      this.xmlOpen = true;
      this.xmlContent = vkbeautify.xml(data);
    },
    /** 获取数据类型 */
    dataType(data) {
      this.users = [];
      this.groups = [];
      if (data) {
        // 指定方式：动态
        if (data.dataType === "dynamic") {
          this.users = [
            { nickName: "#{INITIATOR}", userId: "#{INITIATOR}" },
            { nickName: "#{approval01}", userId: "#{approval01}" },
            { nickName: "#{approval02}", userId: "#{approval02}" },
            { nickName: "#{approval03}", userId: "#{approval03}" },
            { nickName: "#{approval04}", userId: "#{approval04}" },
            { nickName: "#{approval05}", userId: "#{approval05}" },
            { nickName: "#{approval06}", userId: "#{approval06}" },
            { nickName: "#{approval07}", userId: "#{approval07}" },
            { nickName: "#{approval08}", userId: "#{approval08}" },
            { nickName: "#{approval09}", userId: "#{approval09}" },
            { nickName: "#{approval10}", userId: "#{approval10}" },
            { nickName: "#{approval11}", userId: "#{approval11}" },
            { nickName: "#{approval12}", userId: "#{approval12}" },
            { nickName: "#{approval13}", userId: "#{approval13}" },
            { nickName: "#{approval14}", userId: "#{approval14}" },
            { nickName: "#{approval15}", userId: "#{approval15}" },
            { nickName: "#{approval16}", userId: "#{approval16}" },
            { nickName: "#{approval17}", userId: "#{approval17}" },
            { nickName: "#{approval18}", userId: "#{approval18}" },
            { nickName: "#{approval19}", userId: "#{approval19}" },
            { nickName: "#{approval20}", userId: "#{approval20}" },
          ];
          this.groups = [
            { roleName: "#{approval01}", roleId: "#{approval01}" },
            { roleName: "#{approval02}", roleId: "#{approval02}" },
            { roleName: "#{approval03}", roleId: "#{approval03}" },
            { roleName: "#{approval04}", roleId: "#{approval04}" },
            { roleName: "#{approval05}", roleId: "#{approval05}" },
            { roleName: "#{approval06}", roleId: "#{approval06}" },
            { roleName: "#{approval07}", roleId: "#{approval07}" },
            { roleName: "#{approval08}", roleId: "#{approval08}" },
            { roleName: "#{approval09}", roleId: "#{approval09}" },
            { roleName: "#{approval10}", roleId: "#{approval10}" },
            { roleName: "#{approval11}", roleId: "#{approval11}" },
            { roleName: "#{approval12}", roleId: "#{approval12}" },
            { roleName: "#{approval13}", roleId: "#{approval13}" },
            { roleName: "#{approval14}", roleId: "#{approval14}" },
            { roleName: "#{approval15}", roleId: "#{approval15}" },
            { roleName: "#{approval16}", roleId: "#{approval16}" },
            { roleName: "#{approval17}", roleId: "#{approval17}" },
            { roleName: "#{approval18}", roleId: "#{approval18}" },
            { roleName: "#{approval19}", roleId: "#{approval19}" },
            { roleName: "#{approval20}", roleId: "#{approval20}" },
          ];
          // if (data.userType === 'assignee') {  // 人员类型：指定人员
          //   this.users = []
          // } else if (data.userType === 'candidateUsers') {   // 人员类型：候选人员
          //   this.users = [ {nickName: "#{approval}", userId: "#{approval}"}]
          // } else {    // 人员类型：候选组
          //   this.groups = [{roleName: "#{approval}", roleId: "#{approval}"}]
          // }
        } else {
          // 指定方式：固定
          this.getDataList();
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}
.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>
