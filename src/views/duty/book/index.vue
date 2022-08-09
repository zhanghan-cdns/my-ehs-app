<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="wrap">
          <div class="wrap-left">
            <el-steps
              :space="200"
              :active="1"
              finish-status="success"
              direction="vertical"
            >
              <el-step title="承诺书未承诺" description="2022">
                <slot>2022</slot>
              </el-step>
              <el-step title="承诺书已承诺" description="2021/02/29">
                <slot>2021/02/29</slot>
              </el-step>
              <el-step title="承诺书已承诺" description="2020/02/29">
                <slot>2020/02/29</slot>
              </el-step>
            </el-steps>
          </div>
          <div class="wrap-right">1144</div>
        </div>
      </template>
    </list-container>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 90%;
  height: 100%;

  .wrap-left {
    width: 20%;
    padding-left: 100px;
    margin: 30px;
  }
  .wrap-right {
    width: 70%;
    height: 100%;
    margin: 30px;
    border: 1px solid #999999;
  }
}
/deep/.el-step__line {
  position: absolute;
  border-color: inherit;
  background-color: #93b3fd !important;
}

/deep/.el-step__head.is-success {
  color: #ff4646 !important;
  border-color: #ff4646 !important;
}
/deep/ .el-step__title.is-success {
  color: #ff4646 !important;
}
/deep/.el-step__title.is-process {
  font-weight: 700;
  color: #4a80fc !important;
}
/deep/.el-step__description.is-success {
  color: #999999 !important;
}
/deep/ .el-step__description.is-process {
  color: #999999 !important;
}

/deep/ .el-step__title.is-wait {
  color: #4a80fc !important;
}

/deep/ .el-step__head.is-process {
  color: #4a80fc !important;
  border-color: #4a80fc !important;
}
/deep/ .el-step__head.is-wait {
  color: #4a80fc !important;
  border-color: #4a80fc !important;
}
</style>
