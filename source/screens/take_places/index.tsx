import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Button} from 'react-native';

import SlotIndex from '../../components/slot/SlotIndex';
import uploadInvocesSlots from '../../requests/communication/uploadInvocesSlots';

import CreateScreen from '../../screens/take_places/CreateScreen';
import {AddInvoices} from '../../screens/take_places/FirstScreen';
import Invoices from '../../screens/take_places/Invoices';
import invocesToUploadStore from '../../stores/invocesToUploadStore';
import loadingStore from '../../stores/loadingStore';
import loggerStore from '../../stores/loggerStore';

const SettingsStack = createStackNavigator();

export const Stack1 = () => {
  const {invocesToUpload, resetStorageInvocesToUpload} = invocesToUploadStore();
  const {loading, setLoading} = loadingStore();
  const {setLoggerStore} = loggerStore();

  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        options={{headerShown: false}}
        name="AddInvoices"
        component={AddInvoices}
      />
      <SettingsStack.Screen name="Оформить" component={CreateScreen} />
      <SettingsStack.Screen name="Место" component={SlotIndex} />
      <SettingsStack.Screen
        name="Квитанции"
        component={Invoices}
        options={() => ({
          headerRight: () => (
            <Button
              title={loading ? 'Отправка' : 'Отправить'}
              disabled={!!loading}
              onPress={() => {
                uploadInvocesSlots({
                  invocesToUpload,
                  setLoggerStore,
                  resetStorageInvocesToUpload,
                  setLoading,
                });
              }}
            />
          ),
        })}
      />
    </SettingsStack.Navigator>
  );
};

export default Stack1;
