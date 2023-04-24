export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }, handlersApi) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userInfoElem = document.querySelector(userInfoSelector);
    this._userAvatarElem = document.querySelector(userAvatarSelector);

    this._getUserInfo = handlersApi.handleGetUserInfo
    this._setUserInfo = handlersApi.handleSetUserInfo
    this._setUserAvatar = handlersApi.handleSetNewAvatar

  }

  async getUserInfo() {
    const { name, about, avatar } = await this._getUserInfo();

    return {
      userName: name,
      userInfo: about,
      avatar,
    }
  }

  async setUserInfo(userName, userInfo) {
    await this._setUserInfo(userName, userInfo);

    this._userNameElem.textContent = userName;
    this._userInfoElem.textContent = userInfo;
  }

  async setUserAvatar(avatar) {
    await this._setUserAvatar(avatar);

    this._userAvatarElem.setAttribute('src', avatar);
  }
}