<template>
  <div class="pages">
    <div class="tops">
      <a-form :layout="formLayout">
        <a-form-item
          label="姓名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input placeholder="请输入义工姓名" />
        </a-form-item>
        <a-form-item
          label="房间号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input placeholder="请输入义工房间号" />
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary">
            查询
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
      <span slot="action">
        <img
          src="../../assets/avatars.png"
          alt=""
          style="width: 100px;height: 80px;"
        />
      </span>
      <span
        slot="operate"
        slot-scope="id"
        style="display: flex;align-items: center;"
        class="btns"
      >
        <a-button type="danger">删除</a-button>

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
            <a-input placeholder="请输入义工姓名" />
          </a-form-item>
          <a-form-item
            label="手机号"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入义工手机号" />
          </a-form-item>
          <a-form-item
            label="身份ID"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入义工身份ID" />
          </a-form-item>

          <a-form-item
            label="年龄"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入义工年龄" />
          </a-form-item>
          <a-form-item
            label="性别"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-radio-group name="radioGroup" :default-value="1">
              <a-radio :value="1">
                男
              </a-radio>
              <a-radio :value="2">
                女
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import PageLayout from "@/layouts/PageLayout";
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
    dataIndex: "address",
    key: "address",
  },
  {
    title: "手机号",
    dataIndex: "phone",
    key: "phone",
  },


  {
    title: "操作",
    key: "operate",
    scopedSlots: { customRender: "operate" },
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: [11],
    id: 1,
    phone: "13345678800",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: [12],
    id: 2,
    phone: "13345678800",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: [13],
    id: 3,
    phone: "13345678800",
  },
];
export default {
  data() {
    return {
      value: "",
      data,
      columns,
      arr: [],
      formLayout: "inline",
      formLayoutAdd: "inline",
      visibleAdd: false,
      confirmLoading: false,
      loading: false,
      imageUrl: "",
    };
  },
  components: { PageLayout },
  mounted() {
    this.arr = [...this.data];
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
    updateInfo(id) {
      this.$router.push("/result/success/update/" + id.id);
    },
    viewInfo(id) {
      console.log(id);
      this.$router.push("/result/success/detail/" + id.id);
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
    showModalAdd() {
      this.visibleAdd = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visibleAdd = false;
        this.confirmLoading = false;
      }, 2000);
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
            phone: "13345678800",
          },
          {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
            phone: "13345678800",
          },
          {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"],
            phone: "13345678800",
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
