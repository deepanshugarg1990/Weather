import {AppRegistry} from 'react-native';
import {SplashContainer} from './src/Containers/index'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SplashContainer);
