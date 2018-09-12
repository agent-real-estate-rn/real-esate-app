import React from 'react';
import { ActivityIndicator,Button,Image,StatusBar,StyleSheet,Text,TouchableOpacity,View, Dimensions } from 'react-native';
import { Icon, } from 'react-native-elements'
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import firebase from '../firebase';

console.disableYellowBox = true;

export default class Camera extends React.Component {
  state = {
    image: null,
    uploading: false,
    width: Dimensions.get('window').width
  };
  
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }
  onLayout() {
    this.setState({
      width: Dimensions.get('window').width
    })
  }

  render() {
    let { image } = this.state;
    let imageStyle = {width: this.state.width - 30, height: this.state.width * 9 /16};

    return (
      <View onLayout={this.onLayout.bind(this)}>

      <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{paddingTop:10}}>Upload Photo: </Text>
        <Button onPress={this.pickImage} title="Camera Roll" />
        <Text style={{paddingTop:10, paddingRight:5}}> or </Text>
        <TouchableOpacity  onPress={this.takePhoto} style={{paddingTop:5}}>
          <Icon name='camera' type='font-awesome' color='#223A5E' />
        </TouchableOpacity>
      </View>
        
        {this.maybeRenderImage(imageStyle)}
        {this.maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}/>
        </View>
      );
    }
  };

  maybeRenderImage = (imageStyle) => {
    let { image } = this.state;
    if (!image) {
      return;
    } 
    return (
      <View
        style={styles.containerImage}>
        <Image source={{ uri: image }} style={[imageStyle]} />
      </View>
    );
  };


  takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(pickerResult);
  };

  pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(pickerResult);
  };

  handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(uuid.v4());

  // upload blob to firebase and get image download URL
  const snapshot = await ref.put(blob);
  const downloadUrl = await firebase.storage().ref().child(snapshot.metadata.name).getDownloadURL()
  return downloadUrl;
}

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    marginTop: 30,
    borderRadius: 3
  },
  cameraImage: {
    flex: 1,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
  },
  noImageSelectedText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  
})

