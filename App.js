import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';


import CameraView from './Camera';
import Maps from './Maps';
import Success from './Success';
import MyDrawer from './Drawer';
import Register from './Register';
import Dashboard from './Complaints';
import About from './About';


const App = () => (
  <Router>
    <Scene key="root">
      <Scene key="about" component={About} hideNavBar={false} navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }} panHandlers={null}/>
      <Scene key="dashboard" component={Dashboard} hideNavBar={false} navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }} panHandlers={null}/>
      <Scene key="register" component={Register} hideNavBar={false} navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }} panHandlers={null} renderBackButton={()=>(null)}/>
      <Scene key="camera" type={ActionConst.RESET} initial component={MyDrawer} hideNavBar={false} navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }} panHandlers={null} renderBackButton={()=>(null)} hideNavBar={true}/>
      <Scene key="maps" type={ActionConst.RESET} component={Maps} hideNavBar={false} navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }} panHandlers={null} renderBackButton={()=>(null)}/>
      <Scene key="success" type={ActionConst.RESET} component={Success} hideNavBar={false} navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }} panHandlers={null} renderBackButton={()=>(null)}/>
    </Scene>
  </Router>
);

export default App;
