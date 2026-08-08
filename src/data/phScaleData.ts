export interface RealWorldSubstance {
  ph: number;
  name: string;
  formula?: string;
  category: 'acid' | 'neutral' | 'base';
  icon: string; // Emoji or visual icon name
  description: string;
  colorHex: string;
}

export const PH_SCALE_ITEMS: RealWorldSubstance[] = [
  {
    ph: 0,
    name: 'Axit Ăn Mòn Pin / Axit Ắc Quy',
    formula: 'H₂SO₄ đậm đặc',
    category: 'acid',
    icon: '🔋',
    description: 'Axit cực mạnh, có khả năng ăn mòn cao.',
    colorHex: '#dc2626'
  },
  {
    ph: 1,
    name: 'Dịch Vị Dạ Dày & Dung dịch HCl',
    formula: 'HCl 0.1M',
    category: 'acid',
    icon: '🧪',
    description: 'Axit clohiđric trong dạ dày giúp tiêu hóa protein thức ăn.',
    colorHex: '#ea580c'
  },
  {
    ph: 2,
    name: 'Nước Chanh Tươi / Axit Citric',
    formula: 'C₆H₈O₇',
    category: 'acid',
    icon: '🍋',
    description: 'Chứa axit xitric tự nhiên, vị chua đậm.',
    colorHex: '#f97316'
  },
  {
    ph: 3,
    name: 'Giấm Ăn & Nước Ngọt Có Ga',
    formula: 'CH₃COOH / H₂CO₃',
    category: 'acid',
    icon: '🍾',
    description: 'Axit axetic trong giấm ăn và axit cacbonic trong nước có ga.',
    colorHex: '#fb923c'
  },
  {
    ph: 4,
    name: 'Nước Cà Phê Đen / Nước Ép Cà Chùa',
    category: 'acid',
    icon: '☕',
    description: 'Có tính axit nhẹ do chứa axit hữu cơ tự nhiên.',
    colorHex: '#facc15'
  },
  {
    ph: 5,
    name: 'Nước Mưa Tự Nhiên / Sữa Chua',
    category: 'acid',
    icon: '🌧️',
    description: 'Nước mưa bình thường hòa tan một lượng nhẹ CO₂ khí quyển (pH ~ 5.6).',
    colorHex: '#eab308'
  },
  {
    ph: 6,
    name: 'Sữa Tươi Nguyên Chất & Nước Bọt',
    category: 'acid',
    icon: '🥛',
    description: 'Axit rất yếu, gần như tiệm cận môi trường trung tính.',
    colorHex: '#84cc16'
  },
  {
    ph: 7,
    name: 'Nước Cất Tinh Khiết (H₂O)',
    formula: 'H₂O',
    category: 'neutral',
    icon: '💧',
    description: 'Điểm trung tính hoàn hảo (pH = 7.00 ở 25°C). Quỳ tím không đổi màu.',
    colorHex: '#22c55e'
  },
  {
    ph: 8,
    name: 'Nước Biển / Nước Máu Người',
    category: 'base',
    icon: '🌊',
    description: 'Tính kiềm rất nhẹ giúp duy trì cân bằng nội môi trong cơ thể.',
    colorHex: '#10b981'
  },
  {
    ph: 9,
    name: 'Dung dịch Baking Soda (Thuốc Bột Nở)',
    formula: 'NaHCO₃',
    category: 'base',
    icon: '🧁',
    description: 'Kiềm yếu, dùng trong chế biến thực phẩm và tẩy rửa nhẹ.',
    colorHex: '#06b6d4'
  },
  {
    ph: 10,
    name: 'Nước Xà Phòng & Thuốc Kháng Axit Dạ Dày',
    formula: 'Mg(OH)₂ / Xà phòng',
    category: 'base',
    icon: '🧼',
    description: 'Môi trường kiềm vừa, giúp xà phòng saponin phân hủy vết bẩn dầu mỡ.',
    colorHex: '#0284c7'
  },
  {
    ph: 11,
    name: 'Dung dịch Amoniac (NH₃)',
    formula: 'NH₃',
    category: 'base',
    icon: '🧹',
    description: 'Chất tẩy rửa gia dụng mạnh, mùi khai đặc trưng.',
    colorHex: '#2563eb'
  },
  {
    ph: 12,
    name: 'Nước Vôi Trong',
    formula: 'Ca(OH)₂',
    category: 'base',
    icon: '🧱',
    description: 'Kiềm mạnh, dung dịch bão hòa canxi hiđroxit.',
    colorHex: '#4f46e5'
  },
  {
    ph: 13,
    name: 'Dung dịch Xút NaOH 0.1M',
    formula: 'NaOH',
    category: 'base',
    icon: '⚡',
    description: 'Natri hiđroxit ăn da, kiềm rất mạnh.',
    colorHex: '#7c3aed'
  },
  {
    ph: 14,
    name: 'Dung dịch Xút Đậm Đặc / Chất Thông Cống',
    formula: 'NaOH đậm đặc',
    category: 'base',
    icon: '☣️',
    description: 'Mức pH kiềm tối đa trong thang chuẩn 0-14, khả năng ăn mòn hữu cơ cực cao.',
    colorHex: '#581c87'
  }
];
