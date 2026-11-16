import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';
import FormField from '../components/FormField';
import { LoadingState, ErrorState } from '../components/StateView';
import { getProfile, updateProfile } from '../../data/remote/medicalApi';

export default function ProfileScreen() {
  const [form, setForm] = useState({ blood_type: '', birth_date: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    try {
      setError('');
      const { profile } = await getProfile();
      setForm({
        blood_type: profile?.blood_type || '',
        birth_date: profile?.birth_date ? String(profile.birth_date).slice(0,10) : '',
        notes: profile?.notes || '',
      });
    } catch (e) { setError(e?.response?.data?.error || 'Error al cargar perfil'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      setSaving(true); setMsg(''); setError('');
      await updateProfile(form);
      setMsg('Perfil actualizado');
    } catch (e) { setError(e?.response?.data?.error || 'Error al guardar'); }
    finally { setSaving(false); }
  };

  if (loading) return <LoadingState />;
  return (
    <ScrollView contentContainerStyle={styles.c}>
      {error ? <ErrorState message={error} /> : null}
      <FormField label="Tipo de sangre" value={form.blood_type} onChangeText={(v)=>setForm({...form,blood_type:v})} />
      <FormField label="Fecha de nacimiento (AAAA-MM-DD)" value={form.birth_date} onChangeText={(v)=>setForm({...form,birth_date:v})} />
      <FormField label="Notas" value={form.notes} multiline onChangeText={(v)=>setForm({...form,notes:v})} />
      {msg ? <Text style={styles.ok}>{msg}</Text> : null}
      <Button title={saving ? 'Guardando...' : 'Guardar perfil'} onPress={save} disabled={saving} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({ c:{padding:24}, ok:{color:'green', marginBottom:12} });
