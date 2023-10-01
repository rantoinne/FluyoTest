import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import styles from './styles';
import { THEME } from '@utils';

interface Props extends TouchableOpacityProps {
  title: string;
  titleStyle?: TextStyle;
}

/**
 * 
 * @param title string to render inside button
 * @param titleStyle TextStyle for title
 * @returns Button
 */
export const Button = ({
  title,
  titleStyle = {},
  style: buttonStyle = {},
  ...touchableProps
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        { backgroundColor: touchableProps.disabled ? THEME.DISABLED : THEME.SUCCESS },
        buttonStyle,
      ]}
      {...touchableProps}
    >
      <Text style={[styles.titleStyle, titleStyle]}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};
