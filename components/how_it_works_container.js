import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NavigationBar from './navigation_bar';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HowItWorksContainer extends Component {
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.directionsBlock}>
					<Text style={styles.stepHeading}>Step 1</Text>
					<Text style={styles.instructionText}>Tap your finger along with the heart beat below.  Continue tapping.  </Text>
					<Text style={styles.stepHeading}>Step 2</Text>
					<Text style={styles.instructionText}>Once your tapped rate is within +/- 2 beats per minute, a heart rate will appear.  Just keep tapping until the heart rate appears.</Text>
				</View>
				<View style={styles.container}>
			
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
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
	}
});