import {TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Check from 'react-native-vector-icons/Entypo';

export default function Status() {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(!selected);
      }}
      style={tw`w-8 h-8 rounded-full bg-${selected ? 'emerald-400' : 'white'} shadow-lg items-center justify-center`}>
      {selected ? <Check name="check" color="#fff" size={17} /> : null}
    </TouchableOpacity>
  );
}
