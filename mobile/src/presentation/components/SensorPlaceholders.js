import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { usePermission } from '../hooks/usePermission';
import { colors, spacing, radius, common } from '../../core/theme/theme';

export function CameraPlaceholder() {
  const { state, request, granted } = usePermission('camera');
  return (
    <View style={[common.card, styles.box]}>
      <Text style={styles.title}>Cámara / Escaneo de recetas</Text>
      <Text style={styles.sub}>Estado del permiso: {state}</Text>
      {state === 'idle' ? (
        <Text style={styles.info}>LifeSync necesita la cámara para escanear recetas médicas.</Text>
      ) : null}
      {!granted ? (
        <Button title="Solicitar permiso de cámara" onPress={request} disabled={state === 'requesting'} color={colors.primary} />
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
    <View style={[common.card, styles.box]}>
      <Text style={styles.title}>Ubicación (GPS)</Text>
      <Text style={styles.sub}>Estado del permiso: {state}</Text>
      {state === 'idle' ? (
        <Text style={styles.info}>LifeSync necesita la ubicación para geolocalizar incidentes médicos.</Text>
      ) : null}
      {!granted ? (
        <Button title="Solicitar permiso de ubicación" onPress={request} disabled={state === 'requesting'} color={colors.primary} />
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
  box: { borderStyle: 'dashed' },
  title: { fontWeight: '600', color: colors.text },
  sub: { color: colors.muted },
  ok: { color: colors.success },
  warn: { color: colors.danger },
  info: { color: colors.info },
});
