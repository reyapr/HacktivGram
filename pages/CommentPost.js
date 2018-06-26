import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
		TouchableOpacity,
		TextInput,
		Image,
		FlatList,
		AsyncStorage
} from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import query from '../components/Query'
import ListComment from '../components/ListComment'

const comment = {
	add: gql`
		mutation addComment($addComment: newComment, $postId: ID!) {
			addComment(newComment: $addComment, postId: $postId){
				content
		}
		}
	`,
}

class Comment extends Component {
	constructor(){
		super()
		this.state = {
			comment:'',
		}
	}

	comment = async () => {
		const { addComment } = this.props
		const { comment } = this.state
		const post = this.props.navigation.getParam('post')
		try{
			let res = await addComment({
				variables:{
					addComment: {
						content:comment
					},
					postId: post._id
				},
				refetchQueries: [{ query }]
			})
			if(res.data){
				this.props.navigation.navigate('Home')
			}
		}catch(err){
			console.log(err)
		}
	}

	render(){
		const { navigation } = this.props
		const post = navigation.getParam('post')
		let { comment } = post
		const userImg = "https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png"
		return (
			<View style={{ flex: 1,  backgroundColor: '#F5FCFF' }}>

				<View style={{ flex:1 }} >

					<View style={ styles.post } >
						<Image 
							style={{
								width:25,
								height:25,
								marginRight: 5,

							}}
							source={{ uri: userImg }}
						/>
						<Text style={{ fontWeight: 'bold',marginRight: 10 }} >
							{ post.userId.name }
						</Text>
						<Text>
							{ post.content }
						</Text>
					</View>

					<View style={ styles.comment }>
						{
							comment.length!==0?
								<FlatList
									data = { comment } 
									keyExtractor = { item => item._id }
									renderItem = { ({ item }) => <ListComment comment= { item } postId={post._id} navigation = { navigation } /> }
								/>
							:
							<Text>
								
							</Text>
						}
					</View>
					
				</View>

				<View style={{ flexDirection:'row' }} >
					<TextInput
						style={styles.input}
						value={this.state.comment}
						onChangeText={comment => this.setState({comment})}
						placeholder="type here..."
						underlineColorAndroid='transparent'
						multiline={ true }
						blurOnSubmit={false}
					/>
					<TouchableOpacity onPress={ this.comment } style={ styles.btnStyle }  >
							<Text>
								Post
							</Text>
						</TouchableOpacity>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	post:{
		flexDirection:'row', 
		marginLeft: 15, 
		marginTop:10,
		maxHeight: 150,
	},
	comment:{
		flex:1,
		borderWidth:1,
		borderColor:'grey',
		marginTop: 15
	},
	input: {
		margin: 0,
		marginBottom: 0,
		height: 50,
		width: '80%',
		paddingHorizontal: 10,
		borderRadius: 4,
		borderColor: '#ccc',
		borderWidth: 1,
		fontSize: 16,
		textAlignVertical: "top",
		backgroundColor: 'white'
	},
	btnStyle: {
		margin: 0,
		height: 50,
		width: '20%',
		borderColor: '#ccc',
		borderRadius: 4,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'grey'
	},
});
	
export default compose(
	graphql(comment.add,{
		name: 'addComment'
	}),
)(Comment)