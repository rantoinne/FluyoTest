import { Text, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { EXERCISE_TYPE_HEADER_TITLE_MAP, ExerciseDataType, PADDINGS, THEME, checkIfArraysAreSame } from '@utils';
import { Button, Pill } from '@components'
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
  disableInteraction = false,
  onPressSuccessCallback,
  onPressErrorCallback,
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
  const [learningStatement, setLearningStatement] = useState<any>(statement.replaceAll('_', '_________').split(' '));
  const [resultBannerButtonType, setResultBannerButtonType] = useState<'SUBMIT' | 'SUCCESS' | 'ERROR'>('SUBMIT');

  const statementWords = nativeStatement.split(' ');

  useEffect(() => {
    const learningStatementString = learningStatement.map(l => l.trim()).join(' ').replaceAll('_________', '_');
    if (statement !== learningStatementString) {
      setLearningStatement(statement.replaceAll('_', '_________').split(' '));
    }
  }, [statement]);
  
  const resetStates = () =>  {
    setSelectedOptions([]);
    setLearningStatement(['']);
    setResultBannerButtonType('SUBMIT');
  };

  const handleOptionPress = (option: string) => {
    const updatedOptions = [...selectedOptions, option];
    setSelectedOptions(prevState => [...prevState, option]);
    
    updatedOptions.forEach(s => {
      const index = learningStatement.findIndex(l => l === '_________');
      const l = learningStatement;
      l[index] = (
        <Pill
          key={`updt_options_${s}`}
          title={option}
          disabled={true}
          fakeButton
          buttonStyle={{
            ...Platform.select({
              ios: {
                shadowOpacity: 0,
              },
              android: {
                elevation: 0,
              }
            }),
          }}
        />
      );
      setLearningStatement(l);
    });
  };

  const handleButtonPress = () => {
    switch (resultBannerButtonType) {
      case 'SUBMIT': {
        const areOptionsCorrect = checkIfArraysAreSame(selectedOptions, answers);
        setResultBannerButtonType(areOptionsCorrect ? 'SUCCESS' : 'ERROR');
      }
      break;
      default: break;
    }
  }

  const renderResult = (): React.ReactElement => {
    switch (resultBannerButtonType) {
      case 'SUBMIT': return (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingBottom: PADDINGS.MEDIUM
          }}
        >
          <Button
            title="Check Answer"
            disabled={selectedOptions.length !== answers.length}
            onPress={handleButtonPress}
          />
        </View>
      );
      case 'SUCCESS': return (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#14E3E9',
            paddingBottom: PADDINGS.X_LARGE * 2,
            paddingTop: PADDINGS.LARGE,
            justifyContent: 'center',
            borderTopRightRadius: 28,
            borderTopLeftRadius: 28,
          }}
        >
          <Text
            style={{
              width: '90%',
              alignSelf: 'center',
              textAlign: 'left',
              fontSize: 16,
              color: THEME.WHITE,
              fontWeight: 'bold',
              marginBottom: PADDINGS.LARGE
            }}
          >
            Great Job!
          </Text>
          <Button
            title="Continue"
            style={{
              backgroundColor: THEME.WHITE,
            }}
            titleStyle={{
              color: '#14E3E9'
            }}
            onPress={() => {
              resetStates();
              onPressSuccessCallback();
            }}
          />
        </View>
      );
      case 'ERROR': return (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#FE7B89',
            paddingBottom: PADDINGS.X_LARGE * 2,
            paddingTop: PADDINGS.LARGE,
            justifyContent: 'center',
            borderTopRightRadius: 28,
            borderTopLeftRadius: 28,
          }}
        >
          <Text
            style={{
              width: '90%',
              alignSelf: 'center',
              textAlign: 'left',
              fontSize: 16,
              color: THEME.WHITE,
              fontWeight: 'bold',
              marginBottom: PADDINGS.LARGE
            }}
          >
            Answer(s):
            {' '}
            <Text style={{ fontSize: 14 }}>
              {answers.join(', ')}
            </Text>
          </Text>
          <Button
            title="Continue"
            onPress={() => {
              resetStates();
              onPressErrorCallback();
            }}
            style={{
              backgroundColor: THEME.WHITE,
            }}
            titleStyle={{
              color: '#FE7B89'
            }}
          />
        </View>
      );
    }
  }
  
  return (
    <View
      style={styles.containerStyle}
    >
      <View style={{ maxHeight: '80%', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 16,
            color: THEME.WHITE,
          }}
        >
          {EXERCISE_TYPE_HEADER_TITLE_MAP[exerciseType]}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingHorizontal: PADDINGS.SMALL,
            marginTop: PADDINGS.X_LARGE,
          }}
        >
          {statementWords.map((word, index) => {
            const isHighlighted = targetWords.includes(index);

            return (
              <Text
                key={`statement_${word}`}
                style={{
                  textDecorationLine: isHighlighted ? 'underline' : 'none',
                  margin: 4,
                  fontSize: 24,
                  color: THEME.WHITE,
                  fontWeight: isHighlighted ? 'bold': '400',
                  textAlign: 'center'
                }}
              >
                {word}
              </Text>
            );
          })}
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: PADDINGS.SMALL,
            marginTop: PADDINGS.X_LARGE,
          }}
        >
          {learningStatement.map((word, index) => {
            if (typeof word !== 'string') return word;
            return (
              <Text
                key={`statement_${index}`}
                style={{
                  margin: 4,
                  fontSize: 24,
                  color: THEME.WHITE,
                  textAlign: 'center'
                }}
              >
                {word}
              </Text>
            );
          })}
        </View>

        {/* Options */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            paddingHorizontal: PADDINGS.SMALL,
            marginTop: PADDINGS.X_LARGE * 2,
          }}
        >
          {
            options.map(option => (
              <Pill
                key={`options_${option}`}
                title={option}
                onPress={handleOptionPress.bind(null, option)}
                disabled={
                  selectedOptions.length === answers.length
                  || disableInteraction
                  || selectedOptions.includes(option)
                }
                hide={selectedOptions.includes(option)}
                buttonStyle={{
                  ...Platform.select({
                    ios: {
                      shadowOpacity: 0.7,
                    },
                    android: {
                      elevation: 8,
                    }
                  }),
                }}
              />
            ))
          }
        </View>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        {renderResult()}
      </View>
    </View>
  );
};
