class JWT{
  static isTokenExpired(){
    let token = localStorage.getItem("jwt");
    if (token === undefined){
      return false;
    }
    let tokenInfo = JSON.parse(atob(token.split(".")[1]));
    return tokenInfo.exp <= Math.floor(new Date().valueOf() / 1000);
  }
}
export default JWT;
