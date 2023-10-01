/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { RootNavigation } from './src/navigators';

disableYellowBox = true;

AppRegistry.registerComponent(appName, () => RootNavigation);
