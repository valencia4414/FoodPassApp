// src/components/shared/Header.tsx
import React, { useState } from 'react'; // <--- Agregado useState
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography } from '../../theme/colors';
import NotificationModal from './feedback/NotificationModal'; // <--- Agregado el import
import { useNavigation } from '@react-navigation/native';


interface HeaderProps {
  title: string;
  showSearch?: boolean;
  onSearchPress?: () => void;
}

export default function Header({ title, showSearch = false, onSearchPress }: HeaderProps) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false); // <--- Estado para el modal

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.appName}>FoodPass</Text>
        <Text style={styles.subtitle}>{title}</Text>
      </View>

      <View style={styles.actions}>
        {showSearch && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <MaterialIcons name="search" size={24} color={Colors.onBackground} />
          </TouchableOpacity>
        )}

        {/* Botón de notificaciones - Ahora funcional */}
        <TouchableOpacity 
          style={styles.iconButton} 
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)} // <--- Abre el modal
        >
          <View style={styles.notifWrapper}>
            <MaterialIcons name="notifications" size={24} color={Colors.onBackground} />
            <View style={styles.notifDot} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatar}
          activeOpacity={0.7}
              onPress={()=>navigation.navigate('Perfil')}>
             <Text style={styles.avatarText}>MS</Text>
        </TouchableOpacity>
        </View>

      {/* El Modal de Notificaciones */}
      <NotificationModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  titleContainer: {
    flex: 1,
  },
  appName: {
    ...Typography.titleLg,
    color: Colors.inverseSurface,
  },
  subtitle: {
    ...Typography.labelSm,
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifWrapper: {
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryContainer,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.inverseSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});