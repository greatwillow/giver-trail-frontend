'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import Drawer from 'react-native-drawer';
import DrawerComponent from './components/DrawerComponent';
import MainInsetNavigator from '../../../../navigators/MainInsetNavigator';

class DrawerScreen extends Component {
  constructor() {
  super();
  this.openDrawer = this.openDrawer.bind(this);
  this.closeDrawer = this.closeDrawer.bind(this);
  }

  openDrawer() {
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }

  render() {
    const drawerMethods = {
      openDrawer: this.openDrawer,
      closeDrawer: this.closeDrawer,
    };
    return (
        <Drawer
          ref={ref => (this.drawer = ref)}
          type="overlay"
          content={<DrawerComponent drawerMethods={drawerMethods} />}
          tapToClose
          openDrawerOffset={0.25}
          panOpenMask={-1}
          tweenHandler={ratio => ({
            main: { opacity: (2 - ratio) / 2 },
          })}
        >
        <MainInsetNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navReducer,
          })}
          screenProps={drawerMethods}
        />
      </Drawer>
    );
    }
}

const styles = StyleSheet.create({

});


export default DrawerScreen;
