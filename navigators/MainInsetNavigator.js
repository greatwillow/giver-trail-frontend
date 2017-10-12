'use strict';

import { React } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import UserProfileScreen from '../screens/Main/screens/UserProfileScreen/UserProfileScreen';
import MapScreen from '../screens/Main/screens/MapScreen/MapScreen';
import StatisticsScreen from '../screens/Main/screens/StatisticsScreen/StatisticsScreen';
import CauseListScreen from '../screens/Main/screens/CauseListScreen/CauseListScreen';
import CauseDetailScreen from '../screens/Main/screens/CauseDetailScreen/CauseDetailScreen';

const navigationOptions = {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
    activeTintColor: '#e91e63',
    }
}

const MainInsetNavigator = TabNavigator(
{
  userProfile: { screen: UserProfileScreen },
  map: { screen: MapScreen },
  statistics: { screen: StatisticsScreen },
  causes:
  {
    screen: StackNavigator({
      causeList: { screen: CauseListScreen },
      causeDetail: { screen: CauseDetailScreen },
    })
  },
}, {
  navigationOptions
});

export default MainInsetNavigator;
