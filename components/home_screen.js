import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';

import HeartBeating from './heart_beating';

export default class HomeScreen extends Component{
	constructor(){
		super();
		this._handlePress = this._handlePress.bind(this);
	}
	
	_handlePress(viewName){
		clearInterval(this.heartSizeInterval);
		this.props.setView(viewName);
	}
	
	render(){
		return(
			<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
				<View style={{flex: 3, flexDirection: 'row', alignItems: 'flex-end'}}>
					<Text style={styles.heading}>Hear<Text style={styles.span}>T</Text>app</Text>
				</View>
			
				<View style={{flex: 1, alignItems: "stretch"}}>
					<HeartBeating bpmRate={60}/>
				</View>
				
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', margin: 20}}>
					<Button	containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
									style={{fontSize: 20, color: 'white', width: 200}}
		      				styleDisabled={{color: 'red'}}
		      				onPress={() => this._handlePress('tap')}>
		      				Tap Heart Rate
					</Button>
				</View>
				<View style={{flex: 1}}>
					<Button	containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
									style={{fontSize: 20, color: 'white', width: 200}}
		      				styleDisabled={{color: 'red'}}
		      				onPress={() => this._handlePress('learn')}>
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