import type {
  ArticleContent,
  DoctorContent,
  LandingPageContent,
  LegalPageContent,
  MedicalConditionContent,
  ServiceContent,
  SiteSettingContent,
  SpecialtyContent
} from "./index";

export interface ClinicSeedData {
  siteSetting: SiteSettingContent;
  doctors: DoctorContent[];
  articles: ArticleContent[];
  services: ServiceContent[];
  medicalConditions: MedicalConditionContent[];
  specialties: SpecialtyContent[];
  legalPages: LegalPageContent[];
  landingPages: LandingPageContent[];
}

const primaryContact = { label: "Đặt lịch tư vấn", href: "/lien-he", variant: "primary" as const };
const hotlineContact = { label: "Gọi hotline", href: "tel:1900123456", variant: "secondary" as const };

export const clinicSeedData = {
  siteSetting: {
    clinicName: "Phòng khám Tái Tạo An Tâm",
    tagline: "An toàn - Khoa học - Nhân văn",
    address: "123 Trần Hưng Đạo, P. Cầu Ông Lãnh, Quận 1, TP. HCM",
    hotline: "1900 1234 56",
    workingHours: "Thứ 2 - Thứ 7: 07:30 - 17:00 | Chủ nhật: 07:30 - 12:00",
    medicalDirector: "BS.CKI. Nguyễn Minh Tuấn",
    logoImage: "/assets/tao-an-tam-logo.png",
    bookingUrl: "/lien-he",
    facebookUrl: "https://facebook.com/taitaoantam",
    zaloUrl: "https://zalo.me/1900123456",
    editorialPolicyUrl: "/chinh-sach-bien-tap",
    privacyPolicyUrl: "/chinh-sach-bao-mat",
    medicalReviewPolicyUrl: "/chinh-sach-duyet-y-khoa",
    seoDefaultTitle: "Phòng khám Tái Tạo An Tâm",
    seoDefaultDescription: "Website phòng khám tế bào gốc và y học tái tạo"
  },
  doctors: [
    {
      title: "BS.CKI. Nguyễn Minh Tuấn",
      slug: "nguyen-minh-tuan",
      summary: "Bác sĩ phụ trách định hướng chuyên môn ban đầu và giải thích phạm vi tư vấn.",
      specialty: "Y học tái tạo",
      bio:
        "Phụ trách sàng lọc hồ sơ, giải thích phạm vi hỗ trợ và theo dõi các trường hợp cần hội chẩn thêm.",
      credentials: ["Chuyên khoa I", "15 năm kinh nghiệm", "Đào tạo liên tục về an toàn người bệnh"],
      languages: ["Tiếng Việt"],
      seoTitle: "BS.CKI. Nguyễn Minh Tuấn | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Hồ sơ bác sĩ phụ trách định hướng chuyên môn và đánh giá chỉ định tư vấn y học tái tạo."
    },
    {
      title: "ThS.BS. Trần Thu Hằng",
      slug: "tran-thu-hang",
      summary: "Bác sĩ phụ trách giải thích khái niệm và tư vấn tế bào gốc.",
      specialty: "Tế bào gốc",
      bio:
        "Giải thích khái niệm, kỳ vọng thực tế và giúp người đọc phân biệt nội dung tham khảo với tư vấn y khoa trực tiếp.",
      credentials: ["Thạc sĩ y khoa", "12 năm kinh nghiệm", "Tư vấn bệnh nhân theo dõi dài hạn"],
      languages: ["Tiếng Việt"],
      seoTitle: "ThS.BS. Trần Thu Hằng | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Hồ sơ bác sĩ phụ trách tư vấn tế bào gốc và theo dõi sau tư vấn."
    },
    {
      title: "TS.BS. Lê Quang Huy",
      slug: "le-quang-huy",
      summary: "Bác sĩ phụ trách hội chẩn chuyên môn và cân nhắc an toàn.",
      specialty: "Hội chẩn chuyên môn",
      bio:
        "Phụ trách rà soát nguy cơ - lợi ích và hỗ trợ những trường hợp cần góc nhìn lâm sàng sâu hơn trước khuyến nghị.",
      credentials: ["Tiến sĩ y khoa", "18 năm kinh nghiệm", "Hội chẩn đa chuyên khoa"],
      languages: ["Tiếng Việt"],
      seoTitle: "TS.BS. Lê Quang Huy | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Hồ sơ bác sĩ phụ trách hội chẩn chuyên môn và đánh giá an toàn."
    }
  ],
  articles: [
    {
      title: "Tế bào gốc là gì? Cách hiểu đúng trong y học tái tạo",
      slug: "te-bao-goc-la-gi",
      summary:
        "Giải thích khái niệm tế bào gốc, vai trò trong y học tái tạo và những giới hạn cần hiểu rõ trước khi tiếp cận thông tin.",
      body:
        "<p>Tế bào gốc là tế bào có khả năng tự làm mới và biệt hóa. Nội dung này giúp người đọc hiểu đúng khái niệm trước khi quyết định tư vấn.</p><p>Bài viết tập trung vào phạm vi tham khảo, không thay thế chẩn đoán hay chỉ định từ bác sĩ.</p>",
      seoTitle: "Tế bào gốc là gì? | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Giải thích khái niệm tế bào gốc và cách đọc thông tin y học tái tạo an toàn.",
      author: "Ban biên tập Phòng khám Tái Tạo An Tâm",
      medicalReviewer: "ThS.BS. Trần Thu Hằng",
      status: "published",
      publishedAtCustom: "2026-07-09T00:00:00.000Z",
      reviewedAt: "2026-07-09T00:00:00.000Z",
      readingTime: 8,
      references: [],
      faq: [
        {
          question: "Bài viết này có thay thế tư vấn bác sĩ không?",
          answer: "<p>Không. Nội dung chỉ nhằm giúp người đọc hiểu trước về khái niệm và quy trình.</p>"
        }
      ],
      disclaimer: "Thông tin chỉ mang tính tham khảo, không thay thế tư vấn y khoa trực tiếp.",
      canonicalUrl: "/blog/te-bao-goc-la-gi",
      noindex: false,
      primaryTopic: "Tế bào gốc",
      relatedConditions: ["meo-met-keo-dai", "rung-toc"],
      relatedServices: ["tu-van-te-bao-goc", "danh-gia-truoc-can-thiep"],
      relatedArticles: ["nhung-hieu-lam-thuong-gap-ve-te-bao-goc"],
      internalLinkSuggestions: ["/bac-si/tran-thu-hang", "/faq", "/lien-he"]
    },
    {
      title: "Những hiểu lầm thường gặp về tế bào gốc",
      slug: "nhung-hieu-lam-thuong-gap-ve-te-bao-goc",
      summary:
        "Tổng hợp các hiểu lầm phổ biến, dấu hiệu nhận biết nội dung thổi phồng và cách đánh giá một bài viết y khoa đáng tin cậy.",
      body:
        "<p>Nội dung y khoa cần được đọc cùng bối cảnh, nguồn tham khảo và phạm vi chuyên môn của phòng khám.</p><p>Bài viết này giúp người đọc tránh hiểu sai kỳ vọng và chủ động hơn khi đặt câu hỏi cho bác sĩ.</p>",
      seoTitle: "Những hiểu lầm thường gặp về tế bào gốc",
      seoDescription: "Nhận diện hiểu lầm phổ biến để đọc nội dung y khoa an toàn hơn.",
      author: "Ban biên tập Phòng khám Tái Tạo An Tâm",
      medicalReviewer: "TS.BS. Lê Quang Huy",
      status: "published",
      publishedAtCustom: "2026-07-09T00:00:00.000Z",
      reviewedAt: "2026-07-09T00:00:00.000Z",
      readingTime: 6,
      references: [],
      faq: [
        {
          question: "Làm sao biết một nội dung y khoa có đáng tin không?",
          answer: "<p>Hãy xem tác giả, người duyệt nội dung, nguồn tham khảo và mức độ thận trọng trong diễn đạt.</p>"
        }
      ],
      disclaimer: "Bài viết không đưa ra cam kết kết quả điều trị.",
      canonicalUrl: "/blog/nhung-hieu-lam-thuong-gap-ve-te-bao-goc",
      noindex: false,
      primaryTopic: "Hiểu đúng",
      relatedConditions: ["van-de-da-lieu", "viem-khop-thoai-hoa"],
      relatedServices: ["tu-van-te-bao-goc", "hoi-chan-chuyen-mon"],
      relatedArticles: ["te-bao-goc-la-gi", "quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao"],
      internalLinkSuggestions: ["/faq", "/bac-si/le-quang-huy", "/nghien-cuu-cong-bo"]
    },
    {
      title: "Quy trình tư vấn tế bào gốc diễn ra như thế nào?",
      slug: "quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao",
      summary:
        "Mô tả từng bước từ đặt lịch, sàng lọc, gặp bác sĩ, đánh giá hồ sơ đến theo dõi sau tư vấn để người đọc chủ động hơn.",
      body:
        "<p>Quy trình tư vấn được trình bày rõ ràng để người đọc biết cần chuẩn bị gì, sẽ gặp ai và bước tiếp theo là gì.</p><p>Mỗi bước đều ưu tiên an toàn, minh bạch và giải thích đúng kỳ vọng.</p>",
      seoTitle: "Quy trình tư vấn tế bào gốc diễn ra như thế nào?",
      seoDescription: "Mô tả các bước tư vấn để người đọc chủ động chuẩn bị trước khi gặp bác sĩ.",
      author: "Ban biên tập Phòng khám Tái Tạo An Tâm",
      medicalReviewer: "BS.CKI. Nguyễn Minh Tuấn",
      status: "published",
      publishedAtCustom: "2026-07-09T00:00:00.000Z",
      reviewedAt: "2026-07-09T00:00:00.000Z",
      readingTime: 7,
      references: [],
      faq: [
        {
          question: "Có thể đặt lịch trước không?",
          answer: "<p>Có. Bạn nên đặt lịch để được sắp xếp khung giờ phù hợp và giảm thời gian chờ.</p>"
        }
      ],
      disclaimer: "Tư vấn trực tiếp là bước cần thiết để xác định hướng đi phù hợp.",
      canonicalUrl: "/blog/quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao",
      noindex: false,
      primaryTopic: "Quy trình",
      relatedConditions: ["meo-met-keo-dai", "rung-toc"],
      relatedServices: ["tu-van-y-hoc-tai-tao", "theo-doi-sau-tu-van"],
      relatedArticles: ["te-bao-goc-la-gi"],
      internalLinkSuggestions: ["/quy-trinh", "/lien-he", "/bac-si/nguyen-minh-tuan"]
    }
  ],
  services: [
    {
      title: "Tư vấn y học tái tạo",
      slug: "tu-van-y-hoc-tai-tao",
      summary: "Sàng lọc nhu cầu, giải thích phạm vi hỗ trợ và xác định bước tiếp theo phù hợp.",
      details:
        "<p>Dịch vụ này giúp người dùng hiểu đúng phạm vi tư vấn, có gì cần chuẩn bị và khi nào nên gặp bác sĩ trực tiếp.</p>",
      bookingCtas: [primaryContact, hotlineContact],
      seoTitle: "Tư vấn y học tái tạo",
      seoDescription: "Dịch vụ tư vấn đầu vào, sàng lọc và hướng dẫn bước tiếp theo."
    },
    {
      title: "Tư vấn tế bào gốc",
      slug: "tu-van-te-bao-goc",
      summary: "Giải thích khái niệm, kỳ vọng thực tế và các lưu ý an toàn trước tư vấn.",
      details:
        "<p>Trang dịch vụ tập trung vào việc giúp người đọc hiểu đúng câu hỏi cần hỏi và nội dung nên chuẩn bị trước buổi tư vấn.</p>",
      bookingCtas: [primaryContact],
      seoTitle: "Tư vấn tế bào gốc",
      seoDescription: "Giải thích khái niệm và phạm vi tư vấn tế bào gốc."
    },
    {
      title: "Đánh giá trước can thiệp",
      slug: "danh-gia-truoc-can-thiep",
      summary: "Xem xét hồ sơ, mục tiêu và các yếu tố cần chuẩn bị trước khi quyết định tiếp tục.",
      details:
        "<p>Dịch vụ này hỗ trợ người dùng làm rõ hồ sơ nền, nhu cầu và mức độ phù hợp trước khi bước sang giai đoạn tiếp theo.</p>",
      bookingCtas: [primaryContact],
      seoTitle: "Đánh giá trước can thiệp",
      seoDescription: "Dịch vụ đánh giá ban đầu và sàng lọc hồ sơ trước tư vấn."
    },
    {
      title: "Theo dõi sau tư vấn",
      slug: "theo-doi-sau-tu-van",
      summary: "Hỗ trợ giải đáp thêm và nhắc lịch sau buổi tư vấn ban đầu.",
      details:
        "<p>Phần theo dõi giúp duy trì tính liên tục của tư vấn và giữ cho người dùng luôn có kênh hỗ trợ rõ ràng.</p>",
      bookingCtas: [primaryContact],
      seoTitle: "Theo dõi sau tư vấn",
      seoDescription: "Hỗ trợ giải đáp và theo dõi sau tư vấn ban đầu."
    },
    {
      title: "Hội chẩn chuyên môn",
      slug: "hoi-chan-chuyen-mon",
      summary: "Phối hợp bác sĩ khi cần góc nhìn chuyên sâu cho hồ sơ phức tạp hơn.",
      details:
        "<p>Dịch vụ này dành cho các trường hợp cần phối hợp đa chuyên khoa để cân nhắc hướng tư vấn thận trọng hơn.</p>",
      bookingCtas: [primaryContact],
      seoTitle: "Hội chẩn chuyên môn",
      seoDescription: "Dịch vụ hội chẩn khi cần thêm góc nhìn chuyên môn."
    },
    {
      title: "Tư vấn sức khỏe chuyên sâu",
      slug: "tu-van-suc-khoe-chuyen-sau",
      summary: "Buổi tư vấn dài hơn cho khách hàng cần phân tích nhiều yếu tố cùng lúc.",
      details:
        "<p>Trang dịch vụ này phù hợp với khách hàng có nhiều câu hỏi và muốn được giải thích đầy đủ theo từng bước.</p>",
      bookingCtas: [primaryContact],
      seoTitle: "Tư vấn sức khỏe chuyên sâu",
      seoDescription: "Tư vấn chuyên sâu với thời lượng và cấu trúc rõ ràng."
    }
  ],
  medicalConditions: [
    {
      title: "Mệt mỏi kéo dài",
      slug: "meo-met-keo-dai",
      summary: "Trang hướng dẫn cho người đang tìm thông tin về mệt mỏi kéo dài và cần hiểu khi nào nên tư vấn.",
      content:
        "<p>Nội dung giúp người đọc nhận ra thời điểm cần gặp bác sĩ để được sàng lọc phù hợp thay vì tự suy đoán kéo dài.</p>",
      seoTitle: "Mệt mỏi kéo dài | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Thông tin tham khảo cho người quan tâm đến mệt mỏi kéo dài.",
      faq: [
        {
          question: "Khi nào nên đi tư vấn?",
          answer: "<p>Khi triệu chứng kéo dài, ảnh hưởng sinh hoạt hoặc bạn cần hiểu rõ nguyên nhân.</p>"
        }
      ],
      relatedServices: ["tu-van-y-hoc-tai-tao", "danh-gia-truoc-can-thiep"],
      relatedArticles: ["te-bao-goc-la-gi"]
    },
    {
      title: "Viêm khớp và thoái hóa khớp",
      slug: "viem-khop-thoai-hoa",
      summary: "Trang dành cho người tìm hiểu về đau khớp, thoái hóa và hướng tiếp cận an toàn.",
      content:
        "<p>Trang này kết nối câu hỏi của người đọc với quy trình, FAQ và hồ sơ bác sĩ liên quan để dễ đi tiếp hơn.</p>",
      seoTitle: "Viêm khớp và thoái hóa khớp",
      seoDescription: "Thông tin tham khảo về đau khớp và thoái hóa khớp.",
      faq: [
        {
          question: "Có cần xét nghiệm trước không?",
          answer: "<p>Tùy trường hợp, bác sĩ sẽ cân nhắc khi cần thêm dữ liệu để đánh giá phù hợp.</p>"
        }
      ],
      relatedServices: ["danh-gia-truoc-can-thiep", "hoi-chan-chuyen-mon"],
      relatedArticles: ["quy-trinh-tu-van-te-bao-goc-dien-ra-nhu-the-nao"]
    },
    {
      title: "Rụng tóc",
      slug: "rung-toc",
      summary: "Cụm nội dung cho người tìm hiểu về rụng tóc và muốn biết khi nào nên sàng lọc thêm.",
      content:
        "<p>Trang được viết để hỗ trợ người đọc hiểu khi nào rụng tóc là dấu hiệu cần quan tâm y khoa hơn.</p>",
      seoTitle: "Rụng tóc | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Thông tin tham khảo cho người đang tìm hiểu về rụng tóc.",
      faq: [
        {
          question: "Rụng tóc có phải lúc nào cũng đáng lo?",
          answer: "<p>Không phải lúc nào cũng nghiêm trọng, nhưng nếu kéo dài thì nên được đánh giá.</p>"
        }
      ],
      relatedServices: ["tu-van-te-bao-goc", "theo-doi-sau-tu-van"],
      relatedArticles: ["nhung-hieu-lam-thuong-gap-ve-te-bao-goc"]
    },
    {
      title: "Vấn đề da liễu",
      slug: "van-de-da-lieu",
      summary: "Nội dung dành cho người đang tìm góc nhìn y khoa về các vấn đề da kéo dài.",
      content:
        "<p>Trang này giúp nối câu hỏi của người dùng với FAQ, blog và trang liên hệ để tiếp cận thông tin hữu ích hơn.</p>",
      seoTitle: "Vấn đề da liễu | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Thông tin tham khảo cho các vấn đề da liễu kéo dài.",
      faq: [
        {
          question: "Thông tin trên website có thay thế chẩn đoán không?",
          answer: "<p>Không. Website chỉ nhằm hỗ trợ hiểu trước, còn đánh giá cuối cùng cần bác sĩ trực tiếp.</p>"
        }
      ],
      relatedServices: ["tu-van-suc-khoe-chuyen-sau", "tu-van-te-bao-goc"],
      relatedArticles: ["nhung-hieu-lam-thuong-gap-ve-te-bao-goc"]
    }
  ],
  specialties: [
    {
      title: "Tư vấn y học tái tạo",
      slug: "tu-van-y-hoc-tai-tao",
      summary: "Nhóm chủ đề dành cho người đang tìm hiểu y học tái tạo và phạm vi tư vấn.",
      content:
        "<p>Trang nhóm chủ đề này giúp người đọc hiểu đúng phạm vi tư vấn, kỳ vọng thực tế và bước tiếp theo khi cần đặt lịch.</p>",
      seoTitle: "Tư vấn y học tái tạo | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Trang nhóm chủ đề về y học tái tạo và tư vấn đầu vào."
    },
    {
      title: "Tư vấn tế bào gốc",
      slug: "tu-van-te-bao-goc",
      summary: "Nhóm nội dung giải thích tế bào gốc là gì, nên đọc gì trước và khi nào nên gặp bác sĩ.",
      content:
        "<p>Trang này đóng vai trò hub cho các nội dung liên quan đến tế bào gốc, blog và FAQ.</p>",
      seoTitle: "Tư vấn tế bào gốc | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Trang nhóm chủ đề về tư vấn tế bào gốc."
    },
    {
      title: "Đánh giá chỉ định",
      slug: "danh-gia-chi-dinh",
      summary: "Cụm nội dung cho người đang cần xem xét mức độ phù hợp trước khi đi tiếp.",
      content:
        "<p>Trang hub giúp người dùng hiểu tiêu chí đánh giá ban đầu và lý do vì sao nên trao đổi trực tiếp với bác sĩ.</p>",
      seoTitle: "Đánh giá chỉ định | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Trang nhóm chủ đề về đánh giá chỉ định và sàng lọc hồ sơ."
    },
    {
      title: "Theo dõi sau tư vấn",
      slug: "theo-doi-sau-tu-van",
      summary: "Cụm nội dung cho hành trình sau tư vấn, giải đáp thêm và nhắc lịch.",
      content:
        "<p>Trang hub này tập trung vào các bước sau tư vấn để người đọc không bị đứt quãng hành trình thông tin.</p>",
      seoTitle: "Theo dõi sau tư vấn | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Trang nhóm chủ đề về theo dõi sau tư vấn."
    }
  ],
  legalPages: [
    {
      title: "Chính sách biên tập",
      slug: "chinh-sach-bien-tap",
      body:
        "<p>Nội dung do phòng khám biên tập theo hướng rõ ràng, thận trọng và có người duyệt chuyên môn trước khi xuất bản.</p>",
      seoTitle: "Chính sách biên tập | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Chính sách biên tập nội dung y khoa của website",
      noindex: true
    },
    {
      title: "Chính sách duyệt y khoa",
      slug: "chinh-sach-duyet-y-khoa",
      body:
        "<p>Nội dung chỉ được xuất bản khi có bước duyệt y khoa phù hợp để giảm rủi ro diễn đạt sai hoặc quá kỳ vọng.</p>",
      seoTitle: "Chính sách duyệt y khoa | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Chính sách duyệt y khoa cho nội dung website",
      noindex: true
    },
    {
      title: "Chính sách bảo mật",
      slug: "chinh-sach-bao-mat",
      body:
        "<p>Thông tin cá nhân và thông tin sức khỏe được xử lý thận trọng, chỉ dùng cho mục đích hỗ trợ tư vấn và vận hành dịch vụ.</p>",
      seoTitle: "Chính sách bảo mật | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Chính sách bảo mật thông tin khách hàng",
      noindex: true
    }
  ],
  landingPages: [
    {
      title: "Tư vấn y học tái tạo",
      slug: "tu-van-y-hoc-tai-tao",
      heroTitle: "Tư vấn y học tái tạo và tế bào gốc",
      heroDescription: "Dữ liệu seed cho trang chuyển đổi đầu vào, dùng làm nguồn nội dung ban đầu trong Strapi.",
      primaryCta: primaryContact,
      seoTitle: "Tư vấn y học tái tạo | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Landing page tư vấn y học tái tạo"
    },
    {
      title: "Đặt lịch tư vấn",
      slug: "dat-lich-tu-van",
      heroTitle: "Đặt lịch tư vấn với Phòng khám Tái Tạo An Tâm",
      heroDescription: "Mẫu landing page chuyển đổi nhẹ cho các chiến dịch hoặc banner điều hướng.",
      primaryCta: hotlineContact,
      seoTitle: "Đặt lịch tư vấn | Phòng khám Tái Tạo An Tâm",
      seoDescription: "Landing page đặt lịch tư vấn"
    }
  ]
} satisfies ClinicSeedData;
