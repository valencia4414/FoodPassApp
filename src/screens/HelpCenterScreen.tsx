import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import Header from '../components/shared/Header';
import HelpCenter from '../components/HelpCenter';

import { Colors } from '../theme/colors';

export default function HelpCenterScreen() {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >
      <Header title="Centro de Ayuda" />

      <HelpCenter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
});