import { PADDINGS, THEME } from '@utils';

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: THEME.PRIMARY,
  },
  exerciseWrapper: {
    flex: 1,
    marginTop: '25%',
    width: '99%',
    backgroundColor: THEME.SECONDARY,
    borderTopLeftRadius: PADDINGS.X_LARGE,
    borderTopRightRadius: PADDINGS.X_LARGE,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: PADDINGS.X_LARGE * 2
  },
};

export default styles;
