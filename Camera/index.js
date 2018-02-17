import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
  AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

export default class CameraView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null
    };
  }

  componentWillMount() {
    // AsyncStorage.clear();
    AsyncStorage.getItem('user', (err, result) => {
      if(result==null){
          alert('Kindly Register First!')
      }
    })
  }

  takePicture() {
    AsyncStorage.getItem('user', (err, result) => {
      if(result==null){
        alert('Kindly Register First!')
      }
      else {
      this.camera.capture()
        .then((data) => {
          console.log(data);
          this.setState({ path: 'data:image/jpeg;base64, '+ data.data })
        })
        .catch(err => console.error(err));
      }
    })
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.memory}
        captureQuality={Camera.constants.CaptureQuality.low}
      >
        <TouchableOpacity
          style={{ position: 'absolute', top: 20, left: 20 }}
          onPress={()=> {this.props.openDrawer()}}
        >
          <Image
            source={require('./../Resources/drawer.png')}
            style={{height: 30, width: 30}}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row', margin: 20}}>
          <TouchableOpacity
          onPress={() => this.setState({ path: null })}>
            <Image
              source={require('./../Resources/cancel.png')}
              style={{height: 50, width: 50}}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => Actions.maps({
            imagePath: this.state.path
          })}>
            <Image
              source={require('./../Resources/send.png')}
              style={{height: 50, width: 50}}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 80,
    height: 80,
    borderRadius: 45,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    // position: 'absolute',
    // right: Dimensions.get('window').width/1.2,
    // top: Dimensions.get('window').height/1.2
  },
  send: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignSelf: 'flex-end'
  }
});
