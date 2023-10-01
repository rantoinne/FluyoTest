import { View, ViewProps, ViewStyle } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import { COLUMN_ALIGNMENT, convertStyle } from '@utils';
import styles from './styles';

interface Props extends ViewProps {
  columnAlignment?: COLUMN_ALIGNMENT;
  containerStyle?: ViewStyle;
}

/**
 * 
 * @param columnAlignment(optional) One of COLUMN_ALIGNMENT. Defaults to CENTER
 * @param containerStyle(optional) ViewStyle for wrapper
 * @returns High level view for child components
 */
export const MainContainer: FC<PropsWithChildren<Props>> = ({
  children = null,
  columnAlignment = COLUMN_ALIGNMENT.CENTER,
  ...restViewProps
}): React.ReactElement => {
  if (columnAlignment !== COLUMN_ALIGNMENT.CENTER) {
    styles.containerStyle = convertStyle(
      styles.containerStyle,
      [{
        justifyContent: columnAlignment === COLUMN_ALIGNMENT.START
          ? 'flex-start'
          : 'flex-end',
      }],
    );
  }

  return (
    <View style={[styles.containerStyle]} {...restViewProps}>
      {children}
    </View>
  );
};
