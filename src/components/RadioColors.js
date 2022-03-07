import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from '../../lib/tailwind';
import Check from 'react-native-vector-icons/Entypo';

export default function RadioColors({formik}) {
  const [selected, setSelected] = useState(0);
  const taskColors = ['blue-300', 'rose-500', 'orange-600', 'purple-600'];
  
  return (
    <View style={tw`w-[60%] justify-between flex-row items-center pr-4`}>
      {taskColors.map((color, i) => (
        <TouchableOpacity
          onPress={() => {
            setSelected(i);
            formik.setFieldValue('color', color);
          }}
          style={tw`w-9 h-9 rounded-full items-center justify-center bg-${color}`}
          key={i}>
          {selected === i ? <Check name="check" color="#fff" size={20} /> : null}
        </TouchableOpacity>
      ))}
    </View>
  );
}
