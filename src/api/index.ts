import { getAction,postAction } from "@/utils/request"
//获取token
export const getToken = (data:any)=>{
    return postAction('/api/outerApi-api/credit/outerApi/bigScreen/creditAnalysis/getlast',data)
}