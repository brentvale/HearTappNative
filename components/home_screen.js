import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';

export default class HomeScreen extends Component{
	constructor(){
		super();
		this._handlePress = this._handlePress.bind(this);
	}
	
	_handlePress(){
		alert("something")
	}
	
	render(){
		return(
			<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
				<View style={{flex: 2, flexDirection: 'row', alignItems: 'flex-end'}}>
					<Text style={styles.heading}>Hear<Text style={styles.span}>T</Text>app</Text>
				</View>
        
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', margin: 20}}>
					<Button	containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
									style={{fontSize: 20, color: 'white', width: 200}}
		      				styleDisabled={{color: 'red'}}
		      				onPress={() => this._handlePress()}>
		      				Tap Heart Rate
					</Button>
				</View>
				<View style={{flex: 1}}>
					<Button	containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
									style={{fontSize: 20, color: 'white', width: 200}}
		      				styleDisabled={{color: 'red'}}
		      				onPress={() => this._handlePress()}>
		      				Learn How
					</Button>
				</View>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
  heading: {
		alignItems: 'center',
    justifyContent: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		height: 100
  },
	span: {
		color: 'red'
	}
});