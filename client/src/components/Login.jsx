import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import App from '../index.jsx';
import {Button, Form, Grid, Message} from 'semantic-ui-react'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
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
    }).then(() => {
      this.setState({username: '', password: ''});
      this.props.renderFavorite();
      ReactDOM.render(<App />, document.getElementById('app'));
    }).catch((error) => {
      this.setState({
        error: true
      })
      throw error;
    })
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <h1>Login!</h1>
            <Form onSubmit={this.login} error={this.state.error}>
              <Form.Field>
                <label style={{color: 'white'}}>Username</label>
                <input type='text' placeholder='Enter Username' value={this.state.username} onChange={this.onChangeUsername}/>
              </Form.Field>
              <Form.Field>
                <label style={{color: 'white'}}>Password</label>
                <input type='password' placeholder='Enter Password' value={this.state.password} onChange={this.onChangePassword}/>
              </Form.Field>
              <Message
                error
                header='Bad Credentials'
                content='Your username or password is incorrect. Please try again.'
              />
              <Button type='submit'>Login!</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Login
