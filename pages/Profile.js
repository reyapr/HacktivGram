import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ActivityIndicator,
    StatusBar,
    Image,
    ScrollView
} from 'react-native'
import Footer from '../components/Footer'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ListProfile from '../components/ListProfile'

const user = gql`
  query getUser {
    user {
      _id
      name
      email
      posts {
        _id
        content
        image
      }
    }
  }
`

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      user:''
    }
  }

  async componentDidMount(){
    try{
      let user = await AsyncStorage.getItem('userId')
      this.setState({ user })
    }catch(err){
      console.log(err)
    }
  }

	render(){
    const { navigation, data } = this.props
    const { user } = data
    const userImg = "https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png"
    if(!user){
			return (
				<View style={ styles.container } >
					<ActivityIndicator />
					<StatusBar barStyle="default" />
				</View>
			)
		}else{
      return (
        <View style={{ flex: 1,  backgroundColor: '#F5FCFF' }}>
          <View style={{ flex:1,maxHeight:150 }} >
            <View style={ styles.post } >

              <View>
                <Image 
                  style={{
                    width:75,
                    height:75,
                    margin: 10,
                  }}
                  source={{ uri: userImg }}
                />
                <Text style={{ alignSelf:'center', color:'black' }} >
                  { data.user.name }
                </Text>
              </View>

              <View>
                <View style={{ flexDirection:'row',marginLeft:15,marginTop:10 }} >
                  <View style={ styles.countGrid } >
                    <Text style={styles.count} >
                      { data.user.posts.length }
                    </Text>
                    <Text>
                      Post
                    </Text>
                  </View>

                  <View style={ styles.countGrid } >
                    <Text style={styles.count} >
                      0
                    </Text>
                    <Text>
                      Followers
                    </Text>
                  </View>

                  <View style={ styles.countGrid } >
                    <Text style={styles.count} >
                      0
                    </Text>
                    <Text>
                      Following
                    </Text>
                  </View>
                </View>

                <View style={ styles.editProfile } >
                  <Text>
                    Edit Profile
                  </Text>
                </View>

              </View>

            </View>
          </View>
          {/* flex 2 */}
          <View style={ styles.content }>
          <ScrollView contentContainerStyle={ styles.scroll }  >
            {
              data.user.posts.map(post=>{
                return  <ListProfile post={ post } key={post._id} />
              })
            }
          </ScrollView>
          </View>

          <Footer navigation = { navigation }  />

        </View>
      )
    }
	}
}

export default graphql(user)(Profile)

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
    count:{
      color:'black',
      fontSize:20,
      alignSelf:'center'
    },
    countGrid:{
      marginLeft:15
    },
    editProfile:{
      marginTop:5,
      marginLeft:15,
      height: 30,
      width: '100%',
      borderColor: '#ccc',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:5
    },
    content:{
      flex:1,
      borderWidth:1,
      borderColor:'#ccc',
      display: "flex",
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
  
    scroll:{
      display: "flex",
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignContent: 'stretch',
    }
  });