<template>
  <div class="choosePersonDialog">
    <basic-dialog
      :openFlag="openEdit"
      :title="title"
      height="98%"
      icon="icon-bianji"
      v-bind="$attrs"
      width="1000px"
      @close="close"
    >
      <template #content>
        <div class="content">
          <div class="left">
            <ul>
              <li v-for="item  in  tabs"
                  :key="item.refName"
                  :class="item.refName===active?'tab-active':''"
                  @click="handleTab(item.refName)">
                <div style="margin-right: 10px"><i :class="item.icon" class="iconfont"></i></div>
                <div>{{ item.title }}</div>
              </li>
            </ul>
          </div>
          <div class="right">
            <div class="header">
              <el-steps :active="1" :space="330" finish-status="success" style="width: 100%">
                <el-step title="新增隐患"></el-step>
                <el-step title="隐患审核"></el-step>
                <el-step title="隐患整改"></el-step>
                <el-step title="隐患复查"></el-step>
                <el-step title="隐患验收"></el-step>
              </el-steps>
            </div>
            <div
              style="overflow: auto;flex: 1"
              class="scroll-content"
            >
              <el-form
                ref="ruleForm"
                :model="form"
                :rules="rules"
                :size="size"
                class="demo-ruleForm"
                label-width="140px"

              >
                <!-- 隐患信息 -->
                <div
                  :ref="tabs[0].refName"
                  class="scroll-item"
                  style="padding-top: 1rem"
                >
                  <div class="title">
                    <svg-icon
                      icon-class="yinhuan"
                      style="width: 20px; height: 20px; margin-right: 10px"
                    ></svg-icon>
                    <div>{{tabs[0].title}}</div>
                  </div>
                  <div>
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="整改标题" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入整改标题"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="整改单编号"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入整改单编号"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="隐患来源" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入隐患来源"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="隐患发现时间"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入隐患发现时间"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="检查人员" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入检查人员"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="检查单位"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入检查单位"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item
                          label="外来检查人员"
                          prop="correctTheTitle"
                        >
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入外来检查人员"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="隐患级别" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入隐患级别"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="隐患因素"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入隐患因素"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="24">
                        <el-form-item label="隐患描述" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入隐患描述"
                                                 style="width: 98.5%"

                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item
                          class="is-required"
                          label="计划整改完成时间"
                          prop="rectifyDate"
                        >
                          <el-date-picker
                            v-model="form.rectifyDate"
                            format="yyyy-MM-dd"
                            placeholder="请选择计划整改完成时间"
                            style="width: 220px"
                            type="date"
                            value-format="yyyy-MM-dd"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="整改责任人"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入整改责任人"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item
                          label="整改责任单位"
                          prop="correctTheTitle"
                        >
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入整改责任单位"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="整改责任单位负责人"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入整改责任单位负责人"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="验收人" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入验收人"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="隐患类型" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入隐患类型"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="整改方式"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入整改方式"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="违章人数" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入违章人数"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="检查来源分类"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入检查来源分类"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="发生环节" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入发生环节"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item
                          label="是否重复整改"
                          prop="correctionOrderNumber"
                        >
                          <el-input
                            v-model="form.correctionOrderNumber"
                            clearable
                            disabled
                            placeholder="请输入是否重复整改"
                            style="width: 220px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="24">
                        <el-form-item label="隐患位置" prop="correctTheTitle">
                          <el-input
                            v-model="form.correctTheTitle"
                            clearable
                            placeholder="请输入隐患位置"
                            style="width: 98.5%"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="21">
                        <el-form-item label="隐患照片">
                          <basic-upload
                            key="picture"
                            :mode="false"
                            :photos="form.attachment"
                            @onRemove="(fileList)=>onRemove(fileList,'attachment')"
                            @onSuccess="(fileList)=>onSuccess(fileList,'attachment')"
                          ></basic-upload>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="24">
                        <el-form-item
                          class="is-required"
                          label="隐患描述"
                          prop="hazardDescription"
                        >
                          <el-input
                            v-model="form.hazardDescription"
                            clearable
                            placeholder="请输入隐患描述"
                            style="width: 98.5%"
                            type="textarea"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="24">
                        <el-form-item
                          class="is-required"
                          label="原因分析/法规依据"
                          prop="hazardDescription"
                        >
                          <el-input
                            v-model="form.hazardDescription"
                            clearable
                            placeholder="请输入原因分析/法规依据"
                            style="width: 98.5%"
                            type="textarea"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="24">
                        <el-form-item
                          class="is-required"
                          label="控制措施"
                          prop="hazardDescription"
                        >
                          <el-input
                            v-model="form.hazardDescription"
                            clearable
                            placeholder="请输入控制措施"
                            style="width: 98.5%"
                            type="textarea"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <!-- 隐患整改 -->
                <div
                  :ref="tabs[1].refName"
                  class="scroll-item"
                  style="padding-top: 1rem"
                >
                  <div class="title">
                    <svg-icon
                      icon-class="整改通知单 "
                      style="width: 20px; height: 20px; margin-right: 10px"
                    ></svg-icon>
                    <div>{{tabs[1].title}}</div>
                  </div>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="整改人" prop="correctTheTitle">
                        <el-input
                          v-model="form.correctTheTitle"
                          clearable
                          placeholder="请输入整改人"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item
                        class="is-required"
                        label="整改时间"
                        prop="rectifyDate"
                      >
                        <el-date-picker
                          v-model="form.rectifyDate"
                          format="yyyy-MM-dd"
                          placeholder="请选择整改时间"
                          style="width: 220px"
                          type="date"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item
                        label="整改费用（元）"
                        prop="correctionOrderNumber"
                      >
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入整改费用（元）"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="21">
                      <el-form-item label="隐患照片">
                        <basic-upload
                          key="picture"
                          :photos="form.attachment"
                          @onRemove="(fileList)=>onRemove(fileList,'attachment')"
                          @onSuccess="(fileList)=>onSuccess(fileList,'attachment')"
                        ></basic-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="控制措施" prop="correctTheTitle">
                        <el-input
                          v-model="form.correctTheTitle"
                          clearable
                          placeholder="请输入控制措施"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <!-- 隐患复查 -->
                <div
                  :ref="tabs[2].refName"
                  class="scroll-item"
                  style="padding-top: 1rem; top: 5px"
                >
                  <div class="title">
                    <svg-icon
                      icon-class="fuchaxinxi"
                      style="width: 20px; height: 20px; margin-right: 10px"
                    ></svg-icon>
                    <div>{{tabs[2].title}}</div>
                  </div>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="复查人" prop="correctionOrderNumber">
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入复查人"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item
                        class="is-required"
                        label="复查时间"
                        prop="rectifyDate"
                      >
                        <el-date-picker
                          v-model="form.rectifyDate"
                          format="yyyy-MM-dd"
                          placeholder="请选择复查时间"
                          style="width: 220px"
                          type="date"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="复查结果" prop="correctTheTitle">
                        <el-input
                          v-model="form.correctTheTitle"
                          clearable
                          placeholder="请输入复查结果"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="24">
                      <el-form-item label="复查描述" prop="correctTheTitle">
                        <el-input
                          v-model="form.correctTheTitle"
                          clearable
                          placeholder="请输入复查描述"
                          style="width: 98.5%"

                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="21">
                      <el-form-item label="隐患照片">
                        <basic-upload
                          key="picture"
                          :photos="form.attachment"
                          @onRemove="(fileList)=>onRemove(fileList,'attachment')"
                          @onSuccess="(fileList)=>onSuccess(fileList,'attachment')"
                        ></basic-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <!-- 审批信息 -->
                <div
                  :ref="tabs[3].refName"
                  class="scroll-item"
                  style="padding-top: 1rem; top: 5px;"
                >
                  <div class="title">
                    <svg-icon
                      icon-class="shenhe2"
                      style="width: 20px; height: 20px; margin-right: 10px"
                    ></svg-icon>
                    <div>{{tabs[3].title}}</div>
                  </div>
                  <el-row>
                    <el-col span="12">
                      <el-form-item
                        label="下步审批参与人"
                        prop="correctionOrderNumber"
                      >
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入下步审批参与人"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item
                        class="is-required"
                        label="确认时间"
                        prop="rectifyDate"
                      >
                        <el-date-picker
                          v-model="form.rectifyDate"
                          format="yyyy-MM-dd"
                          placeholder="请选择确认时间"
                          style="width: 220px"
                          type="date"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item
                        label="隐患提交人"
                        prop="correctionOrderNumber"
                      >
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入隐患提交人"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item
                        class="is-required"
                        label="确认时间"
                        prop="rectifyDate"
                      >
                        <el-date-picker
                          v-model="form.rectifyDate"
                          format="yyyy-MM-dd"
                          placeholder="请选择确认时间"
                          style="width: 220px"
                          type="date"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item
                        label="隐患审核人"
                        prop="correctionOrderNumber"
                      >
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入隐患审核人"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="整改人" prop="correctionOrderNumber">
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入整改人"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item
                        class="is-required"
                        label="确认时间"
                        prop="rectifyDate"
                      >
                        <el-date-picker
                          v-model="form.rectifyDate"
                          format="yyyy-MM-dd"
                          placeholder="请选择确认时间"
                          style="width: 220px"
                          type="date"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="24">
                      <el-form-item label="描述" prop="correctionOrderNumber">
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入描述"
                          style="width: 98.5%"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="21">
                      <el-form-item label="整改照片">
                        <basic-upload
                          key="picture"
                          :photos="form.attachment"
                          @onRemove="(fileList)=>onRemove(fileList,'attachment')"
                          @onSuccess="(fileList)=>onSuccess(fileList,'attachment')"
                        ></basic-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="复查人" prop="correctionOrderNumber">
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入复查人"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item
                        class="is-required"
                        label="确认时间"
                        prop="rectifyDate"
                      >
                        <el-date-picker
                          v-model="form.rectifyDate"
                          format="yyyy-MM-dd"
                          placeholder="请选择确认时间"
                          style="width: 220px"
                          type="date"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="复查结果" prop="correctTheTitle">
                        <el-input
                          v-model="form.correctTheTitle"
                          clearable
                          placeholder="请输入复查结果"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="复查描述" prop="correctTheTitle">
                        <el-input
                          v-model="form.correctTheTitle"
                          clearable
                          placeholder="请输入复查描述"
                                               style="width: 98.5%"

                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="21">
                      <el-form-item label="复查照片">
                        <basic-upload
                          key="picture"
                          :photos="form.attachment"
                          @onRemove="(fileList)=>onRemove(fileList,'attachment')"
                          @onSuccess="(fileList)=>onSuccess(fileList,'attachment')"
                        ></basic-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </div>
                <!-- 隐患验收 -->
                <div
                  :ref="tabs[4].refName"
                  class="scroll-item"
                  style="padding-top: 1rem; top: 5px"
                >
                  <div class="title">
                    <svg-icon
                      icon-class="验收"
                      style="width: 20px; height: 20px; margin-right: 10px"
                    ></svg-icon>
                    <div>{{tabs[4].title}}</div>
                  </div>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="验收人" prop="correctionOrderNumber">
                        <el-input
                          v-model="form.correctionOrderNumber"
                          clearable
                          disabled
                          placeholder="请输入验收人"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item
                        class="is-required"
                        label="确认时间"
                        prop="rectifyDate"
                      >
                        <el-date-picker
                          v-model="form.rectifyDate"
                          format="yyyy-MM-dd"
                          placeholder="请选择确认时间"
                          style="width: 220px"
                          type="date"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="验收结果" prop="correctTheTitle">
                        <el-input
                          v-model="form.correctTheTitle"
                          clearable
                          placeholder="请输入验收结果"
                          style="width: 220px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="验收描述" prop="correctTheTitle">
                        <el-input
                          v-model="form.correctTheTitle"
                          clearable
                          placeholder="请输入验收描述"
                                               style="width: 98.5%"

                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="21">
                      <el-form-item label="验收照片">
                        <basic-upload
                          key="picture"
                          :photos="form.attachment"
                          @onRemove="(fileList)=>onRemove(fileList,'attachment')"
                          @onSuccess="(fileList)=>onSuccess(fileList,'attachment')"
                        ></basic-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      size: 'small',
      openEdit: false,
      reload: true,
      tabIndex: "0",
      active: "hiddenDangerInfoRef",
      tabs: [
        {
          title: "隐患信息",
          refName: "hiddenDangerInfoRef",
          icon: "icon-qingdan"
        },
        {
          title: "隐患整改",
          refName: "hiddenDangerRectificationRef",
          icon: "icon-zhenggaicuoshi"
        },
        {
          title: "隐患复查",
          refName: "hiddenDangerReviewRef",
          icon: "icon-xiangaifucha"
        },
        {
          title: "隐患验收",
          refName: "hiddenDangerAcceptanceRef",
          icon: "icon-yanshou"
        },
        {
          title: "隐患审核",
          refName: "hiddenDangerCheckRef",
          icon: "icon-shenpi "
        },
      ],
      form: {},
      rules: {
        hazardDiscoveryTime: [
          {required: true, message: "请选择隐患发现时间", trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    handleTab(val) {
      this.active = val
      this.$refs[val].scrollIntoView(true)
    },
    close() {
      this.openEdit = false;
    },
    open(row) {
      this.openEdit = true;
    },
    refresh() {
      this.reload = false;
      this.$nextTick(() => (this.reload = true));
    },

  },
};
</script>

<style lang='scss' scoped>
ul {
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 5px;
    list-style: none;
    padding: 10px;
    background: #F8F8F9;
    cursor: pointer;
    border-radius: 4px 4px 4px 4px;
    user-select: none;
    border: 1px solid #F8F8F9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.tab-active {
  border: 1px solid #4A80FC;
  color: #4A80FC;
}

.choosePersonDialog {
  .title {
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    margin: 10px 0 !important;

    img {
      margin-right: 5px;
    }
  }

  /deep/ .vxe-modal--content {
    background: #eeeeee;
    padding: 10px;
    padding-bottom: 5px;
  }

  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;

    .left {
      width: 20%;
      padding: 10px;
      background: #fff;
      overflow: auto;
      text-align: center;

      .div-content-active {
        padding: 8px 10px;
        background: #d0e0ff;
        border: 1px dashed #409eff;
        border-radius: 4px;
        color: #4a80fc;
      }

      .div-content {
        padding: 8px 10px;
        background: #fff;
        border: 1px dashed #dcdfe6;
        border-radius: 4px;
        color: #666666;
      }

      .scroll-item {
        height: 200px;
        background: #fcc;
      }
    }

    .right {
      margin-left: 5px;
      width: 80%;
      padding: 10px;
      background: #fff;
      display: flex;
      flex-direction: column;
    }
  }

  .header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
