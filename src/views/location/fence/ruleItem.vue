<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>围栏规则{{index + 1}}</span>
      <el-button style="float: right;color: #F56C6C" type="text" @click="delRule(index)" size="small">删除</el-button>
      <el-button v-if="!editing" style="float: right" type="text" @click="edit(index)" size="small">编辑</el-button>
      <el-button v-if="editing" style="float: right" type="text" @click="save(index)" size="small">完成</el-button>
    </div>
    <el-row>
      <el-col span="8">
        <el-form-item label="触发规则" prop="rule" class="is-required">
          <dict v-model="fenceRule" dict-key="LOCATION_FENCE_RULE" tips="请选择触发规则"></dict>
        </el-form-item>
      </el-col>
      <el-col span="16">
        <el-form-item v-if="fenceRule === 'LOCATION_FENCE_RULE:IN' || fenceRule === 'LOCATION_FENCE_RULE:NOTIN'" label="限制对象" prop="thingId" class="is-required">
          <el-select v-model="thingId" multiple placeholder="请选择" style="width: 100%" filterable clearable>
            <el-option
              v-for="item in thingList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name + '-' + item.cardNo }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px; margin-right: 20px">{{ item.type.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="fenceRule === 'LOCATION_FENCE_RULE:OVERNUM'" label="限制数量" prop="overThre" class="is-required">
          <el-input-number v-model="overThre" :min="1" label="请输入限制数量"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="8">
        <el-form-item label="时间阈值(秒)" prop="delaySec" class="is-required">
          <el-input v-model="delaySec" type="number" placeholder="请输入报警触发时间"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="10">
        <el-form-item label="时间区间" prop="time" class="is-required">
          <el-time-picker
            is-range
            value-format="HH:mm:ss"
            v-model="timeSpace"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="请选择时间范围">
          </el-time-picker>
        </el-form-item>
      </el-col>
      <el-col span="6">
        <el-button size="medium" round @click="addToTimeTable" style="float: right">添加时间段</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="timeTable"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="startTime"
          label="开始时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="endTime"
          label="结束时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="delTimeTable(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-card>
</template>

<script>

import Dict from "@/components/basic-dict";

export default {

  name: 'RuleItem',

  components: {Dict},

  props: {
    thingList: {
      type: Array,
      default: []
    },
    params: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    },
  },

  data() {
    return{
      editing: true,
      fenceRule: {},
      thingId: [],
      timeSpace: ['09:00:00', '17:00:00'],
      timeTable: [],
      overThre: 1,
      delaySec: 360,
    }
  },

  created() {
    this.thingId = JSON.parse(this.params.thingId)
    this.timeTable = JSON.parse(this.params.time)
    this.fenceRule = this.params.type.key
    this.overThre = this.params.overThre
    this.delaySec = this.params.delaySec
  },

  methods: {
    // 添加时间区间
    addToTimeTable(){
      if(this.timeSpace.length > 0){
        this.timeTable.push({'startTime': this.timeSpace[0], 'endTime': this.timeSpace[1]})
      }else{
        this.$message("请选择时间区间")
      }
    },
    // 删除时间区间
    delTimeTable(index){
      this.timeTable.splice(index, 1)
    },
    // 删除规则
    delRule(index){
      this.$emit("delRule", index)
    },
    // 保存
    save(){
      this.$emit("saveRule", {
        type: this.fenceRule,
        time: JSON.stringify(this.timeTable),
        thingId: JSON.stringify(this.thingId),
        delaySec: this.delaySec,
        overThre: this.overThre
      }, this.index)
      this.editing = !this.editing
    },
    // 编辑
    edit(){
      this.editing = !this.editing
    }
  }

}

</script>
