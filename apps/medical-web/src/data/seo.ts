import { articleCards, doctors, faqItems, processSteps, serviceGroups } from "./site";

export const specialtyPages = [
  {
    slug: "tu-van-y-hoc-tai-tao",
    title: "Tư vấn y học tái tạo",
    keyword: "tư vấn y học tái tạo",
    description:
      "Trang nhóm chủ đề cho người đang tìm hiểu y học tái tạo, muốn hiểu rõ phạm vi tư vấn, mục tiêu và giới hạn an toàn trước khi đặt lịch.",
    overview:
      "Mục tiêu của cụm trang này là giúp người đọc hiểu đúng khái niệm, cách đánh giá mức độ phù hợp và khi nào nên gặp bác sĩ để được tư vấn 1:1.",
    angles: [
      "Giải thích khái niệm bằng ngôn ngữ dễ hiểu",
      "Làm rõ phạm vi tư vấn được phép",
      "Tập trung vào an toàn và kỳ vọng thực tế"
    ],
    doctorSlug: "nguyen-minh-tuan",
    articleSlug: "te-bao-goc-la-gi",
    faqSlug: "ai-phu-hop-de-tu-van-truoc",
    ctaLabel: "Đặt lịch tư vấn y học tái tạo"
  },
  {
    slug: "tu-van-te-bao-goc",
    title: "Tư vấn tế bào gốc",
    keyword: "tư vấn tế bào gốc",
    description:
      "Cụm trang giải thích tế bào gốc là gì, nên hiểu những gì trước buổi tư vấn và các câu hỏi thường gặp về phạm vi áp dụng.",
    overview:
      "Nội dung được tổ chức theo hướng hỏi-đáp, giúp người dùng dễ đọc, dễ lưu và dễ quay lại khi cần đối chiếu thông tin.",
    angles: [
      "Tránh ngôn ngữ hứa hẹn quá mức",
      "Gắn kết với FAQ và bài viết chuyên môn",
      "Tăng tín hiệu authority cho nhóm từ khóa",
    ],
    doctorSlug: "tran-thu-hang",
    articleSlug: "nhung-hieu-lam-thuong-gap-ve-te-bao-goc",
    faqSlug: "te-bao-goc-co-chua-khoi-benh-khong",
    ctaLabel: "Xem hồ sơ bác sĩ liên quan"
  },
  {
    slug: "danh-gia-chi-dinh",
    title: "Đánh giá chỉ định",
    keyword: "đánh giá chỉ định",
    description:
      "Mô tả quy trình sàng lọc ban đầu để biết khi nào nên tư vấn, khi nào cần thêm hồ sơ và khi nào nên gặp bác sĩ trực tiếp.",
    overview:
      "Đây là cụm nội dung tốt cho người đang ở giai đoạn cân nhắc, cần hiểu rõ tiêu chí phù hợp trước khi quyết định.",
    angles: [
      "Kết nối giữa blog, FAQ và hồ sơ bác sĩ",
      "Hỗ trợ hiểu đúng trước khi đặt lịch",
      "Tạo tín hiệu chuyên môn và minh bạch"
    ],
    doctorSlug: "le-quang-huy",
    articleSlug: "quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao",
    faqSlug: "co-can-xet-nghiem-truoc-khong",
    ctaLabel: "Xem quy trình tư vấn"
  },
  {
    slug: "theo-doi-sau-tu-van",
    title: "Theo dõi sau tư vấn",
    keyword: "theo dõi sau tư vấn",
    description:
      "Trang nhóm chủ đề cho các nhu cầu theo dõi, giải đáp thêm và chuẩn hóa kỳ vọng sau buổi tư vấn ban đầu.",
    overview:
      "Bổ sung nội dung theo dõi giúp website trông hữu ích hơn với người dùng và tăng chiều sâu cho cụm từ khóa chính.",
    angles: [
      "Tập trung vào hành trình sau tư vấn",
      "Nối với nội dung blog và FAQ",
      "Hỗ trợ chuyển đổi mềm sang đặt lịch"
    ],
    doctorSlug: "nguyen-minh-tuan",
    articleSlug: "quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao",
    faqSlug: "phong-kham-co-cam-ket-hieu-qua-khong",
    ctaLabel: "Xem trang liên hệ"
  }
];

export const conditionPages = [
  {
    slug: "meo-met-keo-dai",
    title: "Mệt mỏi kéo dài",
    keyword: "mệt mỏi kéo dài",
    description:
      "Trang hướng dẫn cho người đọc đang tìm thông tin về tình trạng mệt mỏi kéo dài, cần hiểu khi nào nên đi tư vấn và cần chuẩn bị gì.",
    overview:
      "Nội dung không thay thế chẩn đoán; mục tiêu là giúp người đọc nhận diện thời điểm cần gặp bác sĩ để được sàng lọc phù hợp.",
    signs: ["Mệt kéo dài", "Khó hồi phục sau nghỉ ngơi", "Muốn hiểu nguyên nhân cần tư vấn"],
    nextSteps: ["Đặt lịch tư vấn", "Xem FAQ", "Đọc bài viết liên quan"],
    articleSlug: "te-bao-goc-la-gi",
    faqSlug: "ai-phu-hop-de-tu-van-truoc"
  },
  {
    slug: "viem-khop-thoai-hoa",
    title: "Viêm khớp và thoái hóa khớp",
    keyword: "viêm khớp thoái hóa khớp",
    description:
      "Cụm nội dung cho người tìm hiểu về đau khớp, thoái hóa và khi nào nên xin ý kiến bác sĩ trước khi quyết định hướng tiếp cận.",
    overview:
      "Mục đích là tạo một trang giải thích rõ, an toàn và có internal link sang hồ sơ bác sĩ, quy trình và FAQ.",
    signs: ["Đau khớp", "Hạn chế vận động", "Muốn hiểu hướng tư vấn phù hợp"],
    nextSteps: ["Xem quy trình", "Đọc blog chuyên môn", "Liên hệ phòng khám"],
    articleSlug: "quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao",
    faqSlug: "co-can-xet-nghiem-truoc-khong"
  },
  {
    slug: "rung-toc",
    title: "Rụng tóc và tóc thưa",
    keyword: "rụng tóc tóc thưa",
    description:
      "Trang chủ đề giúp người đọc hiểu khi nào rụng tóc là đáng lưu ý, khi nào nên sàng lọc và hỏi bác sĩ để được tư vấn đúng hơn.",
    overview:
      "Một trang pSEO hữu ích cần trả lời được câu hỏi của người dùng, không chỉ đổi biến từ khóa trên một khung nội dung chung.",
    signs: ["Rụng tóc kéo dài", "Tóc thưa dần", "Cần đánh giá nguyên nhân"],
    nextSteps: ["Đọc FAQ", "Xem hồ sơ bác sĩ", "Đặt lịch tư vấn"],
    articleSlug: "nhung-hieu-lam-thuong-gap-ve-te-bao-goc",
    faqSlug: "thong-tin-tren-website-co-thay-the-chan-doan-khong"
  },
  {
    slug: "van-de-da-lieu",
    title: "Vấn đề da liễu",
    keyword: "vấn đề da liễu",
    description:
      "Cụm trang dành cho người đang tìm hiểu về da và muốn có thêm góc nhìn trước khi cân nhắc tư vấn với bác sĩ.",
    overview:
      "Trang này giúp mở rộng cụm chủ đề da liễu theo hướng giáo dục, kết nối blog, FAQ và liên hệ.",
    signs: ["Da thay đổi kéo dài", "Cần hiểu nguyên nhân", "Muốn hỏi bác sĩ trước khi quyết định"],
    nextSteps: ["Xem bài blog", "Đọc FAQ", "Gọi hotline tư vấn"],
    articleSlug: "te-bao-goc-la-gi",
    faqSlug: "thong-tin-tren-website-co-thay-the-chan-doan-khong"
  }
];

export const servicePages = serviceGroups.map((item, index) => ({
  slug: [
    "tu-van-y-hoc-tai-tao",
    "tu-van-te-bao-goc",
    "danh-gia-truoc-can-thiep",
    "theo-doi-sau-tu-van",
    "hoi-chan-chuyen-mon",
    "tu-van-suc-khoe-chuyen-sau"
  ][index],
  title: item,
  keyword: item.toLowerCase(),
  description:
    "Trang dịch vụ được tổ chức theo hướng giải thích rõ mục tiêu, phạm vi tư vấn và các bước người dùng nên chuẩn bị trước khi đặt lịch.",
  overview:
    "Danh mục này phù hợp cho người dùng đang ở giai đoạn so sánh, muốn hiểu quy trình trước khi quyết định tương tác trực tiếp với phòng khám.",
  doctorSlug: doctors[index % doctors.length].slug,
  articleSlug: articleCards[index % articleCards.length].slug,
  faqSlug: faqItems[index % faqItems.length].slug
}));

export const pseoHubLinks = [
  { label: "Chuyên khoa", href: "/chuyen-khoa" },
  { label: "Bệnh lý", href: "/benh-ly" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Phương pháp", href: "/phuong-phap-dieu-tri" }
];

