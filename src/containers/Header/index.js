import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from "react-router-dom";
import './style.scss';
import StepBar from "~/components/StepBar";
// import { addPersonHandler, delPersonHandler } from "../actions";

class Header extends PureComponent {
  state ={

  };
  componentDidMount() {}
  
  // 實作cx套件
  addClass = (moreClass = [], futherClass={}) => {
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
    const Title = ({ pathname }) => {      
      let currentTitle = '';
      switch (pathname) {
        case "/proportion":
          currentTitle = "自己的口味自己調~";
          break;
        case "/complete":
          currentTitle = "已完成預定囉!";
          break;
        default:
          currentTitle = "今天想喝甚麼呢?";
          break;
      }
      return <h2>{currentTitle}</h2>;
    };
    
    
    return(
      <header>
        <div className="container">
          <div className="mb-3 text-center">
            <h1 className="mt-3">React Coffee Store</h1>
            <Title pathname={this.props.location.pathname}/>
          </div>
          <StepBar {...this.props} pathname={this.props.location.pathname}/>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return{

  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
