
import React, {useEffect, useState} from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { api } from '../client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminDashboard({navigation}){
  const [data,setData]=useState(null);

  useEffect(()=>{
    (async ()=>{
      const token = await AsyncStorage.getItem('access');
      const res = await api.get('/dashboard/', { headers:{ Authorization:`Bearer ${token}` } });
      setData(res.data);
    })();
  },[]);

  return (
    <View style={{padding:20}}>
      <Text>Admin Dashboard</Text>
      {data && <Text>Total users: {data.summary.total_users}</Text>}
    </View>
  );
}
