import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import NavigationBar from './navigation_bar';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HeartBeating from './heart_beating';

//number of timestamps to take average heart rate from
const TRAILING_AVERAGE = 5;

export default class HowItWorksContainer extends Component {
	constructor(){
		super();
		this.state = {
			timestamps: []
		};
		this.calculateHeartRateFromState = this.calculateHeartRateFromState.bind(this);
	}
	
	addTimeStamp(){
		const timestamps = this.state.timestamps.slice();
		timestamps.push(new Date());
	
		this.setState({timestamps: timestamps});
	}
	
	calculateHeartRateFromState(){
		if(this.state.timestamps.length < (TRAILING_AVERAGE+1)){
			return <Text style={styles.heartDisplay}>&nbsp;&nbsp;&nbsp;&nbsp;bpm</Text>;
		} else {
			//add last 3 taps
			let total = 0;
			let deltas = [];
			let length = this.state.timestamps.length - 1;
			for(let i = 0; i < TRAILING_AVERAGE; i ++){
				deltas.push(this.state.timestamps[length - i] - this.state.timestamps[length - (i+1)] );
			}
			for(let j = 0; j < deltas.length; j ++){
				total += deltas[j];
			}
			const averageFromBeats = 60/(total/deltas.length/1000);
			
			return <Text style={styles.heartDisplay}>{Math.floor(averageFromBeats*10)/10} bpm</Text>;
		}
	}
	
	render(){
		const calculatedHeartRate = this.calculateHeartRateFromState();
		
		return(
			<View style={styles.headingContainer}>
				<View style={styles.directionsBlock}>
					<Text style={styles.stepHeading}>Step 1</Text>
					<Text style={styles.instructionText}>Tap your finger along with the heart beat below.  Continue tapping.  </Text>
					<Text style={styles.stepHeading}>Step 2</Text>
					<Text style={styles.instructionText}>Once your tapped rate is within +/- 2 beats per minute, a heart rate will appear.  Just keep tapping until the heart rate appears.</Text>
				</View>
				<TouchableHighlight onPress={() => {this.addTimeStamp()}} underlayColor="pink" style={styles.tapContainer}>
					<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
						<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
							{calculatedHeartRate}
						</View>
						<View style={{flex:6}}>
							<HeartBeating bpmRate={60} paddingTop={120}/>
						</View>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: 'flex-start',
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		flex: 1,
    justifyContent: 'center',
  },
	tapContainer: {
    alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		flex: 1,
    justifyContent: 'center',
	},
	directionsBlock: {
		alignSelf: 'stretch',
		borderBottomWidth: 1, 
		borderBottomColor: 'black', 
	},
	instructionText: {
		fontSize: 15,
		fontWeight: 'normal',
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 20
	},
	stepHeading: {
		color: 'red',
		fontWeight: 'bold', 
		fontSize: 20, 
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'left',
	},
	heartDisplay: {
		fontWeight: 'bold',
		fontSize: 30
	}
});