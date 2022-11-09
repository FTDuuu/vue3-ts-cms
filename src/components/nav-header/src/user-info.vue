<template>
  <div>
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        <el-avatar :size="25" :src="imgUrl.circleUrl" />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><CloseBold /></el-icon>退出登录
          </el-dropdown-item>
          <el-dropdown-item
            ><el-icon><User /></el-icon>用户信息</el-dropdown-item
          >
          <el-dropdown-item
            ><el-icon><Operation /></el-icon>系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import localCache from "@/utils/cache";

export default defineComponent({
  setup() {
    const imgUrl = reactive({
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    });

    const store = useStore();

    const name = computed(() => store.state.login.userInfo.name);

    const router = useRouter();
    const handleExitClick = () => {
      localCache.deleteCache("token");
      router.push("/main");
    };
    return {
      imgUrl,
      name,
      handleExitClick,
    };
  },
});
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  .el-avatar {
    margin-right: 5px;
  }
}
</style>
