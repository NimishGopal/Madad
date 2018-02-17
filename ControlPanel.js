import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ControlPanel extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.innerContainerStyle}>

          <TouchableOpacity onPress={()=> { Actions.register()}}>
              <Text style={styles.textStyle}>REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> { Actions.dashboard() }}>
              <Text style={styles.textStyle}>COMPLAINTS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> { Actions.about() }}>
              <Text style={styles.textStyle}>ABOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: '#3998db'
  },
  innerContainerStyle: {
     flex: 0.9,
     marginTop: 75
  },
  textStyle: {
    padding: 20,
    fontSize: 16,
    color: '#fff',
    marginLeft: 20
  },
  lowerTextStyle: {
    padding: 10,
    fontSize: 12,
    color: '#fff',
    marginLeft: 28
  }
};

export default ControlPanel;
