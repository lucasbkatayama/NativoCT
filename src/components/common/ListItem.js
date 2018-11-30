import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableHighlight } from 'react-native';

class ListItem extends Component {
  onRowPress() {
    Actions.studentEdit({ student: this.props.student.item });
  }

  render() {
    const { name, numberOfDays, status, payPlan } = this.props.student.item;

    return (
        <TouchableHighlight onPress={this.onRowPress.bind(this)}>
          <View
            style={[
              styles.containerStyle,
              { backgroundColor: status === 'ativo' ? '#fff' : 'tomato' }
            ]}
          >
            <View style={{ flex: 4, justifyContent: 'center' }}>
                <Text style={[styles.titleStyle, { fontWeight: 'bold' }]}>
                  {name}
                </Text>
                <Text style={{ color: '#555' }}>
                  Plano{' '}{payPlan}, {' '}
                  {numberOfDays}{' '}vezes por semana
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.titleStyle}>
                  {status}
                </Text>
            </View>
          </View>
        </TouchableHighlight>

    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 60,
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 20
  },
  columnStyle: {
    alignItems: 'center',
  },
  titleStyle: {
    color: 'black',
  }
};

export default ListItem;
