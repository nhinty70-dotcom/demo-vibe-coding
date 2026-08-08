import { Indicator } from '../types/chemistry';

export const INDICATORS: Indicator[] = [
  {
    id: 'litmus_purple',
    name: 'Giấy quỳ tím (Chuẩn)',
    type: 'paper',
    description: 'Giấy quỳ trung tính màu tím. Đổi sang ĐỎ trong môi trường Axit, đổi sang XANH LÁ/XANH DƯƠNG trong môi trường Bazơ.',
    usageGuide: 'Nhúng giấy quỳ tím vào dung dịch 1-2 giây rồi rút ra quan sát vệt màu đổi trên giấy.'
  },
  {
    id: 'litmus_red',
    name: 'Giấy quỳ đỏ',
    type: 'paper',
    description: 'Giấy quỳ đã được xử lý thành màu đỏ. Chuyển sang màu XANH DƯƠNG khi gặp Bazơ, giữ nguyên màu ĐỎ trong Axit và Trung tính.',
    usageGuide: 'Thường dùng để kiểm tra tính Kiềm (Bazơ) của dung dịch hay khí amoniac.'
  },
  {
    id: 'litmus_blue',
    name: 'Giấy quỳ xanh',
    type: 'paper',
    description: 'Giấy quỳ đã xử lý thành màu xanh. Chuyển sang màu ĐỎ khi gặp Axit, giữ nguyên màu XANH trong Bazơ và Trung tính.',
    usageGuide: 'Thường dùng để phát hiện nhanh môi trường Axit.'
  },
  {
    id: 'phenolphthalein',
    name: 'Dung dịch Phenolphthalein',
    type: 'liquid',
    description: 'Chỉ thị dạng dung dịch lỏng trong suốt. Không đổi màu trong Axit & Trung tính (pH ≤ 8.2), chuyển màu HỒNG / TÍM HỒNG rực rỡ trong Bazơ (pH > 8.2).',
    usageGuide: 'Nhỏ 2-3 giọt dung dịch phenolphthalein vào ống nghiệm và lắc nhẹ.'
  },
  {
    id: 'ph_paper',
    name: 'Giấy chỉ thị pH (Chỉ thị vạn năng)',
    type: 'paper',
    description: 'Giấy dải màu đo chỉ số pH từ 0 đến 14. Cho biết chính xác mức độ axit mạnh, yếu hay bazơ.',
    usageGuide: 'Nhúng vào dung dịch và so sánh màu sắc với bảng màu thang pH chuẩn.'
  },
  {
    id: 'universal_liquid',
    name: 'Dung dịch Chỉ thị Phổ quát (Universal Indicator)',
    type: 'liquid',
    description: 'Dung dịch đổi màu theo dải quang phổ (Đỏ -> Cam -> Vàng -> Xanh lá -> Xanh lam -> Tím) ứng với pH từ 0 đến 14.',
    usageGuide: 'Nhỏ 3-5 giọt vào dung dịch để xem dải màu biến đổi toàn diện.'
  }
];

/**
 * Calculates result color of Litmus or pH Paper strip dipped into liquid with a specific pH.
 */
export function getPaperColorByPH(indicatorId: string, ph: number): string {
  if (indicatorId === 'litmus_purple') {
    if (ph < 6.5) return '#ef4444'; // Red for acid
    if (ph > 7.5) return '#2563eb'; // Blue for base
    return '#8b5cf6'; // Purple for neutral
  }

  if (indicatorId === 'litmus_red') {
    if (ph > 7.5) return '#2563eb'; // Turns blue in base
    return '#ef4444'; // Stays red in acid/neutral
  }

  if (indicatorId === 'litmus_blue') {
    if (ph < 6.5) return '#ef4444'; // Turns red in acid
    return '#2563eb'; // Stays blue in base/neutral
  }

  if (indicatorId === 'ph_paper') {
    return getExactPHColor(ph);
  }

  return '#8b5cf6';
}

/**
 * Calculates liquid color when liquid indicator (e.g. Phenolphthalein or Universal) is added.
 */
export function getLiquidIndicatorColorByPH(
  indicatorId: string,
  ph: number,
  baseLiquidColor: string
): string {
  if (indicatorId === 'phenolphthalein') {
    if (ph > 8.2) {
      // Intensely pink / magenta in base
      const intensity = Math.min(1, (ph - 8.2) / 4);
      return `rgba(236, 72, 153, ${0.4 + intensity * 0.5})`;
    }
    // Colorless in acid & neutral
    return baseLiquidColor;
  }

  if (indicatorId === 'universal_liquid') {
    // Universal indicator colors liquid based on pH spectrum
    const spectrumColor = getExactPHColor(ph);
    return convertHexToRgba(spectrumColor, 0.7);
  }

  return baseLiquidColor;
}

/**
 * Map pH 0-14 to exact color on Universal pH scale
 */
export function getExactPHColor(ph: number): string {
  const roundedPH = Math.max(0, Math.min(14, ph));

  if (roundedPH <= 0) return '#dc2626'; // Deep Red (pH 0)
  if (roundedPH <= 1) return '#ea580c'; // Red-Orange (pH 1)
  if (roundedPH <= 2) return '#f97316'; // Orange-Red (pH 2)
  if (roundedPH <= 3) return '#fb923c'; // Orange (pH 3)
  if (roundedPH <= 4) return '#facc15'; // Yellow-Orange (pH 4)
  if (roundedPH <= 5) return '#eab308'; // Yellow (pH 5)
  if (roundedPH <= 6) return '#84cc16'; // Light Green-Yellow (pH 6)
  if (roundedPH <= 7) return '#22c55e'; // Pure Green (pH 7 Neutral)
  if (roundedPH <= 8) return '#10b981'; // Blue-Green (pH 8)
  if (roundedPH <= 9) return '#06b6d4'; // Cyan-Blue (pH 9)
  if (roundedPH <= 10) return '#0284c7'; // Blue (pH 10)
  if (roundedPH <= 11) return '#2563eb'; // Deep Blue (pH 11)
  if (roundedPH <= 12) return '#4f46e5'; // Indigo (pH 12)
  if (roundedPH <= 13) return '#7c3aed'; // Purple (pH 13)
  return '#581c87'; // Dark Purple / Violet (pH 14)
}

/**
 * Helper to get Vietnamese label for pH environment category
 */
export function getPHCategoryLabel(ph: number): { text: string; badgeColor: string; description: string } {
  if (ph < 3) {
    return {
      text: 'Axit Mạnh',
      badgeColor: 'bg-red-100 text-red-800 border-red-300',
      description: 'Môi trường axit rất mạnh (pH < 3). Quỳ tím hóa đỏ đậm, pH paper ngả đỏ da cam.'
    };
  }
  if (ph < 6.5) {
    return {
      text: 'Axit Yếu',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Môi trường axit yếu (3 ≤ pH < 6.5). Quỳ tím hóa hồng/đỏ nhẹ, pH paper ngả vàng/cam.'
    };
  }
  if (ph <= 7.5) {
    return {
      text: 'Trung Tính',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Môi trường trung tính (pH ≈ 7). Quỳ tím giữ nguyên màu tím, Phenolphthalein không đổi màu.'
    };
  }
  if (ph <= 11) {
    return {
      text: 'Bazơ Yếu (Kiềm yếu)',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      description: 'Môi trường kiềm nhẹ (7.5 < pH ≤ 11). Quỳ tím hóa xanh nhạt, Phenolphthalein bắt đầu hóa hồng.'
    };
  }
  return {
    text: 'Bazơ Mạnh (Kiềm mạnh)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Môi trường kiềm rất mạnh (pH > 11). Quỳ tím hóa xanh thẫm, Phenolphthalein hóa hồng tím đậm.'
  };
}

function convertHexToRgba(hex: string, alpha: number): string {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
