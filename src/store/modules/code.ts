import * as API from "@/api/axiosMetonds";
import { getProtRel, saveConfig, getDetials, getPortInfo } from "@/api/url";
const config: any = {
    state: {
        orgCode:'',
        pickingLineCode:''
    },
    mutations: {
        recordPortFun: (state: any, data: any) => {
            state.recordPort.push(data);
            console.log(state.recordPort, "wwwwwwwwwwwww");
        },
        getOrgCode:(state: any, data: any) => {
            state.orgCode = data
            console.log(state.orgCode, "-------orgCode----------");
        },
        getPickingLineCode:(state: any, data: any) => {
            state.pickingLineCode = data
            console.log(state.pickingLineCode, "-------pickingLineCode----------");
        },
    },
    actions: {
        // getProtRelFun: async ({ commit }: any, data:any) => {
        //     return await API.post(getProtRel, data);
        // },
    }
};
export default config;
