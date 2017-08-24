import axios from 'axios';
class Model{
  public base = '/API';
  public request(method = "GET", url = "/", params = {}){
    return axios({
      method: method,
      url: url,
      data: params
    });
  }
}
