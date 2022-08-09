<template>
  <div class="panel-border" v-if="visible" :style="style">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>单体化编辑器</span>
        <el-button v-if="closable" size="mini" style="float:right;padding: 3px 0" type="text" title="收起/展开" @click="switchVisible"> <i class="el-icon-close"></i></el-button>
      </div>
      <el-row>
        <el-col span="12">
          <el-button size="mini" @click="edit">开始编辑</el-button>
        </el-col>
        <el-col span="12">
          <el-button size="mini" @click="buildJSON">输出JSON</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-button size="mini" @click="loadJSON">加载图层</el-button>
        </el-col>
        <el-col span="12">
          <el-button size="mini" @click="loadPerimit">加载单体对象</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-input
            type="number"
            style="width: 100%;"
            clearable
            placeholder="请输入底部高度"
            v-model="bottomHeight">
          </el-input>
        </el-col>
        <el-col span="12">
          <el-input
            type="number"
            style="width: 100%;"
            clearable
            placeholder="请输入顶部高度"
            v-model="topHeight">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-input
            type="textarea"
            style="width: 100%;"
            :autosize="{ minRows: 5}"
            clearable
            v-model="JSON.stringify(content)"
            placeholder="请输入插件内容"
          >
          </el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    title:{
      type: String,
      default: "标题"
    },
    style:{
      type: String,
      default: "left:10px;top:50px"
    },
    visible:{
      type: Boolean,
      default: true
    },
    closable:{
      type: Boolean,
      default: true
    },
    loaded:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      graphicLayerEdit: {},
      eventTarget: new this.mars3d.BaseClass(),
      content: {},
      bottomHeight: 0,
      topHeight: 0,
    }
  },
  watch: {
    loaded(val){
      if(val === true){
        this.initEditLayer()
      }
    }
  },
  methods: {
    //切换面板显示状态
    switchVisible(){
      if(this.visible){
        this.visible = false;
      }else{
        this.visible = true;
      }
    },
    //初始化编辑层
    initEditLayer(){
      this.graphicLayerEdit = new this.mars3d.layer.GraphicLayer({
        hasEdit: false,
        isAutoEditing: true, // 绘制完成后是否自动激活编辑
        symbol: {
          type: "polygon",
          styleOptions: {
            color: "rgba(255, 255, 0, 0.4)",
            clampToGround: true
          }
        }
      })
      this.map.addLayer(this.graphicLayerEdit);
      this.bindLayerContextMenu()
      this.graphicLayerEdit.on(this.mars3d.EventType.drawCreated, (e)=>{
        this.buildJSON()
      })
    },
    //开始编辑图层
    edit(){
      this.graphicLayerEdit.startDraw({
        type: "polygon",
        style: {
          color: "#ffff00",
          opacity: 0.3,
          clampToGround: true
        }
      })
    },
    //绑定右键菜单
    bindLayerContextMenu(){
      this.graphicLayerEdit.bindContextMenu([
        {
          text: "开始编辑对象",
          iconCls: "fa fa-edit",
          show: function (e) {
            const graphic = e.graphic
            if (!graphic || !graphic.startEditing) {
              return false
            }
            return !graphic.isEditing
          },
          callback: (e)=> {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }
            if (graphic) {
              this.graphicLayerEdit.startEditing(graphic)
            }
          }
        },
        {
          text: "停止编辑对象",
          iconCls: "fa fa-edit",
          show: function (e) {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }
            return graphic.isEditing
          },
          callback: (e)=> {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }
            if (graphic) {
              this.graphicLayerEdit.stopEditing(graphic)
            }
          }
        },
        {
          text: "删除对象",
          iconCls: "fa fa-trash-o",
          show: (event) => {
            const graphic = event.graphic
            if (!graphic || graphic.isDestroy) {
              return false
            } else {
              return true
            }
          },
          callback: (e)=> {
            const graphic = e.graphic
            if (!graphic) {
              return
            }
            this.graphicLayerEdit.removeGraphic(graphic)
          }
        },
        {
          text: "计算周长",
          iconCls: "fa fa-medium",
          show: (e)=> {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }
            return (
              graphic.type === "circle" ||
              graphic.type === "circleP" ||
              graphic.type === "rectangle" ||
              graphic.type === "rectangleP" ||
              graphic.type === "polygon" ||
              graphic.type === "polygonP"
            )
          },
          callback: (e)=> {
            const graphic = e.graphic
            const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
            this.$message("该对象的周长为:" + strDis)
          }
        },
        {
          text: "计算面积",
          iconCls: "fa fa-reorder",
          show: (e)=> {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }
            return (
              graphic.type === "circle" ||
              graphic.type === "circleP" ||
              graphic.type === "rectangle" ||
              graphic.type === "rectangleP" ||
              graphic.type === "polygon" ||
              graphic.type === "polygonP" ||
              graphic.type === "scrollWall" ||
              graphic.type === "water"
            )
          },
          callback: (e)=> {
            const graphic = e.graphic
            const strArea = this.mars3d.MeasureUtil.formatArea(graphic.area)
            this.$message("该对象的面积为:" + strArea)
          }
        }
      ])
    },
    //生成JSON
    buildJSON(){
      if (this.graphicLayerEdit.length === 0) {
        this.$message("当前没有标注任何数据，无需保存！")
        return
      }
      //TODO callback
      this.content = this.graphicLayerEdit.toGeoJSON()
      console.log(this.content)
    },
    //根据JSON显示
    loadJSON(){
      this.graphicLayerEdit.loadGeoJSON(JSON.stringify(this.content),
        {clear: true, flyTo: true}
      )
    },
    //分层单体化加载
    loadPerimit(){
      let layers = this.map.getLayers({layers: true});
      for(let i in layers){
        if(layers[i].options.type === '3dtiles'){
          layers[i].opacity = 0.6
        }
      }
      const primitive = new this.mars3d.graphic.PolygonPrimitive({
        positions: this.content.features[0].geometry.coordinates[0],
        style: {
          height: this.bottomHeight,
          extrudedHeight: this.topHeight,
          // 单体化默认显示样式
          color: "#1E90FF",
          opacity: 0.4,
          //classification: true,
          // 单体化鼠标移入或单击后高亮的样式
          highlight: {
            type: this.mars3d.EventType.click,
            color: "#ffff00",
            opacity: 0.6
          }
        },
      })
      this.graphicLayerEdit.addGraphic(primitive)
    },
  }
}

</script>

<style lang="scss" scoped>
.panel-border{
  position: absolute;
  width: 20%;
}
</style>
