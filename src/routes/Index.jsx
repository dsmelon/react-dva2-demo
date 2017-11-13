import React, { Component } from 'react'
import { Link } from 'dva/router'


class componentName extends Component {
  render() {
    return (
      <div>
        <li><Link
          to={{
            pathname: '/about',
            state: { referrer: window.location.href },
          }}
        >About3</Link></li>
      </div>
    )
  }
}


export default componentName
