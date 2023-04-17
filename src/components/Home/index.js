import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const {history} = this.props
    return (
      <div className="home-cont">
        <Header />
        <div className="home-min-cont">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information ,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link exact to="/jobs">
            <button
              onClick={() => {
                history.push('/jobs')
              }}
              className="home-btn"
              type="button"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
