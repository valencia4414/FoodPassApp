// src/components/PointsCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

interface PointsCardProps {
  points: number;
}

const PointsCard = ({ points }: PointsCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Puntos acumulados</Text>
      <Text style={styles.points}>{points}</Text>
      <Text style={styles.subtext}>Sigue comprando para obtener más recompensas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: -20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  points: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    marginVertical: 8,
  },
  subtext: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
});

export default PointsCard;