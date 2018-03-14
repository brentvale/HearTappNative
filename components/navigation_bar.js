import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
} from 'react-native';

export default class NavigationBar extends Component{
	constructor(){
		super();
	}
	
	render(){
		return(
			<View style={styles.container}>

				<TouchableOpacity
					onPress={() => this.props.setView('tap')}
					style={[styles.buttonContainer,
						{
							borderRightWidth: StyleSheet.hairlineWidth,
							borderRightColor: '#fff',
          	}
					]}>

					<View style={styles.button}>
						<Text style={styles.buttonText}>{'Tap Heart Rate'}</Text>
					</View>

				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => this.props.setView('learn')}
					style={styles.buttonContainer}>

					<View style={styles.button}>
						<Text style={styles.buttonText}>{'Learn How'}</Text>
					</View>

				</TouchableOpacity>

			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
		flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
  	flex: 1,
		flexDirection: 'row',
    backgroundColor: 'red',
		height: '100%',
	},
	button: {
    flex: 1,
    flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
  	color: '#fff',
		fontFamily: 'System',
		fontSize: 20,
	}
});