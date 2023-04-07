export class UserInfo {
  constructor ({ userNameSelector, userInfoSelector}) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userInfoElem = document.querySelector(userInfoSelector);

    this._userName = this._userNameElem.textContent;
    this._userInfo = this._userInfoElem.textContent;
  }
  
  getUserInfo () {
    return {
      userName: this._userName,
      userInfo: this._userInfo,
    }
  }

  setUserInfo (userName, userInfo) {
    this._userNameElem.textContent = userName;
    this._userInfoElem.textContent = userInfo;
  }
}