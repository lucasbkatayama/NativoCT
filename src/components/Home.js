import React, { Component } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import {
  Button,
  Header,
  Text,
} from 'react-native-elements';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

import {
  authChanged,
  exerciseChanged,
  perfilFetch,
  classesFetch
} from '../actions';

import ModalExercises from './modals/ModalExercises';
import ExerciseItem from './ExerciseItem';
import HomeClassItem from './HomeClassItem';

class Home extends Component {
  state = { content: true, payment: '', color: '#fff' };

  componentWillMount() {
    this.props.perfilFetch(this.props.auth.user.uid);
    this.props.classesFetch();

    const today = new Date();
    const day = today.getDate();
    let year = today.getFullYear();
    let month = today.getMonth();

    if (month + 1 === 12 && day < 10) {
      month = 0;
      year++;
    } else month++;

    const expiration_date = new Date(year, month, 10).getTime();
    const payments = _.map(this.props.perfil.bills);
    const status = this.props.perfil.bills[expiration_date].status;

    if (payments.some(a => { return a.status === 'Atrasado'; })) {
      this.setState({ payment: 'ATRASADO', color: 'red' });
    } else if (status === 'Em aberto') this.setState({ payment: status, color: '#fff' });
    else this.setState({ payment: 'PAGO', color: 'green' });
  }

  renderContent() {
    if (this.state.content) {
      return (
        <View>
          <View style={styles.flatListContainerStyle}>
            <FlatList
              extraData={this.props.updateKey}
              data={this.props.trains}
              renderItem={(e) => {
                if (e.item.uid >= new Date().getTime() - 86400000) {
                return <HomeClassItem key={this.props.updateKey} train={e} />;
                }
              }}
              keyExtractor={trains => trains.uid}
            />
          </View>
          <Button
            icon={{ name: 'plus', type: 'octicon' }}
            backgroundColor='rgba(0, 0, 0, 0)'
            onPress={() => Actions.markClass()}
          />
        </View>
      );
    } return (
      <View>
        <View style={styles.flatListContainerStyle}>
          <FlatList
            extraData={this.props.updateKey}
            data={this.props.exercises}
            renderItem={(e) => <ExerciseItem key={this.props.updateKey} exercise={e} />}
            keyExtractor={exercise => exercise.uid}
          />
        </View>
        <Button
          icon={{ name: 'plus', type: 'octicon' }}
          backgroundColor='rgba(0, 0, 0, 0)'
          onPress={() => this.props.exerciseChanged({ prop: 'exerciseModal', value: true })}
        />
      </View>
    );
  }

  render() {
    return (
      <LinearGradient colors={['#111E6C', '#0e4d92', '#6cff47']} style={styles.containerStyle}>
        <ScrollView style={{ paddingBottom: 10 }}>
        <Header
          centerComponent={{ text: 'INÍCIO', style: { fontSize: 20, color: '#fff' } }}
          rightComponent={{
            icon: 'gear',
            type: 'font-awesome',
            color: '#fff',
            onPress: () => Actions.studentEditProfile()
          }}
          outerContainerStyles={{ height: 75, borderBottomWidth: 0 }}
          backgroundColor='rgba(0, 0, 0, 0)'
        />
        <Header
          centerComponent={{
            text: this.props.perfil.name,
            style: { fontWeight: '400', fontSize: 22, color: '#fff' } }}
          backgroundColor='rgba(0, 0, 0, 0)'
          outerContainerStyles={{ borderBottomWidth: 0, height: 70, marginBottom: 20 }}
        />
      <View style={{ height: 60, flexDirection: 'row', marginBottom: 10 }}>

          <TouchableOpacity
            onPress={() => Actions.payments()}
            style={styles.infoContainerStyle}
          >
            <Text style={{ color: this.state.color, fontWeight: 'bold' }}>
              {this.state.payment}
            </Text>
            <Text style={{ color: '#fff', fontSize: 12 }}>PAGAMENTO</Text>
          </TouchableOpacity>

          <View
            style={[styles.infoContainerStyle,
            { borderLeftWidth: 1, borderLeftColor: '#fff' }]}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              {this.props.perfil.availableDays}
            </Text>
            <Text style={{ color: '#fff', fontSize: 12 }}>DIAS DISPONÍVEIS</Text>
          </View>

        </View>

        <View style={styles.buttonContainerStyle}>
          <Button
            title='TREINO'
            buttonStyle={{ elevation: 2, width: 150 }}
            backgroundColor='#000080'
            disabled={this.state.content}
            disabledStyle={styles.disabledButtonStyle}
            rounded
            onPress={() => this.setState({ content: true })}
          />
          <Button
            rounded
            disabled={!this.state.content}
            disabledStyle={styles.disabledButtonStyle}
            title='EXERCÍCIOS'
            backgroundColor='#000080'
            buttonStyle={{ elevation: 2, width: 150 }}
            onPress={() => this.setState({ content: false })}
          />
        </View>

        {this.renderContent()}
      </ScrollView>
      <ModalExercises />
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
  flatListContainerStyle: {
    margin: 10,
    marginTop: 0
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  buttonStyle: {
    elevation: 2,
    width: 150
  },
  disabledButtonStyle: {
    backgroundColor: '#0F52BA',
    borderWidth: 1,
    borderColor: '#fff'
  },
  infoContainerStyle: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerMiddleStyle: {
    paddingLeft: 15,
    elevation: 2,
    paddingBottom: 5,
    backgroundColor: '#fff'
  },
};

const mapStateToProps = state => {
  const exercises = _.map(state.studentHome.perfil.exercises, (val, uid) => {
    return { ...val, uid };
  });

  const trains = _.map(state.studentHome.perfil.trains, (val, uid) => {
    return { ...val, uid };
  });

  return {
    perfil: state.studentHome.perfil,
    auth: state.auth.user,
    exerciseName: state.studentHome.exerciseName,
    exercises,
    trains,
    updateKey: state.studentHome.updateKey
  };
};

export default connect(mapStateToProps, {
  authChanged,
  exerciseChanged,
  perfilFetch,
  classesFetch
 })(Home);
