import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableOpacity } from 'react-native';

class ExerciseItem extends Component {
  onRowPress() {
    Actions.studentExerciseRecord({
      exercise: this.props.exercise.item });
  }

  render() {
    const { measure, uid } = this.props.exercise.item;
    const { dates } = this.props.exercise.item;

    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <View style={styles.containerStyle}>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.titleStyle}>
                {uid}
              </Text>
          </View>
          <View style={styles.amountContainerStyle}>
              <Text style={{ color: '#fff' }}>
                {_.map(dates)[_.map(dates).length - 1].amount}{' '}{measure}
              </Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerStyle: {
    borderRadius: 5,
    height: 60,
    flex: 1,
    flexDirection: 'row',
    elevation: 2,
    marginBottom: 10
  },
  amountContainerStyle: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row'
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold'
  }
};

export default ExerciseItem;
