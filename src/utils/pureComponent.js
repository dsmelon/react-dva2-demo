/**
 * 封装的判断页面是否需要渲染的组件
 */
import { Component } from 'react'
import { is } from 'immutable'

const shallowEqual = (objA, objB) => {
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false
  return !keysA.some(v => (!Object.prototype.hasOwnProperty.call(objB, v) || !is(objA[v], objB[v])))
}

class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    )
  }
}

export default PureComponent
