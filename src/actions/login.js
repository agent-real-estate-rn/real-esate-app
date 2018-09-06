import firebase from '../firebase';

export default function mapDispatchToLoginProps(dispatch) {
  return {
    loginByUsernamePassword: (username, password, navigation) => {
      dispatch({
        type: 'LOGIN_ING'
      })
      return loginBusiness(dispatch)(username, password, navigation);
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

    loginAuto: (navigation) => {

      firebase.auth().onAuthStateChanged((user) => {
        const data = user;
        dispatch({
          type: 'LOGIN_SUCCESS',
          uid: data.uid,
          userInfo: data.email,
        })
        if (user != null) {
          navigation.navigate('Tabs');
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
      console.log(error.toString());
    }
}
