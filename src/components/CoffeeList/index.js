import React, { Component } from 'react';
// import {
//   withRouter
// } from "react-router-dom";
import PropTypes from 'prop-types';
import './style.scss';


const coffeeNameChinese = {
  "Expresso": '義式濃縮',
  "Americano": '美式咖啡',
  "Cappuccino": '卡布奇諾',
  "Latte": '拿鐵'
};

const cupTypeChinese = {
  "small": '小',
  "medium": '中',
  "big": '大',
  "mock": '馬克杯'
};
const contentTypeChinese = {
  "bubble": '奶泡',
  "milk": '牛奶',
  "water": '水',
  "coffee": '黑咖啡'
};

const SelectCoffee = ({ coffee, index, onChange}) => {
  const cupType = ["small", "medium", "big", "mock"];
  
  return (
    <div className="dropDownList">
      <select
        className="my-3"
        value={coffee.type}
        onChange={e => { onChange(index, e.target.value) }}
      >
        {cupType.map((items, i) => (
          <option value={items} key={i}>
            {cupTypeChinese[items]}
          </option>
        ))}
      </select>
    </div>
  );
};

const RangeBar = ({ coffee, index, onChange}) => {
  
  const contentType = ["bubble", "milk", "water", "coffee"];
  return contentType.map((type, i) => (
    <div key={i} className="controlPanelRange">
      <h4>{contentTypeChinese[type]}</h4>
      <div className="rangeInput ">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={coffee[type]}
          onChange={e => { onChange(type, index, e.target.value) }}
        />
      </div>
    </div>
  ))

};

class CoffeeList extends Component {
  static defaultProps = {
    isEdit:true
  }
  static propType = {
    isEdit: PropTypes.bool
  }

  componentDidMount() {
  }
  componentWillReceiveProps(){
    // console.log('CoffeeList componentWillReceiveProps');
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
      <div 
        className={this.addClass("coffeeType row", {
          'isEdit': this.props.isEdit
        })}
      >
        <div className="num col-6 col-md-3">{`0${this.props.coffeeIdx + 1}`}</div>
        <div className="cupContainer col-6 col-md-3">
          <div className={this.addClass(["cup", this.props.coffeeData.type])}>
            <div className="ingradients">
              <div
                className="coffee"
                style={{ height: `${this.props.coffeeData.coffee}%` }}
              />
              <div
                className="water"
                style={{ height: `${this.props.coffeeData.water}%` }}
              />
              <div className="milk" style={{ height: `${this.props.coffeeData.milk}%` }} />
              <div
                className="bubble"
                style={{ height: `${this.props.coffeeData.bubble}%` }}
              />
            </div>
          </div>
        </div>
        <div className="control col-12 col-md-6">
          <h4>{coffeeNameChinese[this.props.coffeeData.name]}</h4>
          <div className="controlPanel">
            <SelectCoffee
              coffee={this.props.coffeeData}
              index={this.props.coffeeIdx}
              onChange={this.props.changeSizeType}
            />
            <RangeBar
              coffee={this.props.coffeeData}
              index={this.props.coffeeIdx}
              onChange={this.props.onRangeChange}
            />
          </div>
          {(this.props.buttonName && this.props.onClick) && (
            <div className="d-flex align-items-center py-4">
              <button className="btn btn-primary" onClick={this.props.onClick}>
                {this.props.buttonName}
              </button>
            </div>
          )}
          
        </div>
        
      </div>
    );
  }
}

export default CoffeeList;

