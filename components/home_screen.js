import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';

import Ionicons from 'react-native-vector-icons/Ionicons';

const LARGE_HEART_SIZE = 50;
const SMALL_HEART_SIZE = 40;

export default class HomeScreen extends Component{
	constructor(){
		super();
		this.state = {
			heartSize: SMALL_HEART_SIZE
		}
		this._handlePress = this._handlePress.bind(this);
	}
	
	componentDidMount(){
		this.heartSizeInterval = setInterval(() => {
			this.setState({heartSize: LARGE_HEART_SIZE});
			setTimeout(() => {
				this.setState({heartSize: SMALL_HEART_SIZE});
			}, 100);
		}, 1000);
	}
	
	componentWillUnMount(){
		clearInterval(this.heartSizeInterval);
	}
	
	_handlePress(viewName){
		clearInterval(this.heartSizeInterval);
		this.props.setView(viewName);
	}
	
	render(){
		//make heart beat extend evenly from a central point...
		//larger heart beat should have padding that's half the size delta between large and small 
		const paddingDelta = (LARGE_HEART_SIZE - SMALL_HEART_SIZE) / 2
		const calculatedPadding = (this.state.heartSize === SMALL_HEART_SIZE) ? paddingDelta : 0;
		return(
			<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
				<View style={{flex: 3, flexDirection: 'row', alignItems: 'flex-end'}}>
					<Text style={styles.heading}>Hear<Text style={styles.span}>T</Text>app</Text>
				</View>
			
				<View style={{flex: 1, alignItems: "stretch"}}>
			<Ionicons name="ios-heart" style={{color:'red', fontSize: this.state.heartSize, padding: calculatedPadding}}/>
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