import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Todos from '../screens/Todos';
import AddTodos from '../screens/AddTodos';
import Task from '../screens/Task';

const Stack = createNativeStackNavigator();
export default function StackNav() {
  const screenProps = {
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    contentStyle: {backgroundColor: 'white'},
  };
  return (
    <Stack.Navigator screenOptions={{...screenProps}}>
      <Stack.Screen name="All Tasks" component={Todos} />
      <Stack.Screen name='Add' component={AddTodos} options={{title: 'New Task'}}/>
      <Stack.Screen name='Task' component={Task}/>
    </Stack.Navigator>
  );
}
