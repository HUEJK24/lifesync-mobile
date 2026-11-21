import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, spacing } from '../../core/theme/theme';

export function LoadingState({ text = 'Cargando...' }) {
  return (
    <View style={styles.c}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
export function ErrorState({ message }) {
  return (
    <View style={styles.c}>
      <Text style={styles.err}>{message}</Text>
    </View>
  );
}
export function EmptyState({ message = 'Sin información' }) {
  return (
    <View style={styles.c}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  c: { padding: spacing.lg, alignItems: 'center', gap: spacing.sm },
  text: { color: colors.muted },
  err: { color: colors.danger, textAlign: 'center' },
});
