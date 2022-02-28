import PropTypes from 'prop-types'

const Notification = ({ message, type = 'success' }) => {
  if (message === null) {
    return null
  }

  return <div className={`notification ${type}`}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Notification
