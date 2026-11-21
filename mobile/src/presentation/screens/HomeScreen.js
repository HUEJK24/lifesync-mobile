import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { colors, spacing, common, radius } from '../../core/theme/theme';

export default function HomeScreen({ navigation }) {
  const { logout, user } = useAuth();
  const items = [
    { title: 'Perfil médico (tipo de sangre)', screen: 'Profile' },
    { title: 'Alergias', screen: 'Allergies' },
    { title: 'Medicamentos', screen: 'Medications' },
    { title: 'Contactos de emergencia', screen: 'Contacts' },
    { title: 'Vista de emergencia', screen: 'Emergency' },
    { title: 'Alertas médicas', screen: 'Alerts' },
  ];

  return (
    <View style={common.screen}>
      <ScrollView contentContainerStyle={common.content}>
        <Text style={common.title}>Mi historial médico</Text>
        {user?.name ? <Text style={common.subtitle}>Hola, {user.name}</Text> : null}
        <View style={styles.grid}>
          {items.map((item) => (
            <View key={item.screen} style={styles.card}>
              <Button title={item.title} onPress={() => navigation.navigate(item.screen)} color={colors.primary} />
            </View>
          ))}
        </View>
        <View style={{ height: spacing.md }} />
        <Button title="Cerrar sesión" color={colors.danger} onPress={logout} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { gap: spacing.sm },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius?.md || 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
