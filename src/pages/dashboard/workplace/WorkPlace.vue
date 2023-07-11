<template>
  <page-layout>
    <div slot="headerContent">
      <div class="title">近几个月养老院人数变化数据表</div>
    </div>
    <a-card :bordered="false">
      <div style="display: flex; flex-wrap: wrap">
          <head-info title="目前养老院的老年人数量" content="8个" :bordered="true"/>
          <head-info title="目前养老院的工作人员数量" content="32个" :bordered="true"/>
          <head-info title="目前养老院的义工数量" content="24个"/>
      </div>

      <a-row style="margin: 0 -12px;margin-top: 40px;" >
        <div>
          <a-table :columns="columns" :data-source="data">
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
        </div>
      
      </a-row>
    </a-card>
    <!-- <template slot="extra">
      <head-info
        class="split-right"
        title="目前养老院的老年人数量"
        content="56"
      />
      <head-info
        class="split-right"
        title="目前养老院的工作人员数量"
        content="8/24"
      />
      <head-info
        class="split-right"
        title="目前养老院的义工数量"
        content="2,223"
      />
    </template> -->
   
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import HeadInfo from "@/components/tool/HeadInfo";

import { mapState } from "vuex";
import { request, METHOD } from "@/utils/request";
import * as echarts from "echarts";
// const columns = [
//   {
//     title: "日期",
//     dataIndex: "no",
//   },
//   {
//     title: "进入养老院老人人数",
//     dataIndex: "description",
//     scopedSlots: { customRender: "description" },
//   },
//   {
//     title: "离开养老院老人人数",
//     dataIndex: "callNo",

//     needTotal: true,
//     customRender: (text) => text + " 次",
//   },
//   {
//     dataIndex: "入职工作人员人数",
//     needTotal: true,
//   },
//   {
//     title: "访问义工人数",
//     dataIndex: "updatedAt",
//   },
// ];
const columns = [
  {
    title: '日期',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '进入养老院老人人数',
    dataIndex: 'age',
    key: 'age',
    // width: 80,
  },
  {
    title: '离开养老院老人人数',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: '入职工作人员人数',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: '访问义工人数',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
 
];

const data = [
  {
    key: '1',
    name: '2022-09-01 12:34:44',
    age: 32,
    address: '1',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: '2022-09-01 12:34:44',
    age: 42,
    address: '2',
    tags: ['loser'],
  },
  {
    key: '3',
    name: '2022-09-01 12:34:44',
    age: 32,
    address: '3',
    tags: ['cool', 'teacher'],
  },
];
export default {
  name: "WorkPlace",
  components: { HeadInfo, PageLayout },
  i18n: require("./i18n"),
  data() {
    return {
      projects: [],
      data,
      echart:null,
      loading: true,
      activities: [],
      teams: [],
      welcome: {
        timeFix: "",
        message: "",
      },
      advanced: true,
      columns: columns,
      dataSource: [],
      selectedRows: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  authorize: {
    deleteRecord: "delete",
  },
  mounted() {
    this.getData();
  
  },
  computed: {
    ...mapState("account", { currUser: "user" }),
    ...mapState("setting", ["lang"]),
  },
  created() {
  
  },
  methods: {
    initEcharts() {
     this.echart = echarts.init(document.getElementById("echarts"));
      let option = {
        title: {
          text: "2023年下半年养老院每月老年人数量变化图",
          textStyle: {
            align: "center",
            color: "#fff",
            fontSize: 20,
          },
          top: "3%",
          left: "10%",
        },
        backgroundColor: "#0f375f",
        grid: {
          top: "25%",
          bottom: "10%", //也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        // legend: {
        //   data: ["销售水量", "主营业务"],
        //   top: "15%",
        //   textStyle: {
        //     color: "#ffffff",
        //   },
        // },
        xAxis: {
          data: [
            "当年完成水量",
            "去年同期水量",
            "滚动目标值水量",
            "全年目标值水量",
            "当年完成金额",
            "去年同期金额",
            "滚动目标金额",
            "全年目标值",
          ],
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#01FCE3",
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#ebf8ac", //X轴文字颜色
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "亿元",
            nameTextStyle: {
              color: "#ebf8ac",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#FFFFFF",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ebf8ac",
              },
            },
          },
          {
            type: "value",
            name: "同比",
            nameTextStyle: {
              color: "#ebf8ac",
            },
            position: "right",
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                color: "#ebf8ac",
              },
            },
          },
          {
            type: "value",
            gridIndex: 0,
            min: 50,
            max: 100,
            splitNumber: 8,
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
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
              },
            },
          },
        ],
        series: [
          {
            name: "销售水量",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#058cff",
            },
            lineStyle: {
              color: "#058cff",
            },
            areaStyle: {
              color: "rgba(5,140,255, 0.2)",
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
          },
          {
            name: "主营业务",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00FFE3",
                  },
                  {
                    offset: 1,
                    color: "#4693EC",
                  },
                ]),
              },
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
          },
        ],
      };

      this.echart.setOption(option, true);
    },
    onPageChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
   
    },
    getData() {
      // request(process.env.VUE_APP_API_BASE_URL + "/list", "get", {
      //   page: this.pagination.current,
      //   pageSize: this.pagination.pageSize,
      // }).then((res) => {
      //   const { list, page, pageSize, total } = res?.data?.data ?? {};
      //   this.dataSource = list;
      //   this.pagination.current = page;
      //   this.pagination.pageSize = pageSize;
      //   this.pagination.total = total;
      // });
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter((item) => item.key !== key);
      this.selectedRows = this.selectedRows.filter((item) => item.key !== key);
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    remove() {
      this.dataSource = this.dataSource.filter(
        (item) =>
          this.selectedRows.findIndex((row) => row.key === item.key) === -1
      );
      this.selectedRows = [];
    },
    onClear() {
      this.$message.info("您清空了勾选的所有行");
    },
    onStatusTitleClick() {
      this.$message.info("你点击了状态栏表头");
    },
    onChange() {
      this.$message.info("表格状态改变了");
    },
    onSelectChange() {
      this.$message.info("选中行改变了");
    },
    addNew() {
      this.dataSource.unshift({
        key: this.dataSource.length,
        no: "NO " + this.dataSource.length,
        description: "这是一段描述",
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: "2018-07-26",
      });
    },
    handleMenuClick(e) {
      if (e.key === "delete") {
        this.remove();
      }
    },
  },
};
</script>

<style lang="less">
@import "index";
.split-right {
  font-weight: bold;
}
#echarts {
  width: 100%;
  height: 500px;
}
</style>
