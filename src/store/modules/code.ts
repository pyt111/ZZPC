import * as API from "@/api/axiosMetonds";
import { getProtRel, saveConfig, getDetials, getPortInfo } from "@/api/url";
const config: any = {
    state: {
        userCode:'',
        pickingLineCode:''
    },
    mutations: {
        recordPortFun: (state: any, data: any) => {
            state.recordPort.push(data);
            console.log(state.recordPort, "wwwwwwwwwwwww");
        },
    },
    actions: {
        // getProtRelFun: async ({ commit }: any, data:any) => {
        //     return await API.post(getProtRel, data);
        // },
    }
};
export default config;
