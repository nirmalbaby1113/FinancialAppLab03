import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SummaryScreen = ({ route }) => {
  const { transactions } = route.params;

  // Calculate total transactions
  const totalTransactions = transactions.length;

  // Calculate total debit amount (odd amounts)
  const totalDebitAmount = transactions.reduce((total, transaction) => {
    if (transaction.amount % 2 !== 0) {
      return total + Math.abs(transaction.amount);
    }
    return total;
  }, 0);

  // Calculate total credit amount (even amounts)
  const totalCreditAmount = transactions.reduce((total, transaction) => {
    if (transaction.amount % 2 === 0) {
      return total + transaction.amount;
    }
    return total;
  }, 0);

  // Calculate highest debit amount (odd)
  const highestDebitAmount = transactions.reduce((highest, transaction) => {
    if (transaction.amount % 2 !== 0 && Math.abs(transaction.amount) > highest) {
      return Math.abs(transaction.amount);
    }
    return highest;
  }, 0);

  // Calculate lowest debit amount (odd)
  const lowestDebitAmount = transactions.reduce((lowest, transaction) => {
    if (transaction.amount % 2 !== 0 && Math.abs(transaction.amount) < lowest) {
      return Math.abs(transaction.amount);
    }
    return lowest;
  }, Infinity);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Summary</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Transactions</Text>
        <Text style={styles.cardValue}>{totalTransactions}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Debit Amount</Text>
        <Text style={styles.cardValue}>${totalDebitAmount}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Credit Amount</Text>
        <Text style={styles.cardValue}>${totalCreditAmount}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Highest Debit Amount</Text>
        <Text style={styles.cardValue}>${highestDebitAmount}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lowest Debit Amount</Text>
        <Text style={styles.cardValue}>${lowestDebitAmount === Infinity ? 0 : lowestDebitAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#8FBB66',
    padding: 10,
    marginBottom: 20,

  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 16,
  },
});

export default SummaryScreen;
