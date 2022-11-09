import * as echarts from "echarts";

import ChinaMapData from "../data/china copy.json";

echarts.registerMap("china", ChinaMapData);

export default function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el);

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  const updateResize = () => {
    echartInstance.resize();
  };

  window.addEventListener("resize", () => {
    echartInstance.resize();
  });

  return {
    echartInstance,
    setOptions,
    updateResize,
  };
}
