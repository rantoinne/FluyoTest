import { Text, TouchableOpacity, TouchableOpacityProps, Platform, ViewStyle } from 'react-native';
import React from 'react';
import { THEME } from '@utils';
import styles from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  hide?: boolean;
  fakeButton?: boolean;
  buttonStyle?: ViewStyle;
}

/**
 * 
 * @param title string to render inside button
 * @param hide (optional) boolean to hide contents and disable button
 * @returns Pill shaped button
 */
export const Pill = ({
  title,
  hide = false,
  fakeButton = false,
  buttonStyle = {},
  ...touchableProps
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        {
          backgroundColor: hide ? THEME.DISABLED
            : touchableProps.disabled && !fakeButton
            ? THEME.CADET_BLUE : THEME.WHITE,
          ...Platform.select({
            ios: {
              shadowOpacity: hide ? 0 : 0.7,
            },
            android: {
              elevation: hide ? 0 : 8,
            }
          }),
        },
        buttonStyle]}
      { ...touchableProps }
    >
      <Text
        style={[
          styles.titleStyle,
          { color: hide ? THEME.DISABLED : THEME.SECONDARY }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
