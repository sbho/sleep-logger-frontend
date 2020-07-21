//Utility for authentication.
class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(credentials, cb, errorCallback) {
    this.authenticated = true;
    const BASE_URL = "https://sleep-logger-dev.herokuapp.com";

    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };

    const body = {
      email: credentials.email,
      password: credentials.password,
    };

    fetch(BASE_URL + "/authenticate", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        } else {
          errorCallback();
        }
      })
      .then((x) => {
        if (localStorage.getItem("token")) {
          cb();
        }
      });
  }

  logout(cb) {
    localStorage.clear();
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
