import Axios from 'axios';


export const Post = (url, data) => {
  return Axios.post(url, data)
    .then(data => data).catch(error => { throw error; });
};
export const Get = (url) => {
  return Axios.get(url)
    .then(data => data).catch(error => { throw error; });
};