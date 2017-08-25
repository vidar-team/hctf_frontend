import axios from 'axios';

class Model {
  base = '/API';
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: this.base,
      timeout: 10000,
    });
  }

  /**
   * HTTP Request
   * @param method
   * @param path
   * @param params
   * @param options
   * @returns {Promise}
   */
  request(method = "GET", path = '/', params = {}, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        let options = {
          method: method,
          url: path
        };
        if (options.needAuth) {
          options.headers = {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
          }
        }
        if (method === "GET") {
          options.params = params
        }
        if (method === "POST") {
          options.data = params
        }
        let result = await this.instance.request(options);
        if (result.status === "success") {
          resolve(result.data);
        }
        else {
          reject(result);
        }
      }
      catch (e) {
        reject(this.parseErrorResponse(e));
      }
    })
  }

  /**
   * HTTP GET
   * @param path
   * @param params
   * @param options
   * @returns {*}
   */
  get(path = '/', params = {}, options = {}) {
    return this.request("GET", path, params, options);
  }

  /**
   * HTTP POST
   * @param path
   * @param data
   * @param options
   * @returns {*}
   */
  post(path = '/', data = {}, options = {}){
    return this.request("POST", path, data, options);
  }

  parseErrorResponse(e) {
    return e;
  }
}
export default Model;
