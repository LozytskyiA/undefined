/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {AppService} from './srs/modules/app/app.service';

AppRegistry.registerComponent(appName, () => AppService);
