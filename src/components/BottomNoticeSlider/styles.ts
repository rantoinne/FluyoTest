import { PADDINGS, THEME } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: PADDINGS.X_LARGE * 2,
    paddingTop: PADDINGS.LARGE,
    justifyContent: 'center',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  titleText: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 16,
    color: THEME.WHITE,
    fontWeight: 'bold',
    marginBottom: PADDINGS.LARGE
  },
});

export default styles;
