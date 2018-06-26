import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView
} from 'react-native'
import Footer from '../components/Footer'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import axios from 'axios'
import query from '../components/Query'
import queryProfile from '../components/QueryProfile'

const addPost = gql`
	mutation addPost($addPost: newPost) {
		addPost(newPost: $addPost){
			content
			image
		}
	}
`

class AddPost extends Component {
	constructor(){
		super()
		this.state = {
			content: ''
		}
	}

	addPost =  async () => {
		let { content } = this.state
		let image = this.props.navigation.getParam('image')
		let formData = new FormData();
		formData.append('image', {
			uri: image,
			type: 'image/jpeg', // or photo.type
			name: 'gramImg.jpg'
		  });
		try{
			let imgSuccess = await axios.post(`http://35.240.229.31/upload`,formData)
			if(imgSuccess){
				let result = await this.props.mutate({
					variables: { 
						addPost: {
							content,
							image: imgSuccess.data.link
						}
					},
					refetchQueries: [{ query },{ query: queryProfile }]
					
				})
				if(result.data.addPost){
					this.props.navigation.navigate('Home')
				}
			}
		}catch(err){
			console.log(err)
		}
	}

	newLine = () => {
		let postText = this.state.content
		postText += '\n'
		this.setState({content: postText})
	}

	render(){
		const { navigation } = this.props
		const image = navigation.getParam('image')
		const back = navigation.getParam('back')
		return (
      	<View style={{ flex: 1,  backgroundColor: '#F5FCFF' }}>
			<ScrollView>
				<View style={styles.container}>

					<Image
						style = {{ 
							width:'100%',
							height:400,
							resizeMode: Image.resizeMode.contain, 
						}} 
						source = {{ uri: image }}

					/>

					<TextInput
						style={styles.input}
						value={this.state.content}
						onChangeText={content => this.setState({content})}
						placeholder="Input here..."
						onSubmitEditing = {this.newLine}
						underlineColorAndroid='transparent'
						multiline={ true }
					/>

					<TouchableOpacity onPress={ this.addPost } style={ styles.btnStyle }  >
						<Text>
							Add
						</Text>
					</TouchableOpacity>


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
		justifyContent: 'center'
	},
	});
	
export default graphql(addPost)(AddPost)