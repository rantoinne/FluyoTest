import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Text, View } from 'react-native';
import { MainContainer, MissingWordExercise } from '@components';
import {
  THEME,
  PADDINGS,
  EXERCISE_TYPE,
  fetchExercises,
  COLUMN_ALIGNMENT,
  ExerciseDataType,
} from '@utils';

export const Exercise = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exercises, setExercises] = useState<ExerciseDataType[]>();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(-1);

  const loadExercises = useCallback(async () => {
    const fetchedExercises = await fetchExercises();
    setExercises(fetchedExercises);
    setCurrentExerciseIndex(fetchedExercises.length > 0 ? 0 : -1);
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    loadExercises();
  }, []);

  const currentExercise = isLoading ? null : exercises[currentExerciseIndex];

  const nextExercise = () => {
    const targetExercise = exercises[currentExerciseIndex + 1];
    if (exercises.length - 1 > currentExerciseIndex + 1 && targetExercise === undefined) {
      Alert.alert('Congrats!', 'You have completed all available exercises!');
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const renderExercise = (): React.ReactElement => {
    const showExercise = !isLoading && currentExercise !== undefined && currentExercise.exerciseType;
    if (showExercise) {
      switch (currentExercise.exerciseType) {
        case EXERCISE_TYPE.MISSING_WORD:
          return (
            <MissingWordExercise
              exerciseData={currentExercise}
              onPressSuccessCallback={nextExercise}
              onPressErrorCallback={nextExercise}
            />
          );
        default: return (
          <Text>Exercises of type {currentExercise.exerciseType} are currently not supported!</Text>
        );
      }
    }
    return <Text>We are working on to add more exercises!</Text>;
  }
  
  return (
    <MainContainer
      columnAlignment={COLUMN_ALIGNMENT.END}
      containerStyle={{ backgroundColor: THEME.PRIMARY }}
    >
      <View
        style={{
          flex: 1,
          marginTop: '25%',
          width: '99%',
          backgroundColor: THEME.SECONDARY,
          borderTopLeftRadius: PADDINGS.X_LARGE,
          borderTopRightRadius: PADDINGS.X_LARGE,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: PADDINGS.X_LARGE * 2
        }}
      >
        {
          isLoading ? (
            <ActivityIndicator size={Platform.OS ? 'large' : 32} />
          ) : renderExercise()
        }
      </View>
    </MainContainer>
  );
};
