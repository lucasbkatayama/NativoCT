import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Modal, View } from 'react-native';
import {
  Button,
  FormValidationMessage,
  FormLabel,
  FormInput,
} from 'react-native-elements';

import { exerciseChanged, addRecord, perfilFetch } from '../../actions';

class ModalEditExercises extends Component {
  onButtonPress() {
    const { exerciseName, amount, uid } = this.props;
    this.props.addRecord({ exerciseName, amount, uid });
  }

  renderButton() {
    if (this.props.load) {
      return (
        <Button
          backgroundColor='red'
          loading
          rounded
        />
      );
    }
    return (
      <Button
        title='CADASTRAR'
        backgroundColor='red'
        onPress={this.onButtonPress.bind(this)}
        rounded
      />
    );
  }

  render() {
    return (
      <Modal
          transparent
          visible={this.props.modal}
          onRequestClose={() =>
            this.props.exerciseChanged({ prop: 'editExerciseModal', value: false })}
      >
          <View style={styles.modalContainerStyle}>
            <View style={styles.modalStyle}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.modalTitleTextStyle}>
                    Nova Anotação
                </Text>
              </View>
              <FormLabel>Número de Repetições/Distância/Carga</FormLabel>
                  <FormInput
                    containerStyle={styles.inputStyle}
                    value={this.props.amount}
                    keyboardType='numeric'
                    onChangeText={value =>
                      this.props.exerciseChanged({ prop: 'amount', value })}
                  />
              <FormValidationMessage>{this.props.erro}</FormValidationMessage>
              {this.renderButton()}
              <Button
                title='Cancelar'
                backgroundColor='#ccc'
                buttonStyle={{ marginTop: 5 }}
                onPress={() =>
                  this.props.exerciseChanged({ prop: 'editExerciseModal', value: false })}
                rounded
              />
            </View>
          </View>
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
  modalStyle: {
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'space-around',
    borderRadius: 5,
    width: 300,
    paddingBottom: 10
  },
  modalTitleTextStyle: {
    fontSize: 16,
    color: '#888',
    margin: 20
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
};

const mapStateToProps = state => {
  return {
    amount: state.studentHome.amount,
    measure: state.studentHome.measure,
    modal: state.studentHome.editExerciseModal,
    perfil: state.studentHome.perfil,
    uid: state.auth.user.user.uid,
    erro: state.studentHome.erro,
    load: state.studentHome.load,
  };
};

export default connect(mapStateToProps, {
  exerciseChanged, addRecord, perfilFetch
})(ModalEditExercises);
