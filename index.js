/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import { TodoProvider } from './src/contexts/TodoContext';

const AppProvider = () => (
  <TodoProvider><App/></TodoProvider>
)

AppRegistry.registerComponent(appName, () => AppProvider);
