import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import {
  addPersonHandler,
  delPersonHandler
} from "../actions";
/*
saga 不出以下幾種情形：

監聽 action 發生 - > take, takeEvery

執行 transaction - > put

取消 transaction - > cancel
*/
// put === dispatch
// takeevery === 監聽特定dispatch每次所發出的時候，就觸發後面方法參數中會帶actions
// 所以可以帶payload來串資料
/*
saga 本質
讓我們的非同步 action 能夠更好被開發、 維護、 測試。
!!code 集中在 saga 中管理， 不再散落在各處， 全同步執行， 就算邏輯再複雜， 看起來也不會亂[1]
最主要還是解決複雜的異步交互情況， 特別是競爭狀態[3]

ref: https: //ithelp.ithome.com.tw/articles/10189189
通過 saga， 你只需要觸發一個 action

function onHandlePress() {
  // createRequest 觸發 action `BEGIN_REQUEST`
  this.props.dispatch(createRequest());
}
然後所有後續的操作都通過 saga 管理

function* watchBeginRequest() {
  yield takeEvery('BEGIN_REQUEST', beginRequest);
}

function beginRequest() {
  yield put({
    type: 'SHOW_WAITING_MODAL'
  });
  const response = yield call(myApiFunctionThatWrapsFetch);
  yield put({
    type: 'PRELOAD_IMAGES',
    response.images
  });
  yield put({
    type: 'HIDE_WAITING_MODAL'
  });
}
所有業務代碼都存於 saga 中， 不再散落在各處
全同步執行， 就算邏輯在複雜， 看起來也不會亂

saga 最主要是為了幫忙處理非同步的問提，但他也提供新的
狀態管理方式，在發異步動作時，比如登入會員會發fetch
然後登入成功發dispatch去store將user資料寄起來，然後可能
拿到user資料再作一連串dispatch，拿userid 抓出該user 喜愛
併發fetch取得喜好資料列表去render，失敗則顯示錯誤狀態
，這一系列的異步動作，不可能再reducer
做因為reducer只能接受同步行為不能有非同步，且在reducer再去dispatch其他動作
也不合理，所以就希望這系列動作能有一個框架能夠把我要做的這一整段事只需發出一個
想是暗號的action dispatch 然後那框架監聽到這暗號(dispatch)，就去做以上我訂好的一套流程
而我不需要把規則寫得零零落落，甚至散落在程式 componentDidMount 之類...裡面
變成所有異步相關的動作我只需要發出一個"暗號"的dispath ，給那個框架知道
她就幫我做一連串的邏輯，有點像是自訂好邏輯，跟框架說一下她就幫我執行惹
達到可以把非同步的事情統一管理 code ，然後裡面做完非同步動作要執行跟新store
就是發個dispatch ，這樣的code寫起來有點像是人類在講程式在幹嘛一樣
很直觀的"一句話做一件事情"，而這個框架就是 saga


有點像是 vue 的 action(saga) & mutation(redux) 做的事
vue 在更新store時若是只能發mutation，然後有非同步行為要發action
但最後更新store還是要執行mutation，所以套到saga也是，更新 store
只能透過reducer ，用非同步行為可透過saga先把資料處理完再由reducer
同步更新到store，結論只有reducer可以改store，saga只能處理異步行為
並在適當時機發dispatch

所以使用saga時，會發一個給saga監聽的 dispatch，但他部會寫在reducer，他發dispatch一進reducer
會因為沒switch沒case到就return原狀態回去， 這是給saga監聽的dispatch，saga監聽到就執行
自訂的一連串非同步行為，所以所有非同步要發的dispatch都交給saga處理，需要使用就只要發 saga 監聽
的dispatch即可
注意 saga 第一個參數是payload，所以可以帶 payload 進去處理
*/

// Our worker Saga: 将执行异步的 increment 任务
function* addPersonDelay({name, age}) {
  console.log('開始新增...');
  
  yield delay(1000)
  yield put(addPersonHandler(name, age))
  console.log('新增成功!!');
  
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export default function* watchAddPersonDelayAsync() {
  yield takeEvery('ADD_PERSON_ASYNC', addPersonDelay)
}