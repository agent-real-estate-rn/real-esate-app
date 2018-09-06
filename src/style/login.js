import { StyleSheet } from "react-native";

export default loginStyle = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#223A5E"
  },
  wrap: {
    flex: 1,
    justifyContent: "center",
  },
  inputWrap: {
    padding: 15,
    flex: 3,
    justifyContent: "flex-start"
  },
  input: {
    flex: 1,
    padding: 20,
    margin: 10,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.7
  },
  buttonWrap: {
    margin: 10
  },
  textWrap: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 42,
    color: "#fff"
  },
  loginBtn: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: "#f7f7f7"
  },
  loginText: {
    fontSize: 18,
    color: "#223A5E"
  }
});
