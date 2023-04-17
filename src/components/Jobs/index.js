import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import JobCard from '../JobCard'
import Failure from '../Failure'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    checked: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    checked: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    checked: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    checked: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employment: [],
    salaryRange: 0,
    search: '',
    status: '',
    allJobsList: [],
    profile: {},
    employmentList: employmentTypesList,
    profileStatus: '',
  }

  componentDidMount() {
    this.fetchingData()
    this.fetchingProfile()
  }

  fetchingProfile = async () => {
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    let response = await fetch('https://apis.ccbp.in/profile', options)
    response = await response.json()
    this.setState({profile: response.profile_details})
  }

  fetchingData = async () => {
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    this.setState({status: 'Loading'})
    const {employment, salaryRange, search} = this.state
    let response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employment.join(
        ',',
      )}&minimum_package=${salaryRange}&search=${search}`,
      options,
    )

    if (response.ok === true) {
      response = await response.json()
      this.onFetchingSuccessful(response)
    } else {
      this.setState({status: 'Failure'})
    }
  }

  onSalarySelecting = val => {
    this.setState({salaryRange: val}, this.fetchingData)
  }

  onFetchingSuccessful = response => {
    this.setState({allJobsList: response.jobs, status: 'Success'})
  }

  onSettingCheckedValues = () => {
    const {employmentList} = this.state
    const val = []
    employmentList.map(item => {
      if (item.checked === true) {
        val.push(item.employmentTypeId)
      }
      return null
    })
    this.setState({employment: val}, this.fetchingData)
  }

  onCheckBoxChange = id => {
    this.setState(
      prevState => ({
        employmentList: prevState.employmentList.map(item => {
          if (item.employmentTypeId === id) {
            return {...item, checked: !item.checked}
          }
          return item
        }),
      }),
      this.onSettingCheckedValues,
    )
  }

  onRetry = () => {
    this.fetchingData()
    this.fetchingProfile()
  }

  render() {
    const {allJobsList, status, profile, salary, employmentList} = this.state
    console.log(status)
    return (
      <div className="jobs-cont">
        <Header />
        <div className="jobs-min-cont">
          <div className="filters-div">
            <div className="jobs-profile">
              <img src={profile.profile_image_url} alt="profile" />
              <h1>{profile.name}</h1>
              <p>{profile.short_bio}</p>
            </div>
            <hr />
            <div className="jobs-employment">
              <h1 className="filters-heading">Type of Employment</h1>
              <ul>
                {employmentList.map(item => (
                  <li key={item.employmentTypeId}>
                    <input
                      checked={employmentList.checked}
                      className="jobs_employment-list"
                      type="CheckBox"
                      id={item.employmentTypeId}
                      onChange={() =>
                        this.onCheckBoxChange(item.employmentTypeId)
                      }
                    />
                    <label htmlFor={item.employmentTypeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="jobs-salary">
              <h1 className="filters-heading">Salary Range</h1>
              <ul>
                {salaryRangesList.map(item => (
                  <li key={item.salaryRangeId}>
                    <input
                      value={salary}
                      name="salary"
                      className="jobs_employment-list"
                      type="radio"
                      id={item.salaryRangeId}
                      onChange={() => {
                        this.onSalarySelecting(item.salaryRangeId)
                      }}
                    />
                    <label htmlFor={item.salaryRangeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {(() => {
              switch (status) {
                case 'Success':
                  return (
                    <div className="all-jobs-cont">
                      <div>
                        <div className="jobs-search-cont">
                          <input
                            type="search"
                            placeholder="Search"
                            className="jobs-search-input"
                            onChange={e => {
                              this.setState({search: e.target.value})
                            }}
                          />
                          <button
                            onClick={() => this.fetchingData()}
                            type="button"
                            data-testid="searchButton"
                            className="search-logo-cont"
                          >
                            <BsSearch className="search-icon search-logo" />
                          </button>
                        </div>
                        {allJobsList.length > 0 ? (
                          <ul className="all-jobs-list">
                            {allJobsList.map(item => (
                              <JobCard key={item.id} details={item} />
                            ))}
                          </ul>
                        ) : (
                          <div className="noJobs-cont">
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                              alt="no jobs"
                            />
                            <h1>No Jobs Found</h1>
                            <p>We could not find any jobs. Try other filters</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                case 'Loading':
                  return (
                    <div className="loader-container" data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color="#ffffff"
                        height="50"
                        width="50"
                        className="loader"
                      />
                    </div>
                  )
                case 'Failure':
                  return <Failure onTry={this.onRetry} />
                default:
                  return ''
              }
            })()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
