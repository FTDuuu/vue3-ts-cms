<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><Avatar style="width: 1em; height: 1em" /> 账号登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <Cellphone style="width: 1em; height: 1em" />
            手机登录</span
          >
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="bottom">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="login" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginAccount from "./login-account.vue";
import loginPhone from "./login-phone.vue";

export default defineComponent({
  components: {
    loginAccount,
    loginPhone,
  },
  setup() {
    //1.定义属性
    const isKeepPassword = ref(true);
    const accountRef = ref<InstanceType<typeof loginAccount>>();
    const phoneRef = ref<InstanceType<typeof loginPhone>>();
    const currentTab = ref("account");

    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === "account") {
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        console.log("phoneRef调用loginAction");
      }
    };

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.login {
  margin-top: 10px;
  width: 100%;
}
</style>
