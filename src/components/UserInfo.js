export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }, handlersApi) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userInfoElem = document.querySelector(userInfoSelector);
    this._userAvatarElem = document.querySelector(userAvatarSelector);

    this._setUserInfo = handlersApi.handleSetUserInfo;
    this._setUserAvatar = handlersApi.handleSetNewAvatar;
  }

  getUserInfo() {
    return {
      userName: this._userNameElem.textContent,
      userInfo: this._userInfoElem.textContent,
    }
  }

  updatePageAvatar(avatar) {
    this._userAvatarElem.setAttribute('src', avatar);
  }

  updatePageUserInfo(name, about) {
    this._userNameElem.textContent = name;
    this._userInfoElem.textContent = about;
  }

  setUserInfo(userName, userInfo) {
    return this._setUserInfo(userName, userInfo);
  }

  setUserAvatar(avatar) {
    return this._setUserAvatar(avatar);
  }
}