<template>
  <div class="video-page">
    <div class="video-row">
      <div class="video-container">
        <img :src=src1 class="video-js">
        <select id="1" v-model="selectSource1">
          <option value="">请选择</option>
          <option v-for="source in sources" :key="source.id" :value="source.id">{{ source.name }}</option>
        </select>
        <a-button type="primary" @click="changeSource">
          切换
        </a-button>
      </div>

      <div class="video-container">
        <img :src=src2 class="video-js">
        <select id="2" v-model="selectSource2">
          <option value="">请选择</option>
          <option v-for="source in sources" :key="source.id" :value="source.id">{{ source.name }}</option>
        </select>
        <a-button type="primary" @click="changeSource">
          切换
        </a-button>
      </div>
    </div>

<!--    <div class="video-row">-->
<!--      <div class="video-container">-->
<!--        <img id="video3" class="video-js">-->
<!--        <select id="3" v-model="selectSource3">-->
<!--          <option value="">请选择</option>-->
<!--          <option v-for="source in sources" :key="source.id" :value="source.id">{{ source.name }}</option>-->
<!--        </select>-->
<!--        <a-button type="primary" @click="changeSource">-->
<!--          切换-->
<!--        </a-button>-->
<!--      </div>-->

<!--      <div class="video-container">-->
<!--        <img id="video4" class="video-js">-->
<!--        <select id="4" v-model="selectSource4">-->
<!--          <option value="">请选择</option>-->
<!--          <option v-for="source in sources" :key="source.id" :value="source.id">{{ source.name }}</option>-->
<!--        </select>-->
<!--        <a-button type="primary" @click="changeSource">-->
<!--          切换-->
<!--        </a-button>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>
<script>

import videojs from 'video.js';
import "video.js/dist/video-js.css";
import {selectAllCap} from "@/services/cap";
export default {
  mounted() {
    this.getSources()
    // this.loadVideo()
  },
  data() {
    return {
      selectSource1:'1', // 用于绑定选择的视频流
      selectSource2:'2', // 用于绑定选择的视频流
      // selectSource3:'3', // 用于绑定选择的视频流
      // selectSource4:'4', // 用于绑定选择的视频流
      src1:"http://127.0.0.1:8000/video/1",
      src2:"http://127.0.0.1:8000/video/2",
      // src3:"http://127.0.0.1:8000/video3/3",
      // src4:"http://127.0.0.1:8000/video4/4",
      sources: [],
    };
  },
  methods: {
    async changeSource() {
      _this.stopVideoStream()
      await sleep(300)
      _this.enableeVideoStream()
      const _this = this
      const variables = new Set([
        this.selectSource1,
        this.selectSource2,
        // this.selectSource3,
        // this.selectSource4
      ]);
      // const video_id = event.target.parentNode.id
      if (variables.size === 2) {
        _this.src1 = "http://127.0.0.1:8000/video/" + _this.selectSource1
        _this.src2 = "http://127.0.0.1:8000/video/" + _this.selectSource2
        // _this.src3 = "http://127.0.0.1:8000/video3/" + _this.selectSource3
        // _this.src4 = "http://127.0.0.1:8000/video4/" + _this.selectSource4
        _this.loadVideo()
      } else {
        alert("error:该摄像头视频正在播放中，请勿重复选择！！！")
      }
    },
    getSources(){
      const _this = this
      selectAllCap().then(function (resp){
        _this.sources = resp.data.data
        console.log(_this.sources)
      })
    },
    loadVideo() {
      const videoPlayer1 = videojs("video1"); // 绑定id为video1的视频元素
      const videoPlayer2 = videojs("video2"); // 绑定id为video2的视频元素
      // const videoPlayer3 = videojs("video3"); // 绑定id为video3的视频元素
      // const videoPlayer4 = videojs("video4"); // 绑定id为video4的视频元素
      console.log(111)

      // 销毁已存在的视频播放器
      videoPlayer1.dispose();
      videoPlayer2.dispose();
      // videoPlayer3.dispose();
      // videoPlayer4.dispose();

      // 创建新的视频播放器并加载视频源
      videoPlayer1.src({ src: this.src1, type: 'application/x-mpegURL' });
      videoPlayer2.src({ src: this.src2, type: 'application/x-mpegURL' });
      // videoPlayer3.src({ src: this.src3, type: 'application/x-mpegURL' });
      // videoPlayer4.src({ src: this.src4, type: 'application/x-mpegURL' });

      // 初始化视频播放器
      videoPlayer1.load();
      videoPlayer2.load();
      // videoPlayer3.load();
      // videoPlayer4.load();
    },
    stopVideoStream(){
      axios.get('/stop-video-stream')
          .then(response => {
            console.log('停止请求已发送');
          })
          .catch(error => {
            console.error('发送停止请求时出错', error);
          });
    },
    enableeVideoStream(){
      axios.get('/enable-video-stream')
          .then(response => {
            console.log('停止请求已发送');
          })
          .catch(error => {
            console.error('发送停止请求时出错', error);
          });
    }

  }
};
</script>

<style lang="less" scoped>
.video-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.video-container {
  width: 45%;
}
</style>
