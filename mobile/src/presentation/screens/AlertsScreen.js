import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useAlerts } from '../hooks/useAlerts';

export default function AlertsScreen() {
  const { alerts, triggerAlert, clearAlerts } = useAlerts();

  return (
    <View style={styles.c}>
      <Text style={styles.h}>Alertas médicas</Text>
      <Button
        title="Generar alerta de prueba"
        onPress={() =>
          triggerAlert({
            id: Date.now(),
            title: 'Recordatorio de medicamento',
            message: 'Medicamento crítico pendiente',
          })
        }
      />
      <View style={{ height: 8 }} />
      <Button title="Limpiar alertas" onPress={clearAlerts} />
      <FlatList
        data={alerts}
        keyExtractor={(item, idx) => String(item.id || idx)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.t}>{item.title || 'Alerta'}</Text>
            <Text>{item.message}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Sin alertas</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, padding: 24, gap: 12 },
  h: { fontSize: 22, fontWeight: '700' },
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginTop: 8 },
  t: { fontWeight: '600' },
  empty: { marginTop: 16, color: '#555' },
});
