import { PADDINGS, THEME } from '@utils';
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: PADDINGS.X_LARGE,
    paddingVertical: PADDINGS.X_LARGE * 0.8,
    justifyContent: 'center',
    backgroundColor: THEME.WHITE,
    alignItems: 'center',
    margin: 4,
    ...Platform.select({
      ios: {
        shadowColor: THEME.BLACK,
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      }
    }),
    borderRadius: PADDINGS.X_LARGE
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
