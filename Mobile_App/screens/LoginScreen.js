
// // // import React, {useState} from 'react';
// // // import { View, Text, TextInput, Button, Alert } from 'react-native';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import { loginUser, fetchDashboard } from '../client';

// // // export default function LoginScreen({navigation}){
// // //   const [username,setUsername]=useState('');
// // //   const [password,setPassword]=useState('');

// // //   const handleLogin = async ()=>{
// // //     try{
// // //       const res = await loginUser(username,password);
// // //       const access = res.data.access || res.data.token || res.data.access_token;
// // //       const refresh = res.data.refresh;
// // //       await AsyncStorage.setItem('access', access);
// // //       if(refresh) await AsyncStorage.setItem('refresh', refresh);
// // //       const dash = await fetchDashboard(access);
// // //       const role = (dash.data.profile.role || '').toLowerCase();
// // //       if(role==='admin') navigation.replace('AdminDashboard',{token:access});
// // //       else if(role==='lecturer') navigation.replace('LecturerDashboard',{token:access});
// // //       else navigation.replace('StudentDashboard',{token:access});
// // //     }catch(err){
// // //       console.error(err);
// // //       Alert.alert('Login failed', 'Check your credentials or server URL.');
// // //     }
// // //   }

// // //   return (
// // //     <View style={{padding:20}}>
// // //       <Text>Username</Text>
// // //       <TextInput value={username} onChangeText={setUsername} style={{borderWidth:1,marginBottom:10}} />
// // //       <Text>Password</Text>
// // //       <TextInput secureTextEntry value={password} onChangeText={setPassword} style={{borderWidth:1,marginBottom:10}} />
// // //       <Button title="Login" onPress={handleLogin} />
// // //     </View>
// // //   );
// // // }

// // import React, { useState } from 'react';
// // import { View, Text, TextInput, Button, Alert } from 'react-native';
// // import { registerUser } from '../client'; // Make sure you create this in your API file

// // export default function RegisterScreen({ navigation }) {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [role, setRole] = useState('student'); // default role

// //   const handleRegister = async () => {
// //     try {
// //       const res = await registerUser({ username, password, role });
// //       console.log("Register Response:", res.data);
// //       Alert.alert('Success', 'Account created, now login!');
// //       navigation.replace('Login');
// //     } catch (err) {
// //       console.log("Register Error:", err.response?.data || err.message);
// //       Alert.alert('Registration failed', err.response?.data?.detail || 'Try again.');
// //     }
// //   };

// //   return (
// //     <View style={{ padding: 20 }}>
// //       <Text>Username</Text>
// //       <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10 }} />

// //       <Text>Password</Text>
// //       <TextInput secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />

// //       <Text>Role (admin / lecturer / student)</Text>
// //       <TextInput value={role} onChangeText={setRole} style={{ borderWidth: 1, marginBottom: 10 }} />

// //       <Button title="Register" onPress={handleRegister} />
// //       <Button title="Back to Login" onPress={() => navigation.replace('Login')} />
// //     </View>
// //   );
// // }


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loginUser, fetchDashboard } from '../client';

// export default function LoginScreen({ navigation }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await loginUser(username, password);
//       const access = res.data.access;
//       const refresh = res.data.refresh;
//       await AsyncStorage.setItem('access', access);
//       if (refresh) await AsyncStorage.setItem('refresh', refresh);

//       const dash = await fetchDashboard(access);
//       const role = dash.data.profile.role.toLowerCase();

//       if (role === 'admin') navigation.replace('AdminDashboard');
//       else if (role === 'lecturer') navigation.replace('LecturerDashboard');
//       else navigation.replace('StudentDashboard');

//     } catch (err) {
//       console.log("LOGIN ERROR →", err.response?.data || err.message);
//       Alert.alert("Login Failed", "Check credentials / server.");
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Username</Text>
//       <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10 }} />

//       <Text>Password</Text>
//       <TextInput secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />

//       <Button title="Login" onPress={handleLogin} />
//       <Button title="Go to Register" onPress={() => navigation.replace('Register')} />
//     </View>
//   );
// }



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, fetchDashboard } from '../client';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Missing Information", "Please enter both username and password.");
      return;
    }

    try {
      const res = await loginUser(username, password);
      const access = res.data.access;
      const refresh = res.data.refresh;

      await AsyncStorage.setItem('access', access);
      if (refresh) await AsyncStorage.setItem('refresh', refresh);

      const dash = await fetchDashboard(access);
      const role = dash.data.profile.role.toLowerCase();

      if (role === 'admin') navigation.replace('AdminDashboard');
      else if (role === 'lecturer') navigation.replace('LecturerDashboard');
      else navigation.replace('StudentDashboard');

    } catch (err) {
      console.log("LOGIN ERROR →", err.response?.data || err.message);
      Alert.alert("Login Failed", "Incorrect credentials or server error.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Career Portal</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '#F9FBFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#2D3A8C',
    marginBottom: 6,
  },
  subtitle: {
    textAlign: 'center',
    color: '#4A4A4A',
    marginBottom: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C8D1E0',
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
  },
  loginBtn: {
    backgroundColor: '#3E64FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  registerText: {
    marginTop: 18,
    textAlign: 'center',
    color: '#3eff85ff',
    fontWeight: '600'
  }
});
