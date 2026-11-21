import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { usePermission } from '../hooks/usePermission';

export function CameraPlaceholder() {
  const { state, request, granted } = usePermission('camera');
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Cámara / Escaneo de recetas</Text>
      <Text style={styles.sub}>Estado del permiso: {state}</Text>
      {state === 'idle' ? (
        <Text style={styles.info}>LifeSync necesita la cámara para escanear recetas médicas.</Text>
      ) : null}
      {!granted ? (
        <Button title="Solicitar permiso de cámara" onPress={request} disabled={state === 'requesting'} />
      ) : (
        <Text style={styles.ok}>Cámara disponible para escanear recetas.</Text>
      )}
      {state === 'denied' || state === 'restricted' || state === 'unavailable' ? (
        <Text style={styles.warn}>Función de cámara deshabilitada. El historial clínico sigue disponible.</Text>
      ) : null}
    </View>
  );
}

export function LocationPlaceholder() {
  const { state, request, granted } = usePermission('location');
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Ubicación (GPS)</Text>
      <Text style={styles.sub}>Estado del permiso: {state}</Text>
      {state === 'idle' ? (
        <Text style={styles.info}>LifeSync necesita la ubicación para geolocalizar incidentes médicos.</Text>
      ) : null}
      {!granted ? (
        <Button title="Solicitar permiso de ubicación" onPress={request} disabled={state === 'requesting'} />
      ) : (
        <Text style={styles.ok}>GPS disponible para geolocalizar incidentes.</Text>
      )}
      {state === 'denied' || state === 'restricted' || state === 'unavailable' ? (
        <Text style={styles.warn}>Rastreo en la nube deshabilitado. La app sigue funcionando offline.</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16, borderWidth: 1, borderStyle: 'dashed', borderColor: '#aaa', borderRadius: 10, gap: 6, marginTop: 12 },
  title: { fontWeight: '600' },
  sub: { color: '#555' },
  ok: { color: 'green' },
  warn: { color: '#b00020' },
  info: { color: '#1565c0' },
});
