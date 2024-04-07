// App.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TransactionsListScreen from './screens/TransactionsListScreen';
import TransactionDetailScreen from './screens/TransactionDetailScreen.js';
import SummaryScreen from './screens/SummaryScreen';
import { initializeApp } from '@firebase/app';
import { getFirestore, collection, getDocs } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPI4-f6fvZvqtkW0InpxnvmOnlo-dea0M",
  authDomain: "info6127-1133576.firebaseapp.com",
  databaseURL: "https://info6127-1133576-default-rtdb.firebaseio.com",
  projectId: "info6127-1133576",
  storageBucket: "info6127-1133576.appspot.com",
  messagingSenderId: "165619413472",
  appId: "1:165619413472:web:d3ac2277d604601a343b85",
  measurementId: "G-ZWKVSHWVZ5"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TransactionsStack = ({ navigation, transactions, setTransactions }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Transactions List" 
      options={{
        headerStyle: { backgroundColor: '#8FBB66' },
        headerTintColor: '#fff', 
        headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
      }}
    >
      {(props) => <TransactionsListScreen {...props} navigation={navigation} transactions={transactions} setTransactions={setTransactions} />}
    </Stack.Screen>
    <Stack.Screen 
      name="Transaction Detail" 
      component={TransactionDetailScreen} 
      options={{
        headerStyle: { backgroundColor: '#8FBB66' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
      }}
    />
  </Stack.Navigator>
);



const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsCollection = collection(db, 'transactions');
        const querySnapshot = await getDocs(transactionsCollection);
        const fetchedTransactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === 'Transactions') {
              iconName = 'credit-card';
            } else if (route.name === 'Summary') {
              iconName = 'chart-pie';
            }

            const iconColor = focused ? '#8FBB66' : color;

            return <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />;
          },
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{ color: focused ? '#8FBB66' : color }}>
                {route.name}
              </Text>
            );
          },
        })}
      >
        <Tab.Screen name="Transactions">
          {({ navigation }) => <TransactionsStack navigation={navigation} transactions={transactions} setTransactions={setTransactions} />}
        </Tab.Screen>

        <Tab.Screen name="Summary" options={{ tabBarLabel: 'Summary' }}>
          {({ navigation }) => (<SummaryScreen navigation={navigation} transactions={transactions} setTransactions={setTransactions} />)}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
