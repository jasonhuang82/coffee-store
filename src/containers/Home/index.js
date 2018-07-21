import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import './style.scss';
// import { addPersonHandler, delPersonHandler } from "../actions";
import {
  changeSizeTypeAction,
  changeProportionAction,
  getCoffeeDataAction
} from "~/actions";
import CoffeeList from "~/components/CoffeeList";


class Home extends PureComponent {
  state = {
  };
  componentDidMount() {
    // console.log('props',this.props);
    this.props.getCoffeesData()
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
    return <div className="Home container">
        <div className="coffeeTypes">
          {this.props.coffees.map((coffee, idx) => (
            <CoffeeList 
              {...this.props} 
              coffeeIdx={idx}
              coffeeData = {coffee}
              key={idx}
              isEdit={false}
              onClick={e => {
                this.props.history.push({
                  pathname: `/proportion`,
                  search: `?pid=${coffee.pid}`              
                });
              }}
              buttonName={'想喝 '+ coffee.name}
            />
          ))}
          
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
    getCoffeesData: () => dispatch(getCoffeeDataAction()),
    changeSizeType: (index, value) => dispatch(changeSizeTypeAction(index, value)),
    changeProportion: (proportion, index, value) => dispatch(changeProportionAction(proportion, index, value))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
