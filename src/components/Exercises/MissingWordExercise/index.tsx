import { Text, View, Platform, ScrollView } from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  THEME,
  ExerciseDataType,
  checkIfArraysAreSame,
  EXERCISE_BUTTON_TYPE,
  EXERCISE_TYPE_HEADER_TITLE_MAP,
  replaceAllAndSplit,
  mergeAndReplaceAll,
} from '@utils';
import { BottomNoticeSlider, Button, Pill } from '@components'
import styles from './styles';

interface Props {
  exerciseData: ExerciseDataType;
  disableInteraction?: boolean;
  onPressSuccessCallback: () => void;
  onPressErrorCallback: () => void;
}

/**
 * 
 * @param exerciseData data fetched from firestore
 * @param disableInteraction (optional) boolean to halt user interaction
 * @param onPressSuccessCallback callback triggered after success button is presses
 * @param onPressErrorCallback callback triggered after error button is presses
 * @returns exercise for Missing words
 */
export const MissingWordExercise = ({
  exerciseData,
  onPressErrorCallback,
  onPressSuccessCallback,
  disableInteraction = false,
}: Props): JSX.Element => {
  const {
    options,
    answers,
    targetWords,
    exerciseType,
    nativeStatement,
    learningStatement: statement,
  } = exerciseData;

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [learningStatement, setLearningStatement] = useState<(string | ReactNode)[]>
    (replaceAllAndSplit(statement, '_', '_________', ' '));
  const [resultBannerButtonType, setResultBannerButtonType] = useState<EXERCISE_BUTTON_TYPE>
    (EXERCISE_BUTTON_TYPE.SUBMIT);

  const statementWords = nativeStatement.split(' ');

  const resetStates = (): void =>  {
    setSelectedOptions([]);
    setLearningStatement(['']);
    setResultBannerButtonType(EXERCISE_BUTTON_TYPE.SUBMIT);
  };
  
  useEffect(() => {
    const learningStatementString = mergeAndReplaceAll(learningStatement, '_________', '_', ' ');

    if (statement !== learningStatementString) {
      setSelectedOptions([]);
      setLearningStatement(replaceAllAndSplit(statement, '_', '_________', ' '));
    }
  }, [statement]);

  const handleOptionPress = (option: string): void => {
    const updatedOptions = [...selectedOptions, option];
    setSelectedOptions(prevState => [...prevState, option]);
    
    updatedOptions.forEach(opt => {
      const index = learningStatement.findIndex(ls => ls === '_________');
      const updatedStatement = learningStatement;
      updatedStatement[index] = (
        <Pill
          key={`updt_options_${opt}`}
          title={option}
          disabled={true}
          fakeButton
          buttonStyle={{
            ...Platform.select({
              ios: { shadowOpacity: 0 },
              android: { elevation: 0 }
            }),
          }}
        /> as ReactNode
      );
      setLearningStatement(updatedStatement);
    });
  };

  const handleButtonPress = (): void => {
    switch (resultBannerButtonType) {
      case EXERCISE_BUTTON_TYPE.SUBMIT: {
        const areOptionsCorrect = checkIfArraysAreSame(selectedOptions, answers);
        setResultBannerButtonType(areOptionsCorrect
          ? EXERCISE_BUTTON_TYPE.SUCCESS : EXERCISE_BUTTON_TYPE.ERROR);
      }
      break;
      case EXERCISE_BUTTON_TYPE.SUCCESS: {
        resetStates();
        onPressSuccessCallback();
      }
      break;
      case EXERCISE_BUTTON_TYPE.ERROR: {
        resetStates();
        onPressErrorCallback();
      }
      break;
      default: break;
    }
  }

  const renderButtonContainer = (): JSX.Element => {
    switch (resultBannerButtonType) {
      case EXERCISE_BUTTON_TYPE.SUBMIT: return (
        <View style={styles.submitButtonWrapper}>
          <Button
            title="Check Answer"
            onPress={handleButtonPress}
            disabled={selectedOptions.length !== answers.length}
          />
        </View>
      );
      case EXERCISE_BUTTON_TYPE.SUCCESS: return (
        <BottomNoticeSlider
          title="Great Job!"
          bgColor={THEME.SUCCESS}
          titleColor={THEME.SUCCESS}
          buttonBGColor={THEME.WHITE}
          onPress={handleButtonPress}
        />
      );
      case EXERCISE_BUTTON_TYPE.ERROR: return (
        <BottomNoticeSlider
          bgColor={THEME.ERROR}
          titleColor={THEME.ERROR}
          buttonBGColor={THEME.WHITE}
          onPress={handleButtonPress}
          title={`Answer(s): ${answers.join(', ')}`}
        />
      );
      default: return null;
    }
  }
  
  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollContainerStyle}>
        <Text style={styles.exerciseTitleText}>
          {EXERCISE_TYPE_HEADER_TITLE_MAP[exerciseType]}
        </Text>

        <View style={styles.statementTextWrapper}>
          {statementWords.map((word: string, index: number) => {
            const isHighlighted = targetWords.includes(index);
            return (
              <Text
                key={`statement_${word}`}
                style={[
                  styles.wordText,
                  {
                    fontWeight: isHighlighted ? 'bold': '400',
                    textDecorationLine: isHighlighted ? 'underline' : 'none',
                  }
                ]}
              >
                {word}
              </Text>
            );
          })}
        </View>

        <View style={styles.learningStatementTextWrapper}>
          {learningStatement.map((word, index) => {
            if (typeof word !== 'string') return word;
            return (
              <Text
                key={`statement_${index}`}
                style={styles.learningWordText}
              >
                {word}
              </Text>
            );
          })}
        </View>

        {/* Options */}
        <View style={styles.optionsWrapper}>
          {
            options.map(option => (
              <Pill
                title={option}
                key={`options_${option}`}
                onPress={handleOptionPress.bind(null, option)}
                disabled={
                  selectedOptions.length === answers.length
                  || disableInteraction
                  || selectedOptions.includes(option)
                }
                hide={selectedOptions.includes(option)}
                buttonStyle={{
                  ...Platform.select({
                    android: { elevation: 8 },
                    ios: { shadowOpacity: 0.7 },
                  }),
                }}
              />
            ))
          }
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {renderButtonContainer()}
      </View>
    </View>
  );
};
