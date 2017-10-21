import makeHash from 'sha.js';
import Model from '@/model/model'

class Team extends Model {
  /**
   * Do SHA-256 Hashing
   * @param text
   * @returns {*}
   */
  sha256(text = '') {
    let sha256 = makeHash('sha256');
    return sha256.update(text).digest('hex');
  }

  /**
   * 获取用户信息
   * @returns {Promise}
   */
  getTeamInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("GET", "/User/info", {}, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 获得所有队伍的信息
   * @param page 分页
   * @returns {Promise}
   */
  getAllTeams(page = 1) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("GET", "/User/list", {
          page: page
        }, {
          needAuth: true,
        });
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 封禁队伍
   * @param teamId
   * @returns {Promise}
   */
  banTeam(teamId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("POST", "/User/ban", {
          teamId: teamId
        }, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 解除封禁
   * @param teamId
   * @returns {Promise}
   */
  unbanTeam(teamId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("POST", "/User/unban", {
          teamId: teamId
        }, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 设定管理员
   * @param teamId
   * @returns {Promise}
   */
  setAdmin(teamId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("POST", "/User/setAdmin", {
          teamId: teamId
        }, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    })
  }

  resetPassword(teamId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("POST", "/User/forceResetPassword", {
          teamId: teamId
        }, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    })
  }
}

export default Team;
