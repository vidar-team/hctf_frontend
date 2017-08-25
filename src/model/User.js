import makeHash from 'sha.js';

import Model from './model'
class User extends Model{
  sha256(text = ''){
    let sha256 = makeHash('sha256');
    return sha256.update(text).digest('hex');
  }
  login(email, password){
    return new Promise(async (resolve, reject) => {
      try{
        let result = await this.request("POST", '/User/login', {
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
}
export default User;
