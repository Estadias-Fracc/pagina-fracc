import React from "react";
import "./RegisterForm.scss";
import registerImg from "../../assets/images/registerImg.svg";
import UserSession from "../../libs/sessions";

class RegisterForm extends React.Component {

  state = {
    form:{
      username: "",
      password: "",
      password_confirmation: "",
      email: "",
      first_name: "",
      last_name: "",
    }
  }

  componentDidMount() {
    this.handleDeleteUserData()
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

  handleChangePasswordConfirmation = event => {
    this.setState({form : {...this.state.form, password_confirmation: event.target.value}})
  }

  handleChangeEmail = event => {
    this.setState({form : {...this.state.form, email: event.target.value}})
  }

  handleChangeFirstName = event => {
    this.setState({form : {...this.state.form, first_name: event.target.value}})
  }

  handleChangeLastName = event => {
    this.setState({form : {...this.state.form, last_name: event.target.value}})
  }

  handleSubmit = async () => {
    try {
      let response = await UserSession.instance.signup(this.state.form)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="reg-base-container" ref={this.props.containerRef}>
        <div className="reg-header">Register</div>
        <div className="reg-content">
          <div className="reg-image">
            <img src={registerImg} />
          </div>
          <div className="reg-form">
            <div className="reg-form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username"  
                onChange={this.handleChangeUsername}
              />
            </div>
            <div className="reg-form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" placeholder="Nombre"  
                onChange={this.handleChangeFirstName}
              />
            </div>
            <div className="reg-form-group">
              <label htmlFor="last_name">Apellido</label>
              <input type="text" name="last_name" placeholder="Apellido"  
                onChange={this.handleChangeLastName}
              />
            </div>
            <div className="reg-form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email"  
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="reg-form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password"  
                onChange={this.handleChangePassword}
              />
            </div>
            <div className="reg-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirmar contraseña"  
                onChange={this.handleChangePasswordConfirmation}
              />
            </div>
          </div>
        </div>
        <div className="reg-footer">
        <input type="submit" className="btn" onClick={this.handleSubmit} value="Register"/>
        </div>
      </div>
    );
  }
}

export default RegisterForm 