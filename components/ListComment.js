import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'


export default class ListComment extends Component{
    constructor(){
        super()
        this.state= {
            isUser:''
        }
    }

    async componentDidMount(){
        let user = await AsyncStorage.getItem('userId')
        if(user){
            this.setState({
                isUser:user
            })
        }
    }
   
    
    detail = () =>{
        this.props.navigation.navigate('DetailComment',{
            comment:this.props.comment,
            postId:this.props.postId
        })
    }

    render(){
        const { comment } = this.props
        const { isUser } = this.state
        const userImg = "https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png"
        return (
            <View style={ styles.post } >
            {
                isUser===comment.userId._id?
                <TouchableOpacity onPress={ this.detail } >
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
                        <Text>
                            { comment.content }
                        </Text>
                    </View>
                </TouchableOpacity> 
                :
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
                    <Text>
                        { comment.content }
                    </Text>
                </View>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
	post:{
		flexDirection:'row', 
		marginLeft: 15, 
		marginTop:10,
		maxHeight: 150,
    },
})



