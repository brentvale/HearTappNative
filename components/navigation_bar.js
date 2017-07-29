import React, {Component} from 'react';
import Button from 'react-native-button';
import {Text, View, StyleSheet} from 'react-native';

export default class NavigationBar extends Component{
	constructor(){
		super();
	}
	
	_handlePress(viewName){
		this.props.setView(viewName);
	}
	
	render(){
		return(
			<View style={styles.container}>
				<Button	containerStyle={{padding:10, height:50, overflow:'hidden', borderRightColor: 'white', borderRightWidth: 2, backgroundColor: 'red'}}
								style={{fontSize: 20, color: 'white', width: 200}}
	      				styleDisabled={{color: 'red'}}
	      				onPress={() => this._handlePress('tap')}>
	      				Tap Heart Rate
				</Button>
				<Button	containerStyle={{padding:10, height:50, overflow:'hidden', backgroundColor: 'red'}}
								style={{fontSize: 20, color: 'white', width: 200}}
	      				styleDisabled={{color: 'red'}}
	      				onPress={() => this._handlePress('learn')}>
	      				Learn How
				</Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
		flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
		marginTop: 25,
  },
})