import React from 'react';
import { View, Text } from 'react-native';

const TableDivision = ({ title, style }) => {
  return (
    <View style={[styles.containerStyle, style]}>
      <Text style={{ color: '#fff' }}>{title}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
    flex: 1,
    padding: 5,
    marginLeft: 15,
    marginRight: 15
  }
};

export { TableDivision };
