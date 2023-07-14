<template>
  <page-layout>
    <div class="pages">
      <a-table :columns="columns" :data-source="data">
        <span
            slot="operate"
            slot-scope="id"
            style="display: flex;align-items: center;"
            class="btns">
          <a-button type="primary" @click="viewInfo(id.id)">查看图片</a-button>
          <a-button type="danger" @click="deleteEvent(id.id)" style="margin-left: 10px">删除</a-button>
        </span>
      </a-table>
      <dialog v-show="isShow" style="display: flex;flex-direction: column">
        <img :src=imageData alt="Image" class="avatars" style="width: 640px;height: 480px;margin-bottom: 10px"/>
        <a-button type="primary" @click="closeDialog" style="width: 70px;margin: auto">关闭</a-button>
      </dialog>
    </div>

  </page-layout>
</template>
<script>
import PageLayout from "@/layouts/PageLayout";
import {deleteEvent, selectAllEvent, selectEvent} from "@/services/event";
const columns = [
  {
    dataIndex: "name",
    title: "姓名",
    key: "name",
  },
  {
    title: "地点",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "时间",
    key: "time",
    dataIndex: "time",
  },
  {
    title: "发生事件",
    key: "desc",
    dataIndex: "desc",
  },
  {
    title: "操作",
    key: "operate",
    scopedSlots: { customRender: "operate" },
  },
];
export default {
  data() {
    return {
      value: "",
      data:[],
      columns,
      arr: [],
      isShow:false,
      imageData:null
    };
  },
  mounted() {
    this.loadData()
  },
  components: { PageLayout },
  methods: {
    loadData() {
      const _this = this
      selectAllEvent().then(function (resp){
        _this.data =resp.data.data
        console.log(_this.data)
      })
    },
    viewInfo(id){
      const _this = this
      selectEvent(id).then(function (resp){
        _this.imageData = `data:image/png;base64,${resp.data.data.image_info.imageData}`
        _this.isShow = true
      })
    },
    deleteEvent(id){
      deleteEvent(id).then(function (resp){
        alert(resp.data.msg)
      })
    },
    closeDialog(){
      this.isShow = false
    }
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
