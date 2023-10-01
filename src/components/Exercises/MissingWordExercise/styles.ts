import { PADDINGS, THEME } from '@utils';
import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContainerStyle: { maxHeight: '80%', alignItems: 'center' },
  exerciseTitleText: {
    fontSize: 16,
    color: THEME.WHITE,
  },
  statementTextWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: PADDINGS.SMALL,
    marginTop: PADDINGS.X_LARGE,
  },
  wordText: {
    margin: 4,
    fontSize: 24,
    color: THEME.WHITE,
    textAlign: 'center',
  },
  learningStatementTextWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PADDINGS.SMALL,
    marginTop: PADDINGS.X_LARGE,
  },
  learningWordText: {
    margin: 4,
    fontSize: 24,
    color: THEME.WHITE,
    textAlign: 'center'
  },
  optionsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: PADDINGS.SMALL,
    marginTop: PADDINGS.X_LARGE * 2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  submitButtonWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: PADDINGS.MEDIUM
  },
});

export default styles;
