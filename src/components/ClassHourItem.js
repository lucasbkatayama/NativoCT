import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormValidationMessage } from 'react-native-elements';
import { Text, View, TouchableOpacity, Modal } from 'react-native';

import { markClass } from '../actions';

class ClassHourItem extends Component {
  state = { alertModal: false, error: '' };

  onRowPress() {
    const { alertModal } = this.state;

    if (alertModal) this.setState({ alertModal: false });
    else this.setState({ alertModal: true });
  }

  render() {
    const { uid, students_limit, students_total } = this.props.hour;

    return (
      <View>
        <TouchableOpacity onPress={this.onRowPress.bind(this)}>
          <View style={styles.containerStyle}>

            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
                <Text style={styles.titleStyle}>
                  {uid}
                </Text>
              </View>

              <View style={{ flex: 2 }} />
              <View style={styles.numberContainerStyle}>
                <Text style={styles.titleStyle}>
                  {students_total + '/' + students_limit}
                </Text>
              </View>
          </View>
        </TouchableOpacity>

        <Modal
            transparent
            visible={this.state.alertModal}
            onRequestClose={() => this.setState({ alertModal: false })}
        >
          <View style={styles.modalContainerStyle}>
            <View style={styles.modalStyle}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.modalTitleTextStyle}>
                  Alerta
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Deseja mesmo marcar treino às {uid}?
                </Text>
              </View>
              <FormValidationMessage>{this.state.error}</FormValidationMessage>
              <Button
                title='OK'
                disabled={this.state.disableDelete}
                buttonStyle={{ marginTop: 5 }}
                backgroundColor='red'
                rounded
                onPress={() => {
                  const hour = uid;
                  const { name, availableDays } = this.props.perfil;
                  const { date, id } = this.props;
                  if (availableDays > 0) {
                    this.props.markClass(id, date, hour, students_total, name, availableDays);
                  } else this.setState({ error: 'Você não possuí mais dias disponíveis.' });
                }}
              />
              <Button
                title='Cancelar'
                buttonStyle={{ marginTop: 5 }}
                backgroundColor='#ccc'
                rounded
                onPress={() => {
                  this.setState({ alertModal: false, error: '' });
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderRadius: 5,
    height: 60,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold'
  },
  numberContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
    paddingBottom: 10,
    width: 275
  },
  modalTitleTextStyle: {
    fontSize: 16,
    color: '#888',
    margin: 20
  }
};

const mapStateToProps = state => {
  return {
    id: state.auth.user.user.uid,
    perfil: state.studentHome.perfil
  };
};

export default connect(mapStateToProps, {
  markClass
})(ClassHourItem);
