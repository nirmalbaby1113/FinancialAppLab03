//App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TransactionsListScreen from './screens/TransactionsListScreen';
import TransactionDetailScreen from './screens/TransactionDetailScreen.js';
import SummaryScreen from './screens/SummaryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TransactionsStack = ({ navigation, transactions }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Transactions List" 
      options={{
        headerStyle: { backgroundColor: '#8FBB66' },
        headerTintColor: '#fff', 
        headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
      }}
    >
      {() => <TransactionsListScreen navigation={navigation} transactions={transactions} />}
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
  const transactions = [
    { id: 1, name: 'Grocery shopping', amount: 17, place: 'Local Supermarket, Main Street', date: '2024-03-26' },
    { id: 2, name: 'Dinner', amount: 208, place: 'Italian Restaurant, Elm Avenue', date: '2024-03-25' },
    { id: 3, name: 'Movie tickets', amount: 151, place: 'Cinema, Downtown', date: '2024-03-24' },
    { id: 4, name: 'Gasoline refill', amount: 100, place: 'Gas Station, Oak Street', date: '2024-03-26' },
    { id: 5, name: 'Online shopping', amount: 231, place: 'Online Store', date: '2024-03-25' },
    { id: 6, name: 'Coffee with friends', amount: 154, place: 'Café, Park Avenue', date: '2024-03-24' },
    { id: 7, name: 'Home utility bills', amount: 100, place: 'Service Provider, Pine Street', date: '2024-03-26' },
    { id: 8, name: 'Gym membership', amount: 267, place: 'Fitness Center, Maple Avenue', date: '2024-03-25' },
    { id: 9, name: 'Clothing purchase', amount: 150, place: 'Clothing Store, Riverside Drive', date: '2024-03-24' }
  ];

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
          {({ navigation }) => <TransactionsStack navigation={navigation} transactions={transactions} />}
        </Tab.Screen>

        <Tab.Screen name="Summary" initialParams={{ transactions }} component={SummaryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
