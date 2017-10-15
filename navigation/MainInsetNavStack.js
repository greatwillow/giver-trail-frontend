'use strict';

import { React } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

import UserProfileScreen from '../screens/Main/screens/UserProfileScreen/UserProfileScreen';
import MapScreen from '../screens/Main/screens/MapScreen/MapScreen';
import StatisticsScreen from '../screens/Main/screens/StatisticsScreen/StatisticsScreen';
import CauseListScreen from '../screens/Main/screens/CauseListScreen/CauseListScreen';
import CauseDetailScreen from '../screens/Main/screens/CauseDetailScreen/CauseDetailScreen';

const tabNavigationOptions = {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
    activeTintColor: '#e91e63',
    gesturesEnabled: false,
    }
};

const drawerNavigationOptions = {
  gesturesEnabled: false,
}

const MainInsetNavStack = StackNavigator({
    //drawer: { screen: DrawerScreen },

    drawer: { screen: DrawerNavigator({
        tabs:
          { screen: TabNavigator(
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
                  },
                  {
                    tabNavigationOptions
                  }
                )
          }
      },
      {
          drawerNavigationOptions
      })}
},
{
  gesturesEnabled: false,
});

export default MainInsetNavStack;
