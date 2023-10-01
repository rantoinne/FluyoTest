import { Dimensions } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

export const getSafeAreaInsets: EdgeInsets = useSafeAreaInsets();

export const windowDimensions = Dimensions.get('window');
