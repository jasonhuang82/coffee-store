import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from "react-router-dom";
import './style.scss';

// import { addPersonHandler, delPersonHandler } from "../actions";
const coffeeNameChinese = {
  Expresso: "義式濃縮",
  Americano: "美式咖啡",
  Cappuccino: "卡布奇諾",
  Latte: "拿鐵"
};

const cupTypeChinese = {
  small: "小",
  medium: "中",
  big: "大",
  mock: "馬克杯"
};
const contentTypeChinese = {
  bubble: "奶泡",
  milk: "牛奶",
  water: "水",
  coffee: "黑咖啡"
};

class Complete extends PureComponent {
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
    console.log("Complete", this.props);
    let idx = 0;
    let pid = this.props.location.search.replace('?', '').split('=')[1] || '001';
    let coffee = this.props.coffees.find((items, index) => {
      if (items.pid === pid) {
        idx = index;
        return true;
      }
      return false;
    })
    return (
      <div className="Complete">
        <div className="container">
          <div className="CompleteProductInfo">
            <ul className="CompleteDetails">
              <li>
                <div className="CompleteDetailTitle">訂單編號 :</div>
                <div className="CompleteDetailContent">123456</div>
              </li>
              <li>
                <div className="CompleteDetailTitle">品名 :</div>
                <div className="CompleteDetailContent">{coffeeNameChinese[coffee.name]}</div>
              </li>
              <li>
                <div className="CompleteDetailTitle">尺寸 :</div>
                <div className="CompleteDetailContent">{cupTypeChinese[coffee.type]}</div>
              </li>
              <li>
                <div className="CompleteDetailTitle">比例 :</div>
                <div className="CompleteDetailContent">
                  <ul>
                    {Object.keys(contentTypeChinese).map((type,idx) => (
                      <li key={idx}>{contentTypeChinese[type]}-{coffee[type]}%</li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <h6>請依照訂單編號至門市取餐~謝謝您</h6>
          </div>
          <div className="d-flex justify-content-center align-items-center py-4">
            <button className="btn btn-primary mr-4"
              onClick={e => {
                this.props.history.replace("/");
              }}
            >
              重訂一杯
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    coffees: state.coffees
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Complete));
