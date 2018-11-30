import React, { Component } from 'react';
import { Text, View } from 'react-native';

class PaymentItem extends Component {
  state = { color: '#fff' };

  componentDidMount() {
    switch (this.props.classes.item.status) {
      case 'Atrasado':
        this.setState({ color: 'red' });
        break;
      case 'Pago':
        this.setState({ color: 'green' });
        break;
      default:
        this.setState({ color: '#fff' });
        break;
    }
  }

  dateFormat(date) {
    let dd = '' + new Date(parseInt(date, 10)).getDate();
    let m = '' + (new Date(parseInt(date, 10)).getMonth() + 1);
    const yyyy = new Date(parseInt(date, 10)).getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    if (!isNaN(dd)) return (dd + '/' + m + '/' + yyyy);
    return ('--/--/----');
  }

  render() {
    const { uid, pay_date, status, value } = this.props.classes.item;
    return (
      <View>

        <View style={styles.containerStyle}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.titleStyle}>
              {'Data de Vencimento: '}{this.dateFormat(uid)}
            </Text>
            <Text style={[styles.titleStyle, { fontWeight: 'bold' }]}>
              {'Valor: ' + value + ',00'}
            </Text>
          </View>

          <Text style={styles.titleStyle}>
            {'Data do Pagamento: '}{this.dateFormat(pay_date)}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titleStyle}>{'Situação: '}</Text>
            <Text style={{ color: this.state.color, fontWeight: 'bold' }}>
              {status}
            </Text>
          </View>

        </View>

      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderRadius: 5,
    padding: 10,
    flex: 1,
    elevation: 2,
    marginBottom: 10
  },
  titleStyle: {
    color: 'white'
  }
};

export default PaymentItem;
