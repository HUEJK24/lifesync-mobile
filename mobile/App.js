import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/core/navigation/RootNavigator';
import { AuthProvider } from './src/presentation/hooks/useAuth';
import { AlertProvider } from './src/presentation/hooks/useAlerts';

export default function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AlertProvider>
    </AuthProvider>
  );
}
