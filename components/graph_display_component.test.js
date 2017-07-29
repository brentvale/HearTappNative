import 'react-native';
import React from 'react';
import GraphDisplayComponent from './graph_display_component';

import renderer from 'react-test-renderer';

test('renders properly', () => {
	const tree = renderer.create(
		<GraphDisplayComponent />
	).toJSON();
	expect(tree).toMatchSnapshot();
})