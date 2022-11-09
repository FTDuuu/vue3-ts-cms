<template>
  <div class="nav-header">
    <div class="icon fold-menu" @click="handleFoldClick">
      <el-icon><Expand /></el-icon>
    </div>
    <div class="content">
      <HyBreadcrumb :breadcrumbs="breadcrumbs"></HyBreadcrumb>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import UserInfo from "./user-info.vue";
import HyBreadcrumb, { IBreadcrumb } from "@/base-ui/breadcrumb";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { pathMapBreadcrumbs } from "@/utils/map-menus";

export default defineComponent({
  components: { UserInfo, HyBreadcrumb },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      (isFold.value = !isFold.value), emit("foldChange", isFold.value);
    };

    const store = useStore();
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    return {
      handleFoldClick,
      breadcrumbs,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
.fold-menu {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
