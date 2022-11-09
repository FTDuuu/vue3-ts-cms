<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules1" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import LocalCache from "@/utils/cache";
import { ElForm } from "element-plus";

import { rules1 } from "../config/account-config";

export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: LocalCache.getCache("name") ?? "",
      password: LocalCache.getCache("password") ?? "",
    });

    //拿到具有构造函数的实例
    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = (isKeepPassword: boolean) => {
      //validate是验证信息 valid是布尔值 验证通过为true
      formRef.value?.validate((valid: boolean) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            LocalCache.setCache("name", account.name);
            LocalCache.setCache("password", account.password);
          } else {
            LocalCache.deleteCache("name");
            LocalCache.deleteCache("password");
          }

          // 2.开始进行登录验证
          store.dispatch("login/accountLoginAction", { ...account });
        }
      });
    };

    return {
      account,
      rules1,
      loginAction,
      formRef,
    };
  },
});
</script>

<style scoped></style>
