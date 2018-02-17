import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Dashboard extends Component {
   constructor() {
     super();
     this.state = {
       name:"no_user",
       dataSource: new ListView.DataSource({ rowHasChanged : (row1, row2) => true }),
     }
   }

  componentWillMount() {
  // AsyncStorage.clear();
    AsyncStorage.getItem('user', (err, result) => {
      if(result!=null){
        var result = JSON.parse(result)
        this.setState({name: result.name})
      }
      // alert(this.state.name)
      if(this.state.name !== "no_user") {
        // alert(typeof(this.state.name))
        fetch('https://stark-plateau-32599.herokuapp.com/complaint/'+this.state.name)
        .then((response) => response.json())
        .then((responseJson) => {
          // alert(JSON.stringify(responseJson.complaint))
          this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.complaint)})
        })
        .catch((error) => {
          console.error(error);
        });
      }
    })
  }

    renderRow(rowData) {
      // alert(JSON.stringify(rowData))
        return (
          <TouchableWithoutFeedback>
            <View style={styles.gridStyle}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={{ uri: rowData.image}}
                    style={{ height: (Dimensions.get('window').width / 4), width: (Dimensions.get('window').width / 3), alignSelf: 'center' }}
                    resizeMode='contain'
                  />
                  <Text style={styles.textStyle}>Complaint No. - {rowData.complaintID}</Text>
                  <Text style={{color: '#000', fontSize: 8, textAlign: 'center'}}>{rowData.address}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
      );
    }


  render() {
    return (
      <ScrollView>
        <View style={{ height: (Dimensions.get('window').height / 4), backgroundColor: '#6a416d', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 28, fontWeight:'900'}}> DASHBOARD </Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        />
      </ScrollView>
    );
  }
}

const styles = {
  gridStyle: {
    backgroundColor: '#fff',
    borderWidth: 0.1,
    borderColor: '#ec5044',
    borderRadius: 5,
    shadowColor: '#cacaca',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    elevation: 1,
    width: (Dimensions.get('window').width / 2) - 6,
    height: (Dimensions.get('window').width / 2) - 6,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
        backgroundColor: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#3998db',
         marginTop: 20,
        alignSelf: 'center'
      }
};
