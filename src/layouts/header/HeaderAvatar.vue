<template>
  <div>
    <a-dropdown>
      <div class="header-avatar" style="cursor: pointer">
        <a-avatar
          class="avatar"
          size="small"
          shape="circle"
          :src="user.avatar"
        />
        <span class="name">Admin</span>
      </div>
      <a-menu :class="['avatar-menu']" slot="overlay">
        <a-menu-item>
          <a-icon type="user" />
          <span @click="showInfos">个人中心</span>
        </a-menu-item>
        <a-menu-item>
          <a-icon type="setting" />
          <span>设置</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="logout">
          <a-icon style="margin-right: 8px;" type="poweroff" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-modal
      title="个人中心"
      width="50%"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div>
       
        <div>
          <div class="info">
              <img src="../../assets/img/logo.png" alt="">
              <div class="infos">
                 
                  <span>小明</span>
              </div>
          </div>
          <!-- <div class="info">
            <span>性别</span>
            <span>男</span>
          </div> -->
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { logout } from "@/services/user";

export default {
  name: "HeaderAvatar",
  data() {
    return {
      visible: false,
      confirmLoading: false,
    };
  },
  computed: {
    ...mapGetters("account", ["user"]),
  },
  methods: {
    logout() {
      logout();
      this.$router.push("/login");
    },
    showInfos() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.info{
  display: flex;
  align-items: center;
  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #999;
    margin-right: 10px;
  }
}
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
