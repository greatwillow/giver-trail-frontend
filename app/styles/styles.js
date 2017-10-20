'use strict';

import {
  StyleSheet
} from 'react-native'

import commonColors from './colors';

const commonStyles = StyleSheet.create({
  walkthroughLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walkthroughText: {
    fontSize: 15,
    color: commonColors.GREEN,
  }
})

export default commonStyles;
