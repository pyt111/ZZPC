export const equals = (a: any, array: any) => {
    // if the other array is a falsy value, return
    // console.log(a);
    if (!array) {
        return false;
    }

    // compare lengths - can save a lot of time
    if (a.length !== array.length) {
        // console.log(a.length, array.length);
        return false;
    }

    for (var i = 0, l = a.length; i < l; i++) {
        // Check if we have nested arrays
        if (a[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!a[i].equals(array[i])) {
                return false;
            }
        } else if (a[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

export const validate = (rule: any, value: any, callback: any) => {
    // console.log(rule, value);
    if (rule.field === "portName") {
      if (value === "") {
        callback(new Error("请输入端口名称"));
      } else {
        callback();
      }
    } else if (rule.field === "effectiveTo") {
      if (value === "") {
        callback(new Error("请选择日期"));
      } else {
        callback();
      }
    } else if (rule.field === "flowThd") {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入流量阈值"));
      } else {
        callback();
      }
    } else if (rule.field === "flowWarnCount") {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入流量阈值"));
      } else {
        callback();
      }
    } else if (rule.field === "transportThd") {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入货量阈值"));
      } else {
        callback();
      }
    } else if (rule.field === "outcontractCount") {
      if (value === "") {
        callback(new Error("请输入外包人数"));
      } else {
        callback();
      }
    } else if (rule.field === "outlendCount") {
      if (value === "") {
        callback(new Error("请输入外请人数"));
      } else {
        callback();
      }
    }else if (rule.field === "www") {
        if (value === "") {
          callback(new Error("请输入对应路线"));
        } else {
          callback();
        }
      }
  };