export default class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  getInfoUser() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
  }

  getInitCard() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
  }

  // patchEditProfile() {
  //   return fetch(this._url, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization:
  //     }
  //   })
  // }





}
