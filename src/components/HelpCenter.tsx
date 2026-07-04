import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../theme/colors';

export default function HelpCenter() {
  return (
    <View style={styles.container}>

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>
          ¿Cómo podemos ayudarte?
        </Text>

        <Text style={styles.subtitle}>
          Encuentra respuestas rápidas o consulta nuestros canales de atención.
        </Text>
      </View>

      {/* Barra de búsqueda (solo visual) */}
      <View style={styles.searchBox}>
        <MaterialIcons
          name="search"
          size={22}
          color={Colors.onSurfaceVariant}
        />

        <Text style={styles.searchText}>
          Buscar ayuda
        </Text>
      </View>

      {/* Preguntas frecuentes */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="quiz"
            size={24}
            color={Colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.cardTitle}>
            Preguntas frecuentes
          </Text>

          <Text style={styles.cardDescription}>
            Consulta las dudas más comunes.
          </Text>
        </View>

        <MaterialIcons
          name="arrow-forward-ios"
          size={16}
          color={Colors.onSurfaceVariant}
        />
      </TouchableOpacity>

      {/* Contactar soporte */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="support-agent"
            size={24}
            color={Colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.cardTitle}>
            Contactar soporte
          </Text>

          <Text style={styles.cardDescription}>
            Nuestro equipo está listo para ayudarte.
          </Text>
        </View>

        <MaterialIcons
          name="arrow-forward-ios"
          size={16}
          color={Colors.onSurfaceVariant}
        />
      </TouchableOpacity>

      {/* Correo */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="email"
            size={24}
            color={Colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.cardTitle}>
            Correo electrónico
          </Text>

          <Text style={styles.cardDescription}>
            soporte@foodpass.com
          </Text>
        </View>

        <MaterialIcons
          name="arrow-forward-ios"
          size={16}
          color={Colors.onSurfaceVariant}
        />
      </TouchableOpacity>

      {/* Teléfono */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="phone"
            size={24}
            color={Colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.cardTitle}>
            Teléfono
          </Text>

          <Text style={styles.cardDescription}>
            +57 300 123 4567
          </Text>
        </View>

        <MaterialIcons
          name="arrow-forward-ios"
          size={16}
          color={Colors.onSurfaceVariant}
        />
      </TouchableOpacity>

      {/* Horario */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="schedule"
            size={24}
            color={Colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.cardTitle}>
            Horario de atención
          </Text>

          <Text style={styles.cardDescription}>
            Lunes a Viernes
          </Text>

          <Text style={styles.cardDescription}>
            8:00 AM - 6:00 PM
          </Text>
        </View>
      </View>

      {/* Versión */}
      <View style={styles.versionContainer}>
        <Text style={styles.version}>
          Versión 2.4.1
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.onSurface,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },

  searchText: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.onSurfaceVariant,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#121f05',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  info: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 4,
  },

  cardDescription: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
  },

  versionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  version: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
  },

});