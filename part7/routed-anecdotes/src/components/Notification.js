const Notification = ({ text }) => {
  const style = {
    border: 'red solid 1px',
  }

  return <div style={style}>{text}</div>
}

export default Notification
