import React from 'react'
import '../css/Loader.css'

const Loader = (props) => {
  return (
    <div className="loader" style={{border: `4px solid ${props.color}`}}></div>
  )
}

export default Loader