<template>
  <div class="pages">
    <div class="info-page">
      <h3>基本信息</h3>
      <div class="info-wrapper">
        <div class="info-list">
          <span class="labels">姓名：</span>
          <a-input v-model="values"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">年龄：</span>
          <a-input v-model="values"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">性别：</span>
          <a-radio-group name="radioGroup" :default-value="1">
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
            <a-input v-model="values"></a-input>
          </div>
        <div class="info-list">
          <span class="labels">身份ID：</span>
          <a-input v-model="values"></a-input>
        </div>
       
      </div>
    </div>
    <!-- <div class="info-page">
      <h3>护工信息</h3>
      <div class="info-wrapper">
        <div class="info-list">
          <span class="labels">姓名：</span>
          <a-input v-model="values"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">年龄：</span>
          <a-input v-model="values"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">性别：</span>
          <a-input v-model="values"></a-input>
        </div>
        <div class="info-list">
            <span class="labels">手机号码：</span>
            <a-input v-model="values"></a-input>
          </div>
        <div class="info-list">
          <span class="labels">现有子女：</span>
          <a-input v-model="values"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">籍贯：</span>
          <a-input v-model="values"></a-input>
        </div>
        <div class="info-list">
          <span class="labels">家庭住址：</span>
          <a-input v-model="values"></a-input>
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
          <a-input v-model="values"></a-input>
        </div>
      </div>
    </div> -->
    <div style="text-align: right;">
        <a-button type="primary">提交</a-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      values: "",
    };
  },
  methods: {},
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
    padding-top: 20px;
    width: 40%;
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
