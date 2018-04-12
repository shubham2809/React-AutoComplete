import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <option key={r.id} value= {r.value}></option>
  ))
  return options
}

export default Suggestions