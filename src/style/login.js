import { StyleSheet } from "react-native";

export default loginStyle = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#223A5E"
  },
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center"
  },
  inputWrap: {
    flex: 2,
    justifyContent: "space-between"
  },
  inputInner: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f7f7f7",
    shadowColor: "#5f5f5f",
    borderRadius: 10,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  input: {
    width: 300,
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  buttonWrap: {
    paddingTop: 5
  },
  textWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInner: {
    justifyContent: "center"
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 42,
    color: "#fff"
  }
});
