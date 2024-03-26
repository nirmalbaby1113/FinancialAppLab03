//TransactionsListScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const TransactionsListScreen = ({ navigation, transactions }) => {


  const handleTransactionPress = (transaction) => {
    navigation.navigate('Transaction Detail', { transaction });
  };

  const renderTransactionItem = ({ item }) => {
    const amountColor = item.amount%2 == 0 ? 'green' : 'red';
  
    return (
      <TouchableOpacity onPress={() => handleTransactionPress(item)} style={styles.transactionItem}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionName}>{item.name}</Text>
          <Text style={[styles.transactionAmount, { color: amountColor }]}>${item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    list: {
      flexGrow: 1,
    },
    transactionItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    transactionInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    transactionName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'green',
    },
    transactionDate: {
      fontSize: 14,
      color: '#888',
    },
  });
  

export default TransactionsListScreen;
