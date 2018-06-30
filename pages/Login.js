import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	AsyncStorage,
	Alert
} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const signIn = gql`
	mutation signIn($email: String, $password: String){
		signIn(email: $email, password: $password){
			name
			_id
			token
		}
	}
`

class Login extends Component {
	constructor(){
		super()
		this.state = {
			email: '',
			password: '',
		}
	}

	next = () => {
		this.passInput.focus()
	}

	signUp = () => {
		this.props.navigation.navigate('SignUp')
	}

	login = async () => {
		let { email, password } = this.state
		try{
			let result = await this.props.mutate({
				variables: { 
					email,
					password
				}
			})
			let { token, _id, name } = result.data.signIn
			if(token){
				try{
					await AsyncStorage.setItem('token', token)
					await AsyncStorage.setItem('userId', _id)
					this.props.navigation.navigate('Home')
				}catch(err){
					console.log(err)
				}
			}
		}catch(err){
			Alert.alert(
				'Failed To Login',
				'Username or password wrong',
				[
				  {text: 'OK'},
				],
				{ cancelable: false }
			)
		}
	}

	componentDidMount = async () => {
		try{
			let token = await AsyncStorage.getItem('token')
			if(token) this.props.navigation.navigate('Home')
		}catch(err){
			console.log(err.response)
		}
	}

	render(){
		return (
			<View style={{ flex: 1,  backgroundColor: '#F5FCFF' }}>
				<View style={styles.container}>

					<Text style={styles.welcome}>
					Hacktivgram
					</Text>
					
					<TextInput
						style={styles.input}
						value={this.state.email}
						onChangeText={email => this.setState({email})}
						placeholder="email@example.com"
						autoCapitalize="none"
						keyboardType="email-address"
						returnKeyType="next"
						onSubmitEditing={this.next}
						underlineColorAndroid='transparent'
						password={true}
						blurOnSubmit={false}
					/>

					<TextInput
						style={styles.input}
						value={this.state.password}
						onChangeText={password => this.setState({password})}
						ref={ref => {this.passInput = ref}}
						autoCapitalize="none"
						placeholder="password"
						returnKeyType="send"
						onSubmitEditing={this.submit}
						underlineColorAndroid='transparent'
						secureTextEntry={true}
						blurOnSubmit={true}
					/>

					<TouchableOpacity onPress={ this.login } style={ styles.btnStyle }  >
						<Text>
							Login
						</Text>
					</TouchableOpacity>

				</View>

				<TouchableOpacity onPress={ this.signUp } style={ styles.footer }  >
					<Text>
						<Text style = {{ fontSize: 11 }} > Don't have an account? </Text>
						<Text style={{ fontSize: 11, fontWeight: 'bold' }}>SignUp</Text>
					</Text>
				</TouchableOpacity>

			</View>
		)
	}
}

export default graphql(signIn)(Login)

const styles = StyleSheet.create({
    container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
	footer: {
		height: 55,
		width: '100%',
		borderColor: '#ccc',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		margin: 15,
		marginBottom: 0,
		height: 40,
		width: '80%',
		paddingHorizontal: 10,
		borderRadius: 4,
		borderColor: '#ccc',
		borderWidth: 1,
		fontSize: 16,
	},
  });
