import { call, takeLatest, put, all } from 'redux-saga/effects';
import { store } from "./../../../app.js";
const hasUserCharity = async () => {
  const state = store.getState();
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + state.loginReducer._token
  }
  console.log("headers from user saga", headers);
   const res = await fetch('/api/auth/charity', {
      method: 'POST',
      headers
    })
  const data = await res.json();
  return data.status;
  }

function* handleLogin() {
    try{
        yield put({
            type: 'setHasCharit',
            showRegisterLink: false,
        })
        const canCreateCharity = yield call(hasUserCharity)
        yield put({
            type: 'setHasCharit',
            showRegisterLink: canCreateCharity,
        })
    }catch(e) {
        console.log(e);
    }
}
export default all([  
   takeLatest('login', handleLogin),
]);