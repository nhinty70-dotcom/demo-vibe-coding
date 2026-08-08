import { ChallengeLevel } from '../types/chemistry';

export const CHALLENGE_LEVELS: ChallengeLevel[] = [
  {
    id: 1,
    title: 'Level 1: Phân biệt Axit & Bazơ cơ bản',
    description: 'Sử dụng giấy quỳ tím để phát hiện môi trường Axit và Bazơ của 2 dung dịch trong phòng thí nghiệm.',
    objective: 'Thí nghiệm với dung dịch HCl và dung dịch NaOH bằng quỳ tím và ghi lại kết luận.',
    hint: 'Axit làm quỳ tím hóa ĐỎ, Bazơ làm quỳ tím hóa XANH.',
    requiredTaskType: 'classify_simple',
    points: 100,
    badge: '🥇 Thám Tử Quỳ Tím'
  },
  {
    id: 2,
    title: 'Level 2: Phân loại 5 dung dịch thực tế',
    description: 'Kiểm tra 5 dung dịch quen thuộc (Nước chanh, Giấm, Nước xà phòng, Baking Soda, Nước cất) và phân thành 3 nhóm Axit, Bazơ, Trung tính.',
    objective: 'Sử dụng giấy chỉ thị pH hoặc quỳ tím để xác định chính xác môi trường của cả 5 dung dịch.',
    hint: 'Nước chanh & Giấm thuộc nhóm Axit; Nước xà phòng & Baking Soda thuộc nhóm Bazơ; Nước cất là Trung tính.',
    requiredTaskType: 'classify_multi',
    points: 200,
    badge: '🧪 Chuyên Gia Phân Loại'
  },
  {
    id: 3,
    title: 'Level 3: Giải mã Dung Dịch Bí Ẩn',
    description: 'Có 3 mẫu thử vô danh A, B, C. Hãy tiến hành thí nghiệm để xác định bản chất từng mẫu thử.',
    objective: 'Thử nghiệm và dự đoán chính xác cả 3 dung dịch bí ẩn.',
    hint: 'Sử dụng kết hợp Giấy quỳ tím và Phenolphthalein để loại trừ nhanh chóng.',
    requiredTaskType: 'identify_mystery',
    points: 300,
    badge: '🔍 Bậc Thầy Bí Ẩn'
  },
  {
    id: 4,
    title: 'Level 4: Lựa chọn Chỉ Thị Thông Minh',
    description: 'Được yêu cầu tìm dung dịch Phenolphthalein phù hợp nhất để nhận biết môi trường Bazơ.',
    objective: 'Thực hiện phản ứng với Phenolphthalein trên dung dịch Bazơ (NaOH hoặc Nước vôi trong) để quan sát màu hồng rực rỡ.',
    hint: 'Phenolphthalein không đổi màu trong Axit và Nước cất, chỉ hóa HỒNG rực rỡ trong dung dịch Bazơ!',
    requiredTaskType: 'select_indicator',
    points: 250,
    badge: '💡 Kỳ Phùng Chỉ Thị'
  },
  {
    id: 5,
    title: 'Level 5: Phản Ứng Trung Hòa Axit - Bazơ',
    description: 'Thực hiện phản ứng giữa dung dịch HCl và NaOH để tạo thành dung dịch Trung tính (pH ≈ 7).',
    objective: 'Trộn HCl và NaOH theo tỉ lệ vừa đủ trong cốc thủy tinh sao cho pH đạt xấp xỉ 7 (Sự trung hòa hoàn toàn).',
    hint: 'Axit + Bazơ -> Muối + Nước. Phản ứng có tỏa nhiệt nhẹ! Thử thêm phenolphthalein rồi nhỏ từng giọt HCl cho đến khi mất màu hồng.',
    requiredTaskType: 'neutralize',
    points: 400,
    badge: '🏆 Bậc Thầy Hóa Học'
  }
];
