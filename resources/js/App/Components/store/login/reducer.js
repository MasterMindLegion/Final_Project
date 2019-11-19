const loginAction = {
  type: "login"
  
}
const logoutAction = {
  type: "logout"
}
const registerAction = {
  type: "logout"
}
const initialState = {
  //Login State
  loginSuccess: !!window.localStorage.getItem('_token'),
  token: window.localStorage.getItem('_token'),
  loginStatus: "Login",
  //Register State
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "login":
      return Object.assign({}, {loginSuccess: true, loginStatus: "Logout"})
    case "logout":
      return Object.assign({}, {loginSuccess: false, loginStatus: "Login"})
    default:
      return state 
  }
  
}
