import React from 'react';

import Music from './music';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
    const tree = renderer.create(<Music />).toJSON();

    expect(tree).toMatchSnapshot();
});