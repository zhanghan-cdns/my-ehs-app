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
    >
      <template #content>
        <div class="container">
          <div class="left" style="overflow-y: scroll">
            <el-form :model="form" label-width="100px" class="demo-ruleForm" ref="ruleForm" :rules="formRules" style="width: 100%">
              <el-row>
                <el-col span="12">
                  <el-form-item label="地图名称" prop="name" class="is-required">
                    <el-input
                      style="width: 330px"
                      clearable
                      v-model="form.name"
                      placeholder="请输入地图名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="18">
                  <el-form-item label="模型地址" prop="url" class="is-required">
                    <el-input
                      type="text"
                      style="width: 200px"
                      clearable
                      v-model="form.url"
                      placeholder="请输入模型地址"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="6">
                  <el-button type="primary" @click="load3dTiles" plain>加载地图</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="中心点坐标" prop="center">
                    <el-input
                      style="width: 330px"
                      clearable
                      v-model="view.center"
                      placeholder="请输入中心点坐标"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="基准高度" prop="baseHeight">
                    <el-input
                      type="number"
                      style="width: 330px"
                      clearable
                      v-model="form.baseHeight"
                      placeholder="请输入基准高度"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="18">
                  <el-form-item label="地图边界" prop="edge">
                    <el-input
                      style="width: 200px"
                      clearable
                      readonly
                      v-model="view.edge"
                      placeholder="请选择地图边界"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="6">
                  <el-button type="primary" @click="drawEdge" plain>绘制边界</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="18">
                  <el-form-item label="初始视角" prop="initView">
                    <el-input
                      style="width: 200px"
                      clearable
                      readonly
                      v-model="view.initView"
                      placeholder="请选择初始视角"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="6">
                  <el-button type="primary" @click="getView" plain>获取视角</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="平面地图" prop="img">
                    <el-upload
                      class="upload-demo"
                      :on-success="upload"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      action="/api/resource/file/upload"
                      :file-list="fileList">
                      <el-button size="small" type="primary" title="请上传瓦片图">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="18">
                  <el-form-item label="平面图点" prop="imgPoint">
                    <el-input
                      style="width: 200px"
                      clearable
                      readonly
                      v-model="view.imgPoint"
                      placeholder="请绘制平面点"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="6">
                  <el-button type="primary" @click="getImgPoint" plain>绘制矩形</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="地图配置" prop="config">
                    <el-input
                      type="textarea"
                      style="width: 330px"
                      :autosize="{ minRows: 5, maxRows: 8}"
                      clearable
                      v-model="form.config"
                      placeholder="请输入地图配置"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
          </div>
          <div class="right">
            <map-picker v-if="openEdit" ref="mapPicker" @loaded="loaded" @drawCallback="drawCallback"></map-picker>
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

import {mapConfigCreateAPI, mapConfigGetAPI, mapConfigUpdateAPI} from "@/api/location/config/map/map";
import mapPicker from "@/components/mars3d-earth/editor/picker"

export default {

  components: {mapPicker},
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        name: '',
        url: '',
        center: {},
        baseHeight: 0,
        edge: [],
        initView: {},
        img: {},
        imgPoint: {},
        config: ''
      },
      view:{
        center: '',
        edge: '',
        initView: '',
        img: '',
        imgPoint: '',
      },
      formRules: {
        name: [
          { required: true, message: "请输入地图名称", trigger: "blur" },
        ],
      },
      fileList: [],
    };
  },
  props: {
    title: {
      type: String,
      default: "地图配置编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {

  },
  methods: {
    open(row) {
        this.openEdit = true;
        this.form = {
          name: '',
          url: '',
          center: {},
          edge: [],
          initView: {},
          img: {},
          imgPoint: {},
          config: '',
          baseHeight: 0
        }
        this.view={
          center: '',
          edge: '',
          initView: '',
          img: '',
          imgPoint: '',
        }
        if(row && row.id != ''){
          this.type = 'edit'
          this.getRetuenForm(row.id)
        }
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id){
      const res = await mapConfigGetAPI({id: id});
      console.log('res',res);
      if(res.code == 200){
        this.form = {
          id: res.data.id,
          version: res.data.version,

          name: res.data.name,
          url: res.data.url,
          center: res.data.center,
          edge: res.data.edge,
          initView: res.data.initView,
          img: res.data.img,
          imgPoint: res.data.imgPoint,
          config: res.data.config,
          baseHeight: res.data.baseHeight,
        }
        this.view.center = JSON.stringify(res.data.center)
        this.view.edge = JSON.stringify(res.data.edge)
        this.view.initView = JSON.stringify(res.data.initView)
        this.view.imgConfig = JSON.stringify(res.data.imgConfig)
        this.view.imgPoint = JSON.stringify(res.data.imgPoint)
        if(res.data.img && _.isEmpty(res.data.img) !== true && this.fileList.length === 0){
          this.fileList.push({name: res.data.img.originalFilename, url: "/api/resource/file/download?url=" + res.data.img.url})
        }
        this.load3dTiles();  // 加载倾斜摄影
        this.loadWall(this.form.edge); // 加载地图边界
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if(this.type == 'edit'){
            mapConfigUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            mapConfigCreateAPI(this.form).then((res)=>{
              this.$message.success('新增成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }
        }
      })
    },
    // 加载3dTiles
    load3dTiles(){
      this.$refs.mapPicker.load3dTiles(this.form.name, this.form.url)
    },

       //加载地图边界
    loadWall(edge){
      this.$refs.mapPicker.returnWall(edge);
    },
    // 加载完成获取中心点
    loaded(center){
      this.form.center = center
      this.view.center = JSON.stringify(this.form.center)
    },
    // 绘制边界
    drawEdge(){
      this.$refs.mapPicker.drawWall()
    },
    // 绘制边界回调
    drawCallback(graph){
      switch (graph.drawtype){
        case 'polygon':
          this.form.edge = graph.graphic.points
          this.view.edge = JSON.stringify(this.form.edge)
          break;
        case 'rectangle':
          this.form.imgPoint = graph.graphic.points
          this.view.imgPoint = JSON.stringify(this.form.edge)
          if(this.form.img && this.form.img !== {}){
            this.loadImgLayer();
          }
          break;
          case 'wall':
          this.form.edge = graph.graphic.points
          this.view.edge = JSON.stringify(this.form.edge)
          break;
        default:
          this.$message(`未知图形！`);
      }
    },
    //获取视角
    getView(){
      this.form.initView = this.$refs.mapPicker.getView()
      this.view.initView = JSON.stringify(this.form.initView)
    },
    //平面图上传成功
    upload(data){
      this.form.img = data.data
    },
    //删除文件前提示
    beforeRemove(file){
      return this.$confirm(`确定移除${file.name}?`)
    },
    //删除文件操作
    handleRemove(){
      this.form.img = {}
    },
    //绘制矩形
    getImgPoint(){
      this.$refs.mapPicker.drawRect()
    },
    //加载图片贴图
    loadImgLayer(){
      const imgLayer = new mars3d.layer.ImageLayer({
        name: "图片图层",
        url: `/api/resource/file/download?url=` + this.form.img.url,
        rectangle: { xmin: this.form.imgPoint[0]._lng, xmax: this.form.imgPoint[1]._lng, ymin: this.form.imgPoint[0]._lat, ymax: this.form.imgPoint[1]._lat }
      })
      this.map.addLayer(imgLayer)
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
