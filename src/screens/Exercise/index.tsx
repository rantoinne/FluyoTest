import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Text, View } from 'react-native';
import { MainContainer, MissingWordExercise } from '@components';
import { COLLECTION_NAME, COLUMN_ALIGNMENT, EXERCISE_TYPE, ExerciseDataType, PADDINGS, THEME } from '@utils';
import firestore from '@react-native-firebase/firestore';

interface Props {
  navigation: any;
}

export const Exercise = ({
  navigation,
}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exercises, setExercises] = useState<ExerciseDataType[]>();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(-1);

  const fetchExercise = useCallback(async () => {
    try {
      const snapshot = await firestore().collection(COLLECTION_NAME).get();

      if (!snapshot.empty) {
        const exerciseData = snapshot.docs.map(doc => doc.data() as ExerciseDataType);
        setExercises(exerciseData);
        setCurrentExerciseIndex(0);
      } else {
        setExercises([]);
        setCurrentExerciseIndex(-1);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching records:', error);
      Alert.alert('Error', 'Unable to fetch records from firestore!');
    }
  }, []);
  
  useEffect(() => {
    fetchExercise();
  }, []);

  const currentExercise = () => {
    return isLoading ? null : exercises[currentExerciseIndex];
  };

  const nextExercise = () => {
    const targetExercise = exercises[currentExerciseIndex + 1];
    if (exercises.length - 1 > currentExerciseIndex + 1 && targetExercise === undefined) {
      Alert.alert('Congrats!', 'You have completed all available exercises!');
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const renderExercise = (): React.ReactElement => {
    if (!isLoading && currentExercise() !== undefined && currentExercise().exerciseType) {
      switch (currentExercise().exerciseType) {
        case EXERCISE_TYPE.MISSING_WORD:
          return (
            <MissingWordExercise
              exerciseData={currentExercise()}
              onPressSuccessCallback={nextExercise}
              onPressErrorCallback={nextExercise}
            />
          );
        default: return (
          <Text>Exercises of type {currentExercise().exerciseType} are currently not supported!</Text>
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
