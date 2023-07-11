<template>
  <div class="video-page">
      <img src="http://127.0.0.1:8000/video/0" className="video-js">
  </div>
</template>

<script>

import videojs from 'video.js';
import "video.js/dist/video-js.css";
export default {
  mounted() {
    const videoElement = this.$refs.videoPlayer;

    // 创建 video.js 播放器实例
    const player = videojs(videoElement);

    // 发送请求获取视频流数据
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:8000/vide/0", true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      // 获取服务器返回的视频流数据
      const response = xhr.response;

      // 创建一个 URL 对象，用于生成视频流的 URL
      const videoUrl = URL.createObjectURL(response);

      // 设置 video.js 播放器的 src 属性为视频流的 URL
      player.src({
        src: videoUrl,
        type: 'video/mp4',
      });

      // 播放视频
      player.play();
    };

    xhr.onerror = () => {
      console.error('Error fetching the video stream.');
    };

    xhr.send();
  },
};
</script>

<style lang="less" scoped>
.videos {
  width: 30%;
  height: 300px;
}
.video-page {
  padding: 20px;
  display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: space-between;
}
</style>
