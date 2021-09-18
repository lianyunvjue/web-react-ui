import { queryPostsList } from '@/services/api';

export default {
  namespace: 'postsModal',

  state: {
    postsListData: [],
    loading: false,
  },

  subscriptions: {
    // setup({ dispatch }) {
    //   dispatch({
    //     type: 'fetchPostsData',
    //   });
    // },
  },

  effects: {
    /**
     * 查询博客列表
     */
    *fetchPostsData({ payload = {} }, { call, put }) {
      const rsp = yield call(queryPostsList);
      // const { error, data } = rsp;
      console.log('博客接口数据rsp--------', rsp);
      // if (error) {
      //   return;
      // }
      yield put({
        type: 'updatePostData',
        payload: {
          postsListData: rsp,
        },
      });
    },
  },

  reducers: {
    updatePostData(state: any, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
