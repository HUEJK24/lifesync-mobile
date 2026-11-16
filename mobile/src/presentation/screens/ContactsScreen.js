import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { z } from 'zod';
import FormField from '../components/FormField';
import { LoadingState, ErrorState, EmptyState } from '../components/StateView';
import { listContacts, createContact, deleteContact } from '../../data/remote/medicalApi';

const schema = z.object({ name: z.string().min(1,'Requerido'), phone: z.string().min(5,'Teléfono requerido') });

export default function ContactsScreen() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:'', relationship:'', phone:'' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const load = async () => {
    try { setError(''); const { contacts } = await listContacts(); setItems(contacts||[]); }
    catch(e){ setError(e?.response?.data?.error || 'Error al cargar'); }
    finally { setLoading(false); }
  };
  useEffect(()=>{load();},[]);

  const add = async () => {
    const p = schema.safeParse(form);
    if(!p.success){ const e={}; p.error.issues.forEach(i=>e[i.path[0]]=i.message); setErrors(e); return; }
    setErrors({});
    try { await createContact(form); setForm({name:'',relationship:'',phone:''}); load(); }
    catch(e){ setError(e?.response?.data?.error || 'Error al guardar'); }
  };
  const remove = async (id) => { try { await deleteContact(id); load(); } catch(e){ setError('Error al eliminar'); } };

  if (loading) return <LoadingState />;
  return (
    <ScrollView contentContainerStyle={styles.c}>
      <Text style={styles.h}>Registrar contacto</Text>
      {error ? <ErrorState message={error} /> : null}
      <FormField label="Nombre*" value={form.name} onChangeText={(v)=>setForm({...form,name:v})} error={errors.name} />
      <FormField label="Relación" value={form.relationship} onChangeText={(v)=>setForm({...form,relationship:v})} />
      <FormField label="Teléfono*" value={form.phone} keyboardType="phone-pad" onChangeText={(v)=>setForm({...form,phone:v})} error={errors.phone} />
      <Button title="Agregar" onPress={add} />
      <Text style={styles.h}>Contactos de emergencia</Text>
      {items.length===0 ? <EmptyState message="Sin contactos registrados" /> : items.map(c=>(
        <View key={c.id} style={styles.card}>
          <Text style={styles.cardT}>{c.name} {c.is_primary ? '(Principal)' : ''}</Text>
          <Text>{c.relationship || ''} · {c.phone}</Text>
          <Button title="Eliminar" color="#b00020" onPress={()=>remove(c.id)} />
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({ c:{padding:24,gap:8}, h:{fontSize:18,fontWeight:'700',marginTop:12}, card:{padding:12,borderWidth:1,borderColor:'#ddd',borderRadius:8,marginTop:8,gap:4}, cardT:{fontWeight:'600'} });
