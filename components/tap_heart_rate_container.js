import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

//to calculate an average, how many of the last X data points do you want to consider?
//example: 5
//before 5 taps have accumulated, heart averages the times between 2,3, and 4 beats 
//once 5 taps have accumulated, heart averages the last 5 beats
const TRAILING_AVERAGE = 5;
const START_SHOWING_AFTER = 2;
const SECONDS_TO_RESET = 3000; //Miliseconds

export default class TapHeartRateContainer extends Component {
	constructor(){
		super();
		this.state = {
			timestamps: [],
			calculatedRate: null,
			deltas: [],
			//each value contributing to calculatedRate, squared, and divided by the total number
			variability: null,
			previousCalculatedRates: [],
			timestampsHistory: [],
			deltasHistory: []
		};
		this.addTimeStamp = this.addTimeStamp.bind(this);
		this.calculateHeartRateFromArrayOfBeats = this.calculateHeartRateFromArrayOfBeats.bind(this);
		this.resetForNewRound = this.resetForNewRound.bind(this);
	}
	
	addTimeStamp(){
		clearTimeout(this.timeOut);
		const timestamps = this.state.timestamps.slice();
		timestamps.push(new Date());
		
		let calculatedRate, arrayOfDeltas;
		if(timestamps.length <= START_SHOWING_AFTER){
			this.setState({timestamps: timestamps});
		} else {
			const obj = this.calculateHeartRateFromArrayOfBeats();
			calculatedRate = obj.calculatedRate;
			arrayOfDeltas = obj.arrayOfDeltas;
			variability = obj.variability;
			this.setState({timestamps: timestamps, calculatedRate: calculatedRate, deltas: arrayOfDeltas, variability: variability});
		}
		//after 5 seconds of inactivity, it resets
		this.timeOut = setTimeout(() => {
			this.resetForNewRound();
		}, SECONDS_TO_RESET);
	}
	
	resetForNewRound(){
		let timestampsToAddToHistory = this.state.timestamps.slice(0);
		let fullHistoryOfTimeStamps = this.state.timestampsHistory.slice(0);
		fullHistoryOfTimeStamps.push(timestampsToAddToHistory);
		
		//keep array of deltas to be able to recreate a viewable history
		//while data for delta can be extracted from history, keep in the event of wanting
		//display/save at some future point when the two may have come separated
		let deltasToAddToHistory = this.state.deltas.slice(0);
		let fullHistoryOfDeltas = this.state.deltasHistory.slice(0);
		fullHistoryOfDeltas.push(deltasToAddToHistory);
		
		//keep history of calculated rates to view what a history of announced heart rates over time.
		let previousCalculatedRates = this.state.previousCalculatedRates.slice(0);
		previousCalculatedRates.push(this.state.calculatedRate);
		
		this.setState({	previousCalculatedRates: previousCalculatedRates,
									 	timestampsHistory: fullHistoryOfTimeStamps,
										deltasHistory:fullHistoryOfDeltas,
										timestamps: [],
										calculatedRate: null,
										deltas: [],
										variability: null });
	}
	
	calculateHeartRateFromArrayOfBeats(){
		let total = 0;
		//used to square all values contributing to calculated rate;
		let squaredTotal = 1;
		let deltas = [];
		//use up to 5 of the last data points
		let length = (this.state.timestamps.length-1 > TRAILING_AVERAGE) ? TRAILING_AVERAGE : this.state.timestamps.length-1;
		let endIdx = this.state.timestamps.length-1;
		for(let i = 0; i < length; i ++){
			deltas.push(this.state.timestamps[endIdx - i] - this.state.timestamps[endIdx - (i+1)] );
		}
		for(let j = 0; j < deltas.length; j ++){
			total += deltas[j];
		}
		const averageFromBeats = 60/(total/deltas.length/1000);
		
		console.log(deltas.length);
		for(let j = 0; j < deltas.length; j ++){
			//variance is the average of the squares of the deviations from the mean
			squaredTotal += (60/(deltas[j]/1000) - averageFromBeats)*(60/(deltas[j]/1000) - averageFromBeats);
		}
		
		const variability = parseInt(Math.sqrt(squaredTotal/deltas.length)*10)/10;
		
		return {calculatedRate: Math.round(averageFromBeats*10)/10, arrayOfDeltas: deltas, variability: variability};
	}
	
	render(){
		const instructionText = (this.state.timestamps.length === 0) ? "Tap along with observed HR" : "";
		const variabilityText = (this.state.variability == null) ? "" : `Variability: average of your last ${TRAILING_AVERAGE} taps`;
		let width = Dimensions.get('window').width;
		let height = Dimensions.get('window').height;
		let activeStyle = (this.state.variability && this.state.variability > 5) ? {color: 'red'} : {color: 'green'};

		let variabilityStyle = Object.assign({},{textAlign:'center',flex: 1,flexDirection: 'column',alignSelf: 'stretch',fontSize: 30}, activeStyle);
		let previousHRDisplay = (this.state.previousCalculatedRates.length > 0) ? 
																<View style={styles.pastHrDisplay}>
																	<Text style={styles.pastHrText}>Previous:</Text>
																	<Text style={styles.pastHrTextLarge}>{this.state.previousCalculatedRates[this.state.previousCalculatedRates.length-1]}</Text>
																</View> : <Text></Text>;
		
		return (
			<View style={{flex: 1}}>
				<TouchableHighlight onPress={this.addTimeStamp} underlayColor="pink" style={styles.tapContainer}>
					<View style={{height: height-80, width: width, alignItems: 'flex-end', flex: 1, justifyContent: 'space-between', flexDirection: 'column'}}>
						<Text style={styles.instructions}>{instructionText}</Text>
						<Text style={styles.hrDisplay}>{this.state.calculatedRate}</Text>
						<Text style={styles.instructions}>{variabilityText}</Text>
						<Text style={variabilityStyle}>{this.state.variability == null ? "" :'+/-'} {this.state.variability}</Text>
						<View style={styles.filler}></View>
						
						{ previousHRDisplay }
						
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={this.resetForNewRound} underlayColor="pink"  style={styles.buttonReset}>
					<View><Text style={styles.buttonText}>Reset</Text></View>
				</TouchableHighlight>
			</View>
		)
	}	
}

reactMixin(TapHeartRateContainer.prototype, TimerMixin);

const styles = StyleSheet.create({
	buttonReset: {
		backgroundColor: '#e7e7e7',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: 'red',
		height: 40,
		left: 5,
		position: 'absolute',
		top: 60,
		width: 80,
		zIndex:80,
	},
	buttonText: {
		alignSelf: 'center',
		color: 'red',
		justifyContent: 'center',
		marginTop: 10,
	},
  container: {
		alignItems: 'center',
		alignSelf: 'stretch',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
	filler: {
		flex: 4,
		flexDirection: 'column',
	},
	hrDisplay: {
		alignSelf: 'stretch',
		fontSize: 60,
		flex: 1,
		flexDirection: 'column',
		textAlign:'center',
	},
	instructions: {
		alignSelf: 'stretch',
		fontSize: 20,
		height: 40,
		justifyContent: 'flex-end',
		paddingTop: 15,
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'center',
	},
	pastHrDisplay: {
		backgroundColor: '#fff',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#e7e7e7',
		height: 70,
		position: 'absolute',
		right: 5,
		top: 50,
		width: 80,
	},
	pastHrText: {
		alignSelf: 'center',
		color: '#000',
		justifyContent: 'center',
		marginTop: 5,
	},
	pastHrTextLarge: {
		alignSelf: 'center',
		color: '#000',
		fontSize:30,
		justifyContent: 'center',
	},
	tapContainer: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
	}, 
	textSeparator: {
		flex: 1,
		flexDirection: 'column',
	}, 
});