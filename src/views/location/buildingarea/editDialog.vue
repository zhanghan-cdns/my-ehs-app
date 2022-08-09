<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="80%"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
      :buildingArea="buildingArea"
    >
      <template #content>
        <div class="container">
          <div class="left" style="overflow-y: scroll">
            <el-form :model="form" label-width="100px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
              <el-row>
                <el-col span="12">
                  <el-form-item label="名称" prop="name" class="is-required">
                    <el-input
                      style="width: 200px"
                      clearable
                      v-model="form.name"
                      placeholder="请输入建筑/区域名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="类型" prop="type" class="is-required">
                    <dict v-model="form.type" dictKey="FACTORY_VISIBLE_AREA_TYPE" style="width: 200px"></dict>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="父级" prop="parentId">
                    <el-cascader
                      v-model="form.parentId"
                      :options="buildingArea"
                      style="width: 200px;"
                      :props="{label:'name', value:'id', checkStrictly: true, emitPath: false}"
                    >
                    </el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="边界" prop="area">
                    <el-button type="primary" @click="drawEdge()">绘制边界 <i v-if="form.area.length>0" class="el-icon-finished"></i></el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="层数" prop="floor" class="is-required">
                      <el-input
                        type="number"
                        style="width: 200px;"
                        clearable
                        v-model="form.floor"
                        placeholder="请输入层数"
                      >
                      </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="18">
                  <el-form-item label="底部高度" prop="bottomHeight" class="is-required">
                    <el-input
                      type="number"
                      style="width: 100px;"
                      clearable
                      v-model="form.bottomHeight"
                      placeholder="请输入底部高度"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col span="6">
                  <el-button type="primary" @click="getHeight('bottom')">获取</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="18">
                  <el-form-item label="顶部高度" prop="topHeight" class="is-required">
                    <el-input
                      type="number"
                      style="width: 100px;"
                      clearable
                      v-model="form.topHeight"
                      placeholder="请输入顶部高度"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col span="6">
                  <el-button type="primary" @click="getHeight('top')">获取</el-button>
                </el-col>
              </el-row>
              <el-row v-if="form.type==='FACTORY_VISIBLE_AREA_TYPE:BUILDING'">
                <el-col span="18">
                  <el-form-item label="建筑模型" prop="modelUrl">
                    <el-upload
                      class="upload-demo"
                      :on-success="upload"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      action="/api/resource/file/upload"
                      :file-list="fileList">
                      <el-button size="small" type="primary" title="请上传glb模型">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="form.type==='FACTORY_VISIBLE_AREA_TYPE:BUILDING' && form.modelRes.url">
                <el-col span="24">
                  <el-row>
                    <el-col span="6"></el-col>
                    <el-col span="6">
                      <el-button type="primary" @click="modelDig">开挖</el-button>
                    </el-col>
                    <el-col span="6">
                      <el-button type="primary" @click="drawModel">加载</el-button>
                    </el-col>
                    <el-col span="6">
                      <el-button type="success" @click="saveConfig">保存</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12"><el-form-item label="经度"><el-input type="number" @input="changeModel('lng', modelParam.lng)" placeholder="经度" v-model="modelParam.lng" style="width: 100px"></el-input></el-form-item></el-col>
                    <el-col span="12"><el-form-item label="纬度"><el-input type="number" @input="changeModel('lat', modelParam.lat)" placeholder="纬度" v-model="modelParam.lat" style="width: 100px"></el-input></el-form-item></el-col>
                  </el-row>
                  <el-row>
                    <el-col span="12"><el-form-item label="高度"><el-input type="number" @input="changeModel('alt', modelParam.alt)" placeholder="高度" v-model="modelParam.alt" style="width: 100px"></el-input></el-form-item></el-col>
                    <el-col span="12"><el-form-item label="偏航角"><el-input type="number" @input="changeModel('heading', modelParam.heading)" placeholder="偏航角" v-model="modelParam.heading" style="width: 100px"></el-input></el-form-item></el-col>
                    </el-row>
                  <el-row>
                    <el-col span="12"><el-form-item label="俯仰角"><el-input type="number" @input="changeModel('pitch', modelParam.pitch)" placeholder="俯仰角" v-model="modelParam.pitch" style="width: 100px"></el-input></el-form-item></el-col>
                    <el-col span="12"><el-form-item label="滚转角"><el-input type="number" @input="changeModel('roll', modelParam.roll)" placeholder="滚转角" v-model="modelParam.roll" style="width: 100px"></el-input></el-form-item></el-col>
                  </el-row>
                  <el-row>
                    <el-col span="24"><el-form-item label="缩放"><el-input type="number" @input="changeModel('scale', modelParam.scale)" placeholder="缩放" v-model="modelParam.scale" style="width: 100px"></el-input></el-form-item></el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="right">
            <map-picker v-if="openEdit" ref="mapPicker" url="/api/location/config/map/load" @drawCallback="drawCallback" @pickPoint="pickPoint" @loaded="loaded"></map-picker>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>


import {
  buildingAreaCreateAPI,
  buildingAreaGetAPI,
  buildingAreaUpdateAPI
} from "@/api/location/buildingarea/buildingarea";
import mapPicker from "@/components/mars3d-earth/editor/picker"
import Dict from "@/components/basic-dict"

export default {
  components: {Dict, mapPicker},
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        name: '',
        floor: 0,
        parentId: '',
        type: '',
        bottomHeight: 0,
        topHeight: 0,
        children: [],
        area: [],
        modelRes: {},
        modelConfig: '',
      },
      formRules: {
        name: [
          { required: true, message: "请输入区域/建筑名称", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择区域/建筑类型", trigger: "blur" },
        ],
      },
      heightType: "top",
      fileList: [],
      modelParam: {lng: 0, lat:0, alt: 0, pitch: 0, roll: 0,  heading: 0, scale: 1},
    };
  },
  props: {
    title: {
      type: String,
      default: "区域建筑编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
    buildingArea: {//建筑树
      type: Array,
      default: [],
    }
  },
  created() {

  },
  methods: {
    open(row) {
      this.fileList = []
      this.openEdit = true;
      this.form = {
        name: '',
        floor: 0,
        parentId: '',
        type: '',
        bottomHeight: 0,
        topHeight: 0,
        children: [],
        area: [],
        modelRes: {},
        modelConfig: '',
      }
      if(row && row.id){
        this.type = 'edit'
        this.getRetuenForm(row.id)
      }
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id){
      const res = await buildingAreaGetAPI({id});
      if(res.code == 200){
        this.form = {
          id: res.data.id,
          version: res.data.version,   // 不传version会是新增

          name: res.data.name,
          floor: res.data.floor,
          parentId: res.data.parentId,
          type: res.data.type.key,
          bottomHeight: res.data.bottomHeight,
          topHeight: res.data.topHeight,
          children: res.data.children,
          area: res.data.area,
          modelRes: res.data.modelRes,
          modelConfig: res.data.modelConfig,
        }
        if(res.data.modelRes && res.data.modelRes !== {} && this.fileList.length === 0){
          this.fileList.push({name: res.data.modelRes.originalFilename, url: "/api/resource/file/download?url=" + res.data.modelRes.url})
        }
        if(res.data.modelConfig && res.data.modelConfig !== ''){
          let temp = JSON.parse(res.data.modelConfig)
          if(temp.geometry.coordinates){
            this.modelParam.lng = temp.geometry.coordinates[0]
            this.modelParam.lat = temp.geometry.coordinates[1]
            this.modelParam.alt = temp.geometry.coordinates[2]
          }
          if(temp.properties.style.heading){
            this.modelParam.heading = temp.properties.style.heading
          }
          if(temp.properties.style.pitch){
            this.modelParam.pitch = temp.properties.style.pitch
          }
          if(temp.properties.style.roll){
            this.modelParam.roll = temp.properties.style.roll
          }
          if(temp.properties.style.scale){
            this.modelParam.scale = temp.properties.style.scale
          }
        }
        // 回显开挖的区域
        this.modelDig();
        // 回显开挖模型
        if(!(_.isEmpty(this.fileList))){
        this.loadDrawModel(this.modelParam,this.fileList[0]["url"])
        }
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if(this.type == 'edit'){
            buildingAreaUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            buildingAreaCreateAPI(this.form).then((res)=>{
              this.$message.success('新增成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 绘制边界
    drawEdge(){
      this.$refs.mapPicker.drawPolygon()
    },
    // 回显开挖模型
    loadDrawModel(modelParam,url){
      this.$refs.mapPicker.returnDrawModel(modelParam,url);
    },
    // 获取高度
    getHeight(type){
      this.$message("点击地图位置获取高度")
      this.heightType = type
      this.$refs.mapPicker.pickPoint()
    },
    // 获取高度
    pickPoint(point){
      let height = point.alt
      if(this.heightType == 'top'){
        this.form.topHeight = height
        this.build()
      }else if(this.heightType == 'bottom'){
        this.form.bottomHeight = height
      }
    },
    // 配置模型
    drawModel(){
      if(this.fileList.length > 0){
        this.$refs.mapPicker.drawModel(this.fileList[0].url);
      }else{
        this.$message("请先上传模型！")
      }
    },
    // 绘制边界回调
    drawCallback(graph){
      switch (graph.drawtype){
        case 'polygon':
          this.form.area = graph.graphic.points
          break;
        case 'rectangle':

          break;
        case 'model':
          console.log(graph)
          break;
        default:
      }
      switch (graph.edittype){
        case 'model':
          this.modelParam.lng = graph.graphic._point._lng
          this.modelParam.lat = graph.graphic._point._lat
          this.modelParam.alt = graph.graphic._point._alt
          this.modelParam.heading = graph.graphic.heading
          this.modelParam.pitch = graph.graphic.pitch
          this.modelParam.roll = graph.graphic.roll
          this.modelParam.scale = graph.graphic.scale
          break;
      }
    },
    // 平面图上传成功
    upload(data){
      this.form.modelRes = data.data
    },
    // 删除文件前提示
    beforeRemove(file){
      return this.$confirm(`确定移除${file.name}?`)
    },
    // 删除文件操作
    handleRemove(){
      this.form.modelRes = {}
    },
    // 模型开挖
    modelDig(){
      let tempEdge = []
      if(this.form.area.length > 0 && !this.form.area[0]._lng){
        for(let i in this.form.area){
          tempEdge.push(new mars3d.LatLngPoint(this.form.area[i]._lng, this.form.area[i]._lat))
        }
      }else{
        tempEdge = this.form.area
      }
      this.$refs.mapPicker.digTileSet(tempEdge)
    },
    // 构建建筑
    build(){
      let tempEdge = []
      if(this.form.area.length > 0 && !this.form.area[0].lng){
        for(let i in this.form.area){
          tempEdge.push(new mars3d.LatLngPoint(this.form.area[i]._lng, this.form.area[i]._lat))
        }
      }else{
        tempEdge = this.form.area
      }
      const layer = new mars3d.layer.GraphicLayer({})
      this.map.addLayer(layer)
      let primitive = new mars3d.graphic.PolygonPrimitive({
        positions: tempEdge,
        style: {
          height: this.form.bottomHeight,
          extrudedHeight: this.form.topHeight,
          color: "#FFFF00",
          opacity: 0.3,
          classification: true,
        }
      })
      layer.addGraphic(primitive)
    },
    // 改变模型
    changeModel(type, value){
      this.$refs.mapPicker.changeModel(type, value)
    },
    // 保存配置
    saveConfig(){
      this.form.modelConfig = JSON.stringify(this.$refs.mapPicker.getModelGeoJSON())
      console.log('modelConfig',this.form.modelConfig)
    }
  },
};
</script>

<style scoped lang='scss'>
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
  display: flex;
  flex-direction: row;
  .right{
    flex: 1;
    margin-left: 20px;
  }
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>
