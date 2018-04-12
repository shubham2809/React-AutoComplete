import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map( (r,i) => (
    <option key={r+i} value= {r}></option>
  ))
  return options
}

export default Suggestions