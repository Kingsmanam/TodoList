import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect} from 'react';
import tw from 'twrnc';
import {todoContext} from '../contexts/TodoContext';
import Status from '../components/Status';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SwipeItem,
  SwipeProvider,
  SwipeButtonsContainer,
} from 'react-native-swipe-item';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Todos({navigation}) {
  const [tasks, setTasks] = useContext(todoContext);
  
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const stringdata = await AsyncStorage.getItem('TASK');
      if (stringdata !== null) {
        const jsonValue = JSON.parse(stringdata);
        setTasks(jsonValue);
      }
    } catch (e) {
      console.log('error => ', e);
    }
  };
  
  const removeTask = async () => {
    try {
      await AsyncStorage.removeItem('TASK');
    } catch (e) {
      console.log(e);
    }
  };

  const leftButton = (task, index) => (
    <SwipeButtonsContainer style={tw`p-3 self-center`}>
      <TouchableOpacity
        style={tw`py-6 rounded-xl px-3 bg-red-600 items-center justify-center`}
        onPress={() => {
          // removeTask(task.name);
          let arr = [...tasks];
          arr.splice(index, 1);
          setTasks(arr);
        }}>
        <Delete name="delete" color="#fff" size={30} />
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  const rightButton = (task) => (
    <SwipeButtonsContainer style={tw`p-3 self-center`}>
      <TouchableOpacity
        style={tw`py-6 rounded-xl px-3 bg-blue-700 items-center justify-center`}
        onPress={() => {
          navigation.navigate('Task', task)
        }}>
        <Delete name="account-details" color="#fff" size={30} />
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  return (
    <View style={tw`flex-1 pt-7`}>
      <SwipeProvider>
        {tasks && tasks !== []
          ? tasks.map((task, index) => (
              <SwipeItem
                // onPres={() => {navigation.navigate('Task', task)}}
                style={tw`h-20 w-[90%] self-center mb-2`}
                swipeContainerStyle={tw`px-3 bg-${task.color} flex-row rounded-2xl justify-between items-center shadow`}
                leftButtons={leftButton(task, index)}
                rightButtons={rightButton(task)}
                key={index}>
                <Text style={tw`text-white`}>{task.taskName}</Text>
                <Status />
              </SwipeItem>
            ))
          : null}
      </SwipeProvider>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Add');
        }}
        style={tw`absolute self-center bottom-3 px-8 py-6 rounded-full bg-blue-400 shadow-md`}>
        <Text style={tw`text-xl text-white`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
