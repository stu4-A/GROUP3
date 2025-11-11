
// import React, {useEffect, useState} from 'react';
// import { View, Text, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { api } from '../client';

// export default function StudentDashboard(){
//   const [student,setStudent]=useState(null);
//   useEffect(()=>{
//     (async ()=>{
//       const token = await AsyncStorage.getItem('access');
//       const res = await api.get('/dashboard/', { headers:{ Authorization:`Bearer ${token}` } });
//       setStudent(res.data.student);
//     })();
//   },[]);
//   return (
//     <View style={{padding:20}}>
//       <Text>Student Dashboard</Text>
//       {student && <Text>CGPA: {student.cgpa}</Text>}
//     </View>
//   );
// }


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../client';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('access');
        const res = await api.get('/dashboard/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(res.data.student);
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

      {/* Top Profile Card */}
      <View style={styles.profileCard}>
        <Text style={styles.nameText}>{student?.name || 'Student'}</Text>
        <Text style={styles.cgpaText}>CGPA: {student?.cgpa ?? 'N/A'}</Text>
      </View>

      <Text style={styles.sectionTitle}>What you can do</Text>

      {/* Feature Buttons */}
      <TouchableOpacity style={styles.optionCard}>
        <Text style={styles.optionText}>📚  View Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionCard}>
        <Text style={styles.optionText}>📊  View Results</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionCard}>
        <Text style={styles.optionText}>📝  Apply for Internship</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionCard}>
        <Text style={styles.optionText}>📢  View Announcements</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFF',
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  profileCard: {
    backgroundColor: '#3E64FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
  },
  nameText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'
  },
  cgpaText: {
    marginTop: 5,
    fontSize: 18,
    color: '#DDE7FF',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '600',
    color: '#333'
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  }
});
