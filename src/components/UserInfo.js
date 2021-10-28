export default class UserInfo {
  constructor({profileName, profileJob, profileAvatar}) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._profileAvatar = profileAvatar
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }

  setUserInfo(user) {
    this._profileName.textContent = user.inputName;
    this._profileJob.textContent = user.inputJob;
    this._profileAvatar.src = user.avatarInpur;
  }
}
