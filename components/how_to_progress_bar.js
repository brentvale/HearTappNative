import React, {Component} from 'react';
import Button from 'react-native-button';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HowToProgressBar extends Component{
	constructor(){
		super();
		this.state = {
			savedTimeStamps: {"low": [], "med": [], "high": []}
		}
	}
	
	componentDidMount(){
		this.setState({savedTimeStamps: this.props.savedTimeStamps});
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({savedTimeStamps: nextProps.savedTimeStamps});
	}
	
	render(){
		const checkMarkLow = (this.state.savedTimeStamps["low"] && this.state.savedTimeStamps["low"].length) ? <Ionicons name="ios-checkmark" style={styles.iconStylesVisible}/> 
																																												: <Ionicons name="ios-checkmark" style={styles.iconStylesInvisible}/>;
		const checkMarkMed = (this.state.savedTimeStamps["med"] && this.state.savedTimeStamps["med"].length) ? <Ionicons name="ios-checkmark" style={styles.iconStylesVisible}/> 
																																												: <Ionicons name="ios-checkmark" style={styles.iconStylesInvisible}/>;
		const checkMarkHigh = (this.state.savedTimeStamps["high"] && this.state.savedTimeStamps["high"].length) ? <Ionicons name="ios-checkmark" style={styles.iconStylesVisible}/> 
																																												: <Ionicons name="ios-checkmark" style={styles.iconStylesInvisible}/>;
		return(
			<View style={styles.container}>
				<TouchableHighlight onPress={this.props.showModal} style={styles.buttonBlock}>
					<View>
						<Ionicons name="ios-pulse-outline" style={styles.graphButtonIcon}/>
						<Text style={styles.graphButtonText}>Results</Text>
					</View>
				</TouchableHighlight>
				<View style={styles.block}>
					{checkMarkLow}
					<Text style={(this.state.savedTimeStamps["low"] && this.state.savedTimeStamps["low"].length) ? styles.completed : styles.incomplete}>60 bpm</Text>
				</View>
				<View style={styles.block}>
					{checkMarkMed}
					<Text style={(this.state.savedTimeStamps["med"] && this.state.savedTimeStamps["med"].length) ? styles.completed : styles.incomplete}>100 bpm</Text>
				</View>
				<View style={styles.block}>
					{checkMarkHigh}
					<Text style={(this.state.savedTimeStamps["high"] && this.state.savedTimeStamps["high"].length) ? styles.completed : styles.incomplete}>130 bpm</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	block: {
		flex: 1,
	},
	buttonBlock: {
		flex: 1,
		borderRightWidth: 1,
		borderRightColor: '#767676'
	},
	container: {
		alignSelf: 'stretch',
		borderBottomWidth: 1, 
		borderBottomColor: '#767676', 
		flexDirection: 'row',
		height: 60,
	},
	completed: {
		color: 'green',
		textAlign: 'center',
	},
	graphButtonIcon: {
		color: '#767676',
		fontSize:25, 
		paddingTop: 10,
		textAlign: 'center', 
	},
	graphButtonText: {
		color: '#767676',
		textAlign: 'center', 
	},
	incomplete: {
		color: "#767676",
		textAlign: 'center',
	}, 
	iconStylesInvisible: {
		color: 'white',
		textAlign: 'center', 
		fontSize:25, 
		padding: 0,
	},
	iconStylesVisible: {
		textAlign: 'center', 
		fontSize:25, 
		padding: 0,
		color: 'green'
	},
})