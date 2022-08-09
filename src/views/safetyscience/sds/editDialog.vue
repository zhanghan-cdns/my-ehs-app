<template>
  <div class="gridcheckresult-view">
    <basicDialog
      icon="icon-chakan"
      title="sds编辑"
      width="1084"
      height="828"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          :model="form"
          label-width="200px"
          :disabled="isDisabled"
          :rules="formRules"
          ref="ruleForm"
        >
          <div class="content_box">
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第一部分：化学品名称</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="化学品中文名称" prop="cnName">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.cnName"
                    placeholder="请输入化学品中文名称"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="化学品英文名称" prop="enName">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.enName"
                    placeholder="请输入化学品英文名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="中文名称2" prop="cnName2">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.cnName2"
                    placeholder="请输入中文名称2"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="英文名称2" prop="enName2">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.enName2"
                    placeholder="请输入英文名称2"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="技术说明书编码" prop="instructionCode">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.instructionCode"
                    placeholder="请输入技术说明书编码"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="CAS No" prop="casNo">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.casNo"
                    placeholder="请输入CAS No"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="分子式" prop="formula">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.formula"
                    placeholder="请输入分子式"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分子量" prop="formulaWeight">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.formulaWeight"
                    placeholder="请输入分子量"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第二部分：成分/组成信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="有害物质" prop="harmfulMaterial">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.harmfulMaterial"
                    placeholder="请输入有害物质"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="含量" prop="content">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.content"
                    placeholder="请输入含量"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row> </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第三部分：危险性描述</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="健康危害" prop="healthHazard">
                  <el-input
                    style="width: 95%"
                    :size="size"
                    clearable
                    v-model="form.healthHazard"
                    placeholder="请输入健康危害"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="环境危害" prop="environmentHazard">
                  <el-input
                    style="width: 95%"
                    :size="size"
                    clearable
                    v-model="form.environmentHazard"
                    placeholder="请输入环境危害"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="燃爆危险" prop="explosionHazard">
                  <el-input
                    style="width: 95%"
                    :size="size"
                    clearable
                    v-model="form.explosionHazard"
                    placeholder="请输入燃爆危险"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第四部分：急救措施</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="皮肤接触" prop="skin">
                  <el-input
                    style="width: 95%"
                    :size="size"
                    clearable
                    v-model="form.skin"
                    placeholder="请输入皮肤接触"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="眼睛接触" prop="eyes">
                  <el-input
                    style="width: 95%"
                    :size="size"
                    clearable
                    v-model="form.eyes"
                    placeholder="请输入眼睛接触"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="吸入" prop="breathe">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.breathe"
                    placeholder="请输入吸入"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="食入" prop="eat">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.eat"
                    placeholder="请输入食入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第五部分：消防措施</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="危险特性" prop="risk">
                  <el-input
                    type="textarea"
                    placeholder="请输入危险特性"
                    v-model="form.risk"
                    maxlength="500"
                    show-word-limit
                    :disabled="chakan"
                    style="width: 95%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="有害燃烧产物" prop="harmfulProduct">
                  <el-input
                    style="width: 95%"
                    :size="size"
                    clearable
                    v-model="form.harmfulProduct"
                    placeholder="请输入有害燃烧产物"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="灭火方法" prop="outFire">
                  <el-input
                    type="textarea"
                    placeholder="请输入灭火方法"
                    v-model="form.outFire"
                    maxlength="500"
                    show-word-limit
                    :disabled="chakan"
                    style="width: 95%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第六部分：泄漏应急处理</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="应急处理" prop="eventContent">
                  <el-input
                    type="textarea"
                    placeholder="请输入应急处理"
                    v-model="form.eventContent"
                    maxlength="500"
                    show-word-limit
                    :disabled="chakan"
                    style="width: 95%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第七部分：操作处理与储存</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="操作注意事项" prop="emergencyMeasure">
                  <el-input
                    type="textarea"
                    placeholder="请输入操作注意事项"
                    v-model="form.emergencyMeasure"
                    maxlength="500"
                    show-word-limit
                    :disabled="chakan"
                    style="width: 95%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="储存注意事项" prop="storageNotice">
                  <el-input
                    type="textarea"
                    placeholder="请输入储存注意事项"
                    v-model="form.storageNotice"
                    maxlength="500"
                    show-word-limit
                    :disabled="chakan"
                    style="width: 95%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第八部分：接触控制/个体防护</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="中国MAC(mg/m3)" prop="cnMac">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.cnMac"
                    placeholder="请输入中国MAC(mg/m3)"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="前苏联MAC(mg/m3)" prop="fsuMac">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.fsuMac"
                    placeholder="请输入前苏联MAC(mg/m3)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="TLVTN" prop="tlvtn">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.tlvtn"
                    placeholder="请输入TLVTN"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="TLVWN" prop="tlvwn">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.tlvwn"
                    placeholder="请输入TLVWN"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="工程控制" prop="projectControl">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.projectControl"
                    placeholder="请输入工程控制"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="呼吸系统防护" prop="breathProtect">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.breathProtect"
                    placeholder="请输入呼吸系统防护"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="眼睛防护" prop="eyesProtect">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.eyesProtect"
                    placeholder="请输入眼睛防护"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身体防护" prop="bodyProtect">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.bodyProtect"
                    placeholder="请输入身体防护"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="手防护" prop="handProtect">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.handProtect"
                    placeholder="请输入手防护"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他防护" prop="otherProtect">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.otherProtect"
                    placeholder="请输入其他防护"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第九部分：理化特性</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主要成分" prop="mainComponent">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.mainComponent"
                    placeholder="请输入主要成分"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="外观与形状" prop="shape">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.shape"
                    placeholder="请输入外观与形状"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="熔点(℃)" prop="meltingPoint">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.meltingPoint"
                    placeholder="请输入熔点(℃)"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="沸点(℃)" prop="boilingPoint">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.boilingPoint"
                    placeholder="请输入沸点(℃)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="相对密度(水=1)" prop="densityWater">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.densityWater"
                    placeholder="请输入相对密度(水=1)"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="相对蒸气密度(空气=1)" prop="densityAir">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.densityAir"
                    placeholder="请输入相对蒸气密度(空气=1)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="饱和蒸气压(kPa)" prop="airPressure">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.airPressure"
                    placeholder="请输入饱和蒸气压(kPa)"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="燃烧热(kJ/mol)" prop="burnEnergy">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.burnEnergy"
                    placeholder="请输入燃烧热(kJ/mol)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主要用途" prop="mainApply">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.mainApply"
                    placeholder="请输入主要用途"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="临界温度(℃)" prop="criticalTemperature">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.criticalTemperature"
                    placeholder="请输入临界温度(℃)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="临界压力(MPa)" prop="criticalPressure">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.criticalPressure"
                    placeholder="请输入临界压力(MPa)"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="辛醇/水分配系数的对数值" prop="ratio">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.ratio"
                    placeholder="请输入辛醇/水分配系数的对数值"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="闪点(℃)" prop="flashPoint">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.flashPoint"
                    placeholder="请输入闪点(℃)"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="爆炸下限%(V/V)" prop="explosionLow">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.explosionLow"
                    placeholder="请输入爆炸下限%(V/V)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="引燃温度(℃)" prop="burnPoint">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.burnPoint"
                    placeholder="请输入引燃温度(℃)"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="爆炸上限%(V/V)" prop="explosionUp">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.explosionUp"
                    placeholder="请输入爆炸上限%(V/V)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第十部分：稳定性和反应活性</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="禁配物" prop="prohibit">
                  <el-input
                    style="width: 95%"
                    :size="size"
                    clearable
                    v-model="form.prohibit"
                    placeholder="请输入禁配物"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第十一部分：毒理学资料</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="急性毒性LD50" prop="ld50">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.ld50"
                    placeholder="请输入急性毒性LD50"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="急性毒性LC50" prop="lc50">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.lc50"
                    placeholder="请输入急性毒性LC50"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第十二部分：生态学资料</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="其他有害作用" prop="otherHarmful">
                  <el-input
                    type="textarea"
                    placeholder="请输入其他有害作用"
                    v-model="form.otherHarmful"
                    maxlength="500"
                    show-word-limit
                    :disabled="chakan"
                    style="width: 95%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第十三部分：废弃处置</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="废弃物性质废弃处置方法" prop="wasteHandle">
                  <el-input
                    style="width: 95%"
                    :size="size"
                    clearable
                    v-model="form.wasteHandle"
                    placeholder="请输入废弃物性质废弃处置方法"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第十四部分：运输信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="危险货物编号" prop="dangerCode">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.dangerCode"
                    placeholder="请输入危险货物编号"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="UN编号" prop="unCode">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.unCode"
                    placeholder="请输入UN编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="包装类别" prop="packageType">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.packageType"
                    placeholder="请输入包装类别"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="包装方法" prop="packageMethod">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.packageMethod"
                    placeholder="请输入包装方法"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="运输注意事项" prop="transportNotice">
                  <el-input
                    type="textarea"
                    placeholder="请输入运输注意事项"
                    v-model="form.transportNotice"
                    maxlength="500"
                    show-word-limit
                    :disabled="chakan"
                    style="width: 95%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>第十五部分：法规信息</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="法规信息" prop="rulesInfo">
                  <el-input
                    style="width: 95%"
                    clearable
                    :size="size"
                    v-model="form.rulesInfo"
                    placeholder="请输入法规信息"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="content_box_title">
              <span style="color: #4a80fc; padding-right: 10px">| </span>
              <span>附件信息</span>
            </div>
            <el-row v-if="!chakan">
              <el-col>
                <el-form-item
                  label="附件(单文件)"
                  prop="attachment"
                >
                  <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="chakan">
              <el-col :span="24">
                <div>
                  <span style="margin: 0px 15px 0px 43px">附件</span>
                  <span
                    style="cursor: pointer; color: #409eff"
                    @click="downloadPdf"
                    >{{ pdfName }}</span
                  >
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </template>
      <template #bottom>
        <el-button
          v-if="!isDisabled"
          type="primary"
          size="medium"
          @click="handleBottomClick('save')"
          >确定</el-button
        >
        <el-button
          type="warning"
          size="medium"
          @click="handleBottomClick('cancel')"
          >取消</el-button
        >
      </template>
    </basicDialog>
  </div>
</template>

<script>
import { imgUrl } from "@/router/axios";
export default {
  data() {
    return {
      isGov: false,
      imgUrl: imgUrl,
      pdfUrl: "",
      openEdit: false,
      isDisabled: false, // 是否禁用表单
      rowData: "",
      certificateTypeList: [],
      accidentTypeKey: "",
      pdfName: "",
      width: "280px",
      size: "small",
      form: {
        airPressure: "",
        attachment: [],
        bodyProtect: "",
        boilingPoint: "",
        breathProtect: "",
        breathe: "",
        burnEnergy: "",
        burnPoint: "",
        casNo: "",
        cnMac: "",
        cnName: "",
        cnName2: "",
        content: "",
        criticalPressure: "",
        criticalTemperature: "",
        dangerCode: "",
        densityAir: "",
        densityWater: "",
        eat: "",
        emergencyMeasure: "",
        enName: "",
        enName2: "",
        environmentHazard: "",
        explosionHazard: "",
        explosionLow: "",
        explosionUp: "",
        eyes: "",
        eyesProtect: "",
        flashPoint: "",
        formula: "",
        formulaWeight: "",
        fsuMac: "",
        handProtect: "",
        harmfulMaterial: "",
        harmfulProduct: "",
        healthHazard: "",
        id: "",
        instructionCode: "",
        lc50: "",
        ld50: "",
        mainApply: "",
        mainComponent: "",
        meltingPoint: "",
        operateNotice: "",
        otherHarmful: "",
        outFire: "",
        packageMethod: "",
        packageType: "",
        prohibit: "",
        projectControl: "",
        queryParams: {},
        ratio: "",
        remark: "",
        risk: "",
        rulesInfo: "",
        shape: "",
        skin: "",
        storageNotice: "",
        tlvtn: "",
        tlvwn: "",
        transportNotice: "",
        unCode: "",
        version: 0,
        wasteHandle: "",
      },
      formRules: {
        accidentType: [
          { required: true, message: "请输入证书名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    downloadPdf() {
      let downloadUrl = this.imgUrl + this.pdfUrl;
      window.open(downloadUrl, "_self");
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    close() {
      this.form = {};
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.form.attachment = [];
      this.openEdit = false;
    },
    async open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;

      if (row) {
        this.rowData = row.id || "";
        const res = await safeEchoDataAPI({ id: this.rowData });
        if (res.code !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.form = res.data;
        if (res.data.attachment.originalFilename) {
          this.pdfName = res.data.attachment.originalFilename;
          this.pdfUrl = res.data.attachment.url;
        }
        this.form.attachment = new Array(res.data.attachment);
        this.accidentTypeKey = res.data.accidentType.value;
        this.form.accidentType = res.data.accidentType.key;
      }
    },

    handleRemove(index) {
      this.form.attachment.splice(index, 1);
    },
    uploadSuccess(data) {
      this.form.attachment.push(data);
    },

    // 底部按钮点击事件
    handleBottomClick(type) {
      if (type === "save") {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            if (this.form.attachment.length > 0) {
              this.form.attachment = this.form.attachment[0];
            } else {
              this.form.attachment = {};
            }
            if (this.rowData) {
              let params = { ...this.form };
              const res = await safeUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close();
            } else {
              console.log(this.form, "新增");
              let params = { ...this.form };
              const res = await safePostAPI(params);
              if (res.code !== 200) {
                return this.$message.error("新增失败");
              }
              this.$message.success("新增成功");
              this.$emit("refreshDataList");
              this.close();
            }
          }
        });
      }
      if (type === "reset") {
        this.resetForm();
      }
      if (type === "cancel") {
        this.close();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.content_box_title {
  border-bottom: 1px solid #4a80fc;
  width: 95%;
  height: 30px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
