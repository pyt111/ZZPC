// export const BASE_API =location.href.substring(0,location.href.indexOf("/",10)) + '/realtime/productionLine/'
// export const BASE_API ='/realtime/productionLine/'
// export const BASE_API ='locahost:8080/realtime/productionLine/'
// export const BASE_API = '/dg-web/realtime/productionLine/' //生产环境
export const BASE_API = 'http://10.224.197.18:8080/realtime/productionLine/' //李哥



export const getProtRel = 'getProtRel'//初始化端口关系

export const saveConfig = 'saveConfig'//保存各端口之间的关系

export const getDetials = 'getDetials'//预览接口

export const getPortInfo = 'getPortInfo'//获取端口信息