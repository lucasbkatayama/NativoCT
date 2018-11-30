import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Modal, View, Picker } from 'react-native';
import {
  Button,
  FormValidationMessage,
  FormLabel,
  FormInput
} from 'react-native-elements';

import { exerciseChanged, addExercise } from '../../actions';

class ModalExercises extends Component {
  onButtonPress() {
    const { exerciseName, amount, measure, uid } = this.props;
    this.props.addExercise({ exerciseName, amount, measure, uid });
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
          onRequestClose={() => this.props.exerciseChanged({ prop: 'exerciseModal', value: false })}
      >
          <View style={styles.modalContainerStyle}>
            <View style={styles.modalStyle}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.modalTitleTextStyle}>
                    Adicionar novo Exercício
                </Text>
              </View>
              <FormLabel>Nome do Exercício</FormLabel>
              <FormInput
                placeholder='ex: Barra, Burpe...'
                containerStyle={styles.inputStyle}
                value={this.props.exerciseName}
                onChangeText={value =>
                  this.props.exerciseChanged({ prop: 'exerciseName', value })}
              />
              <FormLabel>Número de Repetições/Distância/Carga</FormLabel>
              <View style={{ flexDirection: 'row', height: 50 }}>
                <View style={{ width: 150 }}>
                  <FormInput
                    value={this.props.amount}
                    placeholder='ex: 250'
                    keyboardType='numeric'
                    containerStyle={styles.inputStyle}
                    onChangeText={value =>
                      this.props.exerciseChanged({ prop: 'amount', value })}
                  />
                </View>
                <View style={{ width: 150 }}>
                  <Picker
                    selectedValue={this.props.measure}
                    onValueChange={value => this.props.exerciseChanged({ prop: 'measure', value })}
                  >
                    <Picker.Item label="Metros" value='m' />
                    <Picker.Item label="Repetições" value='rep' />
                    <Picker.Item label="Quilos" value='Kg' />
                  </Picker>
                </View>
              </View>
              <FormValidationMessage>{this.props.erro}</FormValidationMessage>
              {this.renderButton()}
              <Button
                title='Cancelar'
                backgroundColor='#ccc'
                buttonStyle={{ marginTop: 5 }}
                onPress={() =>
                  this.props.exerciseChanged({ prop: 'exerciseModal', value: false })}
                rounded
              />
            </View>
          </View>
        </Modal>
    );
  }
}

const styles = {
  modalTopContainerStyle: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#555'
  },
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
    paddingBottom: 5,
  },
  modalTitleTextStyle: {
    fontSize: 16,
    color: '#888',
    margin: 15
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
};

const mapStateToProps = state => {
  return {
    exerciseName: state.studentHome.exerciseName,
    amount: state.studentHome.amount,
    measure: state.studentHome.measure,
    modal: state.studentHome.exerciseModal,
    perfil: state.studentHome.perfil,
    uid: state.auth.user.user.uid,
    erro: state.studentHome.erro,
    load: state.studentHome.load
  };
};

export default connect(mapStateToProps, {
  exerciseChanged, addExercise
})(ModalExercises);
