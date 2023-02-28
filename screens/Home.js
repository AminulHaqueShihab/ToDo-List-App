import { View, Text, FlatList, StyleSheet, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';


const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoref = firebase.firestore().collection('todos');
    const navigation = useNavigation(); 
    const [heading, setHeading] = useState('');
    //fetching data from firebase
    useEffect(() => {
        todoref
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const todos = [];
                querySnapshot.forEach(doc => {
                    const {heading} = doc.data()
                    todos.push({
                        id: doc.id,
                        heading,
                    })
                })
                setTodos(todos)
            }
        ) 
    }, [])

    //delete todo
    const deleteTodo = (todos) => {
        todoref
        .doc(todos.id)
        .delete()
        .then(() => {
            alert('Deleted Successfully');
        })
        .catch(error => {
            alert(error);
        })
    }

    //add todo
    const addTodo = () => {
        if (addData && addData.length > 0){
            const timestep = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestep,
            };
            todoref
                .add(data)
                .then(() => {
                    setAddData('');
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }
}

export default Home;
