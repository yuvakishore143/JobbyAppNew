import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    error: '',
  }

  componentDidMount = () => {
    const {history} = this.props
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      history.replace('/')
    }
  }

  onLoginSuccess = res => {
    this.setState({showError: false})
    const {history} = this.props
    Cookies.set('jwt_token', res.jwt_token, {expires: 3})
    history.replace('/')
  }

  onLoginFailure = res => {
    this.setState({showError: true, error: res.error_msg})
  }

  onSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const object = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    let response = await fetch('https://apis.ccbp.in/login', object)
    if (response.ok === true) {
      response = await response.json()
      this.onLoginSuccess(response)
    } else {
      response = await response.json()
      this.onLoginFailure(response)
    }
  }

  render() {
    const {showError, error} = this.state
    return (
      <div className="login-cont">
        <div className="login-min-cont">
          <div className="login-heading-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <div>
              <label className="login-label" htmlFor="login_username_id">
                USERNAME
              </label>
              <input
                id="login_username_id"
                className="login-input"
                placeholder="Username"
                onChange={e => {
                  this.setState({username: e.target.value})
                }}
              />
              <label className="login-label" htmlFor="login_password_id">
                PASSWORD
              </label>
              <input
                type="password"
                id="login_password_id"
                className="login-input"
                placeholder="Password"
                onChange={e => {
                  this.setState({password: e.target.value})
                }}
              />
              {showError && <p className="login-error">{error}</p>}
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
