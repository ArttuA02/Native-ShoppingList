import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { deleteDoc, doc, query, collection, firestore, ITEMS, onSnapshot, addDoc, orderBy} from './firebase/config'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  const save = async () => {
    const docRef = await addDoc(collection(firestore, ITEMS), {
      text: newItem,
    }).catch (error => console.log(error))
    setNewItem('')
  }

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, ITEMS, id));
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };

  useEffect(() => {
    const q = query(collection(firestore,ITEMS))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempItems = []
      querySnapshot.forEach((doc) => {
        tempItems.push({...doc.data(),id: doc.id,})
      })
      setItems(tempItems)
    })
    return () => {
      unsubscribe()
    }
  })

  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.title}>Shopping list</Text>
      <View style={styles.form}>
        <TextInput 
          placeholder='Add items...'
          value={newItem}
          onChangeText={text => setNewItem(text)}
        />
        <Button title='Add' onPress={save} />
      </View>
      <ScrollView>
        {
          items.map((item) => (
            <View style={styles.item} key={item.id} >
              <Text>{item.text}</Text>
                <TouchableOpacity title='Delete'  onPress={() => deleteItem(item.id)}>
                  <Ionicons name="trash" size={24} />
                </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    margin: 8
  },
  title: {
    marginTop: 30,
    fontSize: 30
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 26,
    marginBottom: 16
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 1,
    padding: 10,
  },
  itemInfo: {
    fontSize: 12
  }
});
