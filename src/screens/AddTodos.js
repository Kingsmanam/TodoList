import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import tw from '../../lib/tailwind';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import RadioColors from '../components/RadioColors';
import DropDown from '../components/DropDown';
import {todoContext} from '../contexts/TodoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTodos({navigation}) {
  const [tasks, setTasks] = useContext(todoContext);
  
  const formik = useFormik({
    initialValues: {
      taskName: '',
      description: '',
      color: 'blue-300',
      priority: '',
      time: ''
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required('Task name required'),
      description: Yup.string().max(140, 'exceeding charactar limit'),
    }),
    onSubmit: (values) => {
      setTasks([...tasks, values]);
      navigation.navigate('All Tasks')
    },
  });
  
  useEffect(() => {
    let time = new Date().toLocaleTimeString();
    formik.setFieldValue('time', time)
  }, [formik.isSubmitting]);

  useEffect(() => {
    storeTask();
  }, [tasks]);
  
  const storeTask = async () => {
    try {
      const storedata = JSON.stringify(tasks);
      await AsyncStorage.setItem('TASK', storedata);
    } catch (e) {
      console.log(e);
    } 
  }
  const textStyle = tw`text-blue-500 text-base`;
  return (
    <KeyboardAvoidingView style={tw`flex-1 pt-5 px-4`}>
      <Text style={{...textStyle}}>Task name</Text>
      {formik.errors.taskName && formik.touched.taskName ? (
        <Text style={tw`text-red-600`}>{formik.errors.taskName}</Text>
      ) : null}
      <TextInput
        onChangeText={formik.handleChange('taskName')}
        onBlur={formik.handleBlur('taskName')}
        value={formik.values.taskName}
        style={tw`w-full py-3 px-2 border border-blue-400 rounded-xl mt-2 mb-7`}
      />
      <Text style={{...textStyle}}>Task description</Text>
      {formik.errors.description && formik.touched.description ? (
        <Text style={tw`text-red-600`}>{formik.errors.description}</Text>
      ) : null}
      <TextInput
        onChangeText={formik.handleChange('description')}
        onBlur={formik.handleBlur('description')}
        value={formik.values.description}
        multiline
        textAlignVertical="top"
        style={tw`w-full h-[20%] px-2 border border-blue-400 rounded-xl mt-2 mb-9`}
      />
      <View style={tw`flex-row w-full justify-between items-center mb-7`}>
        <Text style={{...textStyle}}>Task color</Text>
        <RadioColors formik={formik} />
      </View>
      <Text style={{...textStyle}}>Task priority</Text>
      <DropDown formik={formik} />
      <TouchableOpacity
        onPress={() => formik.handleSubmit()}
        style={tw`p-3 bg-blue-400 justify-center items-center w-[25%] rounded-md absolute right-5 bottom-5`}>
        <Text style={tw`text-white`}>Add</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
