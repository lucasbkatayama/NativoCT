import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableHighlight } from 'react-native';

class ClassItem extends Component {
  onRowPress() {
    Actions.classHoursView({ classInfo: this.props.classes.item });
  }

  dateFormat() {
    const { uid } = this.props.classes.item;
    let dd = '' + new Date(parseInt(uid, 10)).getDate();
    let m = '' + (new Date(parseInt(uid, 10)).getMonth() + 1);
    const yyyy = new Date(parseInt(uid, 10)).getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    return (dd + '/' + m + '/' + yyyy);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onRowPress.bind(this)}>

        <View style={styles.containerStyle}>
          <Text style={styles.titleStyle}>
            {this.dateFormat()}
          </Text>
        </View>

      </TouchableHighlight>
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
    elevation: 2,
    marginBottom: 10
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold'
  }
};

export default ClassItem;
