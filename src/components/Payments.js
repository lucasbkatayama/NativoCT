import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
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
import PaymentItem from './PaymentItem';

class Payments extends Component {
  componentWillMount() {
    this.props.classesFetch();
  }

  render() {
    return (
      <LinearGradient colors={['#111E6C', '#0e4d92', '#6cff47']} style={styles.containerStyle}>
        <ScrollView style={{ paddingBottom: 10 }}>

          <Header
            centerComponent={{ text: 'Pagamentos', style: { fontSize: 18, color: '#fff' } }}
            outerContainerStyles={{ height: 75, borderBottomWidth: 0 }}
            backgroundColor='rgba(0, 0, 0, 0)'
            leftComponent={{
              icon: 'chevron-left',
              type: 'octicon',
              color: '#fff',
              onPress: () => Actions.pop(),
             }}
          />

          <View style={styles.flatListContainerStyle}>
            <FlatList
              data={this.props.bills}
              renderItem={(e) => <PaymentItem classes={e} />}
              keyExtractor={bills => bills.uid}
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
  const bills = _.map(state.studentHome.perfil.bills, (val, uid) => {
    return { ...val, uid };
  });

  return {
    bills,
  };
};

export default connect(mapStateToProps, {
  authChanged,
  exerciseChanged,
  perfilFetch,
  classesFetch
 })(Payments);
