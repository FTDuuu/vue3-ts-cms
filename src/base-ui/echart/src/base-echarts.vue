<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from "vue";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

import useEchart from "../hook/useEchart";

//定义props
const props = withDefaults(
  defineProps<{
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    options: () => ({}),
    width: "100%",
    height: "360px",
  }
);

const echartDivRef = ref<HTMLElement>();

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!);

  //当数据发生改变时 重新获取
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<style scoped></style>
