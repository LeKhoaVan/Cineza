/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Welcome from './src/pages/Welcome';
import Register from './src/pages/Register';

AppRegistry.registerComponent(appName, () => () => <Register />);
