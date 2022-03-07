import { useSelector } from 'react-redux'

const Notification = () => {
  const getNotification = state => state.notification
  const { text, type } = useSelector(getNotification)

  if (text === null) {
    return null
  }

  return <div className={`notification ${type}`}>{text}</div>
}

export default Notification
