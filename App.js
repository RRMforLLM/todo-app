import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [todos, setTodos] = useState(null);
  const [dones, setDones] = useState(null);

  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };
    setup();
  }, []);
  
  useEffect(() => {
    const fetchDones = async () => {
      if (todos && todos.length > 0) {
        const fetchedDones = await getDones();
        setDones(fetchedDones);
      }
    };
    fetchedDones();
  }, [todos]);

  const addTodo = async () => {
    if (!todoSubject.trim() || !todoDetails.trim() || !todoDeadline.trim()) return;

    try {
      await insertTodo({ subject: todoSubject.trim(), details: todoDetails.trim(), deadline: todoDeadline.trim() })
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
      setTodoSubject('');
      setTodoDetails('');
      setTodoDeadline('');
    } catch(error) {
      console.error('Error adding todo:', error);
    }
  };

  const addDone = async () => {
    if (!todo) return;

    try {
      await insertDone(todo);
      const updatedDones = await getDones();
      setDones(updatedDones);
    } catch(error) {
      console.error('Error adding done:', error);
    }
  };

  if (todos === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  };

  if (todos.length )

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
