import { COLOR_CODE_TYPE } from '@utils';
import React from 'react';
import { Text, TouchableOpacityProps, View } from 'react-native';
import { Button } from '@components';
import styles from './styles';

type Props = {
  title: string;
  bgColor: COLOR_CODE_TYPE;
  buttonBGColor: COLOR_CODE_TYPE;
  titleColor: COLOR_CODE_TYPE;
} & TouchableOpacityProps;

/**
 * 
 * @param title string to render inside button
 * @param bgColor background color for level 1 wrapper
 * @param buttonBGColor background color for button
 * @param titleColor background color for button title
 * @returns BottomNoticeSlider
 */
export const BottomNoticeSlider = ({
  title,
  bgColor,
  titleColor,
  buttonBGColor,
  ...touchableProps
}: Props): React.ReactElement => {
  return (
    <View
      style={[
        styles.containerStyle,
        { backgroundColor: bgColor },
      ]}
    >
      <Text style={styles.titleText}>
        {title}
      </Text>
      <Button
        title="Continue"
        style={{ backgroundColor: buttonBGColor }}
        titleStyle={{ color: titleColor }}
        {...touchableProps}
      />
    </View>
  );
};