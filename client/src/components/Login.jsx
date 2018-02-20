import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.login = this.login.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  login(e) {
    e.preventDefault();
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(() => {
      console.log("Successfully logged in")
      this.setState({
        username: '',
        password: ''
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

  render() {
    return(
      <div>
        <h1>Login!</h1>
        <form onSubmit={this.login}>
          <label>
            Username
            <input type='text' placeholder='Enter Username' value={this.state.username} onChange={this.onChangeUsername} />
          </label><br />
          <label>
            Password
            <input type='password' placeholder='Enter Password' value={this.state.password} onChange={this.onChangePassword} />
          </label><br />
          <input type='submit' value='Login!' />
        </form>
      </div>
    )
  }
}

export default Login
