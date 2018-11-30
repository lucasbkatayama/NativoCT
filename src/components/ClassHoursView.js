import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import {
  Header,
} from 'react-native-elements';
import { LinearGradient } from 'expo';

import ClassHourItem from './ClassHourItem';
import { TableDivision } from './common';

class ClassHoursView extends Component {

  dateFormat() {
    const { uid } = this.props.classInfo;
    let dd = '' + new Date(parseInt(uid, 10)).getDate();
    let m = '' + (new Date(parseInt(uid, 10)).getMonth() + 1);
    const yyyy = new Date(parseInt(uid, 10)).getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    return (dd + '/' + m + '/' + yyyy);
  }

  renderHours(hours) {
    const hour = _.map(hours, (val, uid) => {
      return { ...val, uid };
    });
    return hour.map((item, index) =>
       <ClassHourItem date={this.props.classInfo.uid} hour={item} key={index} />
    );
  }

  render() {
    const { classInfo } = this.props;

    return (
      <LinearGradient colors={['#111E6C', '#0e4d92', '#6cff47']} style={styles.containerStyle}>
        <ScrollView style={{ paddingBottom: 10 }}>

          <Header
            centerComponent={{ text: this.dateFormat(), style: { fontSize: 18, color: '#fff' } }}
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
              Escolha um horário
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TableDivision title='Horário' style={{ flex: 1, alignItems: 'flex-start' }} />
            <TableDivision title='Nº Alunos' flex={1} style={{ alignItems: 'flex-end' }} />
          </View>

          <View style={styles.flatListContainerStyle}>
            {this.renderHours(classInfo.hours)}
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

export default ClassHoursView;
