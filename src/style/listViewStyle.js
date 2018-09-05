import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    backgroundColor: "#ededed",
    justifyContent: "center",
    paddingTop: 20
  },
  flatList: {
    paddingLeft: 15,
    paddingRight: 15
  },
  card: {
    marginBottom: 20,
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: '#ccc',
    shadowOpacity: 0.7,
  },
  cardDesc: {
    padding: 15,
    backgroundColor: '#f7f7f7'
  },
  building: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  cardText: {
    flex: 1,
  }
});