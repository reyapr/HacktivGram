import React, { Component } from 'react'
import {
    View,
    Text,
    AsyncStorage,
		TouchableOpacity,
		Image,
		StyleSheet
} from 'react-native'
import { Icon } from 'react-native-elements'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import query from '../components/Query'

const isLike = gql`
	mutation likePost($postId: ID!){
		like(postId: $postId)
	}
`

class ListPost extends Component{
    constructor(){
        super()
        this.state ={ 
						userId:'',
						like:false,
        }
    }

    async componentDidMount(){
				let { post } = this.props
				
        try{
						let id = await AsyncStorage.getItem('userId')
						let isUser = post.like.find(isUser=>{
							if(isUser._id==id){
								return id
							}
						})
						if(isUser) this.setState({ like:true })
            this.setState({ userId: id })
        }catch(err){
            console.log(err)
        }
    }

    detail = () => {
        this.props.navigation.navigate('EditPost',{
            postId:this.props.post._id,
            post: this.props.post
        })
		}
		
		like = async () => {
			let { mutate,post } = this.props
			try{
				let res = await mutate({
					variables:{
						postId: post._id
					},
					refetchQueries: [{ query }]
				})
				if(res.data.like==='true'){
					this.setState({ like: true })
				}else{
					this.setState({ like: false })
				}
			}catch(err){
				console.log(err)
			}
		}

		comment = () => {
			this.props.navigation.navigate('CommentPost', {
				postId:this.props.post._id,
				post: this.props.post
			})
		}

    render(){
        const { post, navigation } = this.props
				const { userId, totalLike, like, totalComment } = this.state
				let lastComment = post.comment[post.comment.length-1]
				let twoLastComment = post.comment[post.comment.length-2]
				const userImg = "https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png"
        return (
					<View>
						<View style={ styles.card } >
							<View style={{ flexDirection:'row' }} >
								<Image 
									style={{
										width:25,
										height:25,
										marginLeft:8
									}}
									source={{ uri: userImg }}
								/>
								<Text style={{ marginLeft: 8, marginTop:2, color:'black' }}>
									{ post.userId.name }
								</Text>
							</View>
							<Image 
								source={{ uri: post.image }}
								style={{
									width:'100%',
									height:500,
									marginBottom:5,
									marginTop:8,
									resizeMode: Image.resizeMode.contain,
								}}
							/>
							<View style={{ marginLeft: 8  }} >

								<View style={{ flexDirection:'row' }} >
									<TouchableOpacity
										onPress = { this.like }
									>
										<Icon
											name='heart-outlined'
											type='entypo'
											color={ this.state.like? 'red' : 'black' }
											size={ 32 }
											containerStyle={{
												alignItems:'flex-start',
											}}
										/>
									</TouchableOpacity>
									<TouchableOpacity
										onPress = { this.comment }
									>
										<Icon
											name='comment'
											type='evilicon'
											color='black'
											size={ 34 }
											containerStyle={{
												alignItems:'flex-start',
												marginTop: 2,
												marginLeft: 3
											}}
										/>
									</TouchableOpacity>

								</View> 
								
								<Text >
									{
										post.like.length ===0? '' : post.like.length  + ' likes'
									}
								</Text>
							{
								userId===post.userId._id ?
									<TouchableOpacity
										onPress = { this.detail }
									>
										<View style={{ flexDirection:'row'}} >
											<Text style={ styles.name } >
												{ post.userId.name }
											</Text>
											<Text style={ styles.content }>
												{ post.content }
											</Text>
										</View>
										
									</TouchableOpacity>
								:
									<View style={{ flexDirection:'row'}} >
										<Text style={ styles.name } >
											{ post.userId.name }
										</Text>
										<Text style={ styles.content } >
											{ post.content }
										</Text>
									</View>
							}
								<TouchableOpacity onPress={ this.comment }>
									<Text style={{ marginBottom:3, marginTop:3 }} >
										{
											post.comment.length===0? '' : `View All ${post.comment.length} Comments`
										}
									</Text>
								</TouchableOpacity>
								{
									lastComment?
									<View style={{ flexDirection:'row'}} >
										<Text style={ styles.name } >
											{lastComment.userId.name}
										</Text>
										<Text style={ styles.content }>
											{lastComment.content}
										</Text>
									</View>
									:
									<Text/>
								}
								{
									twoLastComment?
									<View style={{ flexDirection:'row'}} >
										<Text style={ styles.name } >
											{twoLastComment.userId.name}
										</Text>
										<Text style={ styles.content } >
											{twoLastComment.content}
										</Text>
									</View>
									:
									<Text/>
								}
								
							</View>
						</View>
					</View>
        )
    }
}

export default graphql(isLike)(ListPost)

const styles = StyleSheet.create({
	card:{
		marginTop: 30,
	},
	content:{
		color:'black'
	},
	name:{
		fontWeight: 'bold',
		marginRight: 10,
		color:'black'
	}
})