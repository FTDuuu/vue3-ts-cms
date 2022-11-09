<template>
  <div class="dashboard">
    <el-row :guttter="10">
      <el-col :span="8">
        <HyCard title="分类商品数量（饼图）">
          <pieEchart :pieData="categoryGoodsCount"></pieEchart>
        </HyCard>
      </el-col>
      <el-col :span="8">
        <HyCard title="不同城市商品">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </HyCard>
      </el-col>
      <el-col :span="8">
        <HyCard title="分类商品数量（玫瑰图）">
          <roseEchart :roseData="categoryGoodsCount"></roseEchart>
        </HyCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <HyCard title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </HyCard>
      </el-col>
      <el-col :span="12">
        <HyCard title="分类商品收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </HyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

import HyCard from "@/base-ui/card";
import {
  pieEchart,
  roseEchart,
  lineEchart,
  BarEchart,
  MapEchart,
} from "@/components/page-echarts";

export default defineComponent({
  name: "dashboard",
  components: {
    HyCard,
    pieEchart,
    roseEchart,
    lineEchart,
    BarEchart,
    MapEchart,
  },
  setup() {
    const store = useStore();
    store.dispatch("dashboard/getDashboardDataAction");

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount };
      });
    });

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const values: any[] = [];

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name);
        values.push(item.goodsCount);
      }

      return {
        xLabels,
        values,
      };
    });

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = [];
      const values: any[] = [];

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name);
        values.push(item.goodsCount);
      }

      return {
        xLabels,
        values,
      };
    });

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return {
          name: item.address,
          value: item.count,
        };
      });
    });

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale,
    };
  },
});
</script>

<style scoped>
.dashboard {
  height: 1200px;
}
.content-row {
  margin-top: 10px;
}
</style>
