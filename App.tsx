import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './src/pages/Home';


export default function App() {

  const [loaded] = useFonts({
    SourceRegular: require('./src/Fonts/SourceSansPro-Regular.ttf'),
    SourceLigth: require('./src/Fonts/SourceSansPro-Light.ttf'),
    SourceLigthExtra: require('./src/Fonts/SourceSansPro-ExtraLight.ttf'),
    SourceBold: require('./src/Fonts/SourceSansPro-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <>
      <Home />
      <StatusBar style="light" backgroundColor="#57abff" />
    </>
  );
}

