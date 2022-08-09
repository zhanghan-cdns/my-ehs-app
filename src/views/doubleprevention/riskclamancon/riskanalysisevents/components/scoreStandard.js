// 可能性
export const possibility = [
  {
    label: 10,
    value: "完全可以预料；10分"
  },
  {
    label: 6,
    value: "相当可能；6分"
  },
  {
    label: 3,
    value: "可能，但不经常；3分"
  },
  {
    label: 1,
    value: "可能性小，完全意外；1分"
  },
  {
    label: 0.5,
    value: "很不可能，可以设想；0.5分"
  },
  {
    label: 0.2,
    value: "极不可能；0.2分"
  },
  {
    label: 0.1,
    value: "实际不可能；0.1分"
  },
]
// 暴露评率
export const exposureRate = [
  {
    label: 10,
    value: "连续暴露；10分"
  },
  {
    label: 6,
    value: "每天工作时间内暴露；6分"
  },
  {
    label: 3,
    value: "每周一次或偶然暴露；3分"
  },
  {
    label: 2,
    value: "每月一次暴露；2分"
  },
  {
    label: 1,
    value: "每年几次暴露；1分"
  },
  {
    label: 0.5,
    value: "非常罕见地暴露；0.5分"
  },
]
// 严重程度
export const severity = [
  {
    label: 100,
    value: "10人以上死亡；100分"
  },
  {
    label: 40,
    value: "3~9人死亡；40分"
  },
  {
    label: 15,
    value: "1~2人死亡；15分"
  },
  {
    label: 7,
    value: "可严重；7分"
  },
  {
    label: 3,
    value: ">重大，伤残；3分"
  },
  {
    label: 1,
    value: "引人注意；1分"
  },
]
// 事故发生的可能性
export const accidentProbability = [
  {
    label: 1,
    value: "极不可能；1分"
  },
  {
    label: 2,
    value: "很不可能，可以设想；2分"
  },
  {
    label: 3,
    value: "可能性小，完全意外；3分"
  },
  {
    label: 4,
    value: "可能但不经常；4分"
  },
  {
    label: 5,
    value: "很可能；5分"
  },
  {
    label: 0.2,
    value: "极不可能；0.2分"
  },
  {
    label: 0.1,
    value: "实际不可能；0.1分"
  },
]
// 事故后果严重性
export const accidentConsequences = [
  {
    label: 1,
    value: "轻，无人员伤亡，无经济损失；1分"
  },
  {
    label: 2,
    value: "较轻，导致轻伤，财产损失较小；2分"
  },
  {
    label: 3,
    value: "较重，导致重伤，财产损失较大；3分"
  },
  {
    label: 4,
    value: "严重，一人死亡或多人重伤，财产损失很大；4分"
  },
  {
    label: 5,
    value: "灾难，导致多人死亡或巨大财产损失；5分"
  },
]
// 网格数据
export const gridData = [
  [
    {
      text: '',
      background: '#f3f3f3',
      color: '',
      width: '125px',
      interval: [],//区间
    },
    {
      text: '≤90',
      background: '#f3f3f3',
      color: '',
      width: '125px',
      interval: [90],//区间
      rowIndex: 4,
      value: '低风险',
      key:'DOUBLE_PREVENTION_RISK_LEVEL:LOW'
    },
    {
      text: '100~155',
      background: '#f3f3f3',
      color: '',
      width: '125px',
      interval: [100, 155],//区间
      rowIndex: 3,
      value: '一般风险',
      key:'DOUBLE_PREVENTION_RISK_LEVEL:COMMONLY'
    },
    {
      text: '160~319',
      background: '#f3f3f3',
      color: '',
      width: '125px',
      interval: [156, 309],//区间
      rowIndex: 2,
      value: '较大风险',
      key:'DOUBLE_PREVENTION_RISK_LEVEL:MORE'
    },
    {
      text: '≥310',
      background: '#f3f3f3',
      color: '',
      width: '125px',
      interval: [310],//区间
      rowIndex: 1,
      value: '重大风险',
      key:'DOUBLE_PREVENTION_RISK_LEVEL:MAJOR'
    },
  ],
  [
    {
      text: '重大风险',
      background: '#FF0000',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
  ],
    [
    {
      text: '较大风险',
      background: '#FF6600',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
  ],
  [
    {
      text: '一般风险',
      background: '#FFFF1A',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',

      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
  ],
  [
    {
      text: '低风险',
      background: '#3399FF',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',
      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',

      color: '',
      width: '125px'
    },
    {
      text: '',
      background: '#fff',

      color: '',
      width: '125px'
    },
  ],
]
// 设置lec等级
export const setLecGridData = [
  [
    {
      text: '重大风险',
      background: 'red',
      input: false,
    },
    {
      text: '',
      background: '#fff',
      input: true,
      value: 'significantValueAtRisk'
    },
    {
      text: '~',
      background: '#fff',
      input: false,
    },
    {
      text: '',
      background: '#fff',
      input: false,
    },
  ],
  [
    {
      text: '较大风险',
      background: '#FF6600',
      input: false,
    },
    {
      text: '',
      background: '#fff',
      input: true,
      value: 'highRiskLowValue'
    },
    {
      text: '~',
      background: '#fff',
      input: false,
    },
    {
      text: '',
      background: '#fff',
      input: true,
      value: 'highRisk'
    },
  ],
  [
    {
      text: '一般风险',
      background: '#FFFF1A',
      input: false,
    },
    {
      text: '',
      background: '#fff',
      input: true,
      value: 'lowGeneralRisk'
    },
    {
      text: '~',
      background: '#fff',
      input: false,
    },
    {
      text: '',
      background: '#fff',
      input: true,
      value: 'generalHighRisk'
    },
  ],
  [
    {
      text: '低风险',
      background: '#3399FF',
      input: false,
    },
    {
      text: '',
      background: '#fff',
      input: false,
    },
    {
      text: '~',
      background: '#fff',

      input: false,
    },
    {
      text: '',
      background: '#fff',
      input: true,
      value: 'lowRisk'
    },
  ]
]
