<template>
  <div class="pages">
    <div class="left-div">
      <img :src=imageData alt="Image" class="avatars" />
      <div class="name">{{ old_detail.name }}</div>
      <a-button type="primary" @click="updateInfo">编辑义工信息</a-button>
    </div>
    <div class="person">
      <div class="info-page">
        <h3>基本信息</h3>
        <div class="info-wrapper">
          <div class="info-list">
            <span class="labels">姓名：</span>
            <span class="values">{{ old_detail.name }}</span>
          </div>
          <div class="info-list">
            <span class="labels">年龄：</span>
            <span class="values">{{ old_detail.age }}</span>
          </div>
          <div class="info-list">
            <span class="labels">性别：</span>
            <span class="values">{{ old_detail.gender }}</span>
          </div>
          <div class="info-list">
            <span class="labels">手机号码：</span>
            <span class="values">{{ old_detail.phone }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {selectVol} from "@/services/vol";

export default {
  data() {
    return {
      old_detail:{
        name:'',
        gender:'',
        phone:'',
        age:'',
        id_card:'',
        img_url:'',
      },
      imageData:null,
      id:this.$route.query.id
    };
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const _this = this
      selectVol(_this.id).then(function (resp){
        _this.old_detail = resp.data.data
        _this.imageData = `data:image/png;base64,${resp.data.data.image_info.imageData}`
        console.log( _this.imageData)
      })
    },
    updateInfo(){
      this.$router.push({path:'/list/query/update/'+this.id,query:{id:this.old_detail}});
    }
  },
};
</script>
<style lang="less" scoped>
.name {
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.person {
  padding-left: 20px;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  flex: 1;
}
.left-div {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 2px dashed #1890ff;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
}
.tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}
.one {
  color: #1890ff;
}
.two {
  color: #f40;
}
.tagss {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  span {
    font-size: 18px;
    font-weight: bold;
  }
}
.avatars {
  width: 100px;
  height: 160px;
}
.pages {
  display: flex;
  h3 {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 2px solid #1890ff;
    width: 100px;
    text-align: center;
    color: #1890ff;
  }
  padding: 20px;
  //   background: #fff;
  .info-wrapper {
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    padding-top: 20px;
    width: 40%;
    margin: 0 auto;
    .info-list {
      display: flex;
      align-items: center;
      height: 30px;
      // width: 20%;
      margin-bottom: 30px;
      //       box-shadow: 0 0 2px 5px #1890ff;
      .labels {
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
        flex-shrink: 0;
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
