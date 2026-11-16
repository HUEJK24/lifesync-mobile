import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { z } from 'zod';
import FormField from '../components/FormField';
import { useAuth } from '../hooks/useAuth';

const schema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

export default function RegisterScreen() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      await register(form);
    } catch (err) {
      setServerError(err?.response?.data?.error || 'No fue posible registrarse');
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.c}>
      <FormField label="Nombre" value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} error={errors.name} />
      <FormField label="Correo" value={form.email} autoCapitalize="none" keyboardType="email-address"
        onChangeText={(v) => setForm({ ...form, email: v })} error={errors.email} />
      <FormField label="Contraseña" value={form.password} secureTextEntry
        onChangeText={(v) => setForm({ ...form, password: v })} error={errors.password} />
      {serverError ? <Text style={styles.err}>{serverError}</Text> : null}
      <Button title={loading ? 'Creando cuenta...' : 'Crear cuenta'} onPress={onSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({ c: { flex: 1, padding: 24 }, err: { color: '#b00020', marginBottom: 12 } });
