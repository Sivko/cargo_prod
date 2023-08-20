import React, {useEffect} from 'react';
import {ForkNavigation} from './source';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import loginStore from './source/stores/logginStore';

import Login from './source/components/Login';

function App(): JSX.Element {
  const {user, getStorage} = loginStore();
  useEffect(() => {
    getStorage();
  }, []);

  return (
    <>
      {user?.id ? (
        <NavigationContainer>
          <ForkNavigation />
        </NavigationContainer>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
