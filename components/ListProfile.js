import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'


export default class ListProfile extends Component{
    render(){
        const { post } = this.props
        console.log(post,'list')
        return (
            <View style={ styles.gridImage } >
           
                <Image 
                    source={{ uri:post.image }} 
                    style={{
                        width:'100%',
                        height:160,
                        resizeMode: Image.resizeMode.contain,
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    gridImage:{
        width:'33%',
        height:120,
        borderWidth:1,
        borderColor:'white',
    },
})



