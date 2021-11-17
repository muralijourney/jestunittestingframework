/**
 * @format
 */

import 'react-native';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import App from '../App';
import { Alert } from 'react-native';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App/>);
});

it('Component: toMatchSnapshot', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Login Flow Check', async ()  => {
  const push = jest.fn();
  jest.spyOn(Alert, 'alert');
  const {getByTestId,getByPlaceholderText} = render(<App/>)
  fireEvent.changeText(getByPlaceholderText(/Email./i), "m@gmail.com")
  fireEvent.changeText(getByPlaceholderText(/Password./i), "1234")
  fireEvent.press(getByTestId('touchable'))
  await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Login Success')
  });
});
