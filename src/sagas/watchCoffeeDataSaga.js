import { delay } from 'redux-saga';
import { put, takeEvery,takeLatest,take } from 'redux-saga/effects';
import {
  changeSizeTypeAction,
  changeProportionAction,
  getCoffeeDataAction
} from "~/actions";
import queryString from "query-string";

const urlQuery = (search) => queryString.parse(search);

function* watchCoffeeData({payload}) {
  console.log('watchCoffeeData');
  let isNoCoffeeData = payload.coffees.length === 0;
  if (isNoCoffeeData) yield put(getCoffeeDataAction());

  // 如果再complete page 沒有isOrder參數代表沒有
  // 產生訂單不可以從網址列進入
  const isOrder = (() => {
    if (payload.location.hasOwnProperty('query')){
      if (payload.location.query.hasOwnProperty('isOrder')) {
        return payload.location.query.isOrder;
      }
    }
    return false;
  })();
  if (payload.location.pathname.indexOf('complete') !== -1 && !isOrder) {
    payload.history.push("/");
  }
  // 已經將coffe資料撈回來然後也有history物件時，再去coffee中找有無 上一頁傳來的pid
  // 的品項沒有就倒回首頁
  if (payload.coffees.length > 0 && payload.history) {
    let search = payload.location.search;
    let queryParm = urlQuery(search);
    // console.log('search', search);
    
    let coffee = payload.coffees.find(items => items.pid === queryParm.pid);
    const hasPid = !queryParm.pid;
    const hasQuerySingleProduct = queryParm.pid && coffee === undefined;
    // console.log("pid", !this.queryParm.pid);
    // console.log("coffee", coffee);
    // console.log("length", payload.coffees.length);
    if (hasPid || hasQuerySingleProduct) payload.history.push("/");
  }
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export default function* watchCoffeeDataSaga() {
  yield takeLatest('WATCH_COFFEE_DATA_SAGA', watchCoffeeData)
}