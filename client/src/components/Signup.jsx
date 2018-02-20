import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.signup = this.signup.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  signup(e) {
    e.preventDefault();
    axios.post('/signup', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
    .then(() => {
      this.setState({
        username: '',
        password: '',
        email: ''
      });
    })
    .catch((error) => {
      throw error;
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Sign Up!</h1>
        <form onSubmit={this.signup}>
          <label>
            Username
            <input type='text' placeholder='Enter Username' value={this.state.username} onChange={this.onChangeUsername} />
          </label><br />
          <label>
            Password
            <input type='password' placeholder='Enter Password' value={this.state.password} onChange={this.onChangePassword} />
          </label><br />
          <label>
            E-mail
            <input type='text' placeholder='Enter Email' value={this.state.email} onChange={this.onChangeEmail} />
          </label><br />
          <input type='submit' value='Signup' />
        </form>
      </div>
    )
  }
}

export default Signup
