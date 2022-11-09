import fyRequest from "@/service";
import { IDataType } from "@/service/type";

export function getPageListData(url: string, queryInfo: any) {
  return fyRequest.post<IDataType>({
    url: url,
    data: queryInfo,
  });
}

export function deletePageData(url: string) {
  return fyRequest.delete<IDataType>({
    url: url,
  });
}

export function createPageData(url: string, newData: any) {
  return fyRequest.post<IDataType>({
    url: url,
    data: newData,
  });
}

export function editPageData(url: string, editData: any) {
  return fyRequest.patch<IDataType>({
    url: url,
    data: editData,
  });
}
