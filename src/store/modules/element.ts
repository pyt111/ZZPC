import * as API from "@/api/axiosMetonds";
import { validate } from '@/assets/js/p.ts'
// import { getProtRel, saveConfig, getDetials, getPortInfo } from "@/api/url";
const config: any = {
    state: {
        rules: {
            portName: [{ validator: validate, trigger: "blur" }],
            effectiveTo: [{ validator: validate, trigger: "blur" }],
            flowThd: [{ validator: validate, trigger: "blur" }],
            downloadFlag: [
                { required: true, message: "请选择是否即卸", trigger: "change" }
            ],
            flowWarnCount: [{ validator: validate, trigger: "blur" }],
            transportThd: [{ validator: validate, trigger: "blur" }],
            outlendCount: [{ validator: validate, trigger: "blur" }],
            outcontractCount: [{ validator: validate, trigger: "blur" }],
            www: [{ validator: validate, trigger: "blur" }],

        },
        data:{} as any
    },
    mutations: {
        dataFun:(state:any,data:any) => {
            state.data = data
            return new Promise(resolve => {
                setTimeout(() => resolve("long_time_value"), 3000);
            });
        }
    },
    actions: {
        // getProtRelFun: async ({ commit }: any, data:any) => {
        //     return await API.post(getProtRel, data);
        // },
    }
};
export default config;
