import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export function LoadingState({ text = 'Cargando...' }) {
  return <View style={styles.c}><ActivityIndicator /><Text>{text}</Text></View>;
}
export function ErrorState({ message }) {
  return <View style={styles.c}><Text style={styles.err}>{message}</Text></View>;
}
export function EmptyState({ message = 'Sin información' }) {
  return <View style={styles.c}><Text>{message}</Text></View>;
}

const styles = StyleSheet.create({
  c: { padding: 16, alignItems: 'center', gap: 8 },
  err: { color: '#b00020' },
});
