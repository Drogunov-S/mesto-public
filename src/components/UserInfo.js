export class UserInfo {
  constructor(fullnameSelector, aboutUserSelector) {
    this._fullnameElement = document.querySelector(fullnameSelector);
    this._aboutUserElement = document.querySelector(aboutUserSelector);
  }

  getUserInfo() {
    return {
      fullname: this._fullnameElement.textContent,
      position: this._aboutUserElement.textContent
    };
  }

  setUserInfo({fullname, position}) {
    this._fullnameElement.textContent = fullname;
    this._aboutUserElement.textContent = position;
  }
}
