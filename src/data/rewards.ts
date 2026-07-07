// src/data/rewards.ts

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  icon: string;   // <-- Ahora cada producto tiene su propio emoji
}

export const rewardsData: Reward[] = [
  {
    id: '1',
    name: '10% de descuento',
    description: 'Ahorra en tu próxima compra. ¡Válido para cualquier producto!',
    pointsRequired: 150,
    icon: '💸',   // Dinero volando
  },
  {
    id: '2',
    name: 'Café gratis',
    description: 'Disfruta de un delicioso café americano en nuestra tienda.',
    pointsRequired: 300,
    icon: '☕',   // Taza de café
  },
  {
    id: '3',
    name: '30% de descuento',
    description: 'Un descuento especial para que te lleves más por menos.',
    pointsRequired: 500,
    icon: '🎯',   // Dardo acertando
  },
  {
    id: '4',
    name: 'Almuerzo gratis',
    description: 'Un almuerzo completo por cortesía de la casa. ¡Date un gusto!',
    pointsRequired: 1500,
    icon: '🍽️',  // Plato con cubiertos
  },
];