<template>
  <div class="footer">
    <!-- 这是页脚信息 -->
  </div>
</template>

<script>
export default {
  name: "PageFooter",
  props: ["copyright", "linkList"],
};
</script>

<style lang="less" scoped>
.footer {
  padding: 48px 16px 24px;
  // background: #fff;
  /*margin: 48px 0 24px;*/
  text-align: center;
  .copyright {
    color: @text-color-second;
    font-size: 14px;
    i {
      margin: 0 4px;
    }
  }
  .links {
    margin-bottom: 8px;
    a:not(:last-child) {
      margin-right: 40px;
    }
    a {
      color: @text-color-second;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
}
</style>
