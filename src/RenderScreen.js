import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Login from './components/Login';
import RouterNormal from './RouterNormal';

class RenderScreen extends Component {
  renderScreens() {
    if (this.props.user != null) return <RouterNormal />;
    return <Login />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderScreens()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(RenderScreen);
