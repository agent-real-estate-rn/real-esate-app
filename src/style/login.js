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
    paddingTop: 35,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f7f7f7"
  },
  buttonWrap: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
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
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30
  },
  loginText: {
    fontSize: 18,
    color: "#223A5E"
  }
});
