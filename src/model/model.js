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
        if (result.data.status === "success") {
          resolve(result.data.data);
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
    let parsedError = {
      message: ""
    };
    console.log(e.response.data.data);
    if (e.response){
      if (e.response.data.data && e.response.data.data.error){
        if (Array.isArray(e.response.data.data.error.message)){
          parsedError.message = e.response.data.data.error.message.join(',');
        }
        else{
          parsedError.message = e.response.data.data.error.message.toString();
        }
      }
      else{
        parsedError.message = {
          400: "HTTP 400 Bad Request",
          401: "HTTP 401 Unauthorized",
          403: "HTTP 403 Forbidden",
          404: "HTTP 404 Not Found",
          405: "HTTP 405 Method Not Allowed",
          406: "HTTP 406 Not Acceptable",
          408: "HTTP 408 Request Timeout",
          414: "HTTP 414 URI Too Long",
          418: "HTTP 418 I'm a teapot",
          500: "HTTP 500 Internal Server Error",
          502: "HTTP 502 Bad Gateway",
          503: "HTTP 503 Service Unavailable",
          504: "HTTP 504 Gateway Timeout"
        }[e.response.status] || `HTTP ${e.response.status}`;
      }
    }
    else if (e.request){
      parsedError.message = "NETWORK ERROR"
    }
    else{
      parsedError.message = "UNKNOWN ERROR"
    }
    return parsedError;
  }
}
export default Model;
