import Model from "@/api/model";

class System extends Model {
  /**
   * 获得 Meta Info
   * @returns {Promise}
   */
  getMetaInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        let metaInfo = await this.request("GET", "/System/meta");
        resolve(metaInfo);
      }
      catch (e) {
        reject(e);
      }
    })
  }
  /**
   * 编辑设置
   * @param startTime
   * @param endTime
   * @param flagPrefix
   * @param flagSuffix
   * @returns {Promise}
   */
  editConfig(startTime, endTime, flagPrefix, flagSuffix){
    return new Promise(async (resolve, reject) => {
      try{
        await this.request("POST", "/System/edit", {
          startTime: startTime,
          endTime: endTime,
          flagPrefix: flagPrefix,
          flagSuffix: flagSuffix
        }, {
          needAuth: true
        });
        resolve();
      }
      catch (e){
        reject(e);
      }
    })
  }
}

export default System;
