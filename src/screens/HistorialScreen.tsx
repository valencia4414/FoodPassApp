// src/screens/HistorialScreen.tsx
//
// Pantalla de historial de pedidos.

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/shared/Header';
import { Colors, BorderRadius } from '../theme/colors';

const filters = ['Todos', 'Últimos 30 días', 'Este mes', 'Pasados'];

interface Transaction {
  id: string;
  name: string;
  restaurant: string;
  date: Date;
  amount: number;
  status: 'ok' | 'pending';
  points: number;
}

// Genera fechas relativas para que la simulación de filtros funcione correctamente
const getRelativeDate = (daysAgo: number, hours: number = 12, minutes: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const transactionsData: Transaction[] = [
  {
    id: '1',
    name: 'Artisan Salad Bowl',
    restaurant: 'FoodPass — Sede Centro',
    date: getRelativeDate(0, 12, 34), // Hoy
    amount: 18.25,
    status: 'ok',
    points: 18,
  },
  {
    id: '2',
    name: 'FoodPass Signature Burger',
    restaurant: 'FoodPass — Sede Norte',
    date: getRelativeDate(1, 13, 5), // Ayer
    amount: 14.50,
    status: 'ok',
    points: 14,
  },
  {
    id: '3',
    name: 'Kyoto Ramen Bowl',
    restaurant: 'FoodPass — Sede Centro',
    date: getRelativeDate(6, 12, 45), // Hace 6 días (dentro de 30 días, este mes)
    amount: 21.50,
    status: 'ok',
    points: 21,
  },
  {
    id: '4',
    name: 'Morning Delight Toast',
    restaurant: 'FoodPass — Cafetería',
    date: getRelativeDate(12, 8, 15), // Hace 12 días (dentro de 30 días, este mes)
    amount: 12.75,
    status: 'ok',
    points: 12,
  },
  {
    id: '5',
    name: 'Pizza Margherita Luxe',
    restaurant: 'FoodPass — Sede Sur',
    date: getRelativeDate(35, 13, 20), // Hace 35 días (pasados)
    amount: 19.00,
    status: 'pending',
    points: 19,
  },
  {
    id: '6',
    name: 'Pasta del Huerto',
    restaurant: 'FoodPass — Sede Centro',
    date: getRelativeDate(45, 12, 55), // Hace 45 días (pasados)
    amount: 16.00,
    status: 'ok',
    points: 16,
  },
];

// Formateador dinámico de fechas en español
const formatTxDate = (date: Date) => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const timeStr = date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  }).toUpperCase();

  if (diffDays === 0 && date.getDate() === now.getDate()) {
    return `Hoy, ${timeStr}`;
  } else if (diffDays === 1 || (diffDays === 0 && date.getDate() !== now.getDate())) {
    return `Ayer, ${timeStr}`;
  } else {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${timeStr}`;
  }
};

// Formateador de moneda sin decimales para los stats
const formatCurrency = (val: number) => {
  return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

export default function HistorialScreen() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Filtrado de transacciones
  const filteredTransactions = useMemo(() => {
    return transactionsData.filter((item) => {
      const timeDiff = Date.now() - item.date.getTime();
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      
      if (activeFilter === 'Todos') {
        return true;
      }
      if (activeFilter === 'Últimos 30 días') {
        return daysDiff <= 30;
      }
      if (activeFilter === 'Este mes') {
        const now = new Date();
        return item.date.getMonth() === now.getMonth() && item.date.getFullYear() === now.getFullYear();
      }
      if (activeFilter === 'Pasados') {
        return daysDiff > 30;
      }
      return true;
    });
  }, [activeFilter]);

  // Cálculos dinámicos para las estadísticas basándonos en el filtro
  const stats = useMemo(() => {
    let baseOrders = 0;
    let baseSavings = 0;

    // Suma de puntos para los elementos actualmente filtrados
    const pointsSum = filteredTransactions.reduce((sum, item) => sum + item.points, 0);

    // Ajuste de base para mantener consistencia visual premium
    if (activeFilter === 'Todos') {
      baseOrders = 122; // 122 + 6 = 128
      baseSavings = 1400; // 1400 + (100 * 0.5) = 1450
    } else if (activeFilter === 'Últimos 30 días') {
      baseOrders = 40; // 40 + 4 = 44
      baseSavings = 450;
    } else if (activeFilter === 'Este mes') {
      baseOrders = 25; // 25 + 4 = 29
      baseSavings = 280;
    } else if (activeFilter === 'Pasados') {
      baseOrders = 82; // 82 + 2 = 84
      baseSavings = 950;
    }

    const totalPedidos = baseOrders + filteredTransactions.length;
    // Cada punto equivale a $0.50 adicionales de ahorro en la simulación
    const totalAhorro = baseSavings + (pointsSum * 0.5);

    // Texto dinámico para el subtítulo de la tarjeta
    let subtitleText = `Has disfrutado de ${totalPedidos} experiencias culinarias este año.`;
    if (activeFilter === 'Este mes') {
      subtitleText = `Has disfrutado de ${totalPedidos} experiencias culinarias este mes.`;
    } else if (activeFilter === 'Últimos 30 días') {
      subtitleText = `Has disfrutado de ${totalPedidos} experiencias en los últimos 30 días.`;
    } else if (activeFilter === 'Pasados') {
      subtitleText = `Historial acumulado de ${totalPedidos} experiencias anteriores.`;
    }

    // Pedidos restantes para la próxima recompensa (basado en el total actual)
    const ordersLeft = Math.max(1, 5 - (totalPedidos % 5));

    return {
      totalPedidos,
      totalAhorro,
      subtitleText,
      ordersLeft,
    };
  }, [filteredTransactions, activeFilter]);

  const renderTransaction = (item: Transaction) => {
    const formattedDate = formatTxDate(item.date);
    const formattedAmount = `-$${item.amount.toFixed(2)}`;
    const formattedPoints = `+${item.points} pts`;

    return (
      <TouchableOpacity key={item.id} style={styles.transactionCard} activeOpacity={0.8}>
        {/* Ícono */}
        <View style={styles.transactionIconWrap}>
          <MaterialIcons name="restaurant" size={22} color={Colors.primary} />
        </View>

        {/* Info principal */}
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.transactionRestaurant} numberOfLines={1}>{item.restaurant}</Text>
          <Text style={styles.transactionDate}>{formattedDate}</Text>
        </View>

        {/* Monto y estado */}
        <View style={styles.transactionRight}>
          <Text style={styles.transactionAmount}>{formattedAmount}</Text>
          <View style={[
            styles.statusBadge,
            item.status === 'ok' ? styles.statusBadgeOk : styles.statusBadgePending
          ]}>
            <Text style={[
              styles.statusBadgeText,
              item.status === 'ok' ? styles.statusTextOk : styles.statusTextPending
            ]}>
              {item.status === 'ok' ? 'OK' : 'PEND'}
            </Text>
          </View>
          <Text style={styles.transactionPoints}>{formattedPoints}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="Historial" showSearch />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* === STATS HERO (Bento asimétrico) === */}
        <View style={styles.statsContainer}>
          {/* Tarjeta grande (Blanca) */}
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatTitle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.9}>
              Tu Trayectoria Gastronómica
            </Text>
            <Text style={styles.heroStatSubtitle} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.8}>
              {stats.subtitleText}
            </Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStatCol}>
                <Text style={styles.heroStatLabel} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.8}>
                  TOTAL PEDIDOS
                </Text>
                <Text 
                  style={[styles.heroStatNumber, { color: Colors.primary }]} 
                  numberOfLines={1} 
                  adjustsFontSizeToFit
                  minimumFontScale={0.5}
                >
                  {stats.totalPedidos}
                </Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatCol}>
                <Text style={styles.heroStatLabel} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.8}>
                  AHORRO FOODPASS
                </Text>
                <Text 
                  style={[styles.heroStatNumber, { color: Colors.tertiary }]} 
                  numberOfLines={1} 
                  adjustsFontSizeToFit
                  minimumFontScale={0.5}
                >
                  ${formatCurrency(stats.totalAhorro)}
                </Text>
              </View>
            </View>
          </View>

          {/* Tarjeta elite (Oscura) */}
          <View style={styles.eliteCard}>
            <View style={styles.eliteIcon}>
              <MaterialIcons name="workspace-premium" size={32} color={Colors.onPrimaryContainer} />
            </View>
            <Text style={styles.eliteTitle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.9}>
              Miembro Elite
            </Text>
            <Text 
              style={styles.eliteSubtitle} 
              numberOfLines={3} 
              adjustsFontSizeToFit 
              minimumFontScale={0.7}
            >
              Estás a {stats.ordersLeft} {stats.ordersLeft === 1 ? 'pedido' : 'pedidos'} de tu próxima recompensa.
            </Text>
            <TouchableOpacity style={styles.eliteButton} activeOpacity={0.8}>
              <Text 
                style={styles.eliteButtonText} 
                numberOfLines={1} 
                adjustsFontSizeToFit 
                minimumFontScale={0.7}
              >
                Ver Beneficios
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* === FILTROS === */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          style={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.filterChipText,
                activeFilter === filter && styles.filterChipTextActive,
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* === LISTA DE TRANSACCIONES === */}
        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Historial Detallado</Text>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((item) => renderTransaction(item))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="info-outline" size={40} color={Colors.outline} />
              <Text style={styles.emptyText}>No hay pedidos para este período</Text>
            </View>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  // STATS
  statsContainer: {
    flexDirection: 'row',
    gap: 10, // Un poco más ajustado para pantallas pequeñas
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 16,
  },
  heroStatCard: {
    flex: 1.8, // Mayor peso relativo a la tarjeta oscura para evitar desbordes
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    padding: 16, // Menos padding para maximizar espacio interior
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  heroStatTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 4,
    lineHeight: 18,
    flexShrink: 1,
  },
  heroStatSubtitle: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    lineHeight: 14,
    marginBottom: 12,
    flexShrink: 1,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexShrink: 1,
  },
  heroStatCol: {
    flex: 1,
    alignItems: 'flex-start',
    flexShrink: 1,
    overflow: 'hidden',
  },
  heroStatLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.outline,
    letterSpacing: 0.5, // Reducido para encajar mejor
    marginBottom: 2,
    lineHeight: 10,
    flexShrink: 1,
  },
  heroStatNumber: {
    fontSize: 26, // Ligeramente reducido de 28
    fontWeight: '800',
    letterSpacing: -0.5,
    flexShrink: 1,
  },
  heroStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.outlineVariant,
    opacity: 0.3,
    marginHorizontal: 8,
  },
  eliteCard: {
    flex: 1,
    backgroundColor: Colors.inverseSurface,
    borderRadius: BorderRadius.xxl,
    padding: 12, // Menos padding para evitar desbordes de texto
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  eliteIcon: {
    width: 48, // Ajustado de 56
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  eliteTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
    flexShrink: 1,
  },
  eliteSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 13,
    marginBottom: 8,
    flexShrink: 1,
  },
  eliteButton: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    flexShrink: 1,
    overflow: 'hidden',
  },
  eliteButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    flexShrink: 1,
  },
  // FILTROS
  filtersScroll: {
    maxHeight: 48,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surfaceContainerLow,
  },
  filterChipActive: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  // LISTA
  listSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onBackground,
    marginBottom: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  transactionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  transactionRestaurant: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  statusBadgeOk: {
    backgroundColor: Colors.tertiaryContainer,
  },
  statusBadgePending: {
    backgroundColor: Colors.primaryContainer,
  },
  statusBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  statusTextOk: {
    color: Colors.onTertiaryContainer,
  },
  statusTextPending: {
    color: Colors.onPrimaryContainer,
  },
  transactionPoints: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.tertiary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.outline,
    fontWeight: '600',
  },
});
