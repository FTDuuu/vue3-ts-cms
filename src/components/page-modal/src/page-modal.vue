<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <HyForm v-bind="modalConfig" v-model="formData"></HyForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import HyForm from "@/base-ui/form";
import { useStore } from "vuex";

export default defineComponent({
  components: { HyForm },
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const formData = ref<any>({});
    const dialogVisible = ref(false);

    watch(
      () => props.defaultInfo,
      (newValue) => {
        // console.log(newValue)
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    //点击确定按钮的逻辑
    const store = useStore();
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id,
        });
      } else {
        //新建
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
        });
      }
    };

    return {
      dialogVisible,
      formData,
      handleConfirmClick,
    };
  },
});
</script>

<style scoped></style>
