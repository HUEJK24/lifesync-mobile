import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LoadingState, ErrorState, EmptyState } from '../components/StateView';
import { getProfile, listAllergies, listContacts } from '../../data/remote/medicalApi';

export default function EmergencyScreen() {
  const [data, setData] = useState({ profile: null, allergies: [], contacts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [p, a, c] = await Promise.all([getProfile(), listAllergies(), listContacts()]);
        setData({ profile: p.profile, allergies: a.allergies || [], contacts: c.contacts || [] });
      } catch (e) { setError(e?.response?.data?.error || 'Error al cargar información de emergencia'); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  const primary = data.contacts.find(c => c.is_primary) || data.contacts[0];
  return (
    <ScrollView contentContainerStyle={styles.c}>
      <Text style={styles.h}>Vista de emergencia</Text>
      <View style={styles.card}><Text style={styles.t}>Tipo de sangre</Text><Text style={styles.v}>{data.profile?.blood_type || 'No registrado'}</Text></View>
      <View style={styles.card}><Text style={styles.t}>Alergias</Text>
        {data.allergies.length===0 ? <Text>Sin alergias registradas</Text> : data.allergies.map(a=> <Text key={a.id}>• {a.allergen} {a.severity?`(${a.severity})`:''}</Text>)}
      </View>
      <View style={styles.card}><Text style={styles.t}>Contacto principal</Text>
        {primary ? <Text>{primary.name} · {primary.phone}</Text> : <EmptyState message="Sin contactos" />}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  c:{padding:24,gap:12}, h:{fontSize:22,fontWeight:'700'}, card:{padding:16,borderWidth:1,borderColor:'#ddd',borderRadius:10,gap:6},
  t:{fontWeight:'600',fontSize:16}, v:{fontSize:18}
});
