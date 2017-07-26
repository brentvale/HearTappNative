import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NavigationBar from './navigation_bar';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HowItWorksContainer extends Component {
	render(){
		return(
			<View style={{flex: 1}}>
				<View style={styles.container}>
					<Text>How It Works</Text>
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