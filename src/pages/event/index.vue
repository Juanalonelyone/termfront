<template>
  <page-layout>
    <div class="pages">
      <div class="search-area">
        <h4>What do you want to find？</h4>
        <div class="inputs">
          <a-input
            v-model="value"
            placeholder="请输入关键词进行搜索"
            @input="searchResult"
          />
        </div>
      </div>

      <a-table :columns="columns" :data-source="data"> </a-table>
    </div>
  </page-layout>
</template>
<script>
import PageLayout from "@/layouts/PageLayout";
const columns = [
  {
    dataIndex: "name",
    title: "姓名",
    key: "name",
    // slots: { title: "customTitle" },
    // scopedSlots: { customRender: "name" },
  },
  {
    title: "身份ID",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "地点",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "时间",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "发生事件",
    key: "action",
    dataIndex: "action",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: "2022-02-22 12:33:13",
    action: "晕倒了",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: "2022-02-22 12:33:13",
    action: "睡觉时间过久",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: "2022-02-22 12:33:13",
    action: "厕所滑到",
  },
];
export default {
  data() {
    return {
      value: "",
      data,
      columns,
      arr: [],
    };
  },
  mounted() {
    this.arr = [...this.data];
  },
  components: { PageLayout },
  methods: {
    searchResult(value) {
      console.log(value.data);
      if (value.data == null || value.data == "") {
        this.data = [
          {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: "2022-02-22 12:33:13",
            action: "晕倒了",
          },
          {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: "2022-02-22 12:33:13",
            action: "睡觉时间过久",
          },
          {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: "2022-02-22 12:33:13",
            action: "厕所滑到",
          },
        ];
      } else {
        this.data = this.data.filter(
          (item) => item.name.indexOf(value.data) != -1
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
.pages {
  background: #fff;
}
.search-area {
  background: #fff;
  padding-bottom: 30px;
  h4 {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    padding-top: 20px;
  }
  .inputs {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
