import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { z } from 'zod';
import FormField from '../components/FormField';
import { LoadingState, ErrorState, EmptyState } from '../components/StateView';
import { listMedications, createMedication, deleteMedication } from '../../data/remote/medicalApi';
import { useAlerts } from '../hooks/useAlerts';
import { colors, spacing, common } from '../../core/theme/theme';

const schema = z.object({ name: z.string().min(1,'Requerido') });

export default function MedicationsScreen() {
  const { triggerAlert } = useAlerts();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:'', dosage:'', frequency:'', notes:'' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const load = async () => {
    try { setError(''); const { medications } = await listMedications(); setItems(medications||[]); }
    catch(e){ setError(e?.response?.data?.error || 'Error al cargar'); }
    finally { setLoading(false); }
  };
  useEffect(()=>{load();},[]);

  const add = async () => {
    const p = schema.safeParse(form);
    if(!p.success){ setFormError('El nombre es requerido'); return; }
    setFormError('');
    try { await createMedication(form); triggerAlert({ id: Date.now(), title: 'Recordatorio de medicamento', message: `Se agregó ${form.name}` }); setForm({name:'',dosage:'',frequency:'',notes:''}); load(); }
    catch(e){ setError(e?.response?.data?.error || 'Error al guardar'); }
  };
  const remove = async (id) => { try { await deleteMedication(id); load(); } catch(e){ setError('Error al eliminar'); } };

  if (loading) return <LoadingState />;
  return (
    <View style={common.screen}>
      <ScrollView contentContainerStyle={common.content}>
        <Text style={common.title}>Medicamentos</Text>
        {error ? <ErrorState message={error} /> : null}
        <View style={common.card}>
          <FormField label="Nombre*" value={form.name} onChangeText={(v)=>setForm({...form,name:v})} error={formError} />
          <FormField label="Dosis" value={form.dosage} onChangeText={(v)=>setForm({...form,dosage:v})} />
          <FormField label="Frecuencia" value={form.frequency} onChangeText={(v)=>setForm({...form,frequency:v})} />
          <FormField label="Notas" value={form.notes} onChangeText={(v)=>setForm({...form,notes:v})} />
          <Button title="Agregar" onPress={add} color={colors.primary} />
        </View>
        <Text style={styles.h}>Mis medicamentos</Text>
        {items.length===0 ? <EmptyState message="Sin medicamentos registrados" /> : items.map(m=>(
          <View key={m.id} style={common.card}>
            <Text style={styles.cardT}>{m.name}</Text>
            <Text style={styles.muted}>{m.dosage || ''} {m.frequency || ''}</Text>
            <Button title="Eliminar" color={colors.danger} onPress={()=>remove(m.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  h: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: spacing.sm },
  cardT: { fontWeight: '600', color: colors.text },
  muted: { color: colors.muted },
});
