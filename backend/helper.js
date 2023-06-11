 function mergeArrays(arr1 = [], arr2 = []){
    let res = [];
    res = arr1.map(_id => {
       const index = arr2.findIndex(el => el["_id"] == _id);
       const r = index !== -1 ? arr2[index] : {};
       return Object.assign({ _id, total:0 , list: [] }, r);
    });
    return res;
  };

module.exports = {
    mergeArrays
}