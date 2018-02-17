/**
 * rn-drawer example app
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';

import styles from './styles';
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

import Drawer from 'react-native-drawer';
import MyControlPanel from './ControlPanel';
import CameraView from './Camera'

import tweens from './tweens';

let counter = 0;
class MyDrawer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset:150,
      closedDrawerOffset:0,
      panOpenMask: .1,
      panCloseMask: .9,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      side: "left",
    };
  }

  setDrawerType(type){
    this.setState({
      drawerType: type
    })
  }

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  noopChange(){
    this.setState({
      changeVal: Math.random()
    })
  }

  openDrawer(){
    this.drawer.open()
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {

    var controlPanel = <MyControlPanel
    closeDrawer={() => {this.drawer.close()}}
    rootState={this.props.rootState}
    getrootstate={()=>this.props.getrootstate()}
    getDevices={()=>this.props.getDevices()}
    getModeColor= {()=>this.props.getModeColor()}
    getActiveMode={()=>this.props.getActiveMode()}
    updateActiveMode= {(modeIndex)=>this.props.updateActiveMode(modeIndex)}
    updateDeviceParam={(paramObject)=>this.props.updateDeviceParam(paramObject)}
    syncDevices={(IPADDRESS, PORT, saveIP)=>this.props.syncDevices(IPADDRESS, PORT, saveIP)}
    />
    return (
      <Drawer
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.side}
        >
        <CameraView
          openDrawer={this.openDrawer.bind(this)}
          />
      </Drawer>
    );
  }
}

export default MyDrawer;
