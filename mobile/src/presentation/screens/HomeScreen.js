import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function HomeScreen({ navigation }) {
  const { logout, user } = useAuth();
  return (
    <ScrollView contentContainerStyle={styles.c}>
      <Text style={styles.t}>Mi historial médico</Text>
      {user?.name ? <Text style={styles.s}>Hola, {user.name}</Text> : null}
      <Button title="Perfil médico (tipo de sangre)" onPress={() => navigation.navigate('Profile')} />
      <Button title="Alergias" onPress={() => navigation.navigate('Allergies')} />
      <Button title="Medicamentos" onPress={() => navigation.navigate('Medications')} />
      <Button title="Contactos de emergencia" onPress={() => navigation.navigate('Contacts')} />
      <Button title="Vista de emergencia" onPress={() => navigation.navigate('Emergency')} />
      <Button title="Alertas médicas" onPress={() => navigation.navigate('Alerts')} />
      <View style={{ height: 16 }} />
      <Button title="Cerrar sesión" color="#b00020" onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  c: { padding: 24, gap: 12 },
  t: { fontSize: 22, fontWeight: '700' },
  s: { fontSize: 16, marginBottom: 8 },
});
