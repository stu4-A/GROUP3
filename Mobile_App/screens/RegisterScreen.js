// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import { registerUser } from '../client'; // Make sure you create this in your API file

// export default function RegisterScreen({ navigation }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('student'); // default role

//   const handleRegister = async () => {
//     try {
//       const res = await registerUser({ username, password, role });
//       console.log("Register Response:", res.data);
//       Alert.alert('Success', 'Account created, now login!');
//       navigation.replace('Login');
//     } catch (err) {
//       console.log("Register Error:", err.response?.data || err.message);
//       Alert.alert('Registration failed', err.response?.data?.detail || 'Try again.');
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Username</Text>
//       <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10 }} />

//       <Text>Password</Text>
//       <TextInput secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />

//       <Text>Role (admin / lecturer / student)</Text>
//       <TextInput value={role} onChangeText={setRole} style={{ borderWidth: 1, marginBottom: 10 }} />

//       <Button title="Register" onPress={handleRegister} />
//       <Button title="Back to Login" onPress={() => navigation.replace('Login')} />
//     </View>
//   );
// }


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { registerUser } from '../client';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default role

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Missing Info", "Please fill all fields.");
      return;
    }

    try {
      const res = await registerUser({ username, password, role });
      console.log("Register Response:", res.data);
      Alert.alert("Success", "Account created. Please login.");
      navigation.replace("Login");
    } catch (err) {
      console.log("Register Error:", err.response?.data || err.message);
      Alert.alert("Registration Failed", err.response?.data?.detail || "Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

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

      <View style={styles.pickerContainer}>
        <Picker selectedValue={role} onValueChange={(value) => setRole(value)} style={styles.picker}>
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Lecturer" value="lecturer" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨  STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#F9FBFF",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#2D3A8C",
    marginBottom: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C8D1E0",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#C8D1E0",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  registerBtn: {
    backgroundColor: "#3E64FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 18,
    textAlign: "center",
    fontWeight: "600",
    color: "#3E64FF",
  },
});
