export type Request = {
  method: 'get'|'post'|'put'|'patch'|'delete';
  axiosData: {
    url: string;
    body?: any;
    config?: any;
  };
}