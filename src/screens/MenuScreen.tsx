// src/screens/MenuScreen.tsx
//
// Pantalla del menú de comidas.
//
// Conceptos nuevos:
// - FlatList: Lista eficiente para renderizar muchos elementos
// - numColumns: Para hacer grids con FlatList
// - useState para filtros interactivos

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/shared/Header';
import { Colors, BorderRadius } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Calculamos el ancho de cada tarjeta para el grid de 2 columnas
const CARD_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2; // padding*2 - gap

// Categorías del filtro
const categories = ['Todos', 'Entradas', 'Plato Fuerte', 'Postres'];

// Datos del menú
const menuItems = [
  {
    id: '1',
    name: 'Artisan Salad Bowl',
    description: 'Mezcla orgánica de hojas verdes con salmón ahumado.',
    price: '$18.25',
    badge: 'Fresh',
    badgeType: 'green',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'Entradas',
  },
  {
    id: '2',
    name: 'FoodPass Signature',
    description: 'Hamburguesa de res premium con queso artesanal.',
    price: '$14.50',
    badge: null,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'Plato Fuerte',
  },
  {
    id: '3',
    name: 'Pasta del Huerto',
    description: 'Pasta hecha a mano con tomates cherry orgánicos.',
    price: '$16.00',
    badge: null,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    category: 'Plato Fuerte',
  },
  {
    id: '4',
    name: 'Morning Delight',
    description: 'Tostada de masa madre con aguacate y huevo pochado.',
    price: '$12.75',
    badge: 'Top Rated',
    badgeType: 'orange',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    category: 'Entradas',
  },
  {
    id: '5',
    name: 'Kyoto Ramen Bowl',
    description: 'Caldo tonkotsu cocido por 12 horas.',
    price: '$21.50',
    badge: null,
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400',
    category: 'Plato Fuerte',
  },
  {
    id: '6',
    name: 'Tiramisú Artesanal',
    description: 'Postre italiano tradicional con café espresso.',
    price: '$9.50',
    badge: 'Nuevo',
    badgeType: 'green',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    category: 'Postres',
  },
];

// Tipo para los items del menú
type MenuItem = typeof menuItems[0];

export default function MenuScreen() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Filtramos los items según la categoría seleccionada
  const filteredItems = activeCategory === 'Todos'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  // Componente para renderizar cada tarjeta del menú.
  // Lo definimos como una función separada para que FlatList sea más eficiente.
  const renderMenuCard = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      {/* Imagen del plato */}
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          // resizeMode controla cómo se ajusta la imagen al contenedor
          resizeMode="cover"
        />
        {/* Badge si existe */}
        {item.badge && (
          <View style={[
            styles.badge,
            item.badgeType === 'green' ? styles.badgeGreen : styles.badgeOrange
          ]}>
            <Text style={[
              styles.badgeText,
              item.badgeType === 'green' ? styles.badgeTextGreen : styles.badgeTextOrange
            ]}>
              {item.badge.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Contenido de la tarjeta */}
      <View style={styles.cardContent}>
        <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
        {/* numberOfLines limita el texto a N líneas con "..." al final */}
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>

        {/* Precio y botón */}
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.selectButton} activeOpacity={0.8}>
            <Text style={styles.selectButtonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="Menú Digital" showSearch />

      {/* Banner del plato destacado */}
      <View style={styles.featuredBanner}>
        <View style={styles.featuredOverlay}>
          <View style={styles.chefBadge}>
            <Text style={styles.chefBadgeText}>RECOMENDACIÓN DEL CHEF</Text>
          </View>
          <Text style={styles.featuredTitle}>Corte Artisan{'\n'}con Finas Hierbas</Text>
          <View style={styles.featuredFooter}>
            <TouchableOpacity style={styles.featuredButton} activeOpacity={0.8}>
              <MaterialIcons name="shopping-cart" size={16} color={Colors.onPrimaryContainer} />
              <Text style={styles.featuredButtonText}>Seleccionar</Text>
            </TouchableOpacity>
            <Text style={styles.featuredPrice}>$45.50</Text>
          </View>
        </View>
      </View>

      {/* Filtros de categoría */}
      {/* Usamos ScrollView horizontal para que quepan todos los filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
        style={styles.filtersScroll}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterChip,
              activeCategory === cat && styles.filterChipActive,
            ]}
            onPress={() => setActiveCategory(cat)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.filterChipText,
              activeCategory === cat && styles.filterChipTextActive,
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid de platos con FlatList
          FlatList es mejor que ScrollView + .map() para listas largas porque:
          - Solo renderiza los elementos visibles en pantalla
          - Recicla los elementos cuando hacen scroll (como RecyclerView en Android)
          - Tiene optimizaciones automáticas de rendimiento */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuCard}
        keyExtractor={(item) => item.id}
        numColumns={2}                      // Grid de 2 columnas
        columnWrapperStyle={styles.row}     // Estilo para cada fila del grid
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // BANNER DESTACADO
  featuredBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    height: 160,
    borderRadius: BorderRadius.xxxl,
    backgroundColor: Colors.inverseSurface,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(39, 53, 23, 0.75)',
    padding: 20,
    justifyContent: 'space-between',
  },
  chefBadge: {
    backgroundColor: Colors.tertiaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  chefBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onTertiaryContainer,
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.xl,
  },
  featuredButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
  },
  featuredPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  // FILTROS
  filtersScroll: {
    maxHeight: 50,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainer,
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
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: Colors.onSurface,
    fontWeight: '700',
  },
  // LISTA
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  // TARJETA DE PLATO
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    overflow: 'hidden',
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardImageContainer: {
    height: 130,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  badgeGreen: {
    backgroundColor: Colors.tertiaryContainer,
  },
  badgeOrange: {
    backgroundColor: Colors.primaryContainer,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  badgeTextGreen: {
    color: Colors.onTertiaryContainer,
  },
  badgeTextOrange: {
    color: Colors.onPrimaryContainer,
  },
  cardContent: {
    padding: 14,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardDescription: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    lineHeight: 15,
    marginBottom: 12,
  },
  cardFooter: {
    gap: 8,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryContainer,
    letterSpacing: -0.5,
  },
  selectButton: {
    backgroundColor: Colors.primaryContainer,
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
  },
});
