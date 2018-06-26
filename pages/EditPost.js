import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
	TouchableOpacity,
	TextInput,
	Image,
	ScrollView
} from 'react-native'
import Footer from '../components/Footer'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Card } from 'react-native-elements'
import query from '../components/Query'

const post = {
    update: gql`
    mutation updatePost($updatePost: newPost, $postId: ID!){
        updatePost(updatedPost: $updatePost, postId: $postId){
			content
			image
        }
    }
    `,
    delete: gql`
        mutation deletePost($postId: ID!){
			deletePost(postId: $postId)
        }
		`,
}

class EditPost extends Component {
	constructor(){
		super()
		this.state = {
			content:'',
			image:''
		}
	}


	updatePost = async () => {
		let { content, image } = this.state
		let post = this.props.navigation.getParam('post')
		try{
			let result = await this.props.updatePost({
				variables: { 
					updatePost: {
						content: content,
						image: post.image
					},
					postId: post._id
				},
				refetchQueries: [{ query }]
			})
			if(result.data.updatePost){
				this.props.navigation.navigate('Home')
			}
		}catch(err){
			console.log(err)
		}
	}

	deletePost = async () => {
		let post = this.props.navigation.getParam('post')
	
		try{
			let result = await this.props.deletePost({
				variables: { 
					postId: post._id
				},
				refetchQueries: [{ query }]
			})
			if(result.data.deletePost){
				this.props.navigation.navigate('Home')
			}
		}catch(err){
			console.log(err)
		}
	}

	componentDidMount(){
		let post = this.props.navigation.getParam('post')
		this.setState({
			content: post.content,
		})
	}

	render(){
		const { navigation } = this.props
		const post = navigation.getParam('post')
		const { image } = post
		console.log(post.image)
		return (
			<View style={{ flex: 1,  backgroundColor: '#F5FCFF' }}>
				<ScrollView>
				<View style={{ flex: 1}}>
					<Image
						style = {{ 
							width: 350,
							height:350,
							resizeMode: Image.resizeMode.contain,
							alignSelf:'center'
						}} 
						source = {{ uri: image }}

					/>
					
					<View style={{alignItems:'center'}}>
						<TextInput
							style={styles.input}
							value={this.state.content}
							onChangeText={content => this.setState({content})}
							placeholder="Input here..."
							onSubmitEditing = {this.newLine}
							underlineColorAndroid='transparent'
							multiline={ true }
						/>

						<TouchableOpacity onPress={ this.updatePost } style={ styles.btnStyle }  >
							<Text style={{ color:'white' }} >
								Update
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={ this.deletePost } style={ styles.deleteBtnStyle }  >
							<Text style={{ color:'white' }} >
								Delete
							</Text>
						</TouchableOpacity>
					</View>

				</View>
				</ScrollView>

					<Footer navigation = { navigation }  />

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
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	input: {
		margin: 15,
		marginBottom: 0,
		height: 150,
		width: '80%',
		paddingHorizontal: 10,
		borderRadius: 4,
		borderColor: '#ccc',
		borderWidth: 1,
		fontSize: 16,
		textAlignVertical: "top"
	},
	btnStyle: {
		margin: 15,
		height: 40,
		width: '80%',
		borderColor: '#ccc',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius:5,
        backgroundColor:'green'
	},
	deleteBtnStyle: {
		margin: 15,
		height: 40,
		width: '80%',
		borderColor: '#ccc',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius:5,
        backgroundColor:'red'
	},
});
	
export default compose(
	graphql(post.update,{
		name: 'updatePost'
	}),
	graphql(post.delete, {
		name: 'deletePost'
	}),
)(EditPost)