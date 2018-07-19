const getters = {
    allBox: (state: any) => state.t1.allBox,
    recordPort: (state: any) => state.t1.recordPort,
    nowPort: (state: any) => state.t1.nowPort,
    nowKey: (state: any) => state.t1.nowKey,
    nowName:(state: any) => state.t1.nowName,
    newName:(state: any) => state.t1.newName,
    lineList:(state: any) => state.t1.lineList,
    orgCode:(state: any) => state.code.orgCode,
    pickingLineCode:(state: any) => state.code.pickingLineCode,
};
export default getters;
