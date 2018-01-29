import Model from '@/api/model'

class Flag extends Model {
  /**
   * 删除 Flag
   * @param flagId Flag ID
   * @returns {Promise}
   */
  deleteFlag(flagId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("POST", "/Flag/delete", {
          flagId: flagId
        }, {
          needAuth: true
        });
        resolve();
      }
      catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 编辑 Flag
   * @param flagId
   * @param flag
   * @param teamId
   * @returns {Promise}
   */
  editFlag(flagId, flag, teamId) {
    return new Promise(async (resolve, reject) => {
      try {
        let editedFlag = await this.request("POST", "/Flag/edit", {
          flagId: flagId,
          flag: flag,
          teamId: teamId
        }, {
          needAuth: true
        });
        resolve(editedFlag);
      }
      catch (e) {
        reject(e);
      }
    })
  }
}

export default new Flag();
