import Axios from 'axios';


export const Post = (url, data) => {
  return Axios.post(url, data)
    .then(data => data).catch(error => { throw error; });
};
export const Get = (url) => {
  return Axios.get(url)
    .then(data => data).catch(error => { throw error; });
};

export const Put = (url, data) => {
  return Axios.put(url, data)
    .then(data => data).catch(error => { throw error; });
};

export const Delete = (url) => {
  return Axios.delete(url)
    .then(data => data).catch(error => { throw error; });
};