import React from 'react'

export default function Helmet(props) {
  document.title = props.title
  return (
    <div>{props.children}</div>
  )
}
