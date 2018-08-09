import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import queryString from "query-string";
// import queryString from "~/third-party/queryString";
import './style.scss';
import {
  changeSizeTypeAction,
  changeProportionAction,
  getCoffeeDataAction,
  watchCoffeDataSagaAction
} from "~/actions";
import CoffeeList from "~/components/CoffeeList";

class Proportion extends PureComponent {
  state = {
  };
  componentDidMount() {
    this.checkRouter();
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log('coffee', this.props);
    this.checkRouter();
  }

  checkRouter = () => {
    const {
      watchCoffeeData,
      coffees,
      history,
      location
    } = this.props;
    watchCoffeeData(coffees, history, location);
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

  urlQuery = () => queryString.parse(this.props.location.search);

  goOrderPage = (pid) => {
    this.props.history.push({
      pathname: `/complete`,
      search: `?pid=${pid}`,
      query: {
        isOrder: true
      }
    });
  }
  render() {
    let idx = 0;
    let pid = this.urlQuery().pid;
    let coffee = this.props.coffees.find((items,index) => {
      if(items.pid === pid) {
        idx = index;
        return true;
      }
      return false;
    })
    
    if (coffee === undefined) return <div className="d-flex justify-content-center align-items-center">資料加載中...</div>
    return <div className="Proportion container">
        <div className="coffeeTypes">
          <CoffeeList 
            {...this.props} 
            coffeeIdx={idx}
            coffeeData = {coffee}
            isEdit
            onClick={e => this.goOrderPage(coffee.pid)}
            onRangeChange = {this.props.changeProportion}
            onSelectChange={this.props.changeSizeType}
          />
          <div className="d-flex justify-content-center align-items-center py-4">
            <button className="btn btn-primary mr-4"
              onClick={e=>{
                this.props.history.goBack()
              }}
            >
              想換口味嗎?
            </button>
            <button className="btn btn-primary" 
              onClick={e => this.goOrderPage(coffee.pid)}
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
    watchCoffeeData: (coffees = [], history, search) => dispatch(watchCoffeDataSagaAction(coffees, history, search)),
    getCoffeesData: () => dispatch(getCoffeeDataAction()),
    changeSizeType: (index, value) => dispatch(changeSizeTypeAction(index,value) ),
    changeProportion: (proportion, index, value) => dispatch(changeProportionAction( proportion, index, value))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Proportion));
