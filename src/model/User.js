import makeHash from 'sha.js';

import Model from './model'
class User extends Model{
  /**
   * Do SHA-256 Hashing
   * @param text
   * @returns {*}
   */
  sha256(text = ''){
    let sha256 = makeHash('sha256');
    return sha256.update(text).digest('hex');
  }

  /**
   * 登陆
   * @param email
   * @param password
   * @returns {Promise}
   */
  login(teamName, email, password){
    return new Promise(async (resolve, reject) => {
      try{
        let result = await this.request("POST", '/User/login', {
          teamName: teamName,
          email: email,
          password: this.sha256(password)
        });
        resolve(result);
      }
      catch (e){
        reject(e);
      }
    })
  }
  register(email, password){
    return new Promise(async (resolve, reject) => {
      try{
        let result = await  this.request("POST", "/User/register", {
          email: email,
          password: password
        })
      }
      catch (e){
        reject(e);
      }
    })
  }
}
export default User;
