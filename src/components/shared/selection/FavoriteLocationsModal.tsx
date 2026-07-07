// src/components/shared/selection/FavoriteLocationsModal.tsx
import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Pressable,
  Linking, 
  Platform 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Typography, Shadows } from '../../../theme/colors';

interface FavoriteLocationsModalProps {
  visible: boolean;
  onClose: () => void;
}

// DIRECCIONES CORREGIDAS Y OFICIALES DEL SENA CALI
const INITIAL_LOCATIONS = [
  { 
    id: '1', 
    name: 'SENA Complejo Salomia', 
    address: 'Calle 52 #2bis-15, Cali', 
    hours: 'Lun-Sáb: 6:00 AM - 10:00 PM', 
    phone: '(602) 431 5800', 
    favorite: true 
  },
  { 
    id: '2', 
    name: 'SENA Centro Pondaje (CDTI)', 
    address: 'Calle 72K #26J-97, Cali', 
    hours: 'Lun-Vie: 6:00 AM - 10:00 PM', 
    phone: '(602) 431 5800', 
    favorite: true 
  },
  { 
    id: '3', 
    name: 'SENA San Antonio (Construcción)', 
    address: 'Calle 5 #4-48, Cali', 
    hours: 'Lun-Vie: 8:00 AM - 6:00 PM', 
    phone: '(602) 431 5800', 
    favorite: true 
  },
  { 
    id: '4', 
    name: 'SENA CEAI (La Floresta)', 
    address: 'Calle 34 #17b-23, Cali', 
    hours: 'Lun-Vie: 8:00 AM - 5:30 PM', 
    phone: '(602) 431 5800', 
    favorite: true 
  },
  { 
    id: '5', 
    name: 'SENA Sede Andrés Sanín', 
    address: 'Calle 75 #19-52, Cali', 
    hours: 'Lun-Vie: 8:00 AM - 6:00 PM', 
    phone: '(602) 431 5800', 
    favorite: true 
  },
];

export default function FavoriteLocationsModal({ visible, onClose }: FavoriteLocationsModalProps) {
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);

  // FUNCIÓN DE MAPAS MEJORADA (Busca por nombre para mayor precisión)
  const openInMaps = (name: string, address: string) => {
    // Combinamos nombre y dirección para que Google Maps no se pierda
    const searchQuery = `${name}, ${address}`;
    const encodedQuery = encodeURIComponent(searchQuery);
    
    const url = Platform.select({
      ios: `maps:0,0?q=${encodedQuery}`,
      android: `geo:0,0?q=${encodedQuery}`,
      default: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`
    });

    if (url) {
      Linking.openURL(url).catch(err => console.error("Error al abrir el mapa", err));
    }
  };

  const toggleFavorite = (id: string) => {
    setLocations(prev => prev.map(loc => 
      loc.id === id ? { ...loc, favorite: !loc.favorite } : loc
    ));
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={Typography.titleLg}>Sedes Favoritas</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={locations}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.infoGroup}>
                  <Text style={styles.locationName}>{item.name}</Text>
                  
                  <View style={styles.detailRow}>
                    <MaterialIcons name="place" size={14} color={Colors.primary} />
                    <Text style={styles.detailText}>{item.address}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <MaterialIcons name="access-time" size={14} color={Colors.onSurfaceVariant} />
                    <Text style={styles.detailText}>{item.hours}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <MaterialIcons name="phone" size={14} color={Colors.onSurfaceVariant} />
                    <Text style={styles.detailText}>{item.phone}</Text>
                  </View>
                </View>

                <View style={styles.actionGroup}>
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <MaterialIcons 
                      name={item.favorite ? "star" : "star-border"} 
                      size={26} 
                      color={item.favorite ? Colors.primaryContainer : Colors.outlineVariant} 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.miniBtn}
                    onPress={() => openInMaps(item.name, item.address)}
                  >
                    <MaterialIcons name="near-me" size={18} color={Colors.primary} />
                  </TouchableOpacity>
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
    maxHeight: '80%',
    ...Shadows.modal,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  infoGroup: {
    flex: 1,
  },
  locationName: {
    ...Typography.titleMd,
    color: Colors.onSurface,
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  detailText: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
  },
  actionGroup: {
    alignItems: 'center',
    gap: 12,
    paddingLeft: 10,
  },
  miniBtn: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.surfaceContainerHigh,
  },
});