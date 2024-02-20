import React, { useEffect } from 'react';
import Route from './src/Route/index';
import { LogBox } from 'react-native';

if (!__DEV__) {
  console.log = () => { };
}

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <Route.render />
  );
};

export default App;
