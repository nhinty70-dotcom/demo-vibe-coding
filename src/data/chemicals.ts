import { Chemical } from '../types/chemistry';

export const INITIAL_CHEMICALS: Chemical[] = [
  // AXIT
  {
    id: 'hcl',
    name: 'Dung dịch Axit Clohiđric',
    formula: 'HCl',
    category: 'acid',
    pH: 1.0,
    color: 'rgba(239, 68, 68, 0.15)', // Trong suốt hơi ánh nhạt
    concentration: '0.1 M',
    safetyNotes: 'Tránh tiếp xúc trực tiếp với da và mắt. Cần đeo kính bảo hộ.',
    description: 'Axit mạnh, có nhiều trong dịch vị dạ dày giúp tiêu hóa thức ăn.',
    commonUse: 'Tẩy rửa kim loại, sản xuất hợp chất hữu cơ, chế biến thực phẩm.'
  },
  {
    id: 'h2so4_dilute',
    name: 'Dung dịch Axit Sunfuric loãng',
    formula: 'H₂SO₄',
    category: 'acid',
    pH: 1.2,
    color: 'rgba(220, 38, 38, 0.15)',
    concentration: '0.05 M',
    safetyNotes: 'Dung dịch axit có tính ăn mòn nhẹ. Không nuốt hoặc làm bắn vào mắt.',
    description: 'Axit vô cơ quan trọng hàng đầu trong công nghiệp hóa chất.',
    commonUse: 'Sản xuất phân bón, ắc quy xe máy/ô tô, chất tẩy rửa.'
  },
  {
    id: 'lemon_juice',
    name: 'Nước chanh tươi',
    formula: 'C₆H₈O₇ (Citric acid)',
    category: 'acid',
    pH: 2.3,
    color: 'rgba(253, 224, 71, 0.45)',
    concentration: '~5%',
    safetyNotes: 'Chất tự nhiên an toàn. Tránh bắn vào vết thương hở.',
    description: 'Axit xitric tự nhiên tạo vị chua đặc trưng cho quả chanh và bưởi.',
    commonUse: 'Pha chế nước giải khát, gia vị thực phẩm, chất chống oxy hóa tự nhiên.'
  },
  {
    id: 'vinegar',
    name: 'Giấm ăn',
    formula: 'CH₃COOH (Acetic acid)',
    category: 'acid',
    pH: 2.9,
    color: 'rgba(254, 240, 138, 0.3)',
    concentration: '2 - 5%',
    safetyNotes: 'Axit yếu, có mùi hắc đặc trưng.',
    description: 'Dung dịch axit axetic loãng được lên men từ rượu hoặc ngũ cốc.',
    commonUse: 'Bảo quản thực phẩm, nấu ăn, tẩy rửa dầu mỡ nhẹ trong gia đình.'
  },
  {
    id: 'hno3_dilute',
    name: 'Dung dịch Axit Nitric loãng',
    formula: 'HNO₃',
    category: 'acid',
    pH: 1.5,
    color: 'rgba(252, 211, 77, 0.25)',
    concentration: '0.05 M',
    safetyNotes: 'Cần cẩn trọng khi thao tác, không ngửi trực tiếp hơi đậm đặc.',
    description: 'Axit mạnh có tính oxy hóa cao, làm ố vàng nhiều hợp chất hữu cơ.',
    commonUse: 'Sản xuất thuốc nổ, phân bón nitrat, luyện kim.'
  },

  // BAZƠ
  {
    id: 'naoh',
    name: 'Dung dịch Natri Hiđroxit loãng',
    formula: 'NaOH',
    category: 'base',
    pH: 13.0,
    color: 'rgba(59, 130, 246, 0.12)',
    concentration: '0.1 M',
    safetyNotes: 'Kiềm mạnh (xút ăn da). Gây bỏng rát da nếu tiếp xúc lâu.',
    description: 'Bazơ tan (kiềm) mạnh nhất thường dùng trong nhà thí nghiệm THCS.',
    commonUse: 'Sản xuất xà phòng, giấy, tơ nhân tạo, xử lý nước thải.'
  },
  {
    id: 'soap_water',
    name: 'Nước xà phòng',
    formula: 'C₁₇H₃₅COONa + H₂O',
    category: 'base',
    pH: 9.5,
    color: 'rgba(191, 219, 254, 0.5)',
    concentration: '~1%',
    safetyNotes: 'An toàn, cảm giác nhờn dính ngón tay khi tiếp xúc.',
    description: 'Hỗn hợp muối natri của axit béo có tính kiềm nhẹ.',
    commonUse: 'Tẩy rửa, giặt giũ, vệ sinh cá nhân hàng ngày.'
  },
  {
    id: 'baking_soda',
    name: 'Dung dịch Baking Soda',
    formula: 'NaHCO₃',
    category: 'base',
    pH: 8.4,
    color: 'rgba(243, 244, 246, 0.6)',
    concentration: '0.5 M',
    safetyNotes: 'Muối có tính kiềm yếu, an toàn.',
    description: 'Natri hiđrocacbonat tạo môi trường kiềm nhẹ, phản ứng với axit sinh khí CO₂.',
    commonUse: 'Làm bánh (bột nở), khử mùi, thuốc trung hòa axit dạ dày.'
  },
  {
    id: 'lime_water',
    name: 'Nước vôi trong',
    formula: 'Ca(OH)₂',
    category: 'base',
    pH: 12.4,
    color: 'rgba(248, 250, 252, 0.4)',
    concentration: 'Bão hòa (~0.02 M)',
    safetyNotes: 'Dung dịch bazơ tan kiềm nhẹ, làm đục khi sục khí CO₂ vào.',
    description: 'Phần nước trong phía trên khi hòa tan vôi sống CaO vào nước.',
    commonUse: 'Xử lý đất chua, làm mứt truyền thống, nhận biết khí CO₂.'
  },
  {
    id: 'baoh2',
    name: 'Dung dịch Bari Hiđroxit',
    formula: 'Ba(OH)₂',
    category: 'base',
    pH: 12.8,
    color: 'rgba(224, 242, 254, 0.2)',
    concentration: '0.05 M',
    safetyNotes: 'Dung dịch kiềm tan mạnh, độc nếu nuốt phải.',
    description: 'Bazơ mạnh được dùng để nhận biết gốc sunfat (SO₄²⁻).',
    commonUse: 'Thử nghiệm phân tích hóa học, tổng hợp muối bari.'
  },

  // TRUNG TÍNH & KHÁC
  {
    id: 'pure_water',
    name: 'Nước cất tinh khiết',
    formula: 'H₂O',
    category: 'neutral',
    pH: 7.0,
    color: 'rgba(207, 250, 254, 0.25)',
    concentration: 'Pure (100%)',
    safetyNotes: 'Hoàn toàn an toàn.',
    description: 'Nước nguyên chất đã qua chưng cất, không chứa khoáng chất hay ion dư.',
    commonUse: 'Môi trường hòa tan hóa chất, rửa dụng cụ thí nghiệm, y tế.'
  },
  {
    id: 'nacl_solution',
    name: 'Dung dịch Muối ăn',
    formula: 'NaCl',
    category: 'neutral',
    pH: 7.0,
    color: 'rgba(224, 231, 255, 0.2)',
    concentration: '0.9% (Nước muối sinh lý)',
    safetyNotes: 'An toàn, muối tạo bởi axit mạnh (HCl) và bazơ mạnh (NaOH).',
    description: 'Dung dịch trung tính hoàn toàn, không làm đổi màu quỳ tím hay phenolphthalein.',
    commonUse: 'Y tế, bảo quản thực phẩm, gia vị hàng ngày.'
  },
  {
    id: 'kno3_solution',
    name: 'Dung dịch Kali Nitrat',
    formula: 'KNO₃',
    category: 'neutral',
    pH: 7.0,
    color: 'rgba(241, 245, 249, 0.2)',
    concentration: '0.1 M',
    safetyNotes: 'Muối tan trung tính an toàn.',
    description: 'Muối trung tính tạo bởi KOH và HNO₃.',
    commonUse: 'Phân bón hóa học (phân đạm-kali), bảo quản thực phẩm.'
  }
];
