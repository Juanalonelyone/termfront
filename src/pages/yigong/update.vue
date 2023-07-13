<template>
  <div class="pages">
    <div class="info-page">
      <h3>基本信息</h3>
      <div class="info-wrapper">
        <div class="info-list">
          <span class="labels">图像：</span>
          <img :src=imageData alt="Image" class="avatars" style="width: 120px;height: 160px;padding-right: 10px"/>
          <input type="file" @change="handleFileUpload" />
        </div>
        <div class="info-list" style="padding-top: 80px">
          <span class="labels">id：</span>
          <a-input v-model="detail.id" readonly></a-input>
        </div>
        <div class="info-list">
          <span class="labels">姓名：</span>
          <a-input v-model="detail.name"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">年龄：</span>
          <a-input v-model="detail.age"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">性别：</span>
          <a-radio-group name="radioGroup" v-model="detail.gender">
            <a-radio :value="1">
              男
            </a-radio>
            <a-radio :value="2">
              女
            </a-radio>
          </a-radio-group>
        </div>
        <div class="info-list">
          <span class="labels">手机号码：</span>
          <a-input v-model="detail.phone"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">身份ID</span>
          <a-input v-model="detail.id_card"></a-input>
        </div>
      </div>
    </div>

    <div style="text-align: right;">
      <a-button type="primary" @click="update">提交</a-button>
    </div>
  </div>
</template>
<script>
import {selectVol, updateVol} from "@/services/vol";
const formData = new FormData();
export default {
  data() {
    return {
      values: "",
      imageData:null,
      selectedImage:null,
      detail:{
        id:this.$route.query.id.id,
        name:this.$route.query.id.name,
        age:this.$route.query.id.age,
        gender:this.$route.query.id.gender,
        phone:this.$route.query.id.phone,
        id_card:this.$route.query.id.id_card,
      }
    };
  },
  mounted() {
    this.init()
    this.loadImg()
  },
  methods: {
    handleFileUpload(event) {
      const _this = this
      this.selectedImage = event.target.files[0]; // 保存用户选择的第一个图像文件
      const reader = new FileReader();
      reader.onload = () => {
        formData.append('img', _this.selectedImage, "new.jpg");
      }
      reader.readAsDataURL(_this.selectedImage);
    },
    init(){
      console.log(this.detail.gender)
    },
    loadImg(){
      const _this = this
      selectVol(_this.detail.id).then(function (resp){
        _this.imageData = `data:image/png;base64,${resp.data.data.image_info.imageData}`
        console.log( _this.imageData)
      })
    },
    update(){
      const _this = this
      formData.append('vol', JSON.stringify(_this.detail)); // 将老人信息转换为JSON字符串并添加到FormData中
      updateVol(formData).then(function (resp){
        //console.log(resp.data.code)
        if(resp.data.code === 200){
          console.log(200)
          alert(resp.data.msg)
          _this.$router.push("/vol/index");
        }else {
          alert(resp.data.msg)
        }
      })
      console.log(this.detail)
    }
  },
};
</script>
<style lang="less" scoped>
.pages {
  padding: 20px;
  h3 {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 2px solid deepskyblue;
    width: 100px;
    text-align: center;
    color: deepskyblue;
    margin-bottom: 20px;
  }

  background: #fff;
  .info-wrapper {
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // justify-content: space-between;
    width: 30%;
    padding-top: 20px;
    margin: 0 auto;
    .info-list {
      display: flex;
      align-items: center;
      height: 30px;
      // width: 22%;
      margin-bottom: 30px;
      .labels {
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
        flex-shrink: 0;
        width: 100px;
      }
      .values {
        font-size: 16px;
        color: #444;
        font-weight: 500;
      }
    }
  }
}
</style>
