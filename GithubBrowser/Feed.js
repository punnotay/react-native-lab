import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import moment from 'moment';

import PushPayload from './PushPayload';

export class Feed extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(['A','B','C']),
            showProgress: true
        }
    }

    componentDidMount() {
        this.fetchFeed();
    }

    pressRow(rowData) {
        this.props.navigator.push({
            title: 'Push Event',
            component: PushPayload,
            passProps: {
                pushEvent: rowData
            }
        });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.pressRow(rowData)}
                underlayColor='#ddd'
            >
                <View style={styles.rowdata}>
                    <Image 
                        source={{uri: rowData.actor.avatar_url}} 
                        style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18
                        }}
                        />
                    <View style={{ paddingLeft: 20 }}>
                        <Text style={{backgroundColor: '#fff'}}>
                            {moment(rowData.created_at).fromNow()}
                        </Text>
                        <Text style={{backgroundColor: '#fff'}}>
                            {rowData.actor.login}
                        </Text>
                        <Text style={{backgroundColor: '#fff'}}>
                            {rowData.payload.ref.replace('refs/head/', '')}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    fetchFeed() {
        const authService = require('./AuthService');
        const feed = authService.getAuthInfo((err, authInfo) => {
            const url = 'https://api.github.com/users/' + 
                authInfo.user.login + '/received_events';
            fetch(url, {
                header: authInfo.header
            })
            .then((resp) => resp.json())
            .then((respData) => {
                const feedItem = respData.filter(ev => ev.type == 'PushEvent');
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(feedItem),
                    showProgress: false
                });
            })
        });
    }

    render() {
        if(this.state.showProgress){
            return (
                <View style={styles.progress}>
                    <ActivityIndicatorIOS size="large" animating={true} />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <ListView DataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    >
                </ListView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  progress: {
     flex: 1,
    justifyContent: 'center' 
  },
  rowdata: {
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      backgroundColor: '#d7d7d7',
      alignItems: 'center',
      borderBottomWidth: 1
  }
});
