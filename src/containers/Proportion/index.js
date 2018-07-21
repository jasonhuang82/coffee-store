import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import './style.scss';
// import { addPersonHandler, delPersonHandler } from "../actions";
import CoffeeList from "~/components/CoffeeList";

class Proportion extends PureComponent {
  state = {
  };
  componentDidMount() { 
    // console.log(this.props);
    
  }
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
    let idx = 0;
    let pid = this.props.location.search.replace('?','').split('=')[1] || '001';
    let coffee = this.props.coffees.find((items,index) => {
      if(items.pid === pid) {
        idx = index;
        return true;
      }
      return false;
    })
    // console.log('coffee',coffee);
    
    return <div className="Proportion container">
        <div className="coffeeTypes">
          <CoffeeList 
            {...this.props} 
            coffeeIdx={idx}
            coffeeData = {coffee}
            isEdit
            onClick={e => {
              this.props.history.push({
                pathname: `/complete`,
                search: `?pid=${coffee.pid}`                  
              });
            }}
          />
          <div className="d-flex justify-content-center align-items-center py-4">
            <button className="btn btn-primary mr-4"
              onClick={e=>{
                this.props.history.goBack()
              }}
            >
              想換尺寸嗎
            </button>
            <button className="btn btn-primary" 
              onClick={e => {
                this.props.history.push({
                  pathname: `/complete`,
                  search: `?pid=${coffee.pid}`                  
                });
              }}
            >
              來去預定嚕
            </button>
          </div>
        </div>
      </div>;
  }
}

const mapStateToProps = state => {
  return{
    coffees: state.coffees
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSizeType: (index, value) => dispatch({ type:'CHANGE_SIZE_TYPE',index,value}),
    changeProportion: (proportion, index, value) => dispatch({ type: 'CHANGE_PROPORTION', proportion, index, value })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Proportion));
