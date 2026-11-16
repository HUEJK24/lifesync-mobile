import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componentes visuales preparados para integración de cámara y GPS (Sprint 3)
export function CameraPlaceholder() {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Cámara / Escaneo de recetas</Text>
      <Text style={styles.sub}>Componente visual preparado para captura cuando se habilite el sensor y permisos.</Text>
    </View>
  );
}

export function LocationPlaceholder() {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Ubicación (GPS)</Text>
      <Text style={styles.sub}>Componente visual preparado para geolocalización bajo autorización del usuario.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16, borderWidth: 1, borderStyle: 'dashed', borderColor: '#aaa', borderRadius: 10, gap: 6, marginTop: 12 },
  title: { fontWeight: '600' },
  sub: { color: '#555' },
});
