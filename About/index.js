import React, { Component } from 'react';
import {
  TextInput,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage,
  Image
} from 'react-native';

export default class About extends Component {
  render() {
    return(
      <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 10, marginRight: 10}}>
        <View style={{ flex: 0.4, marginTop: Dimensions.get('window').height/6}}>
        <Text style={{ fontSize: 72, color: '#6a416d'}}>About</Text>
        <Text style={{ fontSize: 28, color: '#6a416d', textAlign: 'left'}}>App by Determinant Coders</Text>
        <Text style={{ fontSize: 18, color: '#000', textAlign: 'left', fontWeight: 'bold', margin: 5}}>Version: 1.0.0</Text>
        </View>
        <View style={{ flex: 0.6}}>
        <Text style={{ fontSize: 14, color: '#000', textAlign: 'left', marginTop:Dimensions.get('window').height/12 }}>
          In the era of Digital India, Now register complaints of your city to the Public Works Dept (PWD) in just one go with our app.
        </Text>
        </View>
      </View>
    );
  }
}
