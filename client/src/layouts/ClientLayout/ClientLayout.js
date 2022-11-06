import React, { Children } from 'react'

export function ClientLayout(props) {
    const { children } = props;

  return (
    <div>
        <h1>ClientLayout</h1>
        { children }
    </div>
  )
}
