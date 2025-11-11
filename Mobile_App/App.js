
// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import LoginScreen from './screens/LoginScreen';
// // import AdminDashboard from './screens/AdminDashboard';
// // import LecturerDashboard from './screens/LecturerDashboard';
// // import StudentDashboard from './screens/StudentDashboard';

// // const Stack = createStackNavigator();

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Login">
// //         <Stack.Screen name="Login" component={LoginScreen} />
// //         <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
// //         <Stack.Screen name="LecturerDashboard" component={LecturerDashboard} />
// //         <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }


// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import AdminDashboard from './screens/AdminDashboard';
// import LecturerDashboard from './screens/LecturerDashboard';
// import StudentDashboard from './screens/StudentDashboard';

// <Stack.Navigator screenOptions={{ headerShown: true }}>
//   <Stack.Screen name="Login" component={LoginScreen} />
//   <Stack.Screen name="Register" component={RegisterScreen} />
//   <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
//   <Stack.Screen name="LecturerDashboard" component={LecturerDashboard} />
//   <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
// </Stack.Navigator>



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminDashboard from './screens/AdminDashboard';
import LecturerDashboard from './screens/LecturerDashboard';
import StudentDashboard from './screens/StudentDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="LecturerDashboard" component={LecturerDashboard} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
