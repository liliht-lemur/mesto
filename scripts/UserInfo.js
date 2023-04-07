export class UserInfo {
  constructor ({ userNameSelector, userInfoSelector}) {
    this.userNameElem = document.querySelector(userNameSelector);
    this.userInfoElem = document.querySelector(userInfoSelector);

    this.userName = this.userNameElem.textContent;
    this.userInfo = this.userInfoElem.textContent;
  }
  
  getUserInfo () {
    return {
      userName: this.userName,
      userInfo: this.userInfo,
    }
  }

  setUserInfo (userName, userInfo) {
    this.userName = userName;
    this.userInfo = userInfo;

    this.userNameElem.textContent = this.userName;
    this.userInfoElem.textContent = this.userInfo;
  }
}