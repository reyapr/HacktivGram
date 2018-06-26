import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import query from '../components/Query'

const comment = {
    update: gql`
    mutation updateComment($updateComment: newComment, $commentId: ID!) {
        updateComment(updatedComment: $updateComment, commentId: $commentId){
            content
        }
    }
    `,
    delete: gql`
        mutation deleteComment($postId: ID!, $commentId: ID!){
            deleteComment(postId: $postId, commentId: $commentId)
        }
    `
}

class DetailComment extends Component {
	constructor(){
		super()
		this.state = {
			content:'',
		}
    }
    
    componentDidMount(){
        let comment = this.props.navigation.getParam('comment')
        this.setState({
            content:comment.content
        })
    }

	 updateComment = async () => {
		let { content } = this.state
		let comment = this.props.navigation.getParam('comment')
		try{
			let result = await this.props.updateComment({
				variables: { 
					updateComment: {
						content,
					},
					commentId: comment._id
				},
				refetchQueries: [{ query }]
			})
			if(result.data.updateComment){
				this.props.navigation.navigate('Home')
			}
		}catch(err){
			console.log(err)
		}
	}

	deleteComment = async () => {
		let comment = this.props.navigation.getParam('comment')
		let postId = this.props.navigation.getParam('postId')
		try{
			let result = await this.props.deleteComment({
				variables: { 
                    commentId: comment._id,
                    postId,
                },
				refetchQueries: [{ query }]
			})
			if(result.data.deleteComment){
				this.props.navigation.navigate('Home')
			}
		}catch(err){
			console.log(err)
		}
    }

	render(){
		const { navigation } = this.props
		const comment = navigation.getParam('comment')
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
							{ comment.userId.name }
						</Text>
						<TextInput
							style={styles.input}
							value={this.state.content}
							onChangeText={content => this.setState({content})}
							placeholder="Input here..."
							onSubmitEditing = {this.newLine}
							underlineColorAndroid='transparent'
							multiline={ true }
						/>
					</View>
                    <TouchableOpacity onPress={ this.updateComment } style={ styles.btnStyle }  >
                        <Text style={{ color:'white' }} >
                            Update
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.deleteComment } style={ styles.delBtnStyle }  >
                        <Text style={{ color:'white' }}  >
                            Delete
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
		width: '70%',
		paddingHorizontal: 10,
		borderRadius: 4,
		borderColor: '#ccc',
		borderWidth: 1,
		fontSize: 16,
		textAlignVertical: "top",
        backgroundColor: 'white',
	},
	btnStyle: {
		margin: 15,
		height: 40,
		width: '90%',
		borderColor: '#ccc',
		borderWidth: 1,
		alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        backgroundColor:'green'
	},
	delBtnStyle: {
		margin: 15,
		height: 40,
		width: '90%',
		borderColor: '#ccc',
		borderWidth: 1,
		alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        backgroundColor:'red',
	},
});
	
export default compose(
    graphql(comment.update,{
        name: 'updateComment'
    }),
    graphql(comment.delete,{
        name:'deleteComment'
    })
)(DetailComment)