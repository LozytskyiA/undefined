import React, {FC, PropsWithChildren} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {store} from '../../store';
import App from './app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppService: FC<PropsWithChildren> = ({children}) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </Provider>
  );
};
