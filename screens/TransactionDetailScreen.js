//TransactionDetailScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetailScreen = ({ route }) => {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.detailItem}>
          <Text style={[styles.label,  { fontSize: 28 }, { color: transaction.amount % 2 !== 0 ? 'red' : 'green' }]}>
            {transaction.amount >= 0 ? `$${transaction.amount}` : `-$${-transaction.amount}`}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.label, { fontSize: 20 }]}>{transaction.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.value, { fontSize: 16, color: 'grey' }]}>{transaction.place}</Text>
        </View>
        <View style={styles.detailItem}>
        <Text style={[styles.label, { fontSize: 12, color: 'grey' }]}>Transaction Date:</Text>
          <Text style={[styles.value,{ fontSize: 12, color: 'grey' }]}>{transaction.date}</Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    card: {
      backgroundColor: '#aaffaa', // Change background color to another shade of green
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    detailItem: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
    },
    label: {
      fontWeight: 'bold',
      marginRight: 10,
      alignSelf: 'center',
    },
    value: {
      alignSelf: 'center',
    },
    text: {
      fontSize: 18,
    },
  });

export default TransactionDetailScreen;
