import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import { View, FlatList, ScrollView } from 'react-native';
import {
  Header,
} from 'react-native-elements';

import { exerciseChanged, exerciseFetch } from '../actions';
import ExerciseRecordItem from './ExerciseRecordItem';
import ModalEditExercises from './modals/ModalEditExercises';

class ModalExerciseItem extends Component {
  render() {
    const data = _.map(this.props.exercise.dates, (val, uid) => {
      return { val, uid };
    });

    return (
      <LinearGradient colors={['#3f704d', '#4682b4', '#7ef9ff']} style={styles.containerStyle}>
        <ScrollView style={{ paddingBottom: 10 }}>
        <Header
          centerComponent={{ text: this.props.exercise.uid, style: { fontSize: 20, color: '#fff' } }}
          leftComponent={{
            icon: 'chevron-left',
            type: 'octicon',
            color: '#fff',
            onPress: () => Actions.pop(),
           }}
          rightComponent={{
            icon: 'pencil',
            type: 'octicon',
            color: '#fff',
            onPress: () => this.props.exerciseChanged({ prop: 'editExerciseModal', value: true })
          }}
          outerContainerStyles={{ height: 75, borderBottomWidth: 0 }}
          backgroundColor='rgba(0, 0, 0, 0)'
        />
          <View style={{ margin: 10, marginTop: 0 }}>
            <FlatList
              extraData={this.props.updateKey}
              key={this.props.updateKey}
              data={data.reverse()}
              renderItem={(e) =>
                <ExerciseRecordItem
                  key={this.props.updateKey}
                  measure={this.props.exercise.measure}
                  exerciseName={this.props.exercise.uid}
                  exercise={e}
                />
            }
              keyExtractor={exercise => exercise.uid}
            />
          </View>
      </ScrollView>
      <ModalEditExercises
        exerciseName={this.props.exercise.uid}
      />
      </LinearGradient>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  containerTopStyle: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fontSizeStyle: {
    fontSize: 22
  },
  containerMiddleStyle: {
    paddingLeft: 15,
    elevation: 2,
    paddingBottom: 5,
    backgroundColor: '#fff'
  },
  buttonStyle: {
    marginTop: 15,
    elevation: 2
  },
};

const mapStateToProps = state => {
  const exerciseItem = _.map(state.studentHome.exerciseItem, (val, uid) => {
    return { ...val, uid };
  });
  return {
    exerciseName: state.studentHome.exerciseName,
    amount: state.studentHome.amount,
    measure: state.studentHome.measure,
    modal: state.studentHome.exerciseItemModal,
    perfil: state.studentHome.perfil,
    uid: state.auth.user.user.uid,
    load: state.studentHome.load,
    editExerciseModal: state.studentHome.editExerciseModal,
    updateKey: state.studentHome.updateKey,
    exerciseItem
  };
};

export default connect(mapStateToProps, {
  exerciseChanged, exerciseFetch
})(ModalExerciseItem);
