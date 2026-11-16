import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../../presentation/hooks/useAuth';
import WelcomeScreen from '../../presentation/screens/WelcomeScreen';
import LoginScreen from '../../presentation/screens/LoginScreen';
import RegisterScreen from '../../presentation/screens/RegisterScreen';
import HomeScreen from '../../presentation/screens/HomeScreen';
import ProfileScreen from '../../presentation/screens/ProfileScreen';
import AllergiesScreen from '../../presentation/screens/AllergiesScreen';
import MedicationsScreen from '../../presentation/screens/MedicationsScreen';
import ContactsScreen from '../../presentation/screens/ContactsScreen';
import EmergencyScreen from '../../presentation/screens/EmergencyScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'LifeSync' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil médico' }} />
          <Stack.Screen name="Allergies" component={AllergiesScreen} options={{ title: 'Alergias' }} />
          <Stack.Screen name="Medications" component={MedicationsScreen} options={{ title: 'Medicamentos' }} />
          <Stack.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Contactos de emergencia' }} />
          <Stack.Screen name="Emergency" component={EmergencyScreen} options={{ title: 'Emergencia' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
