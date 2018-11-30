import React, { Component } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Header, Button } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { authChanged } from '../actions';
import Box from './common/Box';

class StudentEditProfile extends Component {
  exitApp() {
    firebase.auth().signOut();
    this.props.authChanged({ prop: 'user', value: null });
  }

  mensalText(family_plan) {
    switch (family_plan) {
      case 'contribuinte':
        return 'Plano Familiar (Contribuinte)';
      case 'beneficiario':
        return 'Plano Familiar (Beneficiário)';
      default:
        return 'Não possui plano familiar';
    }
  }

  render() {
    const { s_email, name, phone, days, payPlan, family_plan, status, uid } = this.props.perfil;

    return (
      <LinearGradient colors={['#3f704d', '#4682b4', '#7ef9ff']} style={{ flex: 1 }}>
        <View>
          <Header
            centerComponent={{ text: 'CONFIGURAÇÕES', style: { fontSize: 18, color: '#fff' } }}
            leftComponent={{
              icon: 'chevron-left',
              type: 'octicon',
              color: '#fff',
              onPress: () => Actions.pop(),
             }}
            outerContainerStyles={{ height: 75, borderBottomWidth: 0 }}
            backgroundColor='rgba(0, 0, 0, 0)'
          />

          <Box icon={'person'} content={name} uid={uid} selected={'name'} editable />

          <Box icon={'email'} content={s_email} />

          <Box icon={'phone'} content={phone} uid={uid} selected={'phone'} editable />

          <Box icon={'today'} content={'Plano ' + payPlan + ', ' + days + ' vezes por semana'} />

          <Box icon={'people'} content={this.mensalText(family_plan)} />

          <Box icon={'payment'} content={'Em aberto'} />

          <Box icon={'info'} content={status} uid={uid} selected={'status'} editable />

          <Button
            title='SAIR'
            rounded
            backgroundColor='red'
            onPress={this.exitApp.bind(this)}
            buttonStyle={{ marginTop: 20 }}
          />

        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    perfil: state.studentHome.perfil
  };
};

export default connect(mapStateToProps, { authChanged })(StudentEditProfile);
