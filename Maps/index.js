import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  AsyncStorage,
  Picker
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import { Actions } from 'react-native-router-flux';

const problems = [
  {
    label: 'Select...',
    value: 'select',
  },
  {
    label: 'Building',
    value: 'Building',
  },
  {
    label: 'Colony-Residential',
    value: 'Colony-Residential',
  },
  {
    label: 'Enroachment',
    value: 'Enroachment',
  },
  {
    label: 'Flyover',
    value: 'Flyover',
  },
  {
    label: 'FootOver Bridge',
    value: 'FootOver Bridge',
  },
  {
    label: 'Garbage',
    value: 'Garbage',
  },
  {
    label: 'Pollution',
    value: 'Pollution',
  },
  {
    label: 'Pot-holes',
    value: 'Pot-holes',
  },
  {
    label: 'Road',
    value: 'Road',
  },
  {
    label: 'Sanitation',
    value: 'Sanitation',
  },
  {
    label: 'Street Light',
    value: 'Street Light',
  },
  {
    label: 'Water Logging',
    value: 'Water Logging',
  }
];

export default class Maps extends Component<Props> {
  state = {
    name:"",
    contact: "",
    email:"",
    latitude:"",
    longitude: "",
    address: null,
    type: 'select'
  }
  componentWillMount() {
     this.openSearchModal()
     AsyncStorage.getItem('user', (err, result) => {
       var result = JSON.parse(result)
       if(result!=null){
         this.setState({contact: result.contact, name: result.name, email: result.email})
       }
       else{
         alert('Please Register')
       }
     })
  }
  openSearchModal() {
    RNGooglePlaces.openPlacePickerModal()
    .then((place) => {
		this.setState({ latitude: place.latitude, longitude: place.longitude, address: place.address });
    // alert(JSON.stringify(this.state));
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));
    // error is a Javascript Error object
  }

  sendDataToBackend() {
    if(this.state.type == 'select') {
      alert('Select Complaint type!')
    }
    else {
      var ID = new Date().getUTCMilliseconds();
      var data = {
        'complaintID': ID,
        'name': this.state.name,
        'contact': this.state.contact,
        'email': this.state.email,
        'location': {
          'longitude': this.state.longitude,
          'lattitude': this.state.latitude
        },
        'address': this.state.address,
        'completed': false,
        'completedAt': null,
        'complaintType': this.state.type,
        'image': this.props.imagePath
      };
      fetch('https://stark-plateau-32599.herokuapp.com/complaint', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
       // alert(JSON.stringify(response))
       if(response.status===200) {
         Actions.success();
       }
       else if(response.status===400) {
         alert('Request Failed!');
       }})
      .catch(console.log);
    }
  }

  shouldComponentUpdate(nextProps){
    return true;
  }

  render() {
  var location = {
    'lattitude': this.state.latitude,
    'longitude': this.state.longitude
  }
  var location = JSON.stringify(location);
   return (
     <ScrollView contentContainerStyle={styles.container}>
         <View style={{ marginTop: 40 }}>
           <Image
             source={{uri: this.props.imagePath}}
             style={{ borderRadius: 10, height: Dimensions.get('window').height/4, width: Dimensions.get('window').width/2, alignSelf: 'center'}}
           />
         </View>
          <View style={{ alignItems: 'stretch'}}>
              <Text style={styles.headingStyle}>COMPLAINT DETAILS</Text>
          </View>
          <View style={{  }}>
            <View style={{ marginLeft: 40, marginRight: 40, margin: 5}}>
              <Text style={{ fontSize: 15 }}>Complaint Type: </Text>
              <Picker
              style={{ borderWidth: 5 }}
              selectedValue={this.state.type}
              onValueChange={itemValue => this.setState({ type: itemValue })}>
                  {problems.map((i, index) => (
                    <Picker.Item key={index} label={i.label} value={i.value} />
                  ))}
              </Picker>
            </View>
            <View>
              <TextInput
                editable={false}
                placeholder='Contact Number'
                value={this.state.contact}
                style={styles.blockStyle}
                underlineColorAndroid='#6a416d'
              />
            </View>
            <View>
              <TextInput
                editable={false}
                placeholder='Name'
                value={this.state.name}
                style={styles.blockStyle}
                underlineColorAndroid='#6a416d'
              />
            </View>
            <View>
              <TextInput
                editable={false}
                placeholder='Email ID'
                value={this.state.email}
                style={styles.blockStyle}
                underlineColorAndroid='#6a416d'
              />
            </View>
            <View>
              <TextInput
                placeholder='Location'
                editable={false}
                value={location}
                style={styles.blockStyle}
                underlineColorAndroid='#6a416d'
              />
            </View>
            <View>
              <TextInput
                placeholder='Address'
                value={this.state.address}
                editable={false}
                style={styles.blockStyle}
                underlineColorAndroid='#6a416d'
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
            style={styles.sendButtonStyle}
            onPress={() => this.sendDataToBackend()}
            >
              <Text style={styles.buttonTextStyle}>
                SEND
              </Text>
            </TouchableOpacity>
          </View>
     </ScrollView>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    justifyContent: 'center'
  },
  blockStyle: {
  height: 50,
  width: null,
  margin: 5,
  shadowOffset: { width: 50, height: 50, },
  shadowColor: 'black',
  shadowOpacity: 10.0,
  marginLeft: 40,
  marginRight: 40
},
headingStyle: {
  color: '#69416c',
  fontSize: 15,
  margin: 10,
  fontWeight: 'bold',
  alignSelf: 'center'
},
sendButtonStyle: {
  height: 50,
  width: null,
  backgroundColor: '#f38575',
  borderRadius: 5,
  justifyContent: 'center',
  marginLeft: 40,
  marginRight: 40,
  marginBottom: 40

},
buttonTextStyle: {
  alignSelf: 'center',
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  }
});
