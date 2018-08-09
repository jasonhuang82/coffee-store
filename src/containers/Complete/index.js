import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from "react-router-dom";
import queryString from "query-string";
// import queryString from "~/third-party/queryString";
import './style.scss';

import {
  watchCoffeDataSagaAction,
  getCoffeeDataAction
} from "~/actions";
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
  render() {
    let pid = this.urlQuery().pid;
    let coffee = this.props.coffees.find(items => items.pid === pid);
    // 因為資料目前是由 redux 去get ，若網頁reload，redux消失
    // 雖然組件有在willmount去get資料然後re-render在view
    // 但第一次render方法中利用 querystring所查詢到的產品物件式undefined
    // 依使用屬性就抱錯了，所以必須在第一次先加防呆預防資料還沒取到
    // 但卻先使用物件的屬性的錯誤，如果有該找到產品物件才render結果
    if (coffee === undefined) return <div className="d-flex justify-content-center align-items-center">資料加載中...</div>

    // 算出成分個別的比例
    
    // 1.先取所有咖啡的key
    let coffeeProportionArr = Object.keys(contentTypeChinese);
    // 2.去做 reduce 算出所有成分目前的總比例
    let totalProportion = coffeeProportionArr.reduce((total,curr) => {
      total += parseInt(coffee[curr]);
      return total;
    },0)
    // 3.在做map去拿總比例去對格別資料算佔的比例並做結構整理
    coffeeProportionArr = coffeeProportionArr.map((type,idx) => {
      return {
        name: contentTypeChinese[type],
        proportion: parseInt((coffee[type] / totalProportion)*100)
      };
    })
    return (
      <div className="Complete">
        <div className="container">
          <div className="CompleteProductInfo">
            <ul className="CompleteDetails">
              <li>
                <div className="CompleteDetailTitle">訂單編號 :</div>
                <div className="CompleteDetailContent">{`${(new Date()).getTime()}${coffee.pid}`}</div>
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
                    {coffeeProportionArr.map((coffeeProportion,idx) => (
                      <li key={idx}>{coffeeProportion.name}-{coffeeProportion.proportion}%</li>
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
    watchCoffeeData: (coffees = [], history, location) => dispatch(watchCoffeDataSagaAction(coffees, history, location)),
    getCoffeesData: () => dispatch(getCoffeeDataAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Complete));
