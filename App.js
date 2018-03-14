import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import HomeScreen from './components/home_screen';
import TapHeartRateContainer from './components/tap_heart_rate_container';
import HowItWorksContainer from './components/how_it_works_container';
import NavigationBar from './components/navigation_bar';

export default class App extends Component{	
	constructor(){
		super();
		this.state = {
			//can be ["home", "tap", "learn"]
			displayScreen: "home",
		}
	};
	
	setView = (view) => {
		this.setState({displayScreen: view});
	};
	
  render() {

    return (
      <View style={styles.container}>
				{(this.state.displayScreen === "tap" || this.state.displayScreen === "learn") &&
					<NavigationBar setView={this.setView}/>}

				<View style={{flex: 9, flexDirection: 'row'}}>
          {this.state.displayScreen === 'home' &&
						<HomeScreen setView={this.setView}/>}

          {this.state.displayScreen === 'tap' &&
						<TapHeartRateContainer/>}

          {this.state.displayScreen === 'learn' &&
						<HowItWorksContainer/>}
				</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: 'column',
    backgroundColor: '#fff',
  },
});
