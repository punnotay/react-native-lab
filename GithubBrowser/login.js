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
import buffer from 'buffer';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            showProgress: false
        }
    }
    render() {
        const errCtrl = <View />;

        if (!this.state.success && this.state.badCredentials) {
            errCtrl = <Text style={styles.error}>
                        Wrong username or password!!
                      </Text>;
        }

        if (!this.state.success && this.state.unknownError) {
            errCtrl = <Text style={styles.error}>
                        Unknown error occurred!!
                      </Text>;
        }

        return (
            <View style={styles.container}>
                <Image style={style.logo} source={require('image!Octocat')} />
                <Text style={style.heading}>Github Browser</Text>
                <TextInput style={style.input} placeholder="User Name" 
                    onChangeText={(text) => this.setState({username: text})}/>
                <TextInput style={style.input} placeholder="Password"
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry="true"
                />
                <TouchableHighlight style={styles.button}
                    onPress={this.onLoginPressed.bind(this)}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>

                {errCtrl}

                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loading}
                    / >
            </View>       
        )
    }

    onLoginPressed() {
        console.log(`Login pressed: ${this.state.username}`)
        this.setState({showProgress: true});

        const authService = require('./AuthService');
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results) => {
            this.setState(Object.assign({
                showProgress: false
            }, results));

            if (results.success && this.props.onLogin){
                this.props.onLogin();
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 66,
        height: 60
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec'
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#fff',
        alignSelf: 'center'
    },
    loading: {
        marginTop: 10
    },
    error: {
        color: 'red',
        paddingTop: 10
    }

});