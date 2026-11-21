import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useAlerts } from '../hooks/useAlerts';
import { colors, spacing, common } from '../../core/theme/theme';

export default function AlertsScreen() {
  const { alerts, triggerAlert, clearAlerts } = useAlerts();

  return (
    <View style={common.screen}>
      <View style={common.content}>
        <Text style={common.title}>Alertas médicas</Text>
        <Button
          title="Generar alerta de prueba"
          onPress={() =>
            triggerAlert({
              id: Date.now(),
              title: 'Recordatorio de medicamento',
              message: 'Medicamento crítico pendiente',
            })
          }
          color={colors.primary}
        />
        <View style={{ height: spacing.sm }} />
        <Button title="Limpiar alertas" onPress={clearAlerts} color={colors.muted} />
        <FlatList
          data={alerts}
          keyExtractor={(item, idx) => String(item.id || idx)}
          renderItem={({ item }) => (
            <View style={common.card}>
              <Text style={styles.t}>{item.title || 'Alerta'}</Text>
              <Text style={styles.muted}>{item.message}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Sin alertas</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  t: { fontWeight: '600', color: colors.text },
  muted: { color: colors.muted },
  empty: { marginTop: spacing.md, color: colors.muted, textAlign: 'center' },
});
