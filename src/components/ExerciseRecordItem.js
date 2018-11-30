import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { exerciseChanged } from '../actions';
import ModalDeleteRecordItem from './modals/ModalDeleteRecordItem';

class ExerciseItem extends Component {
  formatDate() {
    const { uid } = this.props.exercise.item;
    let dd = '' + new Date(parseInt(uid, 10)).getDate();
    let m = '' + (new Date(parseInt(uid, 10)).getMonth() + 1);
    const yyyy = new Date(parseInt(uid, 10)).getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    return (dd + '/' + m + '/' + yyyy);
  }

  render() {
    const { amount } = this.props.exercise.item.val;
    const { measure } = this.props;

    return (
        <TouchableOpacity
          onLongPress={() =>
          this.props.exerciseChanged({ prop: 'modalDeleteRecord', value: true })}
        >
          <View style={styles.containerStyle}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.titleStyle}>
                  {this.formatDate()}
                </Text>
            </View>
            <View style={styles.measureFormatContainer}>
                <Text style={{ color: '#fff' }}>
                  {amount}{' '}
                </Text>
                <Text style={{ color: '#fff' }}>
                  {measure}
                </Text>
                {console.log(this.props.exercise.item.uid)}
            </View>
            <ModalDeleteRecordItem
              exerciseName={this.props.exerciseName}
              exerciseId={this.props.exercise.item.uid}
            />
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
  columnStyle: {
    alignItems: 'center',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold'
  },
  measureFormatContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
};

const mapStateToProps = state => {
  return {
    modal: state.studentHome.modalDeleteRecord
  };
};

export default connect(mapStateToProps, { exerciseChanged })(ExerciseItem);
