<template>
  <el-select clearable v-model="value" filterable :placeholder="placeholder" :multiple="multiple" @change="change">
    <el-option
      v-for="item in dict"
      :key="item.dictValue"
      :value="item.dictValue"
      :label="item.dictValueName">
    </el-option>
  </el-select>
</template>

<script>

import {fastGetDictAPI} from "@/api/system/dictionary";

export default {

  name: 'DictSelect',
  model:{
    prop:"value",
    event:'change'
  },
  props: {
    dictKey: {
      type: String,
      default: ""
    },
    value: "",
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder:String
  },
  data(){
    return {
      dict: [],
      key: '',
    }
  },
  mounted() {
    //初始化加载字典
    switch (typeof this.value){
      case Object:
        this.key = value.key
      break;
      case Array:
        this.key = []
        for(let i in this.value){
          key.push(this.value[i].key)
        }
      break;
      default:
        this.key = ""
    }
    this.initLoadDict(this.dictKey);
  },

  methods:{
    change(val){
      this.$emit('change',val)
    },
    //初始化加载字典
    initLoadDict(key){
      fastGetDictAPI(key).then(res =>{
        this.dict = res.data
      })
    },
  }

}

</script>

<style lang="scss" scoped>

</style>
