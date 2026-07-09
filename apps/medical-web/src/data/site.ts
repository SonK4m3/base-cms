export const clinicSite = {
  name: "Phòng khám Tái Tạo An Tâm",
  shortName: "Tái Tạo An Tâm",
  hotline: "1900 1234 56",
  address: "123 Trần Hưng Đạo, P. Cầu Ông Lãnh, Quận 1, TP. HCM",
  hours: "Thứ 2 - Thứ 7: 07:30 - 17:00 | Chủ nhật: 07:30 - 12:00",
  logoImage: "/assets/tao-an-tam-logo.png",
  legalLicense: "01234/HCM-GPHD",
  medicalDirector: "BS.CKI. Nguyễn Minh Tuấn",
  editorialPolicyUrl: "/chinh-sach-bien-tap",
  privacyPolicyUrl: "/chinh-sach-bao-mat",
  medicalReviewPolicyUrl: "/chinh-sach-duyet-y-khoa"
};

export const primaryNav = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Đội ngũ bác sĩ", href: "/bac-si" },
  { label: "Phương pháp", href: "/phuong-phap-dieu-tri" },
  { label: "Quy trình", href: "/quy-trinh" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Liên hệ", href: "/lien-he" }
];

export const homeHero = {
  eyebrow: "Phòng khám Tái Tạo An Tâm",
  title: "Tư vấn chuyên sâu về y học tái tạo và tế bào gốc",
  description:
    "Định hướng chuyên môn rõ ràng, hồ sơ bác sĩ minh bạch và nội dung dựa trên tài liệu tham khảo để giúp khách hàng hiểu đúng trước khi quyết định tư vấn hoặc thăm khám.",
  primaryCta: { label: "Đặt lịch tư vấn", href: "/lien-he" },
  secondaryCta: { label: "Gọi hotline", href: "tel:1900123456" },
  proofItems: [
    "Bác sĩ CKI/ThS/TS công khai hồ sơ",
    "Quy trình tư vấn 1:1, rõ từng bước",
    "Nội dung được duyệt theo định hướng y khoa",
    "Ưu tiên bảo mật thông tin khách hàng"
  ],
  statCards: [
    { value: "1:1", label: "Tư vấn chuyên sâu cùng bác sĩ" },
    { value: "10+", label: "Năm kinh nghiệm lâm sàng tích lũy" },
    { value: "5.000+", label: "Lượt tư vấn và theo dõi đã hỗ trợ" }
  ]
};

export const clinicHighlights = [
  {
    title: "Định hướng chuyên môn rõ ràng",
    description:
      "Tập trung vào tư vấn, đánh giá và định hướng giải pháp trong phạm vi chuyên môn được cấp phép."
  },
  {
    title: "Hồ sơ bác sĩ minh bạch",
    description:
      "Công khai học vị, thế mạnh lâm sàng, lĩnh vực phụ trách và nguyên tắc tư vấn của từng bác sĩ."
  },
  {
    title: "Đánh giá cá nhân hóa",
    description:
      "Không áp dụng công thức chung. Mỗi trường hợp được xem xét theo mục tiêu, hồ sơ sức khỏe và bối cảnh riêng."
  },
  {
    title: "Theo dõi sau tư vấn",
    description:
      "Có kênh hỗ trợ sau buổi tư vấn để giải đáp thêm và nhắc lịch khi khách hàng cần."
  }
];

export const introCards = [
  {
    title: "Sứ mệnh",
    description:
      "Mang đến hành trình tư vấn y khoa rõ ràng, an toàn và có trách nhiệm cho từng khách hàng."
  },
  {
    title: "Định hướng chuyên môn",
    description:
      "Ưu tiên giải thích đúng chỉ định, lợi ích kỳ vọng, giới hạn an toàn và phương án theo dõi."
  },
  {
    title: "Pháp lý & an toàn",
    description:
      "Công khai giấy phép, người chịu trách nhiệm chuyên môn và lưu ý quan trọng trước tư vấn."
  },
  {
    title: "Cơ sở vật chất",
    description:
      "Không gian tiếp đón sạch sẽ, riêng tư và phù hợp cho các buổi tư vấn chuyên sâu."
  }
];

export const serviceGroups = [
  "Tư vấn y học tái tạo",
  "Tư vấn tế bào gốc",
  "Đánh giá trước can thiệp",
  "Theo dõi sau tư vấn",
  "Hội chẩn chuyên môn",
  "Tư vấn sức khỏe chuyên sâu"
];

export const methodCards = [
  "Phạm vi chuyên môn được cấp phép",
  "Đội ngũ bác sĩ rõ hồ sơ",
  "Quy trình minh bạch",
  "Nội dung dựa trên cơ sở khoa học"
];

export const doctors = [
  {
    slug: "nguyen-minh-tuan",
    image: "/assets/doctor-a.png",
    name: "BS.CKI. Nguyễn Minh Tuấn",
    title: "Bác sĩ Chuyên khoa I",
    role: "Phụ trách định hướng chuyên môn và đánh giá chỉ định tư vấn y học tái tạo",
    experience: "15 năm kinh nghiệm",
    credentialLine:
      "Chuyên khoa I, phụ trách hồ sơ lâm sàng ban đầu và định hướng buổi tư vấn chuyên sâu",
    authorityNote:
      "Ưu tiên giải thích rõ chỉ định, giới hạn của nội dung tư vấn và kế hoạch theo dõi sau thăm khám.",
    expertise: [
      "Tư vấn y học tái tạo",
      "Đánh giá chỉ định",
      "Theo dõi sau tư vấn"
    ],
    bio:
      "Bác sĩ Nguyễn Minh Tuấn phụ trách định hướng chuyên môn ban đầu, sàng lọc hồ sơ và giúp khách hàng hiểu rõ phạm vi hỗ trợ của phòng khám trước khi đi sâu vào phương án tư vấn.",
    education: [
      "Tốt nghiệp bác sĩ đa khoa",
      "Chứng chỉ Chuyên khoa I phù hợp chuyên môn",
      "Đào tạo liên tục về an toàn người bệnh và tư vấn y khoa"
    ],
    highlights: [
      "Chú trọng tính phù hợp của chỉ định",
      "Giải thích kỹ lợi ích kỳ vọng và giới hạn",
      "Phối hợp theo dõi sau thăm khám khi cần"
    ],
    focusAreas: [
      "Sàng lọc tình trạng trước tư vấn chuyên sâu",
      "Xác định mục tiêu điều trị và kỳ vọng thực tế",
      "Điều phối hồ sơ sang bác sĩ phụ trách phù hợp"
    ],
    certifications: [
      "Chứng chỉ hành nghề còn hiệu lực",
      "Cập nhật CME định kỳ",
      "Tham gia hội thảo chuyên đề tái tạo mô và phục hồi chức năng"
    ],
    seoSummary:
      "Bác sĩ Chuyên khoa I với thế mạnh sàng lọc hồ sơ, định hướng tư vấn và xây dựng lộ trình theo dõi an toàn.",
    specialty: "Y học tái tạo và định hướng tư vấn lâm sàng",
    licenseId: "012345/HCM-CCHN",
    profileFocus:
      "Phụ trách sàng lọc hồ sơ ban đầu, giải thích phạm vi chuyên môn và điều phối ca tư vấn theo đúng chỉ định phù hợp.",
    reviewedTopics: [
      "Quy trình tư vấn",
      "Phạm vi chuyên môn",
      "Lưu ý trước khi đặt lịch"
    ]
  },
  {
    slug: "tran-thu-hang",
    image: "/assets/doctor-b.png",
    name: "ThS.BS. Trần Thu Hằng",
    title: "Thạc sĩ - Bác sĩ",
    role: "Phụ trách tư vấn tế bào gốc, giải thích cơ sở khoa học và đánh giá nền tảng sức khỏe",
    experience: "12 năm kinh nghiệm",
    credentialLine:
      "Thạc sĩ y khoa, chuyên tư vấn tế bào gốc và theo dõi diễn tiến sau buổi gặp bác sĩ",
    authorityNote:
      "Chú trọng giải thích nền tảng khoa học, mức độ phù hợp của từng lựa chọn và các lưu ý an toàn liên quan.",
    expertise: [
      "Tư vấn tế bào gốc",
      "Đánh giá nền tảng sức khỏe",
      "Hướng dẫn theo dõi"
    ],
    bio:
      "Bác sĩ Trần Thu Hằng tập trung vào phần giải thích dễ hiểu cho khách hàng: tế bào gốc là gì, áp dụng ở đâu, đâu là giới hạn thông tin trên website và khi nào cần gặp bác sĩ trực tiếp.",
    education: [
      "Thạc sĩ chuyên ngành liên quan",
      "Đào tạo liên tục về y học tái tạo",
      "Tập huấn cập nhật an toàn người bệnh"
    ],
    highlights: [
      "Tư vấn dễ hiểu, ít thuật ngữ thừa",
      "Cá nhân hóa theo mục tiêu sức khỏe",
      "Phối hợp liên chuyên khoa khi cần"
    ],
    focusAreas: [
      "Giải thích khái niệm và bằng chứng hiện có",
      "Đánh giá tiền sử và hồ sơ nền",
      "Theo dõi các câu hỏi sau tư vấn"
    ],
    certifications: [
      "Chứng chỉ hành nghề phù hợp",
      "Tham gia chương trình cập nhật y khoa thường niên",
      "Kinh nghiệm xây dựng tài liệu tư vấn cho khách hàng"
    ],
    seoSummary:
      "Thạc sĩ - bác sĩ phụ trách tư vấn tế bào gốc, nổi bật ở khả năng giải thích cơ sở khoa học và theo dõi khách hàng sau tư vấn.",
    specialty: "Tư vấn tế bào gốc và truyền thông y khoa chuẩn mực",
    licenseId: "023456/HCM-CCHN",
    profileFocus:
      "Chịu trách nhiệm giải thích khái niệm, bằng chứng hiện có và các giới hạn cần hiểu đúng khi tiếp cận nội dung về tế bào gốc.",
    reviewedTopics: [
      "Kiến thức nền về tế bào gốc",
      "Câu hỏi thường gặp của người mới tìm hiểu",
      "Theo dõi sau tư vấn"
    ]
  },
  {
    slug: "le-quang-huy",
    image: "/assets/doctor-c.png",
    name: "TS.BS. Lê Quang Huy",
    title: "Tiến sĩ - Bác sĩ",
    role: "Phụ trách đánh giá lâm sàng, hội chẩn và rà soát mức độ an toàn trước khuyến nghị",
    experience: "18 năm kinh nghiệm",
    credentialLine:
      "Tiến sĩ y khoa, tham gia hội chẩn đa chuyên khoa và xây dựng nguyên tắc đánh giá nguy cơ - lợi ích",
    authorityNote:
      "Luôn cân nhắc nguy cơ, lợi ích kỳ vọng và lựa chọn thay thế trước khi đưa ra khuyến nghị chuyên môn.",
    expertise: [
      "Hội chẩn chuyên môn",
      "Đánh giá rủi ro",
      "Theo dõi sau tư vấn"
    ],
    bio:
      "Bác sĩ Lê Quang Huy tham gia thẩm định các trường hợp cần nhìn nhận lâm sàng sâu hơn, giúp phòng khám duy trì giọng điệu cẩn trọng và minh bạch trong mọi nội dung tư vấn.",
    education: [
      "Bằng tiến sĩ y khoa",
      "Kinh nghiệm hội chẩn đa chuyên khoa",
      "Nghiên cứu và cập nhật tài liệu chuyên ngành"
    ],
    highlights: [
      "Tư duy lâm sàng hệ thống",
      "Cẩn trọng trong lựa chọn chỉ định",
      "Đồng hành dài hạn khi cần theo dõi"
    ],
    focusAreas: [
      "Rà soát nguy cơ - lợi ích",
      "Hội chẩn các ca cần thêm góc nhìn chuyên môn",
      "Chuẩn hóa thông điệp an toàn cho website"
    ],
    certifications: [
      "Chứng chỉ hành nghề phù hợp",
      "Tham gia hội thảo khoa học và chương trình cập nhật sau đại học",
      "Kinh nghiệm đọc và chọn lọc tài liệu tham khảo lâm sàng"
    ],
    seoSummary:
      "Tiến sĩ - bác sĩ phụ trách đánh giá lâm sàng và hội chẩn, giúp tăng độ tin cậy chuyên môn cho nội dung tư vấn của phòng khám.",
    specialty: "Đánh giá lâm sàng, hội chẩn và an toàn người bệnh",
    licenseId: "034567/HCM-CCHN",
    profileFocus:
      "Rà soát nguy cơ - lợi ích, đảm bảo nội dung y khoa trên website giữ được giọng điệu cẩn trọng, minh bạch và không thổi phồng kỳ vọng.",
    reviewedTopics: [
      "An toàn và pháp lý",
      "Hiểu đúng về hiệu quả điều trị",
      "FAQ liên quan đến cam kết kết quả"
    ]
  }
];

export const processSteps = [
  {
    title: "Đặt lịch tư vấn",
    description: "Khách hàng liên hệ qua form, hotline hoặc kênh tư vấn để giữ khung giờ phù hợp."
  },
  {
    title: "Sàng lọc thông tin ban đầu",
    description: "Đội ngũ tiếp nhận ghi nhận nhu cầu, triệu chứng, hồ sơ nền và mong muốn hỗ trợ."
  },
  {
    title: "Thăm khám cùng bác sĩ",
    description: "Bác sĩ khai thác thông tin, xem xét hồ sơ liên quan và đánh giá trong phạm vi chuyên môn."
  },
  {
    title: "Đánh giá chuyên môn",
    description: "Cân nhắc yếu tố lâm sàng, mức độ phù hợp, nguy cơ - lợi ích và hướng theo dõi."
  },
  {
    title: "Tư vấn phương án phù hợp",
    description: "Giải thích rõ lựa chọn, kỳ vọng thực tế, lưu ý an toàn và bước tiếp theo nếu cần."
  },
  {
    title: "Theo dõi sau tư vấn",
    description: "Hỗ trợ giải đáp thêm, nhắc lịch tái liên hệ hoặc điều phối khi khách hàng cần."
  }
];

export const complianceCards = [
  {
    title: "Giấy phép hoạt động",
    description:
      "Phòng khám được cấp giấy phép hoạt động khám, chữa bệnh theo quy định hiện hành."
  },
  {
    title: "Phạm vi chuyên môn",
    description:
      "Thực hiện tư vấn và đánh giá trong phạm vi được cấp phép, không thổi phồng chỉ định."
  },
  {
    title: "Nguồn tài liệu tham khảo",
    description:
      "Nội dung website dựa trên tài liệu khoa học, hướng dẫn chuyên ngành và quy trình biên tập nội bộ."
  },
  {
    title: "Người chịu trách nhiệm chuyên môn",
    description: "BS.CKI. Nguyễn Minh Tuấn phụ trách định hướng chuyên môn cho hoạt động nội dung và tư vấn."
  },
  {
    title: "Lưu ý an toàn",
    description:
      "Thông tin trên website mang tính tham khảo, không thay thế chẩn đoán hoặc chỉ định trực tiếp từ bác sĩ."
  }
];

export const reasons = [
  "Minh bạch chuyên môn",
  "Đánh giá cá nhân hóa",
  "Tuân thủ pháp luật",
  "Định hướng khoa học",
  "Bảo mật thông tin",
  "Đồng hành lâu dài"
];

export const faqItems = [
  {
    category: "Tế bào gốc",
    slug: "te-bao-goc-co-chua-khoi-benh-khong",
    question: "Tế bào gốc có chữa khỏi bệnh không?",
    shortAnswer: "Không nên hiểu tế bào gốc như một cam kết chữa khỏi tuyệt đối.",
    answer:
      "Không nên xem tế bào gốc là một cam kết chữa khỏi tuyệt đối. Việc tư vấn cần dựa trên chỉ định, hồ sơ sức khỏe, giới hạn an toàn và đánh giá trực tiếp từ bác sĩ. Phòng khám ưu tiên giải thích đúng kỳ vọng, không dùng ngôn ngữ hứa hẹn quá mức.",
    reviewedBy: "TS.BS. Lê Quang Huy",
    lastReviewedAt: "08/07/2026",
    relatedDoctorSlug: "le-quang-huy",
    relatedArticleSlug: "nhung-hieu-lam-thuong-gap-ve-te-bao-goc"
  },
  {
    category: "Tư vấn",
    slug: "ai-phu-hop-de-tu-van-truoc",
    question: "Ai phù hợp để tư vấn trước?",
    shortAnswer: "Người cần hiểu đúng lựa chọn, đánh giá mức độ phù hợp hoặc cần giải thích hồ sơ nền.",
    answer:
      "Khách hàng đang tìm hiểu về y học tái tạo, muốn đánh giá mức độ phù hợp, có câu hỏi về tế bào gốc hoặc cần bác sĩ giải thích thêm về hồ sơ nền đều nên đặt lịch tư vấn trước khi đi sâu vào bất kỳ quyết định nào.",
    reviewedBy: "BS.CKI. Nguyễn Minh Tuấn",
    lastReviewedAt: "08/07/2026",
    relatedDoctorSlug: "nguyen-minh-tuan",
    relatedArticleSlug: "quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao"
  },
  {
    category: "Quy trình",
    slug: "co-can-xet-nghiem-truoc-khong",
    question: "Có cần xét nghiệm trước không?",
    shortAnswer: "Tùy trường hợp, bác sĩ sẽ quyết định dựa trên hồ sơ và mục tiêu đánh giá.",
    answer:
      "Không phải ai cũng cần xét nghiệm trước. Tùy tình trạng, bác sĩ có thể đề nghị hồ sơ cận lâm sàng, hình ảnh học hoặc thông tin bổ sung để hoàn thiện đánh giá. Mọi đề nghị đều phải có lý do chuyên môn rõ ràng.",
    reviewedBy: "ThS.BS. Trần Thu Hằng",
    lastReviewedAt: "08/07/2026",
    relatedDoctorSlug: "tran-thu-hang",
    relatedArticleSlug: "quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao"
  },
  {
    category: "Chi phí",
    slug: "phong-kham-co-cam-ket-hieu-qua-khong",
    question: "Phòng khám có cam kết hiệu quả không?",
    shortAnswer: "Không cam kết hiệu quả tuyệt đối trong y khoa.",
    answer:
      "Trong y khoa, không nên cam kết hiệu quả tuyệt đối vì đáp ứng phụ thuộc vào tình trạng từng người. Điều phòng khám cam kết là quy trình minh bạch, tư vấn đúng phạm vi chuyên môn và giải thích rõ những gì khách hàng có thể kỳ vọng.",
    reviewedBy: "TS.BS. Lê Quang Huy",
    lastReviewedAt: "08/07/2026",
    relatedDoctorSlug: "le-quang-huy",
    relatedArticleSlug: "nhung-hieu-lam-thuong-gap-ve-te-bao-goc"
  },
  {
    category: "Pháp lý",
    slug: "thong-tin-tren-website-co-thay-the-chan-doan-khong",
    question: "Thông tin trên website có thay thế chẩn đoán không?",
    shortAnswer: "Không. Đây là nội dung tham khảo để hỗ trợ hiểu đúng trước khi gặp bác sĩ.",
    answer:
      "Không. Nội dung trên website chỉ mang tính tham khảo, giúp khách hàng hiểu khái niệm, quy trình và lưu ý an toàn. Chẩn đoán, chỉ định và quyết định điều trị cần dựa trên buổi thăm khám trực tiếp với bác sĩ.",
    reviewedBy: "BS.CKI. Nguyễn Minh Tuấn",
    lastReviewedAt: "08/07/2026",
    relatedDoctorSlug: "nguyen-minh-tuan",
    relatedArticleSlug: "te-bao-goc-la-gi"
  }
];

export const articleCards = [
  {
    slug: "te-bao-goc-la-gi",
    tag: "Kiến thức y khoa",
    category: "Kiến thức y khoa",
    title: "Tế bào gốc là gì? Cách hiểu đúng trong y học tái tạo",
    description:
      "Giải thích khái niệm tế bào gốc, vai trò trong y học tái tạo và những giới hạn cần hiểu rõ trước khi tiếp cận thông tin.",
    image: "/assets/knowledge-1.png",
    date: "20/05/2024",
    updatedAt: "08/07/2026",
    readTime: "8 phút đọc",
    author: "Ban biên tập Phòng khám Tái Tạo An Tâm",
    reviewer: "ThS.BS. Trần Thu Hằng",
    reviewerRole: "Bác sĩ duyệt nội dung y khoa",
    keywords: ["tế bào gốc", "y học tái tạo", "hiểu đúng tế bào gốc"],
    primaryIntent: "Informational",
    relatedDoctorSlug: "tran-thu-hang",
    relatedFaqSlug: "thong-tin-tren-website-co-thay-the-chan-doan-khong",
    takeaways: [
      "Hiểu đúng định nghĩa tế bào gốc và phạm vi ứng dụng",
      "Phân biệt nội dung tham khảo với chỉ định y khoa",
      "Biết khi nào nên đặt lịch tư vấn trực tiếp"
    ],
    references: [
      "Hướng dẫn tư vấn nội bộ của phòng khám",
      "Tài liệu tổng quan y học tái tạo đã chọn lọc",
      "Nguồn tham khảo chuyên ngành dùng cho mục đích giáo dục sức khỏe"
    ]
  },
  {
    slug: "nhung-hieu-lam-thuong-gap-ve-te-bao-goc",
    tag: "Hiểu đúng",
    category: "Hiểu đúng",
    title: "Những hiểu lầm thường gặp về tế bào gốc và cách tự kiểm tra thông tin",
    description:
      "Tổng hợp các hiểu lầm phổ biến, dấu hiệu nhận biết nội dung thổi phồng và cách đọc thông tin y khoa một cách tỉnh táo hơn.",
    image: "/assets/knowledge-2.png",
    date: "18/05/2024",
    updatedAt: "08/07/2026",
    readTime: "6 phút đọc",
    author: "Ban biên tập Phòng khám Tái Tạo An Tâm",
    reviewer: "TS.BS. Lê Quang Huy",
    reviewerRole: "Bác sĩ duyệt nội dung y khoa",
    keywords: ["hiểu lầm tế bào gốc", "thông tin y khoa", "authority y tế"],
    primaryIntent: "Informational",
    relatedDoctorSlug: "le-quang-huy",
    relatedFaqSlug: "phong-kham-co-cam-ket-hieu-qua-khong",
    takeaways: [
      "Nhận diện ngôn ngữ cam kết quá mức",
      "Hiểu vì sao cần xem hồ sơ bác sĩ và phạm vi chuyên môn",
      "Biết cách dùng FAQ và buổi tư vấn để xác minh thông tin"
    ],
    references: [
      "Chính sách biên tập y khoa của website",
      "Nguồn tham khảo chuyên ngành đã sàng lọc",
      "Thực hành truyền thông y tế an toàn"
    ]
  },
  {
    slug: "quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao",
    tag: "Quy trình",
    category: "Quy trình",
    title: "Quy trình tư vấn tế bào gốc diễn ra như thế nào tại phòng khám?",
    description:
      "Mô tả từng bước từ đặt lịch, sàng lọc, gặp bác sĩ, đánh giá hồ sơ đến theo dõi sau tư vấn để khách hàng chủ động hơn.",
    image: "/assets/knowledge-3.png",
    date: "16/05/2024",
    updatedAt: "08/07/2026",
    readTime: "7 phút đọc",
    author: "Ban biên tập Phòng khám Tái Tạo An Tâm",
    reviewer: "BS.CKI. Nguyễn Minh Tuấn",
    reviewerRole: "Bác sĩ duyệt nội dung y khoa",
    keywords: ["quy trình tư vấn tế bào gốc", "đặt lịch tư vấn", "quy trình phòng khám"],
    primaryIntent: "Informational",
    relatedDoctorSlug: "nguyen-minh-tuan",
    relatedFaqSlug: "ai-phu-hop-de-tu-van-truoc",
    takeaways: [
      "Biết mình cần chuẩn bị gì trước buổi gặp bác sĩ",
      "Hiểu từng bước đánh giá chuyên môn",
      "Nắm rõ cách theo dõi sau buổi tư vấn"
    ],
    references: [
      "Quy trình tư vấn chuẩn hóa tại phòng khám",
      "Tài liệu hướng dẫn tiếp nhận hồ sơ",
      "Lưu ý an toàn trước và sau tư vấn"
    ]
  }
];

export const researchEntries = [
  {
    title: "Tài liệu tổng quan về y học tái tạo",
    description:
      "Tổng hợp nguồn tham khảo nền tảng cho khách hàng muốn đọc kỹ hơn trước khi đặt lịch tư vấn."
  },
  {
    title: "Bài viết chuyên môn đã sàng lọc",
    description:
      "Lọc ra các bài viết phù hợp với người dùng phổ thông nhưng vẫn giữ giọng điệu chuẩn mực y khoa."
  },
  {
    title: "Công bố, hội nghị và cập nhật chuyên ngành",
    description:
      "Danh mục dùng để tăng tín hiệu authority cho website và làm nguồn liên kết nội bộ cho blog."
  }
];
