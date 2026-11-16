import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { z } from 'zod';
import FormField from '../components/FormField';
import { useAuth } from '../hooks/useAuth';

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export default function LoginScreen() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setServerError('');
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const e = {}; parsed.error.issues.forEach(i => e[i.path[0]] = i.message);
      setErrors(e); return;
    }
    setErrors({});
    try {
      setLoading(true);
      await login(form);
    } catch (err) {
      setServerError(err?.response?.data?.error || 'No fue posible iniciar sesión');
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.c}>
      <FormField label="Correo" value={form.email} autoCapitalize="none" keyboardType="email-address"
        onChangeText={(v) => setForm({ ...form, email: v })} error={errors.email} />
      <FormField label="Contraseña" value={form.password} secureTextEntry
        onChangeText={(v) => setForm({ ...form, password: v })} error={errors.password} />
      {serverError ? <Text style={styles.err}>{serverError}</Text> : null}
      <Button title={loading ? 'Ingresando...' : 'Ingresar'} onPress={onSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({ c: { flex: 1, padding: 24 }, err: { color: '#b00020', marginBottom: 12 } });
