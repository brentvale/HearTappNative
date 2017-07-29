import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import NavigationBar from './navigation_bar';
import HowToProgressBar from './how_to_progress_bar';
import GraphDisplayComponent from './graph_display_component';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HeartBeating from './heart_beating';

//number of timestamps to take average heart rate from
const TRAILING_AVERAGE = 5;
const HEART_RATE_LOW = 60;
const HEART_RATE_MED = 100;
const HEART_RATE_HIGH = 130;

export default class HowItWorksContainer extends Component {
	constructor(){
		super();
		this.state = {
			timestamps: [],
			//LOW, MED, HIGH, and COMPLETE
			currentStep: "low",
			savedTimeStamps: {"low": [], "med": [], "high": []},
			savedDeltas: {"low": [], "med": [], "high": []},
			calculatedRate: null,
			modalVisible: false
		};
		this.addTimeStamp = this.addTimeStamp.bind(this);
		this.beatsFromCurrentStep = this.beatsFromCurrentStep.bind(this);
		this.calculateHeartRateFromArrayOfBeats = this.calculateHeartRateFromArrayOfBeats.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.showModal = this.showModal.bind(this);
	}
	
	addTimeStamp(){
		const timestamps = this.state.timestamps.slice();
		timestamps.push(new Date());
		
		let calculatedRate, arrayOfDeltas;
		if(timestamps.length <= TRAILING_AVERAGE){
			this.setState({timestamps: timestamps});
		} else {
			const obj = this.calculateHeartRateFromArrayOfBeats(timestamps);
			calculatedRate = obj.calculatedRate;
			arrayOfDeltas = obj.arrayOfDeltas;
		}
		
		//determine whether moving on to next step
		if(Math.abs(calculatedRate - this.beatsFromCurrentStep()) < 2){
			//moving to next step because within accuracy range
			//save timestamps to savedTimeStamps[STEP]
			let savedTimeStamps = Object.assign({}, this.state.savedTimeStamps);
			savedTimeStamps[this.state.currentStep] = timestamps;
			
			let savedDeltas = Object.assign({}, this.state.savedDeltas);
			savedDeltas[this.state.currentStep] = arrayOfDeltas;
			
			alert(`WELL DONE! You the average of your last 5 taps gave a rate of ${calculatedRate} Now try it again at a faster heart rate.`);
			this.setState({timestamps: [], calculatedRate: 0, savedTimeStamps: savedTimeStamps, currentStep: this.nextStep(), savedDeltas: savedDeltas});
		} else {
			//not within accuracy range, stay on current step
			this.setState({timestamps: timestamps, calculatedRate: calculatedRate});
		}
	}
	
	hideModal(){
		this.setState({modalVisible: false});
	}
	
	showModal(){
		this.setState({modalVisible: true});
	}
	
	//How fast heart should be beating
	beatsFromCurrentStep(){
		switch(this.state.currentStep){
		case "low":
			return HEART_RATE_LOW;
		case "med":
			return HEART_RATE_MED;
		case "high":
			return HEART_RATE_HIGH;
		default: return HEART_RATE_LOW;
		}
	}
	
	nextStep(){
		switch(this.state.currentStep){
		case "low":
			return "med";
		case "med":
			return "high";
		case "high":
			return "low";
		default: return "low";
		}
	}
	
	calculateHeartRateFromArrayOfBeats(timestamps){
		let total = 0;
		let deltas = [];
		let length = timestamps.length - 1;
		for(let i = 0; i < TRAILING_AVERAGE; i ++){
			deltas.push(timestamps[length - i] - timestamps[length - (i+1)] );
		}
		for(let j = 0; j < deltas.length; j ++){
			total += deltas[j];
		}
		const averageFromBeats = 60/(total/deltas.length/1000);
		
		return {calculatedRate: Math.round(averageFromBeats*10)/10, arrayOfDeltas: deltas};
	}
	
	render(){
		const beatsPerMinute = this.beatsFromCurrentStep();
		let calculatedHeartRateDisplay;
		if(this.state.calculatedRate){
			if(Math.abs(this.state.calculatedRate - beatsPerMinute) < 2){
				//beats tapped within +/- 2bpm range
				calculatedHeartRateDisplay = <Text style={styles.heartDisplaySuccess}>{this.state.calculatedRate} bpm</Text>
			} else {
				//beats tapped out of +/- 2bpm range
				calculatedHeartRateDisplay = <Text style={styles.heartDisplay}>{this.state.calculatedRate} bpm</Text>
			}
		} else {
			//not enough beats have been tapped to calculate an average rate
			calculatedHeartRateDisplay = <Text style={styles.heartDisplay}>&nbsp;&nbsp;&nbsp;&nbsp;bpm</Text>;
		}
	
		return(
			<View style={styles.headingContainer}>
				<Modal animationType={"slide"} 
							 transparent={false} 
							 visible={this.state.modalVisible} 
							 onRequestClose={() => {alert("Modal has been closed.")}}>
         <View style={{marginTop: 40}}>
          <View>
            <TouchableHighlight onPress={this.hideModal}>
              <Ionicons name="ios-close-circle" style={styles.closeGraphs}/>
            </TouchableHighlight>
          </View>
					<View style={{flex: 1, flexDirection: 'column', alignSelf: 'stretch'}}>
						<GraphDisplayComponent rate="low" 
							 										 bpm={HEART_RATE_LOW} 
																	 trailingAverage={TRAILING_AVERAGE}
																	 deltas={(typeof this.state.savedDeltas === 'undefined') ? []: this.state.savedDeltas['low']}/>
						<GraphDisplayComponent rate="med" 
							 										 bpm={HEART_RATE_MED} 
																	 trailingAverage={TRAILING_AVERAGE}
																	 deltas={(typeof this.state.savedDeltas === 'undefined') ? []: this.state.savedDeltas['med']}/>
						<GraphDisplayComponent rate="high" 
							 										 bpm={HEART_RATE_HIGH} 
																	 trailingAverage={TRAILING_AVERAGE}
																	 deltas={(typeof this.state.savedDeltas === 'undefined') ? []: this.state.savedDeltas['high']}/>
					</View>
         </View>
        </Modal>
							 
				<View style={styles.directionsBlock}>
					<Text style={styles.stepHeading}>Step 1</Text>
					<Text style={styles.instructionText}>Tap your finger along with the heart beat. Tap inside the box with the white background below.  </Text>
					<Text style={styles.stepHeading}>Step 2</Text>
					<Text style={styles.instructionText}>It takes a minimum of <Text style={{fontWeight:'bold'}}>{TRAILING_AVERAGE}</Text> taps for a heart rate to appear.  When your tapped rate is within +/- 2 beats per minute, the heart rate will display in green.</Text>
					<Text style={styles.stepHeading}>Step 3</Text>
					<Text style={styles.instructionText}>Complete heart rates for 60bpm, 100bpm, and 130bpm. </Text>
				</View>
			
				<HowToProgressBar savedTimeStamps={this.state.savedTimeStamps} showModal={this.showModal}/>
			
				<TouchableHighlight onPress={this.addTimeStamp} underlayColor="pink" style={styles.tapContainer}>
					<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
						<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
							{calculatedHeartRateDisplay}
						</View>
						<View style={{flex:6}}>
							<HeartBeating bpmRate={beatsPerMinute} paddingTop={80}/>
						</View>
						<Text>Target = {beatsPerMinute}bpm</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	closeGraphs: {
		color: '#767676',
		fontSize: 50,
		paddingRight:10,
		textAlign: 'right',
	},
	directionsBlock: {
		alignSelf: 'stretch',
		backgroundColor: '#f2f2f2',
		borderBottomWidth: 1, 
		borderBottomColor: '#767676', 
		paddingTop: 20
	},
  headingContainer: {
    alignItems: 'flex-start',
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		flex: 1,
    justifyContent: 'center',
  },
	heartDisplay: {
		borderWidth: 1,
		borderColor: 'white',
		color: '#767676',
		fontWeight: 'bold',
		fontSize: 40,
		marginTop: 40
	},
	heartDisplaySuccess: {
		borderWidth: 1,
		borderColor: 'green',
		color: 'green',
		fontWeight: 'bold',
		fontSize: 40,
		marginTop: 40
	},
	instructionText: {
		fontSize: 15,
		fontWeight: 'normal',
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 15
	},
	stepHeading: {
		color: 'red',
		fontWeight: 'bold', 
		fontSize: 20, 
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'left',
	},
	tapContainer: {
    alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		flex: 1,
    justifyContent: 'center',
	},
});