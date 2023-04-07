export class UserInfo {
  constructor ({ userNameSelector, userInfoSelector}) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userInfoElem = document.querySelector(userInfoSelector);

    this._userName = this._userNameElem.textContent;
    this._userInfo = this._userInfoElem.textContent;

    // this._modalWindowProfile = document.querySelector('.modal__overlay_profile');
    // this._userNameInput = '.modal__description_type_name';
    // this._userInfoInput = '.modal__description_type_about-self';
    // this._inputNameFormProfile = this._modalWindowProfile.querySelector(this._userNameInput);
    // this._inputAboutSelfFormProfile = this._modalWindowProfile.querySelector(this._userInfoInput);
  }
  
  getUserInfo () {
    return {
      userName: this._userName,
      userInfo: this._userInfo,
    }
  }

  setUserInfo (userName, userInfo) {
    this.userName = userName;
    this.userInfo = userInfo;

    this.userNameElem.textContent = this._inputNameFormProfile.value;
    this.userInfoElem.textContent = this._inputAboutSelfFormProfile.value;
  }
}