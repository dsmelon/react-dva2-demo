import React from 'react'
import PureComponent from '@/utils/pureComponent'

import { Link } from 'dva/router'

class componentName extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
    }
  }
  changeNum=() => {
    this.setState({
      num: 2,
    })
  }
  render() {
    console.log(111111)
    return (
      <div>
        <Link to="/about">返回about123456</Link>
        我是 about 下的页面
        <div onClick={this.changeNum}>点我</div>
      </div>
    )
  }
}

export default componentName

