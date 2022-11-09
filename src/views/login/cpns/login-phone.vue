<template>
  <div class="login-account">
    <el-form label-width="80px" :rules="rules2" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证号" prop="code">
        <div class="code">
          <el-input class="input" v-model="phone.code"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { rules2 } from "../config/account-config";

export default defineComponent({
  setup() {
    const phone = reactive({
      num: "",
      code: "",
    });
    return {
      phone,
      rules2,
    };
  },
});
</script>

<style scoped>
.code {
  display: flex;
}
.input {
  margin-right: 5px;
}
</style>
