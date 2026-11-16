import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.c}>
      <Text style={styles.title}>LifeSync Mobile</Text>
      <Text style={styles.sub}>Gestión segura de tu información médica personal.</Text>
      <Button title="Iniciar sesión" onPress={() => navigation.navigate('Login')} />
      <View style={{ height: 12 }} />
      <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, padding: 24, justifyContent: 'center', gap: 8 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  sub: { fontSize: 16, marginBottom: 24, color: '#444' },
});
