<template>
  <div>
    <el-form
      label-width="200px"
      label-position="right"
      :model="form"
      :rules="rules"
      ref="formRef"
      :disabled="type === 'chakan'"
    >
      <el-row>
        <el-col span="12">
          <el-form-item label="行政区域编码" prop="hazardAdminCode">
            <el-input
              placeholder="行政区域编码"
              clearable
              v-model="form.hazardAdminCode"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="重大危险源编码" prop="hazardCode">
            <el-input
              placeholder="重大危险源编码"
              clearable
              v-model="form.hazardCode"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="重大危险源名称" prop="hazardName">
            <el-input
              placeholder="重大危险源名称"
              clearable
              v-model="form.hazardName"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="重大危险源简称" prop="hazardAbbreviation">
            <el-input
              placeholder="重大危险源简称"
              clearable
              v-model="form.hazardAbbreviation"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="重大危险源类别" prop="hazardType">
            <el-select
              placeholder="重大危险源类别"
              :size="size"
              clearable
              v-model="form.hazardType"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.entHazardBaseinfoType"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col span="12">
          <el-form-item label="重大危险源等级" prop="hazardLevel">
            <el-select
              placeholder="重大危险源等级"
              :size="size"
              clearable
              v-model="form.hazardLevel"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.entHazardBaseinfoLevel"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="所属部门" prop="department">
            <el-select
              placeholder="所属部门"
              :size="size"
              clearable
              v-model="form.department"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in departmentList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="所在区域" prop="area">
            <el-cascader
              v-model="form.area"
              :options="areaOptions"
              :show-all-levels="false"
              :size="size"
              :style="`width:${width}`"
              :props="{
                label: 'name',
                value: 'id',
                checkStrictly: true,
                emitPath: false,
              }"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="主要负责人" prop="mainDirectName.name">
            <el-select
              placeholder="主要负责人"
              clearable
              filterable
              v-model="form.mainDirectName.name"
              :style="`width:${width}`"
              :size="size"
              @change="mainDirectNameSelect"
            >
              <el-option
                v-for="item in personList"
                :key="item.entpersonid"
                :value="
                  item.entpersonid +
                  ',' +
                  item.entpersonname +
                  ',' +
                  item.entpersontel
                "
                :label="item.entpersonname"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="负责人电话" prop="mainDirectName.phone">
            <el-input
              placeholder="负责人电话"
              clearable
              v-model="form.mainDirectName.phone"
              :style="`width:${width}`"
              :size="size"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="是否在化工园区" prop="isHazardIsInPark">
            <el-radio-group v-model="form.isHazardIsInPark">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="所属化工园区名称" prop="hazardParkName">
            <el-input
              placeholder="所属化工园区名称"
              clearable
              v-model="form.hazardParkName"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="具体位置" prop="position">
            <address-select
              ref="adRef"
              @selectAddress="selectAddress"
            ></address-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="详细地址" prop="detailedAddress">
            <el-input
              placeholder="详细地址"
              clearable
              v-model="form.detailedAddress"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="占地面积(平方米)" prop="hazardArea">
            <el-input
              placeholder="占地面积(平方米)"
              clearable
              v-model="form.hazardArea"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="固定资产值" prop="fixedAssets">
            <el-input
              placeholder="固定资产值"
              clearable
              v-model="form.fixedAssets"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="安装时间" prop="installTime">
            <el-date-picker
              v-model="form.installTime"
              type="date"
              placeholder="请选择安装时间"
              :style="`width:${width}`"
              value-format="yyyy-MM-dd"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="设计使用年限" prop="designLife">
            <el-input
              placeholder="设计使用年限"
              clearable
              v-model="form.designLife"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="储存形式" prop="storageForm">
            <el-input
              placeholder="储存形式"
              clearable
              v-model="form.storageForm"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="检查周期" prop="inspectionCycle">
            <el-input
              placeholder="检查周期"
              clearable
              v-model="form.inspectionCycle"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="简述工艺流程" prop="technologicalProcess">
            <el-input
              placeholder="简述工艺流程"
              clearable
              v-model="form.technologicalProcess"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="主要危险性" prop="mainDanger">
            <el-select
              placeholder="可多选"
              multiple
              :size="size"
              clearable
              v-model="form.mainDanger"
              :style="`width:${width2}`"
            >
              <el-option
                v-for="item in dictConfig.entHazardBaseinfoMaindanger"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="易导致事故类型" prop="possibleAccident">
            <el-checkbox-group
              v-model="form.possibleAccident"
              v-for="item in dictConfig.entHazardBaseinfoAccidenttype"
              :key="item.id"
            >
              <el-checkbox :label="item.dictValue">{{
                item.dictValueName
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="type !== 'chakan'">
          <el-form-item label="现场照片" prop="scenePhoto">
            <basic-upload
              key="picture"
              @onSuccess="(fileList) => onSuccessPhoto(fileList, 'scenePhoto')"
              @onRemove="(fileList) => onRemovePhoto(fileList, 'scenePhoto')"
              :photos="form.scenePhoto"
            ></basic-upload>
          </el-form-item>
        </el-col>
        <el-col v-else>
          <el-col span="12">
            <el-form-item label="现场照片">
              <el-image
                v-for="item in form.scenePhoto"
                :key="item.url"
                style="width: 100%; height: 100%"
                :src="imgUrl + item.url"
                :preview-src-list="[imgUrl + item.url]"
              ></el-image>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="安全监控措施" prop="safetyMeasures">
            <el-input
              placeholder="安全监控措施"
              clearable
              v-model="form.safetyMeasures"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="隐患类型" prop="hiddenDangerType">
            <el-checkbox-group
              v-model="form.hiddenDangerType"
              v-for="item in dictConfig.entHazardBaseinfoHiddendangertype"
              :key="item.id"
            >
              <el-checkbox :label="item.dictValue">{{
                item.dictValueName
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="所属罐组" prop="belongPot">
            <el-input
              placeholder="所属罐组"
              clearable
              v-model="form.belongPot"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="安全负责人" prop="safeDirectName.name">
            <el-select
              placeholder="安全负责人"
              clearable
              filterable
              v-model="form.safeDirectName.name"
              :style="`width:${width}`"
              :size="size"
              @change="safeDirectNameSelect"
            >
              <el-option
                v-for="item in personList"
                :key="item.entpersonid"
                :value="
                  item.entpersonid +
                  ',' +
                  item.entpersonname +
                  ',' +
                  item.entpersontel
                "
                :label="item.entpersonname"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="安全负责人电话" prop="safeDirectName.phone">
            <el-input
              placeholder="安全负责人电话"
              clearable
              v-model="form.safeDirectName.phone"
              :style="`width:${width}`"
              :size="size"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="区域负责人" prop="areaSafeDirectName.name">
            <el-select
              placeholder="区域负责人"
              clearable
              filterable
              v-model="form.areaSafeDirectName.name"
              :style="`width:${width}`"
              :size="size"
              @change="areaSafeDirectNameSelect"
            >
              <el-option
                v-for="item in personList"
                :key="item.entpersonid"
                :value="
                  item.entpersonid +
                  ',' +
                  item.entpersonname +
                  ',' +
                  item.entpersontel
                "
                :label="item.entpersonname"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="区域负责人电话" prop="areaSafeDirectName.phone">
            <el-input
              placeholder="区域负责人电话"
              clearable
              v-model="form.areaSafeDirectName.phone"
              :style="`width:${width}`"
              :size="size"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="危害程度" prop="extentHarm">
            <el-input
              placeholder="危害程度"
              clearable
              v-model="form.extentHarm"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="评审年度（年）" prop="reviewYear">
            <el-input
              placeholder="评审年度（年）"
              clearable
              v-model="form.reviewYear"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="重大危险源描述" prop="hazardDescribe">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="重大危险源描述"
              clearable
              v-model="form.hazardDescribe"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="生产经营活动类型" prop="productionTypes">
            <el-select
              placeholder="生产经营活动类型"
              :size="size"
              clearable
              v-model="form.productionTypes"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.entHazardBaseinfoProductiontypes"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="生产储存场所产权" prop="productionProperty">
            <el-select
              placeholder="生产储存场所产权"
              :size="size"
              clearable
              v-model="form.productionProperty"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.entHazardBaseinfoProductionproperty"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item
            label="防雷防静电设施是否定期接受检测"
            prop="lightningProtectionTest"
          >
            <el-radio-group v-model="form.lightningProtectionTest">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="涉及危险工艺" prop="hazardousProcess">
            <el-select
              placeholder="涉及危险工艺"
              :size="size"
              clearable
              v-model="form.hazardousProcess"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.entHazardBaseinfoHazardousprocess"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="环境位置" prop="environmentalLocation">
            <el-select
              placeholder="环境位置"
              :size="size"
              clearable
              v-model="form.environmentalLocation"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.entHazardBaseinfoEnvironmental"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="操作人员" prop="operator">
            <el-select
              placeholder="操作人员"
              clearable
              filterable
              v-model="form.operator.name"
              :style="`width:${width}`"
              :size="size"
              @change="operatorSelect"
            >
              <el-option
                v-for="item in personList"
                :key="item.entpersonid"
                :value="
                  item.entpersonid +
                  ',' +
                  item.entpersonname +
                  ',' +
                  item.entpersontel
                "
                :label="item.entpersonname"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="投产时间" prop="productionTime">
            <el-date-picker
              v-model="form.productionTime"
              type="date"
              placeholder="请选择投产时间"
              :style="`width:${width}`"
              value-format="yyyy-MM-dd"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col span="12">
          <el-form-item label="R值" prop="rValue">
            <el-input
              placeholder="R值"
              clearable
              v-model="form.rValue"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="压力容器数量" prop="pressureNum">
            <el-input
              placeholder="压力容器数量"
              clearable
              v-model="form.pressureNum"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="防雷防静电设施检测时间(最近一次检测时间)"
            prop="lastTestTime"
          >
            <el-date-picker
              v-model="form.lastTestTime"
              type="date"
              placeholder="请选择时间"
              :style="`width:${width}`"
              value-format="yyyy-MM-dd"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item
            label="防雷防静电设施检测时间(到期时间)"
            prop="expirationTime"
          >
            <el-date-picker
              v-model="form.expirationTime"
              type="date"
              placeholder="请选择时间"
              :style="`width:${width}`"
              value-format="yyyy-MM-dd"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="危险源备案期限(时间段)" prop="filingPeriod">
            <el-date-picker
              v-model="form.filingPeriodArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :style="`width:${width}`"
              value-format="yyyy-MM-dd"
              :size="size"
              @change="timeSelectChange"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="所处装置或区域" prop="deviceArea">
            <el-input
              placeholder="所处装置或区域"
              clearable
              v-model="form.deviceArea"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="存在量" prop="existingQuantity">
            <el-input
              placeholder="存在量"
              clearable
              v-model="form.existingQuantity"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="周边环境类型" prop="surroundingEnvironmentType">
            <el-input
              placeholder="周边环境类型"
              clearable
              v-model="form.surroundingEnvironmentType"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="周边环境名称" prop="surroundingEnvironment">
            <el-input
              placeholder="周边环境名称"
              clearable
              v-model="form.surroundingEnvironment"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="周边环境人数" prop="surroundingEnvironmentNum">
            <el-input
              placeholder="周边环境人数"
              clearable
              v-model="form.surroundingEnvironmentNum"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="与危险源最近距离"
            prop="surroundingEnvironmentTel"
          >
            <el-input
              placeholder="与危险源最近距离"
              clearable
              v-model="form.surroundingEnvironmentTel"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item
            label="重大危险源周边安全距离"
            prop="safetyHazardDistance"
          >
            <el-input
              placeholder="重大危险源周边安全距离"
              clearable
              v-model="form.safetyHazardDistance"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="周边环境联系人"
            prop="surroundingEnvironmentName.name"
          >
            <el-select
              placeholder="周边环境联系人"
              clearable
              filterable
              v-model="form.surroundingEnvironmentName.name"
              :style="`width:${width}`"
              :size="size"
              @change="surroundingEnvironmentNameSelect"
            >
              <el-option
                v-for="item in personList"
                :key="item.entpersonid"
                :value="
                  item.entpersonid +
                  ',' +
                  item.entpersonname +
                  ',' +
                  item.entpersontel
                "
                :label="item.entpersonname"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item
            label="周边环境联系人电话"
            prop="surroundingEnvironmentName.phone"
          >
            <el-input
              placeholder="周边环境联系人电话"
              clearable
              v-model="form.surroundingEnvironmentName.phone"
              :style="`width:${width}`"
              :size="size"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="周边防护目标最近距离(米)"
            prop="surroundingEnvironmentDistance"
          >
            <el-input
              placeholder="周边防护目标最近距离(米)"
              clearable
              v-model="form.surroundingEnvironmentDistance"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item
            label="外边界500米范围人数估算"
            prop="populationEstimation"
          >
            <el-input
              placeholder="外边界500米范围人数估算"
              clearable
              v-model="form.populationEstimation"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="最大罐组" prop="maxTankGroup">
            <el-input
              placeholder="最大罐组"
              clearable
              v-model="form.maxTankGroup"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="经度" prop="entLongitude">
            <el-input
              placeholder="经度"
              clearable
              v-model="form.entLongitude"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="纬度" prop="entLatitude">
            <el-input
              placeholder="纬度"
              clearable
              v-model="form.entLatitude"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="type !== 'chakan'">
        <el-col span="12">
          <el-form-item label="">
            <el-button type="success" size="mini" @click="pickerMap"
              >定位</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="type !== 'chakan'">
          <el-form-item label="附件">
            <basic-upload
              key="file"
              :model="true"
              @onSuccess="(fileList) => onSuccess(fileList, 'enclosure')"
              @onRemove="(fileList) => onRemove(fileList, 'enclosure')"
              :photos="form.enclosure"
            ></basic-upload>
          </el-form-item>
        </el-col>
        <el-col v-else>
          <el-form-item label="附件">
            <show-file :data="form.enclosure"></show-file>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              placeholder="备注"
              clearable
              v-model="form.remark"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="width: 99%; text-align: right" v-if="type !== 'chakan'">
      <el-button type="primary" size="small" @click="submitBaseInfo"
        >保存</el-button
      >
      <el-button type="success" @click="reset" size="small">重置 </el-button>
    </div>
    <dialog-picker ref="pickerDialogRef" @getPoint="getPoint"></dialog-picker>
  </div>
</template>
<script>
import { buildingAreaListAPI } from "@/api/location/buildingarea/buildingarea";
import { personListAPI } from "@/api/enterprise/safetyManagement/public/person";
import dialogPicker from "@/components/mars3d-earth/editor/dialog-picker.vue";
import { imgUrl } from "@/router/axios";
import showFile from "@/components/show-file/index";

export default {
  name: "editDialog",
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },
  components: { dialogPicker, showFile },

  data() {
    return {
      imgUrl,
      width: "300px",
      width2: "97%",
      width3: "197px",
      size: "small",
      areaOptions: [],
      departmentList: [],
      personList: [],
      form: {
        mainDirectName: {
          id: "",
          name: "",
          phone: "",
        },
        safeDirectName: {
          id: "",
          name: "",
          phone: "",
        },
        areaSafeDirectName: {
          id: "",
          name: "",
          phone: "",
        },
        surroundingEnvironmentName: {
          id: "",
          name: "",
          phone: "",
        },
        operator: {
          id: "",
          name: "",
          phone: "",
        },
        filingPeriod: "",
        filingPeriodArr: [],
        department: "测试部门",
        possibleAccident: [],
        hiddenDangerType: [],
        position: "",
        scenePhoto: [],
        entLongitude: "",
        entLatitude: "",
        isHazardIsInPark: 1,
        lightningProtectionTest: 1,
      },
      rules: {
        hazardCode: [
          { required: true, message: "请输入重大危险源编码", trigger: "blur" },
        ],
        hazardName: [
          { required: true, message: "请输入重大危险源名称", trigger: "blur" },
        ],
        hazardAbbreviation: [
          { required: true, message: "请输入重大危险源简称", trigger: "blur" },
        ],
        "mainDirectName.name": [
          { required: true, message: "请输入主要负责人", trigger: "change" },
        ],
        // chargeNumber: [{ required: true, message: "请输入负责人电话" }],
        hazardType: [
          {
            required: true,
            message: "请选择重大危险源类别",
            trigger: "change",
          },
        ],
        // hazardLevel: [
        //   {
        //     required: true,
        //     message: "请选择重大危险源等级",
        //     trigger: "change",
        //   },
        // ],
        department: [
          { required: true, message: "请选择所属部门", trigger: "change" },
        ],
        area: [
          { required: true, message: "请选择所在区域", trigger: "change" },
        ],
        "safeDirectName.name": [
          { required: true, message: "请输入安全负责人", trigger: "blur" },
        ],
        // safeDirectMobi: [
        //   { required: true, message: "请输入安全负责人手机", trigger: "blur" },
        // ],
        // mainDirectMobi: [
        //   { required: true, message: "请输入主要负责人手机", trigger: "blur" },
        // ],
        "areaSafeDirectName.name": [
          { required: true, message: "请输入区域负责人", trigger: "blur" },
        ],
        // areaSafeDirectMobi: [
        //   { required: true, message: "请输入区域负责人手机", trigger: "blur" },
        // ],
        // rValue: [{ required: true, message: "请输入R值", trigger: "blur" }],
        populationEstimation: [
          {
            required: true,
            message: "请输入外边界500米范围人数估算",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getAreaTree();
    this.getPersonList();
  },
  methods: {
    // 打开地图
    pickerMap() {
      this.$refs.pickerDialogRef.open();
    },
    getPoint(position) {
      this.position = position;
      if (position._lat && position._lng) {
        this.form.entLatitude = position._lat;
        this.form.entLongitude = position._lng;
      }
    },

    // 获取所在区域树列表
    async getAreaTree() {
      let params = {
        // ...this.query,
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 99999999,
      };
      const res = await buildingAreaListAPI(params);
      if (res.code === 200) {
        this.areaOptions = res.data.content;
      }
    },

    mainDirectNameSelect(val) {
      let valArr = val.split(",");
      this.form.mainDirectName.id = valArr[0];
      this.form.mainDirectName.name = valArr[1];
      this.form.mainDirectName.phone = valArr[2];
    },

    safeDirectNameSelect(val) {
      let valArr = val.split(",");
      this.form.safeDirectName.id = valArr[0];
      this.form.safeDirectName.name = valArr[1];
      this.form.safeDirectName.phone = valArr[2];
    },

    areaSafeDirectNameSelect(val) {
      let valArr = val.split(",");
      this.form.areaSafeDirectName.id = valArr[0];
      this.form.areaSafeDirectName.name = valArr[1];
      this.form.areaSafeDirectName.phone = valArr[2];
    },

    surroundingEnvironmentNameSelect(val) {
      let valArr = val.split(",");
      this.form.surroundingEnvironmentName.id = valArr[0];
      this.form.surroundingEnvironmentName.name = valArr[1];
      this.form.surroundingEnvironmentName.phone = valArr[2];
    },

    operatorSelect(val) {
      let valArr = val.split(",");
      this.form.operator.id = valArr[0];
      this.form.operator.name = valArr[1];
      this.form.operator.phone = valArr[2];
    },

    timeSelectChange(val) {
      this.form.filingPeriod = val.toString();
      console.log(val, "time", this.form.filingPeriod);
    },

    // 获取人员列表
    async getPersonList() {
      const res = await personListAPI();
      if (res.code !== 200) return this.$message.error("获取人员列表失败");
      this.personList = res.data;
    },

    // 选择地址
    selectAddress(name, code) {
      this.form.position = name;
      console.log(this.form.position, "position");
    },
    // 上传图片成功
    onSuccessPhoto(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemovePhoto(fileList, params) {
      this.form[params] = fileList;
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },

    // 提交表单
    submitBaseInfo() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("submitBaseInfo", this.form);
        } else {
          return false;
        }
      });
    },

    // 重置表单
    reset() {
      this.$refs.formRef.resetFields();
      this.$refs.adRef.$refs.adRef.$refs.panel.checkedValue = []; // 清空具体位置选中值
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}

/deep/ .el-radio-group {
  padding-top: 12px !important;
}

/deep/ .el-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

/deep/ .el-cascader {
  padding-top: 5px !important;
}
</style>
