// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Badge from './Badge.js';

it('Badge renders', () => {
  const component = renderer.create(<Badge>Test</Badge>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
