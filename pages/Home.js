import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
		View,
		ActivityIndicator,
		StatusBar,
		ScrollView,
		FlatList,
		RefreshControl,
} from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ListPost from '../components/ListPost'
import Footer from '../components/Footer'

const posts = gql`
		query posts{
			posts{
				_id
				content
				image
				like{
					_id
					name
				}
				comment{
					_id
					content
					userId{
						_id
						name
					}
				}
				userId{
					email
					name
					_id
				}
			}
		}
	`


class Home extends Component {
	constructor(){
		super()
		this.state = {
			refreshing: false
		}
	}

	onRefresh = () => {
		this.setState({refreshing: true});
		this.props.data.refetch().then(res=>{
			this.setState({refreshing: false});
		})
	}


	render(){
		const { loading, posts } = this.props.data
		const { navigation } = this.props
		if(loading){
			return (
				<View style={ styles.container } >
					<ActivityIndicator />
					<StatusBar barStyle="default" />
				</View>
			)
		}else{
			return (
				<View style={{ flex: 1,  backgroundColor: '#F5FCFF' }}>

					<ScrollView
						refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh}
						/>
						}
					>

					<FlatList
						data = { posts } 
						keyExtractor = { item => item._id }
						renderItem = { ({ item }) => <ListPost post= { item }  navigation = { navigation } /> }
					/>
					

					</ScrollView>

					<Footer navigation = { navigation }  />

				</View>

			)
		}
	}
}

export default graphql(posts)(Home)

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
		}
  });