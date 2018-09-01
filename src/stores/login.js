const initialState = {isLoading: false, uid: '', userInfo: {}};

export default login = (state= initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ING': {
      return {...state, isLoading: true};
    }
    case 'Login_SUCCESS': {
      return {isLoading: false, uid: action.uid, userInfo: action.userInfo};
    }
    default:
      return state;
  }
}