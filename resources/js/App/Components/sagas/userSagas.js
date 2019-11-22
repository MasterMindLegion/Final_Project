import { call, takeLatest, put, all } from 'redux-saga/effects';

const hasUserCharity = (event) => {
  //  event.preventDefault();
    fetch('/api/auth/charity', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('_token')
      }
    })
      .then(response => response.json())
      .then(data => {
        if(data.status == true) {
          this.props.registerCharityTrue();
        } else {
          this.props.registerCharityFalse();
        }     
      })
  }

function* handleLogin() {
    try{
        yield put({
            type: 'setHasCharit',
            showRegisterLink: false,
        })
        const canCreateCharity = yield call(hasUserCharity)
        console.log(canCreateCharity);
        yield put({
            type: 'setHasNotCharit',
            showRegisterLink: true,

        })
    }catch(e) {
        console.log(e);
    }
}

export default all([  
   takeLatest('login', handleLogin)
]);