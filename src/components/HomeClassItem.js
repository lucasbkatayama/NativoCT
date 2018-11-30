import React, { Component } from 'react';
import { Text, View } from 'react-native';

class HomeClassItem extends Component {
  dateFormat() {
    const { uid } = this.props.train.item;
    let dd = '' + new Date(parseInt(uid, 10)).getDate();
    let m = '' + (new Date(parseInt(uid, 10)).getMonth() + 1);
    const yyyy = new Date(parseInt(uid, 10)).getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    return (dd + '/' + m + '/' + yyyy);
  }

  render() {
    const { hour } = this.props.train.item;

    return (
      <View style={styles.containerStyle}>

        <View style={styles.textContainerStyle}>
            <Text style={styles.titleStyle}>
              {this.dateFormat()}
            </Text>
        </View>

        <View style={styles.textContainerStyle}>
            <Text style={styles.titleStyle}>
              {hour}
            </Text>
        </View>

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
    elevation: 2,
    marginBottom: 10
  },
  textContainerStyle: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row'
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold'
  }
};

export default HomeClassItem;
