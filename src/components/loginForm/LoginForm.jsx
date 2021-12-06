
import React from "react";
import "./LoginForm.scss";
import loginImg from "../../assets/images/loginImg.svg";
import UserSession from '../../libs/sessions'
import Storage from "../../libs/storage";


class LoginForm extends React.Component {

  state = {
    form:{
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    this.handleDeleteUserData()
    console.log("deleted tokens")
  }

  handleDeleteUserData = async () => {
    try {
      await Storage.instance.remove('user-token')
      await Storage.instance.remove('user-data')
    } catch (error) {
      return (error)
    }
  }

  handleChangeUsername = event => {
    this.setState({form : {...this.state.form, username: event.target.value}})
    
  }
  handleChangePassword = event => {
    this.setState({form : {...this.state.form, password: event.target.value}})
  }

  handleSubmit = async () => {
    try {
      let response = await UserSession.instance.login(this.state.form)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username"
                onChange={this.handleChangeUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" 
                onChange={this.handleChangePassword}
              />
            </div>
          </div>
          </div>
          <div className="footer">
            <input type="submit" className="btn" onClick={this.handleSubmit} value="Login"/>
          </div>
      </div>
    );
  }
}

export default LoginForm 