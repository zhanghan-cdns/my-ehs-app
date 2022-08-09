<template>
  <div>
    <div class="title">区域内发生事故的可能性（L）{{ valueLresult }}分</div>
    <vxe-grid
      :merge-cells="mergeCells"
      class="reverse-table"
      show-overflow="tooltip"
      v-bind="gridOptions1"></vxe-grid>
    <div class="title">区域内发生事故的严重性（S）{{ valueSresult }}分</div>
    <vxe-grid
      :merge-cells="mergeCells"
      class="reverse-table"
      show-overflow="tooltip"
      v-bind="gridOptions2"></vxe-grid>
    <div id="riskLevel" :style="`background:${riskLevel&&riskLevel.color};color:#000`">{{
        riskLevel && riskLevel.level
      }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 计算结果
      riskLevel: {},
      //  合并单元格
      mergeCells: [
        {row: 0, col: 1, rowspan: 1, colspan: 5},
        {row: 0, col: 0, rowspan: 2, colspan: 1},
      ],
      form1: {
        radioCheckedL2: '',
        radioCheckedL3: '',
        radioCheckedL4: '',
        radioCheckedL5: '',
        radioCheckedL6: '',
        radioCheckedL7: '',
      },
      gridOptions1: {
        border: true,
        showHeader: false,
        columns: [
          {
            field: 'col1',
            width: 200,
            align: 'center',
          },
          {
            field: 'col2',
            align: 'center',
            width: 160,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [
                    <span style="color: blue">
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedL", rowIndex)}
                                 v-model={this.form1['radioCheckedL' + rowIndex]} label={columnIndex - 1}
                                 content={row.col2}>
                     </vxe-radio>
                  </span>
                  ]
                } else {
                  return row.col2
                }
              }
            }
          },
          {
            field: 'col3',
            align: 'center',
            // width: 600,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [
                    <el-tooltip content={row.col3} disabled={row.col3.length > 10 ? false : true}>
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedL")}
                                 v-model={this.form1['radioCheckedL' + rowIndex]} label={columnIndex - 1}
                                 content={row.col3.length > 9 ? row.col3.slice(0, 10) : row.col3}>
                      </vxe-radio>
                    </el-tooltip>
                  ]
                } else {
                  return row.col3
                }
              }
            }
          },
          {
            field: 'col4',
            align: 'center',
            // width: 600,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [
                    <el-tooltip content={row.col4} disabled={row.col4.length > 10 ? false : true}>
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedL")}
                                 v-model={this.form1['radioCheckedL' + rowIndex]} label={columnIndex - 1}
                                 content={row.col4.length > 9 ? row.col4.slice(0, 10) : row.col4}>
                      </vxe-radio>
                    </el-tooltip>
                  ]
                } else {
                  return row.col4
                }
              }
            }
          },
          {
            field: 'col5',
            align: 'center',
            // width: 600,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [
                    <el-tooltip content={row.col5} disabled={row.col5.length > 10 ? false : true}>
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedL")}
                                 v-model={this.form1['radioCheckedL' + rowIndex]} label={columnIndex - 1}
                                 content={row.col5.length > 9 ? row.col5.slice(0, 18) : row.col5}>
                      </vxe-radio>
                    </el-tooltip>
                  ]
                } else {
                  return row.col5
                }
              }
            }
          },
          {
            field: 'col6',
            align: 'center',
            // width: 600,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [

                    <el-tooltip content={row.col6} disabled={row.col6.length > 10 ? false : true}>
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedL")}
                                 v-model={this.form1['radioCheckedL' + rowIndex]} label={columnIndex - 1}
                                 content={row.col6.length > 9 ? row.col6.slice(0, 18) : row.col6}>
                      </vxe-radio>
                    </el-tooltip>
                  ]
                } else {
                  return row.col6
                }
              }
            }
          },
        ],
        data: [
          {col1: '项目', col2: '取值', col3: '取值', col4: '取值', col5: '取值', col6: '取值'},
          {col1: '0', col2: '0', col3: '1', col4: '2', col5: '3', col6: '4'},
          {
            col1: '火灾危险性类别',
            col2: '不涉及',
            col3: '丁、戊类及其他',
            col4: '丙类',
            col5: '乙类',
            col6: '甲类'
          },
          {
            col1: '化学品急性毒性危害类别',
            col2: '不涉及',
            col3: '类别4、类别5及其他',
            col4: '类别3',
            col5: '类别2',
            col6: '类别1'
          },
          {
            col1: '化学品管控类别',
            col2: '不涉及',
            col3: '/',
            col4: '/',
            col5: '只涉及重点监管危险化学品或特别管控危险化学品',
            col6: '同时涉及重点监管危险化学品和特别管控危险化学品'
          },
          {
            col1: '危险工艺和操作',
            col2: '不涉及',
            col3: '不涉及危险化工工艺和金属有机物合成反应（包括格氏反应），且采用连续操作',
            col4: '不涉及危险工艺和金属有机物合成反应（包括格氏反应），且采用间歇或半连续操作',
            col5: '涉及危险工艺和金属有机物合成反应（包括格氏反应），且采用连续操作',
            col6: '涉及危险工艺或金属有机物合成反应（包括格氏反应），且采用间歇或半连续操作'
          },
          {
            col1: '工艺压力(p，表压)',
            col2: '不涉及',
            col3: '0MPa≤p≤0.1MPa',
            col4: '0.1MPa＜p＜1.6MPa',
            col5: '1.6MPa≤p＜10.0MPa',
            col6: 'p≥10.0MPa'
          },
          {
            col1: '工艺温度（t）',
            col2: '不涉及',
            col3: 't≤20℃',
            col4: '20℃＜t＜150℃',
            col5: '150℃≤t＜450℃',
            col6: 't≥450℃'
          }
        ]
      },
      form2: {
        radioCheckedS2: '',
        radioCheckedS3: '',
        radioCheckedS4: '',
        radioCheckedS5: '',
        radioCheckedS6: '',
        radioCheckedS7: '',
      },
      gridOptions2: {
        border: true,
        showHeader: false,
        columns: [
          {
            field: 'col1',
            width: 200,
            align: 'center',
          },
          {
            field: 'col2',
            align: 'center',
            width: 160,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [
                    <span style="color: blue">
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedS")}
                                 v-model={this.form2['radioCheckedS' + rowIndex]} label={columnIndex}
                                 content={row.col2}>
                     </vxe-radio>
                  </span>
                  ]
                } else {
                  return row.col2
                }
              }
            }
          },
          {
            field: 'col3',
            align: 'center',
            // width: 600,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [
                    <el-tooltip content={row.col3} disabled={row.col3.length > 10 ? false : true}>
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedS")}
                                 v-model={this.form2['radioCheckedS' + rowIndex]} label={columnIndex}
                                 content={row.col3.length > 9 ? row.col3.slice(0, 10) : row.col3}>
                      </vxe-radio>
                    </el-tooltip>
                  ]
                } else {
                  return row.col3
                }
              }
            }
          },
          {
            field: 'col4',
            align: 'center',
            // width: 600,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [
                    <el-tooltip content={row.col4} disabled={row.col4.length > 10 ? false : true}>
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedS")}
                                 v-model={this.form2['radioCheckedS' + rowIndex]} label={columnIndex}
                                 content={row.col4.length > 9 ? row.col4.slice(0, 10) : row.col4}>
                      </vxe-radio>
                    </el-tooltip>
                  ]
                } else {
                  return row.col4
                }
              }
            }
          },
          {
            field: 'col5',
            align: 'center',
            // width: 600,
            slots: {
              // 使用 JSX 渲染
              default: ({row, rowIndex, columnIndex}) => {
                if (rowIndex > 1) {
                  return [
                    <el-tooltip content={row.col5} disabled={row.col5.length > 10 ? false : true}>
                      <vxe-radio on-change={() => this.handleCheckChange("radioCheckedS")}
                                 v-model={this.form2['radioCheckedS' + rowIndex]} label={columnIndex}
                                 content={row.col5.length > 9 ? row.col5.slice(0, 18) : row.col5}>
                      </vxe-radio>
                    </el-tooltip>
                  ]
                } else {
                  return row.col5
                }
              }
            }
          },
        ],
        data: [
          {col1: '项目', col2: '取值', col3: '取值', col4: '取值', col5: '取值', col6: '取值'},
          {col1: '0', col2: '1', col3: '2', col4: '3', col5: '4'},
          {
            col1: '区域与周边相邻区域（包括周边企业）现场人数的最大值',
            col2: '0-2人',
            col3: '3-9人',
            col4: '10-29人',
            col5: '30人及以上',
          },
          {
            col1: '所在企业任一装置设施类区域最大现场人数',
            col2: '0-2人',
            col3: '3-9人',
            col4: '10-29人',
            col5: '30人及以上',
          },
          {
            col1: '区域内危险化学品重大危险源等级',
            col2: '非危险化学品重大危险源',
            col3: '三、四级',
            col4: '二级',
            col5: '一级',
          },
          {
            col1: '企业边界外500米范围内',
            col2: '无防护目标  ',
            col3: '仅涉及1个一般防护目标中的三类防护目标',
            col4: '仅涉及2个一般防护目标中的三类防护目标',
            col5: '涉及防护目标的其他情况',
          },
        ]
      },
      // 计算结果矩阵
      riskResultTable: [
        [{level: "低风险", color: '#00B0F0'}, {level: "低风险", color: '#00B0F0'}, {
          level: "低风险",
          color: '#00B0F0'
        }, {level: "一般风险", color: '#FFFF00'}],
        [{level: "低风险", color: '#00B0F0'}, {level: "一般风险", color: '#FFFF00'}, {
          level: "一般风险",
          color: '#FFFF00'
        }, {level: "较大风险", color: '#ED7D31'}],
        [{level: "低风险", color: '#00B0F0'}, {level: "一般风险", color: '#FFFF00'}, {
          level: "较大风险",
          color: '#ED7D31'
        }, {level: "重大风险", color: '#FF0000'}],
        [{level: "一般风险", color: '#FFFF00'}, {level: "较大风险", color: '#ED7D31'}, {
          level: "重大风险",
          color: '#FF0000'
        }, {level: "重大风险", color: '#FF0000'}],
      ],
      valueLresult: 0,
      valueSresult: 0
    };
  },
  methods: {
    // 计算方法
    handleCheckChange() {
      let valueLresult = 0 //L值计算结果
      let valueSresult = 0 //S值计算结果
      // 循环表单计算结果
      for (let k in this.form1) {
        if (!this.form1[k]) continue
        valueLresult += this.form1[k]
      }
      // L结果除以项目数量然后再向上取整
      valueLresult = Math.ceil(valueLresult / (this.gridOptions1.data.length - 2))
      this.valueLresult = valueLresult
      // 定义临时数组 将每一项S结果放进去 取最大值
      let tempArr = []
      for (let k in this.form2) {
        if (!this.form2[k]) continue
        tempArr.push(this.form2[k])
      }
      // 计算最大值
      // 没有值给予默认值
      valueSresult = tempArr.length > 0 ? Math.max.apply(null, tempArr) : 4
      this.valueSresult = valueSresult
      this.riskLevel = this.riskResultTable[valueLresult - 1 < 0 ? 0 : valueLresult - 1][valueSresult - 1]
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.title {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  font-weight: bold;
}

#riskLevel {
  width: 200px;
  height: 50px;
  margin: 10px auto;
  line-height: 50px;
  text-align: center;
}

.reverse-table .vxe-body--row .vxe-body--column:first-child {
  background-color: #f8f8f9;
}

</style>
