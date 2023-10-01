This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Tech Used
- React Native
- TS
- Firebase Firestore
- React Navigation Stack

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


## Firestore Config
This document outlines the Firestore database schema for the Language Translation app. The app facilitates the learning of a new language by providing users with incomplete statements in their known language and options to choose from for the missing words.

## Collections

### `exercises`

This collection stores exercises that consist of a learning statement, native statement, options, target words, and correct answers.

**Fields**:

- `exerciseType` (String): Type of exercise.
- `learningStatement` (String): The statement in the language the user want to learn (e.g., "I ____ a car.").
- `nativeStatement` (String): The same statement in the language the user's known language. The missing words are represented by _. The position of this underscore is defined by targetWords key. This way multiple missing words can be added to same statement.
- `options` (Array of Strings): An array of strings representing the options for the missing words.
- `targetWords` (Array of Numbers): Index positions of the missing words in the learning statement.
- `answers` (Array of Numbers): Index positions of the correct options.


## Example Document

```plaintext
Document ID: exercise1

{
  exerciseType: "MISSING_WORD",
  learningStatement: "I drive a car.",
  nativeStatement: "ich _ ein Auto",
  options: ["fahre", "have", "buy", "like"],
  targetWords: [1],
  answers: ['fahre']
}
```

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

