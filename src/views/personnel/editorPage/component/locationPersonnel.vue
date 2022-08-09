<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/tool.png" alt="">
      <span>位置分布人员信息</span>
    </div>

    <!-- 内容 -->
    <div class="dataList">
      <el-form ref="form" :model="form" label-width="auto" :rules="rules">
        <!-- 企业平面图 -->
        <el-form-item label="企业平面图（单文件）">
          <basic-upload
            key="file"
            @onSuccess="(fileList)=>onSuccess(fileList,'entFlatPhoto')"
            @onRemove="(fileList)=>onRemove(fileList,'entFlatPhoto')"
            :photos="form.entFlatPhoto"
          ></basic-upload>
        </el-form-item>
        <!-- 地图区域 -->
        <el-form-item label="地图区域">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-button type="primary" size="small" @click="drawMapArea">勾画地图区域</el-button>
        </el-form-item>
        <!-- 坐标 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="经度" prop="entLongitude">
              <el-input v-model="form.entLongitude" placeholder="经度" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="entLatitude">
              <el-input v-model="form.entLatitude" placeholder="纬度" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button class="leftButton" type="primary" size="small"
                   @click="$refs.pickerDialogRef.open();pickerBtns = ['point'];">定位
        </el-button>
        <!-- 工业园区 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否在化工园区内" prop="isIndustrialPark">
              <el-radio-group
                v-model="form.isIndustrialPark">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属化工园区名称">
              <el-input placeholder="所属化工园区名称" clearable v-model="form.chemicalIndustrialParkName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 园区标识 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="园区标识">
              <el-input placeholder="园区标识" clearable v-model="form.parkLogo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域位置分布">
              <el-input placeholder="区域位置分布" clearable v-model="form.regionalLocationDistribution"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 企业控制 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业控制室或机柜间面向具有火灾、爆炸危险性装置一侧是否满足国家标准关于防火防爆的要求" label-width="318px" >
              <el-radio-group class="radioLocation" v-model="form.isCheckStandard">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业甲、乙类火灾危险性装置内是否设置办公室、操作室、固定操作岗位或休息室" label-width="290px" >
              <el-radio-group class="radioLocation" v-model="form.isRoomAAndB">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="企业甲、乙类仓库内是否设有办公室、休息室" label-width="302px" >
          <el-radio-group v-model="form.isClassAAndB">
            <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
              {{ item.dictValueName }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 下一步按钮 -->
        <el-form-item class="middle">
          <el-button type="primary" @click="$parent.previous()">上一步</el-button>
          <el-button type="primary" @click="onSubmit" plain>保存</el-button>
          <el-button type="primary" @click="$parent.next()">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <dialog-picker ref="pickerDialogRef" :btns="pickerBtns" @getPoint="getPoint" @getPolygon="getPolygon"></dialog-picker>
  </div>
</template>

<script>
import {enterpriseNewListAPI} from "@/api/personnel/organization";
import dialogPicker from "@/components/mars3d-earth/editor/dialog-picker.vue";
import rules from "./rules.js";
import {saveLocationAPI} from "@/api/editorPage";

export default {
  components: {
    dialogPicker,
  },
  props: ["dictConfig"],
  data() {
    return {
      dynamicTags: [],
      form: {
        entFlatPhoto:[],
        entLongitude:"",
        entLatitude:"",
      },
      pickerBtns: ["point"],
      rules:rules.locationPersonnel
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    // 绘制地图区域
    drawMapArea() {
      this.$refs.pickerDialogRef.open()
      this.pickerBtns = ["polygon"]
    },
    async getDetail() {
      const res = await enterpriseNewListAPI();
      if (res.code === 200) {
        // 回填表单
        this.form = {
          ...res.data,
          isIndustrialPark:res.data.isIndustrialPark?res.data.isIndustrialPark.key:"",
          isCheckStandard:res.data.isCheckStandard?res.data.isCheckStandard.key:"",
          isRoomAAndB:res.data.isRoomAAndB?res.data.isRoomAAndB.key:"",
          isClassAAndB:res.data.isClassAAndB?res.data.isClassAAndB.key:"",
        }
      }
    },
    //表单
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    getPoint(position) {
      this.form.entLatitude = position._lat;
      this.form.entLongitude = position._lng;
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList
    },
    // 绘制区域
    getPolygon(polygon) {
      console.log(polygon,"polygon")
      this.form.mapRegion = polygon
      if(polygon.length!==0){
        for (let i = 0; i < polygon.length; i++) {
          this.dynamicTags.push(polygon[i]._name)
        }
      }
    },
    onSubmit(){
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await saveLocationAPI({
            ...this.form
          });
          if (res.code === 200) {
            this.$message.success("保存成功");
          }
        }
      })
    }
  }


}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  padding: 14px;
  border-bottom: 1px solid #D3D3D3;

  span {
    margin-left: 10px;
  }
}

.dataList {
  padding: 20px;
}

/deep/ .el-upload__tip {
  color: #606266;
  margin-top: -13px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.el-button--small, .el-button--small.is-round {
  margin-left: 15px;
}

.leftButton {
  margin-left: 152px;
  margin-top: -10px;
}

.radioLocation {
  margin-top: 54px;
}

.middle {
  display: flex;
  justify-content: center;
}

/deep/ .el-upload-dragger {
  background: white;
  border: 0px;
  width: 323px;
  height: 161px;
}

</style>
