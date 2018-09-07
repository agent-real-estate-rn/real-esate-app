import {
  StyleSheet
} from "react-native";

export default styles = StyleSheet.create({
  wrapScreen: {
    flex: 1,
    position: 'relative'
  },
  absoluteBtn: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 3,
    backgroundColor: '#f8f8f8',
    shadowColor: 'rgba(0,0,0,.15)',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  drawButton: {
    right: 10,
    top: 20,
    width: 60,
    height: 60
  },
  icon: {
    paddingLeft: 3,
    paddingTop: 18
  },
  getListBtn: {
    backgroundColor: '#223A5E',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 10,
    width: 160,
    height: 40,
  },
  doneBtn: {
    right: 10,
    top: 100,
    width: 60,
    height: 60,
  }
});