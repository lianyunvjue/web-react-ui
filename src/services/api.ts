import request from '@/tools/request';

// const apiHost = `${window.location.protocol}//${
//   process.env.NODE_ENV === 'development' ? '10.1.100.210' : window.location.hostname
// }`;

// 请求博客列表
export async function queryPostsList(params: any) {
  return request({
    url: `/posts`,
    method: 'get',
    data: params,
  });
}
