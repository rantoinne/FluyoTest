import firestore from '@react-native-firebase/firestore';
import { COLLECTION_NAME } from './constants';
import { ExerciseDataType } from './types';
import { Alert } from 'react-native';

/**
 * @description Method fetches records from firestore
 * @returns ExerciseDataType[]
 */
export const fetchExercises = async (): Promise<ExerciseDataType[]> => {
  let exerciseData: ExerciseDataType[] = [];
  try {
    const snapshot = await firestore().collection(COLLECTION_NAME).get();
    if (!snapshot.empty) {
      exerciseData = snapshot.docs.map(doc => doc.data() as ExerciseDataType);
    } else {
      exerciseData = [];
    }

  } catch (e) {
    console.log('Error occurred whie fetching docs');
    Alert.alert('Error', 'Unable to fetch records from firestore!');
  }
  return exerciseData;
};
