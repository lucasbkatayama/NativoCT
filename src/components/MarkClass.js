import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import {
  Header,
} from 'react-native-elements';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

import {
  authChanged,
  exerciseChanged,
  perfilFetch,
  classesFetch
} from '../actions';
import ClassItem from './ClassItem';

class MarkClass extends Component {
  componentWillMount() {
    this.props.classesFetch();
  }

  render() {
    return (
      <LinearGradient colors={['#111E6C', '#0e4d92', '#6cff47']} style={styles.containerStyle}>
        <ScrollView style={{ paddingBottom: 10 }}>

          <Header
            centerComponent={{ text: 'MARCAR TREINO', style: { fontSize: 18, color: '#fff' } }}
            outerContainerStyles={{ height: 75, borderBottomWidth: 0 }}
            backgroundColor='rgba(0, 0, 0, 0)'
            leftComponent={{
              icon: 'chevron-left',
              type: 'octicon',
              color: '#fff',
              onPress: () => Actions.pop(),
             }}
          />

          <View style={{ margin: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              Escolha uma data
            </Text>
          </View>

          <View style={styles.flatListContainerStyle}>
            <FlatList
              extraData={this.props.updateKey}
              data={this.props.classes}
              renderItem={(e) => {
                if (e.item.uid >= new Date().getTime() - 86400000) {
                  if (!_.includes(this.props.markedClasses, e.item.uid)) {
                    return <ClassItem classes={e} />;
                  }
                }
              }}
              keyExtractor={classes => classes.uid}
            />
          </View>

        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  flatListContainerStyle: {
    margin: 10,
    marginTop: 0
  },
  buttonStyle: {
    elevation: 2,
    width: 150
  },
};

const mapStateToProps = state => {
  const classes = _.map(state.studentHome.classes, (val, uid) => {
    return { ...val, uid };
  });

  let markedClasses = _.map(state.studentHome.perfil.trains, (val, uid) => {
    return { uid };
  });

  markedClasses = markedClasses.map(a => a.uid);

  return {
    perfil: state.studentHome.perfil,
    auth: state.auth.user,
    exerciseName: state.studentHome.exerciseName,
    classes,
    markedClasses,
    updateKey: state.studentHome.updateKey
  };
};

export default connect(mapStateToProps, {
  authChanged,
  exerciseChanged,
  perfilFetch,
  classesFetch
 })(MarkClass);
