import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Platform,
  Keyboard,
  ImageBackground,
  Dimensions,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import {
  loginUser,
  authChanged
} from '../actions';

const IMAGE_WIDTH = Dimensions.get('window').width;

class Login extends Component {
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
    Keyboard.dismiss();
  }

  renderError() {
    if (this.props.error) {
      return (
        <FormValidationMessage>
          {this.props.error}
        </FormValidationMessage>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <Button
          backgroundColor='red'
          loading
          containerViewStyle={{ marginTop: 20 }}
          rounded
        />
      );
    }
    return (
      <Button
        containerViewStyle={{ marginTop: 20 }}
        title='ENTRAR'
        backgroundColor='red'
        onPress={this.onButtonPress.bind(this)}
        rounded
      />
    );
  }

  render() {
    return (
        <ImageBackground
          source={require('../assets/images/loginImage.jpg')}
          style={styles.containerStyle}
        >
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          style={styles.containerStyle}
          extraHeight={Platform.select({ android: 200 })}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.logoStyle}>
            <Image
              source={require('../assets/images/logonativo.png')}
            />
          </View>

          <View style={styles.formContainerStyle}>
            <FormLabel>Email</FormLabel>
            <FormInput
              onChangeText={value => this.props.authChanged({ prop: 'email', value })}
              value={this.props.email}
              autoCapitalize='none'
              containerStyle={styles.inputStyle}
            />

            <FormLabel>Senha</FormLabel>
            <FormInput
              secureTextEntry
              onChangeText={value => this.props.authChanged({ prop: 'password', value })}
              value={this.props.password}
              containerStyle={styles.inputStyle}
            />

            {this.renderError()}

            {this.renderButton()}
          </View>
        </KeyboardAwareScrollView>

      </ImageBackground>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    width: IMAGE_WIDTH
  },
  formContainerStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    elevation: 2,
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderRadius: 5
  },
  logoStyle: {
    alignItems: 'center',
    marginTop: 30
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    status: state.auth.status,
  };
};

export default connect(mapStateToProps, {
  loginUser, authChanged
})(Login);
