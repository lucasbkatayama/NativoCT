import React, { Component } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { exerciseChanged, deleteExerciseRecord } from '../../actions';

class ModalDeleteRecordItem extends Component {
  render() {
    return (
      <Modal
          transparent
          visible={this.props.modal}
          onRequestClose={() =>
            this.props.exerciseChanged({ prop: 'modalDeleteRecord', value: false })}
      >
        <TouchableOpacity
          onPress={() =>
            this.props.exerciseChanged({ prop: 'modalDeleteRecord', value: false })}
           style={styles.modalContainerStyle}
        >
          <Button
            title='Excluir Item'
            backgroundColor='#fff'
            color='#000'
            buttonStyle={{ width: 200 }}
            onPress={() => {
              const { exerciseName, user } = this.props;
              const uid = this.props.exerciseId;
              this.props.deleteExerciseRecord({ exerciseName, uid, user });
              this.props.exerciseChanged({ prop: 'modalDeleteRecord', value: false });
            }}
          />
        </TouchableOpacity>
    </Modal>
    );
  }
}

const styles = {
  modalContainerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
};

const mapStateToProps = state => {
  return {
    modal: state.studentHome.modalDeleteRecord,
    user: state.auth.user.user.uid
  };
};

export default connect(mapStateToProps, {
  exerciseChanged, deleteExerciseRecord
})(ModalDeleteRecordItem);
