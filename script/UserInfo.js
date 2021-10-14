export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const user = {}   // объект с данными пользователя
    user.inputName = this._nameSelector.textContent,
    user.inputJob = this._jobSelector.textContent
    return user;
  }

  setUserInfo({in_name, in_job}) {
    this._nameSelector.textContent = in_name;
    this._jobSelector.textContent = in_job
  }
}
