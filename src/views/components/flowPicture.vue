<template>
  <basic-dialog
    :openFlag="openEdit"
    height="85%"
    icon="13"
    title="执行"
    v-bind="$attrs"
    width="1350px"
    @close="close"
  >
    <template #content>
      <bpmn-modeler
        ref="refNode"
        :categorys="categorys"
        :groups="groups"
        :is-view="false"
        :users="users"
        :xml="xml"
        @dataType="dataType"
        @save="save"
        @showXML="showXML"
      />
      <!--在线查看xml-->
      <el-dialog :modal-append-to-body="false" :title="xmlTitle" :visible.sync="xmlOpen" append-to-body show-close
                 width="60%">
        <div>
              <pre v-highlight>
                <code class="xml">
                      {{ xmlContent }}
                </code>
              </pre>
        </div>
      </el-dialog>
    </template>
  </basic-dialog>
</template>

<script>
import bpmnModeler from '@/components/Process'
import vkbeautify from "vkbeautify";
import 'highlight.js/styles/atom-one-dark.css'

export default {
  components: {
    bpmnModeler,
    vkbeautify
  },
  name: "flowPicture",
  data() {
    return {
      type: 'add',
      openEdit: false,
      xml: "", // 后端查询到的xml
      modeler: "",
      xmlOpen: false,
      xmlTitle: '',
      xmlContent: '',
      users: [],
      groups: [],
      categorys: [],
    }
  },
  methods: {
    open(row) {
      this.openEdit = true
    },
    close() {
      this.openEdit = false
    }
  }
}
</script>

<style scoped>

</style>
