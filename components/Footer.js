import React, { Component } from 'react'
import {
    View,
		StyleSheet,
		AsyncStorage,
		TouchableOpacity,
		Text
} from 'react-native'

export default class ListPost extends Component{

	logout = async () => {
		try{
			await AsyncStorage.removeItem('token')
			this.props.navigation.navigate('Login')
		}catch(er){
			console.log(err)
		}
	}

	home = () => {
		this.props.navigation.navigate('Home')
	}

	addPage = () => {
		this.props.navigation.navigate('Camera')
	}

	profile = () => {
		this.props.navigation.navigate('Profile')
	}

	render(){
		return (
			<View style={ styles.footer } >
				<View style = { styles.onFoot }>

					<TouchableOpacity onPress= { this.home } style= { styles.box } >
						<Text>
							Home
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress= { this.addPage } style= { styles.box } >
						<Text>
							+
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress= { this.profile } style= { styles.box } >
						<Text>
							Profile
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress= { this.logout } style= { styles.box } >
						<Text>
							Logout
						</Text>
					</TouchableOpacity>

				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create ({
	footer: {
		bottom: 0,
		flexDirection: 'row'
	},
	onFoot: {
		flex:1,
		flexDirection: 'row',
		height: 50,
		borderColor: '#ccc',
		borderWidth: 1,
	},
	box: {
		flex:1,
		height: 50,
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'white'
	}
})