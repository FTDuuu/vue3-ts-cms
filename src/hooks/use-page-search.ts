import { ref } from "vue";
import pageContent from "@/components/page-content";

export function userPageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>();

  const handleResetClick = () => {
    pageContentRef.value?.getPageData();
  };
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };
  return [pageContentRef, handleQueryClick, handleResetClick];
}
