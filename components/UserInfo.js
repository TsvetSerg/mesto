export default class UserInfo {
  constructor({profileName, profileJob}) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }

  setUserInfo(user) {
    this._profileName.textContent = user.inputName;
    this._profileJob.textContent = user.inputJob
  }
}
