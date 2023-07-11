<template>
  <div class="pages">
    <div class="left-div">
      <img src="../../assets/avatars.png" alt="" class="avatars" />
      <div class="name">张三丰</div>
      <p>所有不合时宜的相遇就是遗憾</p>
      <a-button type="primary" @click="updateInfo">编辑员工信息</a-button>
      <div class="tag">
        <div class="tagss">
          <span class="one">2018-03-09</span>
          <span class="one">入职日期</span>
        </div>
        <div class="tagss">
          <span class="two">2022-04-09</span>
          <span class="two">离职日期</span>
        </div>
      </div>
    </div>
    <div class="person">
      <div class="info-page">
        <h3>基本信息</h3>
        <div class="info-wrapper">
          <div class="info-list">
            <span class="labels">姓名：</span>
            <span class="values">张三丰</span>
          </div>
          <div class="info-list">
            <span class="labels">年龄：</span>
            <span class="values">77</span>
          </div>
          <div class="info-list">
            <span class="labels">性别：</span>
            <span class="values">男</span>
          </div>
          <div class="info-list">
            <span class="labels">手机号码：</span>
            <span class="values">13345678800</span>
          </div>

          <div class="info-list">
            <span class="labels">身份ID：</span>
            <span class="values">3</span>
          </div>
        </div>
      </div>
      <!-- <div class="info-page">
        <h3>护工信息</h3>
        <div class="info-wrapper">
          <div class="info-list">
            <span class="labels">姓名：</span>
            <span class="values">张三丰</span>
          </div>
          <div class="info-list">
            <span class="labels">年龄：</span>
            <span class="values">77</span>
          </div>
          <div class="info-list">
            <span class="labels">性别：</span>
            <span class="values">男</span>
          </div>
          <div class="info-list">
            <span class="labels">手机号码：</span>
            <span class="values">13345678800</span>
          </div>
          <div class="info-list">
            <span class="labels">现有子女：</span>
            <span class="values">3</span>
          </div>
          <div class="info-list">
            <span class="labels">籍贯：</span>
            <span class="values">3</span>
          </div>
          
          <div class="info-list">
            <span class="labels">头像：</span>
            <span class="values">
              <img
                src="../../assets/img/logo.png"
                alt=""
                style="width: 100px;height: 80px;"
              />
            </span>
          </div>
          <div class="info-list">
            <span class="labels">房间号：</span>
            <span class="values">3</span>
          </div>
          <div class="info-list">
            <span class="labels">家庭住址：</span>
            <span class="values">江苏省南京市江宁区牛首山XXX号</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    updateInfo() {
      this.$router.push("/yuangong/basic/update/1");
    },
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
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  background: #fff;
  padding: 20px;
  
}
.left-div {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 2px dashed #1890ff;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
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
