<template>
  <page-layout>
    <div class="pages">
      <a-button type="primary" @click="addCap()" style="margin-left: 10px">新增</a-button>
      <a-table :columns="columns" :data-source="data">
        <span
            slot="operate"
            slot-scope="id"
            style="display: flex;align-items: center;"
            class="btns">
          <a-button type="primary" @click="updateCap(id)" style="margin-left: 10px">修改</a-button>
          <a-button type="danger" @click="deleteCap(id.id)" style="margin-left: 10px">删除</a-button>
        </span>
      </a-table>



<!--      新增摄像头-->
      <a-modal
          title="新增"
          width="60%"
          :visible="visibleAdd"
          :confirm-loading="confirmLoading"
          @ok="add"
          @cancel="handleCancel"
      >
        <div>
          <a-form :layout="formLayoutAdd">
            <a-form-item
                label="名字"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input placeholder="请输入摄像头名字" v-model="newCaps.name"/>
            </a-form-item>
            <a-form-item
                label="url"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input placeholder="请输入摄像头url" v-model="newCaps.url"/>
            </a-form-item>
            <a-form-item
                label="功能"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-checkbox-group v-model="newCap.methods">
                <a-checkbox :value="1">人脸识别</a-checkbox>
                <a-checkbox :value="2">摔倒检测</a-checkbox>
                <a-checkbox :value="3">火灾检测</a-checkbox>
                <a-checkbox :value="4">暴力检测</a-checkbox>
                <a-checkbox :value="5">情绪识别</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>


      <!--      更新摄像头-->
      <a-modal
          title="更新"
          width="60%"
          :visible="visibleUpdate"
          :confirm-loading="confirmLoading"
          @ok="update()"
          @cancel="handleCancel"
      >
        <div>
          <a-form :layout="formLayoutAdd">
            <a-form-item
                label="名字"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input placeholder="请输入修改后摄像头名字" v-model="newCaps.name"/>
            </a-form-item>
            <a-form-item
                label="url"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input placeholder="请输入修改后摄像头url" v-model="newCaps.url"/>
            </a-form-item>
            <a-form-item
                label="功能"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-checkbox-group v-model="newCap.methods">
                <a-checkbox :value="1">人脸识别</a-checkbox>
                <a-checkbox :value="2">摔倒检测</a-checkbox>
                <a-checkbox :value="3">火灾检测</a-checkbox>
                <a-checkbox :value="4">暴力检测</a-checkbox>
                <a-checkbox :value="5">情绪识别</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>

  </page-layout>
</template>
<script>
import PageLayout from "@/layouts/PageLayout";
import {addCap, deleteCap, selectAllCap, updateCap} from "@/services/cap";
const columns = [
  {
    dataIndex: "name",
    title: "姓名",
    key: "name",
  },
  {
    title: "url",
    key: "url",
    dataIndex: "url",
  },
  {
    title: "人脸识别",
    key: "has_face",
    dataIndex: "has_face",
  },
  {
    title: "摔倒检测",
    key: "has_fall",
    dataIndex: "has_fall",
  },
  {
    title: "火灾检测",
    key: "has_fire",
    dataIndex: "has_fire",
  },
  {
    title: "暴力检测",
    key: "has_violence",
    dataIndex: "has_violence",
  },
  {
    title: "情绪识别",
    key: "has_emotion",
    dataIndex: "has_emotion",
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
      imageData:null,
      formLayout: "inline",
      formLayoutAdd: "inline",
      visibleAdd: false,
      visibleUpdate:false,
      confirmLoading: false,
      loading: false,
      newCap:{
        methods:[]
      },
      newCaps:{
        id:'',
        name:'',
        url:'',
        has_face:'',
        has_fall:'',
        has_fire:'',
        has_violence:'',
        has_emotion:''
      }
    };
  },
  mounted() {
    this.loadData()
  },
  components: { PageLayout },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
          ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
          : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
          ? {
            wrapperCol: { span: 14, offset: 4 },
          }
          : {};
    },
  },
  methods: {
    loadData() {
      const _this = this
      selectAllCap().then(function (resp){
        _this.data =resp.data.data
        console.log(_this.data)
      })
    },
    deleteCap(id){
      deleteCap(id).then(function (resp){
        alert(resp.data.msg)
      })
    },
    update(){
      const _this = this
      _this.handleOk()
      console.log(_this.newCaps)
      updateCap(_this.newCaps).then(function (resp){
        alert(resp.data.msg)
        _this.handleCancel()
      })
    },
    addCap(){
      this.visibleAdd = true;
    },
    updateCap(id){
      this.visibleUpdate = true;
      this.newCaps.id = id.id
      this.newCaps.url = id.url
      this.newCaps.name = id.name
    },
    handleCancel() {
      this.visibleAdd = false;
      this.visibleUpdate = false;
      this.newCap.methods=[]
    },
    add(){
      const _this = this
      _this.handleOk()
      console.log(_this.newCaps)
      addCap(_this.newCaps).then(function (resp){
        console.log(resp.data.msg)
        _this.handleCancel()
      })
    },
    handleOk(){
      const _this = this
      if(_this.newCap.methods.includes(1)){
        _this.newCaps.has_face = 1
      }else {
        _this.newCaps.has_face = 0
      }
      if(_this.newCap.methods.includes(2)){
        _this.newCaps.has_fall = 1
      }else {
        _this.newCaps.has_fall = 0
      }
      if(_this.newCap.methods.includes(3)){
        _this.newCaps.has_fire = 1
      }else {
        _this.newCaps.has_fire = 0
      }
      if(_this.newCap.methods.includes(4)){
        _this.newCaps.has_violence = 1
      }else {
        _this.newCaps.has_violence = 0
      }
      if(_this.newCap.methods.includes(5)){
        _this.newCaps.has_emotion = 1
      }else {
        _this.newCaps.has_emotion = 0
      }
      console.log(_this.newCap.methods)
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
