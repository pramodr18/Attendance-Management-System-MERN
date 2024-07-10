import React from 'react'

function Button({color,onClick,title}) {
    const styles = {
        backgroundColor: color,
        margin: '7px',
        padding: '5px',
        color:'white'
    }
  return (
      <button style={styles} onClick={onClick}>
          {title}
    </button>
  )
}

export default Button