import {GoLocation, GoMail} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'
import {withRouter} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {details, history} = props
  return (
    <li
      className="jobCard-cont"
      onClick={() => {
        history.push(`jobs/${details.id}`)
      }}
    >
      <div className="first-section">
        <div className="first-logo-part">
          <img
            className="jobCard-img"
            src={details.company_logo_url}
            alt="company logo"
          />
          <div className="first-heading-sec">
            <h1 className="first-job-title">{details.title}</h1>
            <p className="first-rating">
              <AiFillStar />
              {details.rating}
            </p>
          </div>
        </div>
        <div className="location-part">
          <div className="loc-type-div">
            <div className="job-location-cont">
              <GoLocation className="job-loc-logo" />
              <p>{details.location}</p>
            </div>
            <div className="job-type-cont">
              <GoMail className="job-type-logo" />
              <p>{details.employment_type}</p>
            </div>
          </div>
          <div className="job-salary-cont">
            <p>{details.package_per_annum}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="second-section">
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{details.job_description}</p>
      </div>
    </li>
  )
}

export default withRouter(JobCard)
