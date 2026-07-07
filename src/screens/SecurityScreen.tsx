// src/screens/SecurityScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../theme/colors';

const SecurityScreen = ({ navigation }: any) => {
  // Estados para los interruptores
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);

  // Componente interno para las filas de opciones
  const SecurityOption = ({ icon, title, subtitle, onPress, hasSwitch, switchValue, onSwitchChange }: any) => (
    <TouchableOpacity 
      style={styles.optionItem} 
      onPress={onPress} 
      disabled={hasSwitch}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={22} color={Colors.primary} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>

      {hasSwitch ? (
        <Switch 
          value={switchValue} 
          onValueChange={onSwitchChange}
          trackColor={{ false: Colors.outlineVariant, true: Colors.primaryContainer }}
          thumbColor={switchValue ? Colors.surfaceContainerLowest : Colors.surfaceContainerLowest}
        />
      ) : (
        <MaterialIcons name="chevron-right" size={24} color={Colors.onSurfaceVariant} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* CABECERA CON ESTILO CONSISTENTE CON LA APP */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Seguridad</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* SECCIÓN 1: CUENTA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acceso y Cuenta</Text>
          <View style={styles.card}>
            <SecurityOption 
              icon="lock-outline" 
              title="Cambiar Contraseña" 
              subtitle="Protege tu cuenta con una clave fuerte"
              onPress={() => {}} 
            />
            <View style={styles.separator} />
            <SecurityOption 
              icon="fingerprint" 
              title="Acceso Biométrico" 
              subtitle="Face ID o Huella digital"
              hasSwitch
              switchValue={isBiometricEnabled}
              onSwitchChange={setIsBiometricEnabled}
            />
            <View style={styles.separator} />
            <SecurityOption 
              icon="verified-user" 
              title="Verificación en dos pasos" 
              hasSwitch
              switchValue={isTwoFactorEnabled}
              onSwitchChange={setIsTwoFactorEnabled}
            />
          </View>
        </View>

        {/* SECCIÓN 2: DISPOSITIVOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dispositivos y Sesiones</Text>
          <View style={styles.card}>
            <SecurityOption 
              icon="devices" 
              title="Sesiones Activas" 
              subtitle="2 dispositivos conectados ahora"
              onPress={() => {}} 
            />
            <View style={styles.separator} />
            <SecurityOption 
              icon="history" 
              title="Historial de Inicios" 
              onPress={() => {}} 
            />
          </View>
        </View>

        {/* SECCIÓN 3: PRIVACIDAD */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidad</Text>
          <View style={styles.card}>
            <SecurityOption 
              icon="visibility-off" 
              title="Ocultar Actividad" 
              onPress={() => {}} 
            />
            <View style={styles.separator} />
            <SecurityOption 
              icon="delete-forever" 
              title="Eliminar mi cuenta" 
              onPress={() => {}} 
            />
          </View>
        </View>

        <Text style={styles.footerText}>FoodPass App v2.4.1 — Conexión segura</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  optionSubtitle: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.surfaceContainerLow,
    marginLeft: 70, // Alinea el separador con el texto
  },
  footerText: {
    textAlign: 'center',
    color: Colors.onSurfaceVariant,
    fontSize: 11,
    marginTop: 10,
    marginBottom: 30,
  }
});

export default SecurityScreen;