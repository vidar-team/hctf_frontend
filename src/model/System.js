import model from "./model";

class System extends model{
  /**
   * 获得 Meta Info
   * @returns {Promise}
   */
  getMetaInfo(){
    return new Promise(async (resolve, reject) => {
      try{
        let metaInfo = await this.request("GET", "/System/meta");
        resolve(metaInfo);
      }
      catch (e){
        reject(e);
      }
    })
  }
}
