//TransactionsListScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { initializeApp } from '@firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const TransactionsListScreen = ({ navigation, transactions, setTransactions }) => {


  console.log("Received transactions:", transactions);

  const [showPopup, setShowPopup] = useState(false);
  const [transactionName, setTransactionName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionPlace, setTransactionPlace] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(false);


  const handleTransactionPress = (transaction) => {
    navigation.navigate('Transaction Detail', { transaction });
  };

  const openDatePicker = () => {
    setDatePickerVisibility(true);
    console.log("Open Date function called");
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setTransactionDate(formattedDate);
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
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

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setTransactionStatus(false);
    setShowPopup(false);
  };

  const addTransaction = async (transactionData) => {
    try {
      await db.collection('transactions').add(transactionData);
      console.log('Transaction added successfully');
    } catch (error) {
      console.error('Error adding transaction: ', error);
    }
  };

  const submitTransaction = async () => {
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        name: transactionName,
        amount: parseFloat(transactionAmount),
        place: transactionPlace,
        date: transactionDate
      });

      const newTransaction = {
        id: docRef.id,
        name: transactionName,
        amount: parseFloat(transactionAmount),
        place: transactionPlace,
        date: transactionDate
      };

      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);

      // Reset input fields and close the popup
    setTransactionName('');
    setTransactionAmount('');
    setTransactionPlace('');
    setTransactionDate('');

    setTransactionStatus(true);
    //closePopup();

      console.log("Transaction added with ID: ", docRef.id);
    } catch (e) {
      setTransactionStatus(false);
      console.error("Error adding transaction: ", e);
    }


  };

  return (
    <View style={styles.container}>
      
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

       <View style={styles.addTransactionSection}>
        {/* Add Transaction button */}
        <TouchableOpacity style={styles.addButton} onPress={() => openPopup()}>
          <Ionicons name="add-circle" size={50} color="#8FBB66" />
        </TouchableOpacity>
      </View>

      <Modal visible={showPopup} animationType="slide">
  <View style={styles.popupContainer}>
    {/* Header Section */}
    <View style={styles.popupHeader}>
      <Text style={styles.popupHeaderText}>Add Transaction</Text>
    </View>

    {/* Main content */}
    {transactionStatus === true ? (
      <View style={styles.statusPopup}>
        <Text style={styles.statusMessage}>Transaction added successfully!</Text>
        <TouchableOpacity style={styles.submitButton} onPress={closePopup}>
          <Text style={styles.submitButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.popupContent}>
        {/* Transaction name field */}
        <TextInput
          style={styles.input}
          placeholder="Transaction Name"
          value={transactionName}
          onChangeText={setTransactionName}
        />

        {/* Transaction amount field */}
        <TextInput
          style={styles.input}
          placeholder="Transaction Amount"
          value={transactionAmount}
          onChangeText={setTransactionAmount}
          keyboardType="numeric"
        />

        {/* Transaction place field */}
        <TextInput
          style={styles.input}
          placeholder="Transaction Place"
          value={transactionPlace}
          onChangeText={setTransactionPlace}
        />

        {/* Transaction date field (You can use DatePicker here) */}
        <TouchableOpacity onPress={openDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="Transaction Date"
            value={transactionDate}
            onChangeText={setTransactionDate}
            editable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()} // Allow only previous dates
        />

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitTransaction}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
</Modal>


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
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    popupContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    statusPopup: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      height: 40,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 5,
      paddingHorizontal: 10,
    },
    submitButton: {
      backgroundColor: '#8FBB66',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    popupHeader: {
      backgroundColor: '#8FBB66',
      width: '100%',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    popupContent: {
      flex: 1,
      marginTop:20,
      paddingStart: 10,
      paddingEnd: 10,
    },
    popupHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
  });
  

export default TransactionsListScreen;
