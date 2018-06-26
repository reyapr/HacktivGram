import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
	TextInput,
	TouchableOpacity,
	Alert
} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const register = gql`
	mutation signUp($addNewUser: newUser) {
		signUp(newUser: $addNewUser) {
			name
			email
			password
		}
	}
`

class SignUp extends Component {
	constructor(){
		super()
		this.state = {
			name: '',
			email: '',
			password: '',
		}
	}

	next = (status) => {
		if(status==='name'){
			this.emailInput.focus()
		}else{
			this.passInput.focus()
		}
	}

	signUp = async () => {
		const { name, email, password } = this.state
		try{
			let result = await this.props.mutate({
				variables:{
					addNewUser: {
						name,
						email,
						password
					}
				}
			})
			console.log(result)
			if(result.data.signUp){
				Alert.alert(
					'Success to sign up',
					'You will redirect to login',
					[
					  {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
					],
					{ cancelable: false }
				)
			}
		}catch(err){
			Alert.alert(
				'Failed To SignUp',
				'Your input doesn\'t meet criteria or email already registered',
				[
				  {text: 'OK'},
				],
				{ cancelable: false }
			)
		}

	}

	login = () => {
		this.props.navigation.navigate('Login')
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
						value={this.state.name}
						onChangeText={name => this.setState({name}) }
						placeholder="Name"
						returnKeyType="next"
						onSubmitEditing={() => this.next('name')}
						underlineColorAndroid='transparent'
						password={true}
						blurOnSubmit={false}
					/>

					<TextInput
						style={styles.input}
						value={this.state.email}
						onChangeText={email => this.setState({email})}
						ref={ref => {this.emailInput = ref}}
						placeholder="email@example.com"
						autoCapitalize="none"
						keyboardType="email-address"
						returnKeyType="next"
						onSubmitEditing={ () => this.next('email')}
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

					<TouchableOpacity onPress={ this.signUp } style={ styles.btnStyle }  >
						<Text>
							SignUp
						</Text>
					</TouchableOpacity>

				</View>

				<TouchableOpacity onPress={ this.login } style={ styles.footer }  >
					<Text>
						<Text style = {{ fontSize: 11 }} > Don't have an account? </Text> 
						<Text style={{ fontSize: 11, fontWeight: 'bold' }}>SignUp</Text>
					</Text>
				</TouchableOpacity>

			</View>

		)
	}
}

export default graphql(register)(SignUp)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
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