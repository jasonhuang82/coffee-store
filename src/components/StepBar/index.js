import React, { Component } from 'react';
// import {
//   withRouter
// } from "react-router-dom";
import PropTypes from 'prop-types';
import './style.scss';
class StepBar extends Component {
  static defaultProps = {
    stepList: [
      {
        title: '尺寸',
        router: ''
      },
      {
        title: '比例',
        router: 'proportion'
      },
      {
        title: '完成',
        router: 'complete'
      }
    ]
  }
  static propType = {

  }
  componentDidMount() {
    // console.log('StepBar props',this.props);
    
  }
  componentWillReceiveProps(){
  }
  // 實作cx套件
  addClass = (moreClass = [], futherClass = {}) => {
    const mapClass = (initAry, mapAry) => {
      let classAry = [...initAry];
      for (let key in mapAry) {
        mapAry[key] && classAry.push(key);
      }
      return classAry.join(" ");
    };
    // isArray
    const moreClassIsArray = (
      typeof moreClass !== 'string' &&
      Array.isArray(moreClass)
    );
    if (moreClassIsArray) return moreClass.join(" ");
    // isObject 因為字串也是陣列所以要判斷typeof
    const moreClassIsObject = (
      typeof moreClass !== 'string' &&
      typeof moreClass === "object" &&
      Object.keys(moreClass).length > 0
    );
    if (moreClassIsObject) {
      let classAry = [];
      return mapClass(classAry, moreClass);
    }

    // 如果第一個傳字串要放入預設class，並用第二參數loop
    const futherClassIsObject = (
      typeof moreClass === 'string' &&
      typeof futherClass === "object" &&
      Object.keys(futherClass).length > 0
    );
    if (futherClassIsObject) {
      let classAry = [moreClass];
      return mapClass(classAry, futherClass);
    }
    // noMatch
    return "";
  };
  render() {
    return (
      <ul className="StepBar">
        {this.props.stepList.map( (step,i) => (
          <li className={this.addClass({
            active: this.props.pathname === `/${step.router}`
          })} key={i}><span>{step.title}</span></li>
        ))}
      </ul>
    );
  }
}

export default StepBar;

