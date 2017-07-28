import 'react-native';
import React from 'react';
import HeartBeating from './heart_beating';

import renderer from 'react-test-renderer';

test('renders properly', () => {
	const tree = renderer.create(
		<HeartBeating />
	).toJSON();
	expect(tree).toMatchSnapshot();
})