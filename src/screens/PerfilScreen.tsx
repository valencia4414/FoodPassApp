// src/screens/PerfilScreen.tsx
//
// Pantalla de perfil del usuario.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../theme/colors';
import SwitchField from '../components/shared/selection/SwitchField';
import { useNavigation } from '@react-navigation/native';
import FavoriteLocationsModal from '../components/shared/selection/FavoriteLocationsModal';

// Tipo para los items del menú de configuración
type SettingItem = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  description?: string;
  type: 'arrow' | 'toggle' | 'badge';
  badge?: string;
  badgeColor?: string;
  value?: boolean;
};

const settingsSections: { title: string; items: SettingItem[] }[] = [
  {
    title: 'Mi Cuenta',
    items: [
      { icon: 'person-outline', label: 'Información personal', type: 'arrow' },
      { icon: 'workspace-premium', label: 'Mi plan', description: 'Premium · Activo', type: 'badge', badge: 'Premium', badgeColor: Colors.primaryContainer },
      { icon: 'notifications-none', label: 'Notificaciones', type: 'toggle', value: true },
      { icon: 'lock-outline', label: 'Seguridad', type: 'arrow' },
    ],
  },
  {
    title: 'FoodPass',
    items: [
      { icon: 'restaurant-menu', label: 'Preferencias de menú', type: 'arrow' },
      { icon: 'place', label: 'Mis sedes favoritas', type: 'arrow' },
      { icon: 'card-giftcard', label: 'Programa de puntos', type: 'badge', badge: '1,240 pts', badgeColor: Colors.tertiaryContainer },
    ],
  },
  {
    title: 'Soporte',
    items: [
      { icon: 'help-outline', label: 'Centro de ayuda', type: 'arrow' },
      { icon: 'chat-bubble-outline', label: 'Contactar soporte', type: 'arrow' },
      { icon: 'info-outline', label: 'Versión 2.4.1', type: 'badge', badge: 'Actualizado', badgeColor: Colors.tertiaryContainer },
    ],
  },
];

export default function PerfilScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [favModalVisible, setFavModalVisible] = useState(false); // Estado para el modal de sedes
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Mi Perfil</Text>
        <TouchableOpacity style={styles.topBarAction}>
          <MaterialIcons name="edit" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JP</Text>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={18} color={Colors.tertiary} />
            </View>
          </View>

          <Text style={styles.profileName}>Juan Perez</Text>
          <Text style={styles.profileEmail}>juan.perez@empresa.com</Text>

          <View style={styles.membershipChip}>
            <MaterialIcons name="workspace-premium" size={14} color={Colors.onPrimaryContainer} />
            <Text style={styles.membershipText}>Premium Member</Text>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatNumber}>128</Text>
              <Text style={styles.profileStatLabel}>PEDIDOS</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatNumber}>1,240</Text>
              <Text style={styles.profileStatLabel}>PUNTOS</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={[styles.profileStatNumber, { color: Colors.tertiary }]}>$1,450</Text>
              <Text style={styles.profileStatLabel}>AHORRADO</Text>
            </View>
          </View>
        </View>

        {settingsSections.map((section) => (
          <View key={section.title} style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>{section.title.toUpperCase()}</Text>

            <View style={styles.settingsGroup}>
              {section.items.map((item, index) => {
                const isLast = index === section.items.length - 1;

                if (item.type === 'toggle') {
                    return (
                        <View key={item.label} style={[styles.settingItem, isLast && styles.settingItemLast]}>
                            <View style={styles.settingIcon}>
                                <MaterialIcons name={item.icon} size={20} color={Colors.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <SwitchField 
                                    label={item.label}
                                    value={notificationsEnabled}
                                    onToggle={(val) => setNotificationsEnabled(val)}
                                />
                            </View>
                        </View>
                    );
                }

                return (
                    <TouchableOpacity
                      key={item.label}
                      style={[styles.settingItem, isLast && styles.settingItemLast]}
                      activeOpacity={0.7}
                      onPress={() => {
                        if (item.label === 'Centro de ayuda') {
                          navigation.navigate('HelpCenter');
                        } else if (item.label === 'Mis sedes favoritas') {
                          setFavModalVisible(true); // Abrir el modal
                        }
                      }}
                    >
                      <View style={styles.settingIcon}>
                        <MaterialIcons name={item.icon} size={20} color={Colors.primary} />
                      </View>
    
                      <View style={styles.settingText}>
                        <Text style={styles.settingLabel}>{item.label}</Text>
                        {item.description && (
                          <Text style={styles.settingDescription}>{item.description}</Text>
                        )}
                      </View>
    
                      {item.type === 'arrow' && (
                        <MaterialIcons name="arrow-forward-ios" size={14} color={Colors.onSurfaceVariant} />
                      )}
                      {item.type === 'badge' && item.badge && (
                        <View style={[styles.settingBadge, { backgroundColor: item.badgeColor }]}>
                          <Text style={styles.settingBadgeText}>{item.badge}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <MaterialIcons name="logout" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* MODAL DE SEDES FAVORITAS */}
      <FavoriteLocationsModal 
        visible={favModalVisible} 
        onClose={() => setFavModalVisible(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: 'rgba(255,255,255,0.85)', elevation: 3 },
  topBarTitle: { fontSize: 20, fontWeight: '800', color: Colors.onBackground, letterSpacing: -0.3 },
  topBarAction: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surfaceContainerLow, justifyContent: 'center', alignItems: 'center' },
  scroll: { flex: 1 },
  profileCard: { margin: 20, backgroundColor: Colors.inverseSurface, borderRadius: BorderRadius.xxxl, padding: 28, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primaryContainer, justifyContent: 'center', alignItems: 'center', marginBottom: 14, position: 'relative' },
  avatarText: { fontSize: 28, fontWeight: '800', color: Colors.onPrimaryContainer },
  verifiedBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.surfaceContainerLowest, borderRadius: 12, padding: 2 },
  profileName: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  profileEmail: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 14 },
  membershipChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.primaryContainer, paddingHorizontal: 14, paddingVertical: 6, borderRadius: BorderRadius.full, marginBottom: 24 },
  membershipText: { fontSize: 12, fontWeight: '700', color: Colors.onPrimaryContainer },
  profileStats: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: BorderRadius.xl, padding: 16, width: '100%', justifyContent: 'space-around' },
  profileStat: { alignItems: 'center' },
  profileStatNumber: { fontSize: 20, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  profileStatLabel: { fontSize: 8, fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginTop: 2 },
  profileStatDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.15)' },
  settingsSection: { marginBottom: 8, paddingHorizontal: 20 },
  settingsSectionTitle: { fontSize: 10, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 1.5, marginBottom: 8, paddingLeft: 4 },
  settingsGroup: { backgroundColor: Colors.surfaceContainerLowest, borderRadius: BorderRadius.xxl, overflow: 'hidden' },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.surfaceContainerLow },
  settingItemLast: { borderBottomWidth: 0 },
  settingIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.surfaceContainerLow, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  settingText: { flex: 1 },
  settingLabel: { fontSize: 14, fontWeight: '600', color: Colors.onSurface },
  settingDescription: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 1 },
  settingBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.full },
  settingBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.onPrimaryContainer, letterSpacing: 0.5 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginHorizontal: 20, marginTop: 8, paddingVertical: 16, backgroundColor: Colors.errorContainer, borderRadius: BorderRadius.xl },
  logoutText: { fontSize: 15, fontWeight: '700', color: Colors.error },
});