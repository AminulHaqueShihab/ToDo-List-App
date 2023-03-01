import { View, Text, FlatList, StyleSheet, Keyboard, TouchableOpacity, TextInput, Pressable } from 'react-native';
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

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add New Task'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => navigation.navigate('Detail', {item})}
                        >
                            <FontAwesome
                                name='trash-o'
                                color='red'
                                opPress={() => deleteTodo(item)}
                            />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            />

        </View>
    )
}

export default Home;


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45,
    },
    itemHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight:22,
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 100,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14,
    },
})