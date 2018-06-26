/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  YellowBox,
  AsyncStorage
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import AddPost from './pages/AddPost'
import Camera from './pages/Camera'
import EditPost from './pages/EditPost'
import CommentPost from './pages/CommentPost'
import DetailComment from './pages/DetailComment'
import  ApolloClient  from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'


const client = new ApolloClient({
  uri: "http://35.240.229.31/graphql",
  request: async (operation) => {
    const token = await AsyncStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
}) 



YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
console.ignoredYellowBox = ['Remote debugger']

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Navigator = createStackNavigator({
  Home:{
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerLeft:null
    }
  },
  Camera:{
    screen: Camera,
    navigationOptions: {
      header:null
    }
  },
  Profile:{
    screen: Profile,
    navigationOptions: {
      title: 'Profile'
    }
  },
  AddPost:{
    screen: AddPost,
    navigationOptions: {
      title: 'Share'
    }
  },
  EditPost:{
    screen: EditPost,
    navigationOptions: {
      title: 'Edit'
    }
  },
  CommentPost:{
    screen: CommentPost,
    navigationOptions: {
      title: 'Comment'
    }
  },
  DetailComment:{
    screen: DetailComment,
    navigationOptions: {
      title: 'Edit Comment'
    }
  },
  Login:{
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  SignUp:{
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
},{
  initialRouteName: 'Login'
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
       <Navigator/>
      </ApolloProvider>
    );
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
