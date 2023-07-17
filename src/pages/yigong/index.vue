<template>
  <div class="pages">
    <div class="tops">
      <a-form :layout="formLayout">
        <a-form-item
            label="信息"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input placeholder="请输入义工id或姓名" v-model="inputValue"/>
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary" @click="select">
            查询
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="loadData">
            刷新
          </a-button>
        </a-form-item>

      </a-form>
      <a-button type="primary" @click="showModalAdd">
        新增
      </a-button>
    </div>

    <a-table :columns="columns" :data-source="data" style="margin-top: 20px;">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"> 姓名</span>
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag" color="green">
          {{ tag }}
        </a-tag>
      </span>

      <span
          slot="operate"
          slot-scope="id"
          style="display: flex;align-items: center;"
          class="btns"
      >
        <a-button type="danger" @click="deleteV(id.id)">删除</a-button>

        <a-button type="primary" @click="updateInfo(id)">修改</a-button>
        <a-button type="primary" @click="viewInfo(id)">查看</a-button>
      </span>
    </a-table>
    <!-- 新增 -->

    <a-modal
        title="新增"
        width="60%"
        :visible="visibleAdd"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <div>
        <a-form :layout="formLayoutAdd">
          <a-form-item
              label="姓名"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入姓名" v-model="newVol.name"/>
          </a-form-item>
          <a-form-item
              label="手机号"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入手机号" v-model="newVol.phone"/>
          </a-form-item>
          <a-form-item
              label="身份ID"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入身份ID" v-model="newVol.id_card"/>
          </a-form-item>
          <a-form-item
              label="年龄"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入年龄" v-model="newVol.age"/>
          </a-form-item>
          <a-form-item
              label="性别"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-radio-group name="radioGroup" v-model="newVol.gender">
              <a-radio :value="1">
                男
              </a-radio>
              <a-radio :value="2">
                女
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item>
            <div>
              <input type="file" @change="handleFileUpload" />
            </div>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import PageLayout from "@/layouts/PageLayout";
import {addVol, deleteVol, selectAllVol, selectVol} from "@/services/vol";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    customRender: (text) => {
      return text === 1 ? '男' : '女';
    }
  },
  {
    title: "手机号码",
    dataIndex: "phone",
    key: "phone",
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
      formLayout: "inline",
      formLayoutAdd: "inline",
      visibleAdd: false,
      confirmLoading: false,
      loading: false,
      imageUrl: "",
      selectedImage:null,
      newVol:{
        id:'',
        name:'',
        gender:'',
        phone:'',
        id_card:'',
        age:'',
        img_url:'C:/img/wcj.jpg'
      },
      inputValue:''
    };
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { PageLayout },
  mounted() {
    this.arr = [...this.data];
    this.loadData()
  },
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
    handleFileUpload(event) {
      this.selectedImage = event.target.files[0]; // 保存用户选择的第一个图像文件
    },
    loadData(){
      const _this = this
      selectAllVol().then(function (resp){
        _this.data = resp.data.data
      })
    },
    updateInfo(id){
      console.log(id)
      this.$router.push({path:'/vol/index/update/'+id.id,query:{id:id}});
    },
    viewInfo(id) {
      console.log(id)
      this.$router.push({path:'/vol/index/detail/'+id.id,query:{id:id.id}});
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    deleteV(id){
      deleteVol(id).then(function (resp){
        alert(resp.data.msg)
      })
    },
    select(){
      const _this = this
      selectVol(_this.inputValue).then(function (resp){
        _this.data = []
        _this.data.push(resp.data.data)
        //alert(resp.data.msg)
      })
    },
    showModalAdd() {
      this.visibleAdd = true;
    },
    handleOk() {
      const _this = this;
      const reader = new FileReader();
      reader.onload = () => {
        const formData = new FormData();
        formData.append('vol', JSON.stringify(_this.newVol)); // 将老人信息转换为JSON字符串并添加到FormData中
        formData.append('img', _this.selectedImage, "new.jpg");

        // 在这里执行其他对图像内容的操作
        // 例如，你可以将图像内容保存到数据库或进行其他处理

        this.confirmLoading = true;
        setTimeout(() => {
          this.visibleAdd = false;
          this.confirmLoading = false;
          addVol(formData).then(function (resp) { // 修改调用addOld函数的参数
            alert(resp.data.msg);
          });
        }, 2000);
      };

      reader.readAsDataURL(_this.selectedImage); // 开始读取图像数据
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visibleAdd = false;
    },
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    searchResult(value) {
      console.log(value.data);
      if (value.data == null || value.data == "") {
        this.data = [
          {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
          },
          {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
          },
          {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"],
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
::v-deep .ant-form-item {
  margin-bottom: 20px;
}
::v-deep .btns .ant-btn {
  margin-right: 10px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.tops {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pages {
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
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
