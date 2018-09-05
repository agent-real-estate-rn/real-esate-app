import {StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  componentContainer: {
    flex: 1
  },
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  wrapCarousel: {
    flex: 1
  },
  wrapDescription: {
    flex: 1,
    padding: 15
  },
  building: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  address: {
    fontSize: 16,
    marginBottom: 20
  },
  propInfoWrap: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30
  },
  priceWrap: {
    flex: 2
  },
  bedsWrap: {
    flex: 1,
    width: 150
  },
  bathWrap: {
    flex: 1,
    marginLeft: 30
  },
  sizeWrap: {
    flex: 1,
    marginLeft: 15
  },
  propInfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  propText: {
    fontStyle: "italic"
  },
  descriptionText: {
    fontSize: 18
  }
});
