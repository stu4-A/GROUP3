
// import React, {useEffect, useState} from 'react';
// import { View, Text, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { api } from '../client';

// export default function LecturerDashboard(){
//   const [ops,setOps]=useState([]);
//   useEffect(()=>{
//     (async ()=>{
//       const token = await AsyncStorage.getItem('access');
//       const res = await api.get('/dashboard/', { headers:{ Authorization:`Bearer ${token}` } });
//       setOps(res.data.opportunities || []);
//     })();
//   },[]);
//   return (
//     <View style={{padding:20}}>
//       <Text>Lecturer Dashboard</Text>
//       <FlatList data={ops} keyExtractor={(i)=>i.id.toString()} renderItem={({item})=>(<Text>{item.company} - {item.role}</Text>)} />
//     </View>
//   );
// }


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../client';

export default function LecturerDashboard() {
  const [ops, setOps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('access');
        const res = await api.get('/dashboard/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOps(res.data.opportunities || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>Lecturer Dashboard</Text>
      <Text style={styles.subtitle}>Manage Opportunities and Student Performance</Text>

      {/* Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <TouchableOpacity style={styles.actionCard}>
        <Text style={styles.actionText}>📊  View Student Performance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <Text style={styles.actionText}>📝  Enter Student Grades</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <Text style={styles.actionText}>📢  View Announcements</Text>
      </TouchableOpacity>

      {/* Opportunities Section */}
      <Text style={styles.sectionTitle}>Opportunities You Manage</Text>

      {ops.length === 0 ? (
        <Text style={{ color: '#777' }}>No opportunities assigned yet.</Text>
      ) : (
        ops.map(op => (
          <View key={op.id} style={styles.opCard}>
            <Text style={styles.opTitle}>{op.role}</Text>
            <Text style={styles.opCompany}>{op.company}</Text>

            <TouchableOpacity style={styles.manageBtn}>
              <Text style={styles.manageBtnText}>Manage Applicants</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FBFF',
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3A8C',
  },
  subtitle: {
    fontSize: 14,
    color: '#556',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginVertical: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3
  },
  actionText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500'
  },
  opCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3
  },
  opTitle: {
    fontSize: 17,
    color: '#1A1A1A',
    fontWeight: '600'
  },
  opCompany: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4
  },
  manageBtn: {
    marginTop: 10,
    backgroundColor: '#3E64FF',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  manageBtnText: {
    color: '#fff',
    fontWeight: '600'
  }
});
