import React, { Component } from 'react';
import {
  Platform,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

export default class Success extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={{ flex: 0.4, justifyContent: 'center' }}>
        <Animatable.View animation="pulse" easing="ease-in" iterationCount="infinite">
          <Image
            source={require('./../Resources/tick.png')}
            style={{ borderRadius: 10, height: Dimensions.get('window').height/6, width: Dimensions.get('window').width/4, margin: 30}}
            resizeMode='contain'
          />
        </Animatable.View>
        </View>
        <View style={{ flex: 0.6, backgroundColor: '#F5FCFF', width: Dimensions.get('window').width, justifyContent: 'space-around' }}>
          <View>
            <Text style={{ fontSize: 30, fontWeight: '900', color: '#000', alignSelf: 'center'}}>Success!</Text>
          </View>
          <View>
            <TouchableOpacity
            style={styles.sendButtonStyle}
            onPress={() => Actions.camera()}
            >
              <Text style={styles.buttonTextStyle}>
                GO TO HOME
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#6a416d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonStyle: {
    height: 50,
    width: null,
    backgroundColor: '#f38575',
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 40

  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    }
}
