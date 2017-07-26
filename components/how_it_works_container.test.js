import 'react-native';
import React from 'react';
import HowItWorksContainer from './how_it_works_container';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
	const tree = renderer.create(
		<HowItWorksContainer/>	
	).toJSON();
	expect(tree).toMatchSnapshot();
});
