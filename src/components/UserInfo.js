export class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userInfoElem = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElem.textContent,
      userInfo: this._userInfoElem.textContent,
    }
  }

  setUserInfo(userName, userInfo) {
    this._userNameElem.textContent = userName;
    this._userInfoElem.textContent = userInfo;
  }
}