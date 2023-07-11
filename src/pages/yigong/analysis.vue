<template>
  <div class="analysis">
    <div class="echart-list">
      <div id="echarts22"></div>
      
    </div>
   
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
    
      lastcharts:null
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
      
        this.initLastEcahrts()
      }, 100);
    });
  },
  methods: {
  
    initLastEcahrts() {
      this.lastcharts = echarts.init(document.getElementById("echarts22"));
 
   
      let option = {
        backgroundColor: "#020D20",
       
        title: {
            text: "各年龄段人数统计",
            textStyle: {
              align: "center",
              color: "#fff",
              fontSize: 20,
            },
            top: "5%",
            left: "center",
          },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",

            textStyle: {
              color: "#05294D",
            },
          },
          backgroundColor: "#05294D",
          borderColor: "#135469",
          borderWidth: 2,
          padding: [20, 20, 20, 20],
         
        },
        grid: {
          borderWidth: 0,
          top: "20%",
          left: "65",
          bottom: "25%",
          textStyle: {
            color: "#fff",
          },
        },
     
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.5)",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: "rgba(255,255,255,0.7)",
              fontSize: 18,
            },
            data: ['20-30','30-40','40-50','50-60',],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: "rgba(255,255,255,0.5)",
              fontSize: 20,
            },
            splitArea: {
              show: false,
            },
          },
        ],
      
        series: [
          {
            name: "人数",
            type: "bar",
            // "stack": "总量",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#05F5FF", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#020D20", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            data: [10,20,6,30,2],
          }
        ],
      };
      this.lastcharts.setOption(option, true);
    },
  },
};
</script>

<style lang="less" scoped>
.analysis {
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  #echarts22 {
    width: 100%;
    height: 400px;
  }
}
.echart-list {
  display: flex;
  align-content: center;
  margin-bottom: 30px;
}
</style>
