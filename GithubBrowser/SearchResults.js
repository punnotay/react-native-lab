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

export class SearchResults extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(['A','B','C']),
            showProgress: true,
            searchQuery: props.searchQuery
        }
    }

    componentDidMount() {
        this.doSearch();
    }

    renderRow(rowData) {
        return ( 
            <View style={styles.container}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '600'
                }}>
                    {rowData.full_name}
                </Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    marginTop: 20
                }}>
                    <View style={styles.repoCell}>
                        <Image source={require('image!star')} 
                            style={styles.repoCellIcon}/>
                        <Text style={styles.reportCellLabel}>
                            {rowData.stargazers_count}
                        </Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Image source={require('image!fork')} 
                            style={styles.repoCellIcon}/>
                        <Text style={styles.reportCellLabel}>
                            {rowData.forks}
                        </Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Image source={require('image!issues2')} 
                            style={styles.repoCellIcon}/>
                        <Text style={styles.reportCellLabel}>
                            {rowData.open_issues}
                        </Text>
                    </View>
                </View>
            </View>
            
        );
    }

    doSearch() {
        //console.log(`Searching for: ${this.state.searchQuery}`)
        const url = 'https://api.github.com/search/repositories?q' + 
                encodeURIComponent(this.state.searchQuery);
        fetch(url)
            .then(resp => resp.json())
            .then(responseData => {
                this.setState({
                    repositories: responseData.repositories,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.items)
                })
            })
            .finally(() => {
                this.setState({
                    showProgress: false
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
    padding: 20,
    borderColor: '#d7d7d7',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
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
  },
  repoCell: {
      width:50,
      alignItems: 'center'
  },
  repoCellIcon: {
      width: 20,
      height: 20
  },
  reportCellLabel: {
      textAlign: 'center'
  }
});
