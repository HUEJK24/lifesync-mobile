import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { z } from 'zod';
import FormField from '../components/FormField';
import { LoadingState, ErrorState, EmptyState } from '../components/StateView';
import { listAllergies, createAllergy, deleteAllergy } from '../../data/remote/medicalApi';

const schema = z.object({ allergen: z.string().min(1,'Requerido') });

export default function AllergiesScreen() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ allergen:'', severity:'', reaction:'', notes:'' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const load = async () => {
    try { setError(''); const { allergies } = await listAllergies(); setItems(allergies||[]); }
    catch(e){ setError(e?.response?.data?.error || 'Error al cargar'); }
    finally { setLoading(false); }
  };
  useEffect(()=>{load();},[]);

  const add = async () => {
    const p = schema.safeParse(form);
    if(!p.success){ setFormError('El alérgeno es requerido'); return; }
    setFormError('');
    try { await createAllergy(form); setForm({allergen:'',severity:'',reaction:'',notes:''}); load(); }
    catch(e){ setError(e?.response?.data?.error || 'Error al guardar'); }
  };
  const remove = async (id) => { try { await deleteAllergy(id); load(); } catch(e){ setError('Error al eliminar'); } };

  if (loading) return <LoadingState />;
  return (
    <ScrollView contentContainerStyle={styles.c}>
      <Text style={styles.h}>Registrar alergia</Text>
      {error ? <ErrorState message={error} /> : null}
      <FormField label="Alérgeno*" value={form.allergen} onChangeText={(v)=>setForm({...form,allergen:v})} error={formError} />
      <FormField label="Severidad" value={form.severity} onChangeText={(v)=>setForm({...form,severity:v})} />
      <FormField label="Reacción" value={form.reaction} onChangeText={(v)=>setForm({...form,reaction:v})} />
      <FormField label="Notas" value={form.notes} onChangeText={(v)=>setForm({...form,notes:v})} />
      <Button title="Agregar" onPress={add} />
      <Text style={styles.h}>Mis alergias</Text>
      {items.length===0 ? <EmptyState message="Sin alergias registradas" /> : items.map(a=>(
        <View key={a.id} style={styles.card}>
          <Text style={styles.cardT}>{a.allergen}</Text>
          <Text>{a.severity || ''} {a.reaction || ''}</Text>
          <Button title="Eliminar" color="#b00020" onPress={()=>remove(a.id)} />
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({ c:{padding:24,gap:8}, h:{fontSize:18,fontWeight:'700',marginTop:12}, card:{padding:12,borderWidth:1,borderColor:'#ddd',borderRadius:8,marginTop:8,gap:4}, cardT:{fontWeight:'600'} });
