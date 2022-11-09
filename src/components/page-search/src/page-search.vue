<template>
  <div class="page-search">
    <HyForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <el-button type="primary" @click="handleQueryClick"
          ><el-icon><Search /></el-icon>搜索</el-button
        >
        <el-button type="primary" @click="handleResetClick"
          ><el-icon><Refresh /></el-icon>重置</el-button
        >
      </template>
    </HyForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HyForm from "@/base-ui/form";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      require: true,
    },
  },
  components: { HyForm },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    //双向绑定的属性应该是由配置文件的field来决定
    //1.优化一:formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);

    //2.优化二：当用户点击重置
    const handleResetClick = () => {
      //  for(const key in formOriginData){aa
      //    console.log(formData.value[`${key}`])
      //  }
      //ref拿到Value
      formData.value = formOriginData;
      emit("resetBtnClick");
    };

    //3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value);
    };

    return {
      formData,
      handleResetClick,
      handleQueryClick,
    };
  },
});
</script>

<style scoped></style>
