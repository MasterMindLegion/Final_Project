const loginAction = {
  type: "login",
}
const logoutAction = {
  type: "logout"
}

const initialState = {
  loginSuccess: false, 
  showRegisterLink : false,
}
export const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case "login":
      return {
        ...state,
        loginSuccess: true 
      }
    case "logout":
      return {
        ...state, 
        loginSuccess: false 
      }
      case "setHasCharit" :
          return{
            ...state,
            showRegisterLink: false,        
          }
      case "setHasNotCharit" :
           return{
             ...state,
             showRegisterLink: true,        
              }
    default:
      return state 
  }
  
}
