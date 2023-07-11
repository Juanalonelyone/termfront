<template>
  <div class="common-layout " ref="vantaRef" style="width: 100%; height: 100vh" >
    <div class="content"><slot></slot></div>
      <page-footer ></page-footer>
   
  </div>
</template>

<script>
import PageFooter from '@/layouts/footer/PageFooter'

import * as THREE from 'three'//导入样式
import BIRDS from 'vanta/src/vanta.birds'//导入动态样式逻辑
export default {
  name: 'CommonLayout',
  components: {PageFooter},
  data(){
    return {
      vantaEffect:null
    }
  },
  mounted(){
    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef,
      THREE: THREE
    })
     // 修改颜色时 cells 需要全大写字母 可生效
    VANTA.BIRDS({
      el: this.$refs.vantaRef,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      color1: 14381274,
      color2: 16443110,
    });
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },
}
</script>

<style scoped lang="less">
#large-header{
  width: 100%;
  height: 100%;
}
.common-layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: @layout-body-background;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;
  .large-header{
    background: url('../assets/demo.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .content{
    padding: 32px 0;
    flex: 1;
 
    // position: fixed;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%,-50%);
    @media (min-width: 768px){

      padding: 112px 0 24px;
    }
  }
}
</style>
