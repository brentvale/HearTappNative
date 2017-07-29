import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StockLine} from 'react-native-pathjs-charts';

const CHART_HEIGHT = 150;
const CHART_WIDTH = 300;

export default class GraphDisplayComponent extends Component{
	render(){
		const { deltas, bpm, trailingAverage } = this.props;
		
		let data = [];
		data.push([]);
		//should be one less than trailingAverage
		if((typeof deltas === 'undefined') || (deltas.length < (trailingAverage-1))){
			//IF NOTHING HAS BEEN TAPPED OUT, DONT DISPLAY GRAPH
			return(
				<View>
					<Text style={{textAlign:'center', fontSize: 20}}>{bpm} bpm</Text>
					<View style={{backgroundColor: '#f2f2f2', marginLeft: 20, marginRight: 20, height: CHART_HEIGHT, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{textAlign: 'center'}}>Tap heart rate at {bpm} to see the results here.</Text>
					</View>
				</View>
			)
		} else {
			//IF THE USER HAS TAPPED SOMETHING OUT
			//add series to display a steady heart rate at value of this.props.bpm
			for(let i = 0; i < deltas.length; i ++){
				data[0].push({"x": i, "y": bpm});
			}
			
			//second element in array
			data.push([]);
			//to set min and max value on y axis values
			
			switch(bpm){
			case 60:
				data[1].push({"x": 0, "y": 70});
				data[1].push({"x": 0, "y": 0});
			case 100:
				data[1].push({"x": 0, "y": 110});
				data[1].push({"x": 0, "y": 40});
			case 130:
				data[1].push({"x": 0, "y": 150});
				data[1].push({"x": 0, "y": 80});
			}
			
			//third element in array
			data.push([]);
			//add series to display a what the user tapped out
			for(let j = 0; j < deltas.length; j ++){
				const bpmFromDelta = 60/(deltas[j]/1000);
				data[2].push({"x": j, "y": bpmFromDelta});
			}
		}
		
		
	  let options = {
			height: CHART_HEIGHT,
			width: CHART_WIDTH,
	    color: '#2980B9',
	    margin: {
	      top: 10,
	      left: 35,
	      bottom: 30,
	      right: 10
	    },
	    animate: {
	      type: 'delayed',
	      duration: 200
	    },
	    axisX: {
	      showAxis: true,
	      showLines: true,
	      showLabels: true,
	      showTicks: true,
	      zeroAxis: false,
	      orient: 'bottom',
	      tickValues: [],
	      label: {
	        fontFamily: 'Arial',
	        fontSize: 8,
	        fontWeight: true,
	        fill: '#34495E'
	      }
	    },
	    axisY: {
	      showAxis: true,
	      showLines: true,
	      showLabels: true,
	      showTicks: true,
	      zeroAxis: false,
	      orient: 'left',
	      tickValues: [],
	      label: {
	        fontFamily: 'Arial',
	        fontSize: 8,
	        fontWeight: true,
	        fill: '#34495E'
	      }
	    }
	  }
		return(
			<View>
				<Text style={{textAlign:'center', fontSize: 20}}>{this.props.bpm} bpm</Text>
				<StockLine data={data} options={options} xKey='x' yKey='y'/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'column',
	},
})