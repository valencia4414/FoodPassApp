// src/screens/DashboardScreen.tsx
//
// Pantalla principal del dashboard.
//
// Conceptos nuevos:
// - ScrollView: Contenido desplazable
// - FlatList: Lista optimizada para muchos elementos
// - Dimensiones: Obtenemos el ancho de la pantalla para layouts responsive

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/shared/Header';
import { Colors, BorderRadius, Typography } from '../theme/colors';

// Obtenemos el ancho de la pantalla del dispositivo.
// Esto nos permite hacer layouts que se adapten a diferentes tamaños.
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Datos de ejemplo para las últimas transacciones
const recentTransactions = [
  { id: '1', name: 'Artisan Salad Bowl', date: 'Hoy, 12:34', amount: '-$18.25', type: 'lunch', status: 'ok' },
  { id: '2', name: 'FoodPass Signature', date: 'Ayer, 13:05', amount: '-$14.50', type: 'lunch', status: 'ok' },
  { id: '3', name: 'Kyoto Ramen Bowl', date: 'Mar, 12:45', amount: '-$21.50', type: 'lunch', status: 'ok' },
  { id: '4', name: 'Morning Delight', date: 'Lun, 08:15', amount: '-$12.75', type: 'breakfast', status: 'ok' },
];

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="Panel Principal" showSearch />

      {/* ScrollView permite que el contenido sea desplazable verticalmente */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* === SECCIÓN DE BIENVENIDA === */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>¡Hola, Juan!</Text>
          <Text style={styles.welcomeSubtitle}>Bienvenido a tu panel artesanal de hoy.</Text>
        </View>

        {/* === BENTO GRID — TARJETAS DE RESUMEN ===
            En el diseño web esto usaba un grid de 12 columnas.
            En móvil lo adaptamos: la tarjeta principal va arriba, las secundarias abajo.
            Esto sigue el patrón de "editorial rhythm" del sistema de diseño. */}

        {/* TARJETA PRINCIPAL — Almuerzos disponibles (equivale al col-span-8 del web) */}
        <View style={styles.heroCard}>
          {/* Badge de plan */}
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>PLAN PREMIUM</Text>
          </View>
          <Text style={styles.heroCardTitle}>Almuerzos disponibles</Text>
          <Text style={styles.heroCardSubtitle}>Consumos restantes de tu ciclo mensual</Text>

          {/* Número grande — el Display del sistema de tipografía */}
          <View style={styles.heroNumbers}>
            <Text style={styles.heroNumber}>14</Text>
            <Text style={styles.heroNumberDen}>/ 22 días</Text>
          </View>

          {/* Ícono decorativo (el ghost icon del diseño) */}
          <MaterialIcons
            name="restaurant"
            size={80}
            color={Colors.primaryContainer}
            style={styles.heroIcon}
          />
        </View>

        {/* TARJETAS SECUNDARIAS en fila */}
        <View style={styles.statsRow}>

          {/* Stat 1: Pedidos realizados */}
          <View style={[styles.statCard, styles.statCardGreen]}>
            <View style={styles.statCardTop}>
              <View style={styles.statIconBox}>
                <MaterialIcons name="shopping-bag" size={22} color={Colors.primary} />
              </View>
              <Text style={styles.statBadge}>+2 esta semana</Text>
            </View>
            <Text style={styles.statLabel}>PEDIDOS REALIZADOS</Text>
            <Text style={styles.statNumber}>48</Text>
          </View>

          {/* Stat 2: Puntos acumulados */}
          <View style={[styles.statCard, styles.statCardDark]}>
            <View style={styles.statCardTop}>
              <View style={[styles.statIconBox, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                <MaterialIcons name="star" size={22} color={Colors.primaryContainer} />
              </View>
            </View>
            <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.6)' }]}>PUNTOS PASS</Text>
            <Text style={[styles.statNumber, { color: Colors.primaryContainer }]}>1,240</Text>
          </View>

        </View>

        {/* === TRANSACCIONES RECIENTES ===
            Usamos una lista simple (no FlatList) porque son pocos elementos.
            Si tuvieras 100+ elementos, FlatList sería más eficiente. */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Últimos Canjes</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          {/* Renderizamos cada transacción con .map() */}
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              {/* Ícono */}
              <View style={styles.transactionIcon}>
                <MaterialIcons name="restaurant" size={20} color={Colors.primary} />
              </View>

              {/* Info */}
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>

              {/* Monto y estado */}
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
                {/* Freshness Badge — el componente signature del sistema de diseño */}
                <View style={styles.freshnessBadge}>
                  <Text style={styles.freshnessBadgeText}>OK</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* === BANNER DE PUNTOS === */}
        <TouchableOpacity style={styles.pointsBanner} activeOpacity={0.9}>
          <View style={styles.pointsBannerContent}>
            <MaterialIcons name="workspace-premium" size={32} color={Colors.primaryContainer} />
            <View style={styles.pointsBannerText}>
              <Text style={styles.pointsBannerTitle}>¡Tienes 1,240 puntos!</Text>
              <Text style={styles.pointsBannerSubtitle}>Canjéalos por platillos exclusivos</Text>
            </View>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={16} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  welcomeSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.onBackground,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  // TARJETA HÉROE
  heroCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxxl,
    padding: 24,
    marginBottom: 12,
    overflow: 'hidden', // Para que el ícono decorativo no salga de la tarjeta
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
  },
  planBadge: {
    backgroundColor: Colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onTertiaryContainer,
    letterSpacing: 1.5,
  },
  heroCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.onBackground,
    marginBottom: 4,
  },
  heroCardSubtitle: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    marginBottom: 20,
  },
  heroNumbers: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  heroNumber: {
    fontSize: 64,
    fontWeight: '800',
    color: Colors.primaryContainer,
    letterSpacing: -2,
    lineHeight: 72,
  },
  heroNumberDen: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    paddingBottom: 10,
  },
  heroIcon: {
    position: 'absolute',
    right: -10,
    top: 20,
    opacity: 0.12,
  },
  // FILA DE STATS
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.xxl,
    padding: 18,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  statCardGreen: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  statCardDark: {
    backgroundColor: Colors.inverseSurface,
  },
  statCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statIconBox: {
    width: 44,
    height: 44,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBadge: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.tertiary,
    letterSpacing: 0.5,
    textAlign: 'right',
    flexShrink: 1,
    maxWidth: 70,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.onBackground,
    letterSpacing: -0.5,
  },
  // SECCIÓN TRANSACCIONES
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    // En vez de bordes, usamos espacio vertical (regla "No-Divider" del diseño)
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  // Freshness Badge — componente signature del sistema de diseño
  freshnessBadge: {
    backgroundColor: Colors.tertiaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  freshnessBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onTertiaryContainer,
    letterSpacing: 1,
  },
  // BANNER DE PUNTOS
  pointsBanner: {
    backgroundColor: Colors.inverseSurface,
    borderRadius: BorderRadius.xxl,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointsBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  pointsBannerText: {
    flex: 1,
  },
  pointsBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  pointsBannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
});

// Necesitamos exportar este tipo para el sistema de tipos de TypeScript
const { onTertiaryContainer } = Colors;
