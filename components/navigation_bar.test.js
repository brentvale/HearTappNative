import 'react-native';
import React from 'react';
import NavigationBar from './navigation_bar';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
	const tree = renderer.create(
		<NavigationBar />
	).toJSON();
	expect(tree).toMatchSnapshot();
})