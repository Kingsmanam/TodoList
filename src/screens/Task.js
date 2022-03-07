import {View, Text} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';

export default function Task({route}) {
  const {taskName, description, color, time, priority} = route.params;
  const titleStyle = tw`text-blue-700 text-lg`;
  const textStyle = tw`text-base mb-5`;
  return (
    <View style={tw`p-5`}>
      <Text style={titleStyle}>Task</Text>
      <Text style={textStyle}>{taskName}</Text>
      <Text style={titleStyle}>description</Text>
      <Text numberOfLines={3} style={tw`text-base mb-15`}>
        {description ? description : 'None'}
      </Text>
      <Text style={titleStyle}>Task color</Text>
      <View style={tw`w-8 h-8 rounded-full bg-${color} mb-5 mt-2`}></View>
      <Text style={titleStyle}>Priority</Text>
      <Text style={textStyle}>{priority}</Text>
      <Text style={titleStyle}>Created at</Text>
      <Text style={textStyle}>{time}</Text>
    </View>
  );
}
