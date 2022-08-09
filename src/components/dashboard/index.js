// 重大危险源系统
const MajorDangerSourceDashboard = () => import('./zdwxy/dashboard.vue') //重大危险源首页
const AbnormalCharts = ()=>import('./zdwxy/abnormalCharts.vue')
export default {
  zdwxy: {
    system: "重大危险源系统",
    dashboard: MajorDangerSourceDashboard,
    layout: [
      { "x": 0, "y": 0, "w": 1.5, "h": 6, "i": "0","c":AbnormalCharts},
      { "x": 1.5, "y": 0, "w": 6, "h": 6, "i": "1" },
      { "x": 7.5, "y": 0, "w": 2, "h": 6, "i": "2" },
      { "x": 9.5, "y": 0, "w": 2.5, "h": 13.5, "i": "3" },
      { "x": 0, "y": 6, "w": 2, "h": 7.5, "i": "4" },
      { "x": 2, "y": 6, "w": 3, "h": 7.5, "i": "5" },
      { "x": 5, "y": 6, "w": 2, "h": 7.5, "i": "6" },
      { "x": 7, "y": 6, "w": 2.5, "h": 7.5, "i": "7" },
      { "x": 0, "y": 12, "w": 8, "h": 7, "i": "8" },
      { "x": 8, "y": 12, "w": 4, "h": 7, "i": "9" },
    ]
  }
}

