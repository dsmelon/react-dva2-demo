import React from 'react'
import PureComponent from '@/utils/pureComponent'
import { Link, Route } from 'dva/router'
import { Button } from 'antd'
import Test from './Test'

//import styles from './About.less'

class componentName extends PureComponent {
  render() {
    const { match } = this.props
    return (
      <div className="content">
        <Link to={`${match.url}/1`}><Button>100000</Button></Link>
        <div>about 页面234</div>
        <Route
          path={`${match.url}`}
          exact
          render={() => {
            return <div>123</div>
          }}
        />
        <Route
          path={`${match.url}/1`}
          component={Test}
        />
      </div>
    )
  }
}

export default componentName

