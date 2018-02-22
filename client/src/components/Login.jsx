import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import App from '../index.jsx';
import {Button, Form, Grid} from 'semantic-ui-react'

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
    this.onBackClick = this.onBackClick.bind(this);
  }

  login(e) {
    e.preventDefault();
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    }).then(() => {
      this.setState({username: '', password: ''});
      ReactDOM.render(<App />, document.getElementById('app'));
    }).catch((error) => {
      throw error;
    })
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }

  onBackClick() {
    ReactDOM.render(<App />, document.getElementById('app'));
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <h1>Login!</h1>
            <Form onSubmit={this.login}>
              <Form.Field>
                <label>Username</label>
                <input type='text' placeholder='Enter Username' value={this.state.username} onChange={this.onChangeUsername}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' placeholder='Enter Password' value={this.state.password} onChange={this.onChangePassword}/>
              </Form.Field>
              <Button type='submit'>Login!</Button>
            </Form>
            <br />
            <Button type='button' onClick={this.onBackClick}>Back</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Login
