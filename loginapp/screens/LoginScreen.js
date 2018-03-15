import React from 'react';
import {View, Button, Text} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';


	firebase.initializeApp({
    apiKey: "AIzaSyASwUVjGkOjFefgoGOMqFJG2qktPb-NzvY",
    authDomain: "login-app-982eb.firebaseapp.com",
    databaseURL: "https://login-app-982eb.firebaseio.com",
    projectId: "login-app-982eb",
    storageBucket: "login-app-982eb.appspot.com",
    messagingSenderId: "995520768102"
  }
  );
  

export default class login extends React.Component{
	constructor(props){
		super(props);
		this.state = {email:'', password:'', error:'', loading:false};
	}





	onLoginPress(){
		this.setState({error:'', loading:true});

		const{email, password} = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({error:'',loading:false});
			this.props.navigation.navigate('Main');
		})
		.catch(() => {
			this.setState({error:'Authentication Failed', loading:false});
		})


	}

	onSignUpPress(){
		this.setState({error:'', loading:true});

		const{email, password} = this.state;
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({error:'',loading:false});
			this.props.navigation.navigate('Main');
		})
		.catch(() => {
			this.setState({error:'Authentication Failed', loading:false});
		})


	}


	renderButtonOrLoading(){
		if (this.state.loading) {
			return <Text> Loading </Text>
		}
		return <View>
			<Button
			onPress = {this.onLoginPress.bind(this)}
			title='login'/>

			<Button
			onPress = {this.onSignUpPress.bind(this)}
			title='Sign Up'/>

		</View>
	}

	render(){
		return(
				<View>
					<FormLabel>Email</FormLabel>
					<FormInput 
					value = {this.state.email}
					onChangeText={email => this.setState({ email})}
					placeholder='john@icloud.com'
					/>

					<FormLabel>Password</FormLabel>
					<FormInput 
					value = {this.state.password}
					secureTextEntry
					placeholder='******'
					onChangeText={password => this.setState({ password})}
					/>
					<Text>{this.state.error}</Text>
					{this.renderButtonOrLoading()}

				</View>
			)
	}

}