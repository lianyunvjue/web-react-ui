const STORE_PREFIX = 'storage';

// 获取
const getItemFun = (key: any) => {
  return window.localStorage.getItem(`${STORE_PREFIX}_${key}`);
};

// 设置
const setItemFun = (key: any, value: any) => {
  window.localStorage.setItem(`${STORE_PREFIX}_${key}`, value);
};

// 删除
const removeItemFun = (key: any) => {
  window.localStorage.removeItem(`${STORE_PREFIX}_${key}`);
};

const Storage = {
  getItem: getItemFun,
  setItem: setItemFun,
  removeItem: removeItemFun,
};
export default Storage;
