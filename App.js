import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './components/home_screen';
import TapHeartRateContainer from './components/tap_heart_rate_container';
import HowItWorksContainer from './components/how_it_works_container';
import NavigationBar from './components/navigation_bar';

export default class App extends Component{	
	constructor(){
		super();
		this.state = {
			//can be ["home", "tap", "learn"]
			displayScreen: "home"
		}
		this.setView = this.setView.bind(this);
		this.viewFromState = this.viewFromState.bind(this);	
	}
	
	viewFromState(){
		switch(this.state.displayScreen){
		case "home":
			return <HomeScreen setView={this.setView}/>;
		case "tap":
			return <TapHeartRateContainer setView={this.setView}/>;
		case "learn":
			return <HowItWorksContainer setView={this.setView} />;
		default: return <HomeScreen />;
		}
	}
	
	setView(view){
		this.setState({displayScreen: view});
	}
	
  render() {
		const viewFromState = this.viewFromState();
		const navigationBar = (this.state.displayScreen === "tap" || this.state.displayScreen === "learn") ? <NavigationBar setView={this.setView}/> : <Text>""</Text>;
    return (
      <View style={styles.container}>
				{navigationBar}
				{viewFromState}
      </View>
    );
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
