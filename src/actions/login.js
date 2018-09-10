import firebase from '../firebase';

export default function mapDispatchToLoginProps(dispatch, ownProps) {
  return {
    loginByUsernamePassword: (username, password) => {
      dispatch({
        type: 'LOGIN_ING'
      })
      return loginBusiness(dispatch)(username, password, ownProps.navigation);
    },

    loginByFacebook: async () => {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1952254625024149', {
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(
        //   `https://graph.facebook.com/me?access_token=${token}`);
        // const data = await response.json();
        // console.log('this is response data: ', data);

        let credential = firebase.auth.FacebookAuthProvider.credential(token);
        // console.log('this is credential: ', credential)
        firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
          console.log(err);
        });

      dispatch({
        type: 'LOGIN_SUCCESS',
        uid: data.id,
        userInfo: data.name,
      })

    }

    },

    loginAuto: () => {

      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            uid: user.uid,
            userInfo: {
              displayName: user.displayName,
              photoURL: `${user.photoURL}/picture?type=normal`,
              email: user.email
            },
          })
          ownProps.navigation.navigate('Tabs');
        } else {
          setTimeout(() => ownProps.navigation.navigate('LoginScreen'), 2000);
        }
      });


    },

  }
}

const loginBusiness = (dispatch) => (username, password, navigation) => {

    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(username, password).then(data => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            uid: data.user.uid,
            userInfo: data.user.userInfo,
          })
          navigation.navigate("Tabs");
        });
    } catch (error) {
      alert(error.toString());
    }
}
