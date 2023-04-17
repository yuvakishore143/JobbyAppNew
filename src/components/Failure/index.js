import './index.css'

const Failure = props => {
  const {onTry} = props
  const onRetry = () => onTry()

  return (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={onRetry} type="button">
        Retry
      </button>
    </div>
  )
}

export default Failure
