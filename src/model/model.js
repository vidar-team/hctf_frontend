import axios from 'axios';

class Model {
  public base = '/API';
  public needAuth = false;
  public instance;

  constructor() {
    this.instance = axios.create({
      baseURL: this.base,
      timeout: 10000,
    });
  }

  public request(method = "GET", path = '/', params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        let options = {
          method: method,
          url: path
        };
        if (this.needAuth) {
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
   * @returns {*}
   */
  public get(path = '/', params = {}) {
    return this.request("GET", path, params);
  }

  /**
   * HTTP POST
   * @param path
   * @param data
   * @returns {*}
   */
  public post(path = '/', data = {}){
    return this.request("POST", path, data);
  }

  private parseErrorResponse(e) {
    return e;
  }
}
