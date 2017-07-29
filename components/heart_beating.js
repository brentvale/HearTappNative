import React, {Component} from 'react';
import {Text, View, Stylesheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

const LARGE_HEART_SIZE = 60;
const SMALL_HEART_SIZE = 40;

export default class HeartBeating extends Component{
	
	constructor(){
		super();
		this.state = {
			heartSize: SMALL_HEART_SIZE, 
			hrTimeInterval: null
		}
		this.beatHeart = this.beatHeart.bind(this);
	}
	
	componentDidMount(){
		this.beatHeart({bpmRate: this.props.bpmRate});
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.bpmRate !== this.props.bpmRate){
			clearInterval(this.heartSizeInterval);
			this.beatHeart({bpmRate: nextProps.bpmRate});
		}
	}
	
	componentWillUnmount(){
		clearInterval(this.heartSizeInterval);
	}
	
	beatHeart(rateObj){
		//calculate miliseconds between beats from props
		const timeIntervalFromBeatsPerMinute = 60/rateObj.bpmRate * 1000;
		
		this.heartSizeInterval = setInterval(() => {
			this.setState({heartSize: LARGE_HEART_SIZE});
			this.setTimeout(() => {
				this.setState({heartSize: SMALL_HEART_SIZE});
			}, 100);
		}, timeIntervalFromBeatsPerMinute);
	}
	
	render(){
		const { paddingTop } = this.props;
		//make heart beat extend evenly from a central point...
		//larger heart beat should have padding that's half the size delta between large and small 
		const paddingDelta = (LARGE_HEART_SIZE - SMALL_HEART_SIZE) / 2
		const calculatedPadding = (this.state.heartSize === SMALL_HEART_SIZE) ? paddingDelta : 0;
		
		return(
			<View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: (paddingTop || 0)}}>
				<Ionicons name="ios-heart" style={{color:'red', fontSize: this.state.heartSize, padding: calculatedPadding}}/>
			</View>
		)
	}
}

reactMixin(HeartBeating.prototype, TimerMixin);