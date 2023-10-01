import { PADDINGS, THEME } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    width: '90%',
    // height: 90,
    paddingHorizontal: PADDINGS.X_LARGE,
    paddingVertical: PADDINGS.X_LARGE * 0.9,
    backgroundColor: '#14E3E9',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    elevation: 8,
    shadowColor: THEME.BLACK,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity:0.7,
    shadowRadius: 4,
    borderRadius: PADDINGS.X_LARGE * 2
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.WHITE
  },
});

export default styles;
