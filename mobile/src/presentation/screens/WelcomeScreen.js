import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { colors, spacing, common } from '../../core/theme/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={common.screen}>
      <View style={[common.content, styles.center]}>
        <Text style={styles.title}>LifeSync Mobile</Text>
        <Text style={styles.sub}>Gestión segura de tu información médica personal.</Text>
        <View style={styles.actions}>
          <Button title="Iniciar sesión" onPress={() => navigation.navigate('Login')} color={colors.primary} />
          <View style={{ height: spacing.sm }} />
          <Button title="Registrarse" onPress={() => navigation.navigate('Register')} color={colors.primaryDark} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: spacing.sm },
  sub: { fontSize: 16, color: colors.muted, textAlign: 'center', marginBottom: spacing.xl },
  actions: { width: '100%' },
});
