import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import NavigationBar from './navigation_bar';

export default class TapHeartRateContainer extends Component {
	render(){
		return (
			<View style={{flex: 1}}>
				<View style={styles.container}>
					<Text>Container for Tapping Heart Rate</Text>
				</View>
				<View style={styles.container}></View>
			</View>
		)
	}	
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});