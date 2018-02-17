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
import { Actions } from 'react-native-router-flux';

class Register extends Component {
  constructor() {
    super();
    this.state = { name: '', email: '', mobno: ''};
  }

  componentWillMount () {
    AsyncStorage.getItem('user', (err, result) => {
      if(result!=null){
        var result = JSON.parse(result)
        this.setState({name: result.name, email:result.email, mobno: result.contact})
      }
    })
  }

  saveData() {
    var user = {
      'name': this.state.name,
      'email': this.state.email,
      'contact': this.state.mobno
    }
    if(this.state.name == '') {
      alert('Enter Name');
    }
    else if(this.state.email == ''){
      alert('Enter Email')
    }
    else if(this.state.mobno == ''){
      alert('Enter Mobile Number')
    }
    else{
      AsyncStorage.setItem('user', JSON.stringify(user))
      .then(Actions.camera()).catch(error => console.log(error.message));
    }
    // alert(JSON.stringify(user))
  }
  render() {
    return (
        <ScrollView contentContainerStyle={styles.containerStyle}>
            <View style={{ alignSelf: 'center'}}>
              <Image
                source={require('./../Resources/logo.png')}
                style={{ borderRadius: 10, height: Dimensions.get('window').height/4, width: Dimensions.get('window').width/3}}
                resizeMode='contain'
              />
            </View>
            <View>
                <Text style={styles.textStyle}>PLEASE FILL IN THE DETAILS</Text>
            </View>
              <KeyboardAvoidingView
              behaviour='padding'>
                <TextInput
                  placeholder='Name'
                  value={this.state.name}
                  onChangeText={(name) => this.setState({ name })}
                  style={styles.blockStyle}
                  underlineColorAndroid='#6a416d'
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView
              behaviour='padding'>
                <TextInput
                  placeholder='Email'
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  style={styles.blockStyle}
                  underlineColorAndroid='#6a416d'
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView
              behaviour='padding'>
                <TextInput
                  placeholder='Mob No'
                  value={this.state.mobno}
                  onChangeText={(mobno) => this.setState({ mobno })}
                  style={styles.blockStyle}
                  underlineColorAndroid='#6a416d'
                />
              </KeyboardAvoidingView>
              <View>
                <TouchableOpacity
                style={styles.sendButtonStyle}
                onPress={() => this.saveData()}
                >
                  <Text style={styles.buttonTextStyle}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
        </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flex: 1
  //  backgroundColor: '#000'
  },
  blockStyle: {
    height: 50,
    width: null,
    shadowOffset: { width: 50, height: 50, },
    shadowColor: 'black',
    shadowOpacity: 10.0,
  },
  buttonStyle: {
    height: 50,
    width: null,
    margin: 10
  },
  textStyle: {
    color: '#69416c',
    fontSize: 17,
    fontWeight: 'bold'
  },
  sendButtonStyle: {
    height: 50,
    width: null,
    backgroundColor: '#f38575',
    borderRadius: 5,
    justifyContent: 'center'

  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    }

};

export default Register;
