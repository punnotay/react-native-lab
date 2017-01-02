import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

import Login from './login';
import AuthService from './AuthService';
import AppContainer from './AppContainer';

export default class GithubBrowser extends Component {
  constructor(props){
    super(prop);
    this.state = {
      isLoggedIn: false,
      chekingAuth: true 
    };
  }

  componentDidMount() {
    AuthService.getAuthInfo( (err, authoInfo) => {
      this.setState({
        chekingAuth: false;
        isLoggedIn: authoInfo !== null
      });
    });
  }

  render() {
    if (this.state.chekingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
              animating={true}
              size="large"
              style={styles.loading}
            / >
        </View>
      );
    }
    if (this.state.isLoggedIn){
      return(
        <AppContainer />
      );
    } else {
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
  }

  onLogin() {
    this.setState({isLoggedIn: true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
