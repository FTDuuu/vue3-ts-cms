<template>
  <div class="page-content">
    <Hytable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          type="primary"
          size="default"
          v-if="isCreate"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>

      <!-- 2.列表中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="small"
            type="info"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="info"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插槽 在page-content动态插入插槽-->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </Hytable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import Hytable from "@/base-ui/table";
import { usePermisson } from "@/hooks/use-permissions";

export default defineComponent({
  components: { Hytable },
  props: {
    contentTableConfig: {
      type: Object,
      require: true,
    },
    pageName: {
      type: String,
      require: true,
    },
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore();

    //0.获取操作权限
    const isCreate = usePermisson(props.pageName, "create");
    const isUpdate = usePermisson(props.pageName, "update");
    const isDelete = usePermisson(props.pageName, "delete");
    const isQuery = usePermisson(props.pageName, "query");

    //1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    //当监听页数请求发生变化
    watch(pageInfo, () => {
      getPageData();
    });

    //2.发送网络请求
    //queryInfo没有传默认为{}
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          //请求页数为1时 不需要偏移
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize, //偏移量 第二页偏移10条数据
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };

    getPageData();

    //3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/getPageListData`](props.pageName)
    );

    const dataCount = computed(() =>
      store.getters[`system/getPageListCount`](props.pageName)
    );

    //4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propsList.filter(
      (item: any) => {
        if (item.slotName === "status") return false;
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;
        return true;
      }
    );

    //5.删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      // console.log(item)
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id,
      });
    };

    //6.新建
    const handleNewClick = () => {
      emit("newBtnClick");
    };

    //7.编辑
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };

    return {
      dataList,
      // userCount
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
    };
  },
});
</script>

<style scoped>
.handle-btns {
  display: flex;
  flex: 1;
}
</style>
