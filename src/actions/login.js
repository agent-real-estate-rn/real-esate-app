import firebase from '../firebase';

export default function mapDispatchToLoginProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch({
        type: 'LOGIN_ING'
      })
      return loginBusiness(dispatch)(username, password);
    }
  }
}

const loginBusiness = (dispatch) => (username, password) => {
  firebase.auth().signInWithEmailAndPassword(username, password).then(data => {
    dispatch({
      type: 'LOGGED_IN',
      user: data.user.uid
    })
  });
}

// example of action.