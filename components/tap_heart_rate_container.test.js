import 'react-native';
import React from 'react';
import TapHeartRateContainer from './tap_heart_rate_container';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <TapHeartRateContainer />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});