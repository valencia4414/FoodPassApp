// src/components/RewardItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { Reward } from '../data/rewards';

interface RewardItemProps {
  reward: Reward;
}

const RewardItem = ({ reward }: RewardItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🎁</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{reward.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {reward.description}
        </Text>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsRequired}>{reward.pointsRequired}</Text>
        <Text style={styles.pointsLabel}>pts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondary + '20', // verde con opacidad
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.accent + '10',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsRequired: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  pointsLabel: {
    fontSize: 11,
    color: COLORS.accent,
  },
});

export default RewardItem;