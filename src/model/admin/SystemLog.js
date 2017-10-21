import Model from '@/model/model';

class SystemLog extends Model {
  list(startId = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("GET", "/SystemLog/list", {
          startId: startId
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

export default SystemLog;
