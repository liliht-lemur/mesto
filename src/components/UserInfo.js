export class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userInfoElem = document.querySelector(userInfoSelector);
    this._userAvatarElem = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElem.textContent,
      userInfo: this._userInfoElem.textContent,
      userAvatar: this._userAvatarElem.getAttribute('src')
    }
  }

  setUserAvatar(avatar) {
    this._userAvatarElem.setAttribute('src', avatar);
  }

  setUserInfo(name, about) {
    this._userNameElem.textContent = name;
    this._userInfoElem.textContent = about;
  }
}