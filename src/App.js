import React, { Component } from 'react';
import NbsLogo from './assets/NBS.png';
import WarningMessage from "./components/forms/WarningMessage";
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      usernameText: "",
      usernameAvailable: true,
      form: {},
      loginError: false
    }
  }

  switchLoginAndRegister = () => {
    let form = this.state.form;
    delete form.confirmPassword;
    this.setState({
      login: !this.state.login
    })
  }

  isUsernameAvailable = (username) => {
    username = username.trim();
    if (username === "") {
      return;
    }
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8084/api/login/account/" + username);
    request.onload = () => {
      this.setState({
        usernameAvailable: request.response
      });
    }
    request.send();
  }

  handleFormChange = (event) => {
    let form = this.state.form;
    form[event.target.name] = event.target.value;
    this.setState({
      form: form
    })

  }

  checkPasswords = () => {
    this.setState({
      passwordsMatch: this.state.form.password === this.state.form.confirmPassword
    })
  }

  renderSecondPasswordField = () => {
    if (!this.state.login) {
      return <div className="input-group input-group-lg mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Confirm Password</span>
        </div>
        <input type="password" onChange={e => { this.handleFormChange(e) }} onBlur={() => this.checkPasswords()} className="form-control" name="confirmPassword" />
        {this.renderUnmatchingPasswords()}
      </div>
    }
  }

  renderUnmatchingPasswords = () => {
    if (this.state.passwordsMatch === false) {
      return <WarningMessage text="Passwords do not match" />
    }
  }

  renderUsernameTaken = () => {
    if (this.state.usernameAvailable === "false" && !(this.state.login)) {
      return <WarningMessage text="Username in use" />
    }
  }

  login = () => {
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8084/api/login");
    request.onload = () => {
      let data = JSON.parse(request.response);
      if (request.status >= 200 && request.status <= 299) {
        sessionStorage.setItem("bearerToken", data.bearerToken);
        if (sessionStorage.getItem("redirect")) {
          window.location.href = sessionStorage.getItem("redirect");
        }
        else {
          window.location.href = "/"
        }
      } else if(data.error){ 
          this.setState({
            loginError: data.error.message
          })
        }
      }
    request.setRequestHeader("Content-Type", "application/json");
    let body = JSON.stringify(this.state.form)
    request.send(body);
  }

  register = () => {
    if (this.state.passwordsMatch) {
      let request = new XMLHttpRequest();
      request.open("POST", "http://localhost:8084/api/login/register");
      request.setRequestHeader("accept", "*/*");
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = () => {
        let data = JSON.parse(request.response);
        sessionStorage.setItem("bearerToken", data.bearerToken);
        if (sessionStorage.getItem("redirect")) {
          window.location.href = sessionStorage.getItem("redirect");
        } else {
          window.location.href = "/"
        }
      }
      let form = this.state.form;
      delete form.confirmPassword;
      let body = JSON.stringify(form);
      request.send(body);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container my-5">
          <div className="row">
            <div className="col-11 col-lg-4 col-xl-4 my-3 mr-3">

              <img className="rounded" src={NbsLogo}></img>

            </div>
            <div className="col-11 col-lg-7 col-xl-7 my-3">
              <div className="input-group input-group-lg mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" >Username</span>
                </div>
                <input type="text" className="form-control" name="username" onChange={(e) => { this.isUsernameAvailable(e.target.value); this.handleFormChange(e) }} />
                {this.renderUsernameTaken()}
              </div>
              <div className="input-group input-group-lg mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Password</span>
                </div>
                <input type="password" className="form-control" name="password" onChange={e => this.handleFormChange(e)} />
              </div>
              {this.renderSecondPasswordField()}
            </div>
          </div>
          <div className="row">
            <div className="col-11">
              {this.state.loginError ? <WarningMessage text={this.state.loginError} /> : null}
              <div className="float-right btn-group">
                <button className="btn btn-primary" onClick={this.switchLoginAndRegister}>{this.state.login ? "Switch to registration" : "Switch to login"}</button>
                {this.state.login ? <button className="btn btn-danger" onClick={() => this.login()}>Login</button>
                  : <button className="btn btn-danger" onClick={() => this.register()}>Register</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
