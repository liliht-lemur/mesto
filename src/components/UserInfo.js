export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }, handlersApi) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userInfoElem = document.querySelector(userInfoSelector);
    this._userAvatarElem = document.querySelector(userAvatarSelector);
    this._buttonSubmitEdit = document.querySelector('.button_submit-edit');
    this._buttonSubmitAvatar = document.querySelector('.button_submit-avatar');


    this._getUserInfo = handlersApi.handleGetUserInfo
    this._setUserInfo = handlersApi.handleSetUserInfo
    this._setUserAvatar = handlersApi.handleSetNewAvatar

  }

  getUserInfo() {
    return {
      userName: this._userNameElem.textContent,
      userInfo: this._userInfoElem.textContent,
    }
  }

  setUserInfo(userName, userInfo) {
    this._buttonSubmitEdit.textContent = 'Сохранение...';
    this._setUserInfo(userName, userInfo)
    .then((details)=> {
      this._userNameElem.textContent = details.name;
      this._userInfoElem.textContent = details.about;
    })
    .catch(e => console.log(e))
    .finally(() => {
      this._buttonSubmitEdit.textContent = 'Сохранить';
    });
  }

  
  setUserAvatar(avatar) {
    this._buttonSubmitAvatar.textContent = 'Сохранение...';
    this._setUserAvatar(avatar)
    .then((avatar1)=> {
      console.log({avatar1})

      this._userAvatarElem.setAttribute('src', avatar);
    })
    .catch(e => console.log(e))
    .finally(() => {
      this._buttonSubmitAvatar.textContent = 'Сохранить';
    });
  }
}