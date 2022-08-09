<template>
  <div v-html="vHtml">
    
  </div>
</template>
<script>
import mammoth from 'mammoth'
export default {
  name: "render-docx",
  data() {
    return {
      vHtml:"",
    };
  },
  created() {
  },
  methods: {
    open(url){
      var vm = this
      const xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function() {
        console.log(xhr.status)
        if (xhr.status === 200) {
          mammoth
            .convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) })
            .then(function(resultObject) {
              vm.$nextTick(() => {
                vm.vHtml = resultObject.value
              })
            })
        }
      }
      xhr.send()
    },
  },
};
</script>

<style scoped lang='scss'>

</style>