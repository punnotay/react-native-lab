import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import SearchResults from './SearchResults';

export class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchQuery: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={style.input} placeholder="Search Query" 
                    onChangeText={(text) => this.setState({searchQuery: text})}/>
                <TouchableHighlight style={styles.button}
                    onPress={this.onSearchPressed.bind(this)}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
            </View>       
        )
    }

    onSearchPressed() {
        this.props.navigator.push({
            title: 'Results',
            component: SearchResults,
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 100,
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
    }

});