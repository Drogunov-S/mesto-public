export class UserInfo {
  constructor(fullnameSelector, aboutUserSelector, profileAvatarSelector) {
    this._nameElement = document.querySelector(fullnameSelector);
    this._aboutElement = document.querySelector(aboutUserSelector);
    this._avatarEelement = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo({name, about, avatar, _id}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarEelement.src = avatar;
    this._id = _id;
  }

  setAvatar(url) {
    this._avatarEelement.src = url;
  }

  getUserId() {
    return this._id;
  }
}
