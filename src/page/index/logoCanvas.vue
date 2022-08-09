<template>
    <div id="myChart"></div>
</template>

<script>
import echarts from "echarts";
import 'echarts-liquidfill';

export default {
    data() {
        return {
        }
    },
    props:{
        value: {
            type: String,
            default: ''
        },
    },
    mounted(){
        this.liquidCharts()
    },
    methods:{
        liquidCharts() {
            let myChart = echarts.init(document.getElementById("myChart"));
            let option = null;
            option = {
                series: [
                {
                    type: "liquidFill",
                    name: "已用槽", // 系列名称，用于tooltip的显示，legend 的图例筛选
                    radius: "85%", // 水球图的半径
                    center: ["52%", "55%"], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
                    // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
                    // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
                    shape: "circle",
                    phase: 0, // 波的相位弧度 不设置  默认自动
                    direction: "right", // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
                    outline: {
                    show: true,
                    borderDistance: 0, // 边框线与图表的距离 数字
                    // 图形样式
                    itemStyle: {
                        // opacity: 0.9, // 边框的透明度   默认为 1
                        borderWidth: 3, // 边框的宽度
                        // shadowBlur: 14, // 边框的阴影范围 一旦设置了内外都有阴影
                        // shadowColor: "#fff", // 边框的阴影颜色,
                        // borderColor: borderC // 边框颜色
                        borderColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 0,
                                color: '#5acef2',
                            },
                            {
                                offset: 0.4,
                                color: '#5073fb',
                            },
                                {
                                offset: 0.7,
                                color: '#6ae8d8',
                            },
                            {
                                offset: 1,
                                color: '#5acef2',
                            }
                        ])
                    }
                    },
                    backgroundStyle: {
                        color: "#144182" // 水球未到的背景颜色
                    },
                    // 图形的高亮样式
                    emphasis: {
                        itemStyle: {
                            opacity: 1 // 鼠标经过波浪颜色的透明度
                        }
                    },
                    // 图形上的文本标签
                    label: {
                        normal:{
                            fontSize: 30,
                            fontWeight: 500,
                            color: '#fff',
                            formatter: (params)=>{
                                return this.value 
                            }
                        }
                    },
                    color: [
                    {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [
                            {
                            offset: 0,
                            color:"#324791"
                        },
                        {
                            offset: 1,
                            color:"#449090"
                        },
                        
                        ],
                        global: false // 缺省为 false
                    }
                    ],
                    data: [0.5,0.45,0.35] // 系列中的数据内容数组
                },
                ]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            window.onresize = myChart.resize
        },

    }
}
</script>

<style>

</style>