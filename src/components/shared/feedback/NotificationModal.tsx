// src/components/shared/feedback/NotificationModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Typography, Shadows } from '../../../theme/colors';

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const NOTIFICATIONS = [
  { id: '1', message: 'Tu pedido de carne con verduras está en camino.', time: 'Hace 5 min', icon: 'delivery-dining' },
  { id: '2', message: '¡Tu pedido ya está listo para recoger!', time: 'Hace 15 min', icon: 'restaurant' },
  { id: '3', message: 'El restaurante ha recibido tu orden.', time: 'Hace 1 hora', icon: 'check-circle' },
];

export default function NotificationModal({ visible, onClose }: NotificationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={Typography.titleLg}>Notificaciones</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={NOTIFICATIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.notifItem}>
                <View style={styles.iconBadge}>
                  <MaterialIcons name={item.icon as any} size={20} color={Colors.primary} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.message}>{item.message}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 31, 5, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxxl,
    padding: 20,
    maxHeight: '60%',
    ...Shadows.modal,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: { flex: 1 },
  message: { ...Typography.bodyMd, color: Colors.onSurface },
  time: { ...Typography.labelMd, color: Colors.onSurfaceVariant, marginTop: 4 },
  separator: {
    height: 1,
    backgroundColor: Colors.surfaceContainerHigh,
  },
});