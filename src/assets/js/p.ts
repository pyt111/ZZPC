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
