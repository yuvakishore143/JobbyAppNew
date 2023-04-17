import Cookies from 'js-cookie'
import {Component} from 'react'
import {GoLocation, GoMail} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import Failure from '../Failure'

class JobDetails extends Component {
  state = {details: {}, relatedJobs: [], skillList: [], life: {}, status: ''}

  componentDidMount = async () => {
    this.onFetchingDate()
  }

  onFetchingDate = async () => {
    this.setState({status: 'Loading'})
    const {match} = this.props
    const {params} = match

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'Get',
    }
    let response = await fetch(
      `https://apis.ccbp.in/jobs/${params.id}`,
      options,
    )
    if (response.ok === true) {
      response = await response.json()
      this.setState({
        details: response.job_details,
        relatedJobs: response.similar_jobs,
        skillList: response.job_details.skills,
        life: response.job_details.life_at_company,
        status: 'Successful',
      })
    } else {
      this.setState({status: 'Failure'})
    }
  }

  jobParticle = (details, show, altText) => {
<<<<<<< HEAD
    const data = 'hello'
=======
    const data = 'eho'
>>>>>>> parent of 4411561... completed project
    return (
      <div className="first">
        <div className="jobDetails-first-section">
          <div className="first-logo-part">
            <img
              className="jobCard-img"
              src={details.company_logo_url}
              alt={altText}
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
          <div className="dis-cont">
            <h1 className="description-heading">Description</h1>
            {show && (
              <div className="link-cont">
                <a target="__blank" href={details.company_website_url}>
                  Visit
                </a>
                <BiLinkExternal />
              </div>
            )}
          </div>
          <p className="job-description">{details.job_description}</p>
        </div>
      </div>
    )
  }

  onRetry = () => {
    this.onFetchingDate()
  }

  render() {
    const {details, relatedJobs, skillList, life, status} = this.state
    return (
      <>
        <Header />
        {(() => {
          switch (status) {
            case 'Loading':
              return (
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              )
            case 'Successful':
              return (
                <>
                  <div className="jobDetails-cont">
                    {this.jobParticle(
                      details,
                      true,
                      'job details company logo',
                    )}
                    <div className="second">
                      <h1 className="skill-heading">Skills</h1>
                      <ul className="skills-list">
                        {skillList.map(item => (
                          <li className="skill-list-item" key={item.name}>
                            <img
                              className="skill-img"
                              src={item.image_url}
                              alt={item.name}
                            />
                            <p>{item.name}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="third">
                      <div className="about-company">
                        <h1>Life at Company</h1>
                        <p>{life.description}</p>
                      </div>
                      <div>
                        <img src={life.image_url} alt="life at company" />
                      </div>
                    </div>
                  </div>
                  <div className="fourth">
                    <h1 className="similar-heading">Similar Jobs</h1>

                    <ul className="fourth-inner">
                      {relatedJobs.map(item => (
                        <li key={item.id} className="relatedJobs-list">
                          {this.jobParticle(
                            item,
                            false,
                            'similar job company logo',
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )
            case 'Failure':
              return <Failure onTry={this.onRetry} />
            default:
              return null
          }
        })()}
      </>
    )
  }
}

export default JobDetails
