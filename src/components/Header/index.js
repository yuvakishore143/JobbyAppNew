import {NavLink, withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-cont">
      <ul>
        <li className="header-list">
          <Link exact to="/">
            <img
              className="header-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li className="header-list">
          <NavLink className="header-list-link" to="/" exact>
            Home
          </NavLink>
          <NavLink className="header-list-link" to="/jobs" exact>
            Jobs
          </NavLink>
        </li>
        <li className="header-list">
          <button
            onClick={onLogOut}
            type="button"
            className="header-logout-btn"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
