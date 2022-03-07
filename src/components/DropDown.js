import {View, Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from '../../lib/tailwind';

export default function DropDown({formik}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('low');
  const [items, setItems] = useState([
    {label: 'LOW', value: 'low'},
    {label: 'MEDIUM', value: 'medium'},
    {label: 'HIGH', value: 'high'},
    {label: 'URGENT', value: 'urgent'},
 
  ]);
  useEffect(() => {
    formik.setFieldValue('priority', value)
  }, [value])

  return (
    <DropDownPicker
      style={tw`border-blue-400`}
      containerStyle={tw`mt-3 border-blue-400`}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
