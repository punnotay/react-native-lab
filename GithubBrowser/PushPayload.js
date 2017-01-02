import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Image,
  StyleSheet
} from 'react-native';

import moment from 'moment';

export class PushPayload extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds
    
        }
    }

    renderRow(rowData) {
        return (
            <View style={styles.rowdata}>
                <Text>{rowData.sha.substring(0,6)} - {rowData.message}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={{uri: this.state.pushEvent.actor.avalat_url}}
                    style={styles.img}
                />
                <Text style={styles.content}>
                    {moment(this.state.pushEvent.created_at).fromNow()}
                </Text>
                <Text style={styles.bold}>
                    {this.state.pushEvent.actor.login}
                </Text>
                <Text style={styles.bold}>
                    {this.state.pushEvent.payload.ref.replace('refs/head/', '')}
                </Text>
                 <Text style={{
                     paddingTop: 40,
                     fontSize: 20
                    }}>
                    {this.state.pushEvent.payload.commit.length} commits
                </Text>
                <ListView
                    contentInset={{top: -50}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 80,
    alignItems: 'center'
  },
  img: {
      height: 120,
      width: 120,
      borderRedius: 60
  },
  content: {
      paddingTop: 20,
      paddingBottom: 20,
      fontSize: 20
  },
  rowdata: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#d7d7d7',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    //paddingTop: 20,
    paddingBottom: 20,
    padding: 10
  },
  bold: {
      fontSize: 16,
      fontWeight: '800'
  }
  
});
