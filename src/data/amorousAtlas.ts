export type AmorousCountry = {
  code: string;
  nameZh: string;
  nameEn: string;
  count: number;
  note?: string;
};

export const amorousCountries: AmorousCountry[] = [
  {
    code: "AU",
    nameZh: "澳大利亚",
    nameEn: "Australia",
    count: 60,
    note: "南十字星下的长夜旧梦",
  },
  {
    code: "US",
    nameZh: "美国",
    nameEn: "United States",
    count: 4,
    note: "加州阳光与异乡小美妞",
  },
  {
    code: "JP",
    nameZh: "日本",
    nameEn: "Japan",
    count: 151,
    note: "东京夜色，短梦如烟",
  },
  {
    code: "TH",
    nameZh: "泰国",
    nameEn: "Thailand",
    count: 75,
    note: "暹罗灯火，温柔旧梦",
  },
  {
    code: "IN",
    nameZh: "印度",
    nameEn: "India",
    count: 16,
    note: "天竺旧梦，人间烟火",
  },
//   {
//     code: "AE",
//     nameZh: "阿联酋",
//     nameEn: "United Arab Emirates",
//     count: 1,
//     note: "沙海灯火，异域夜色",
//   },
  {
    code: "SG",
    nameZh: "新加坡",
    nameEn: "Singapore",
    count: 27,
    note: "狮城夜色，短暂相逢",
  },
  {
    code: "MU",
    nameZh: "毛里求斯",
    nameEn: "Mauritius",
    count: 1,
    note: "印度洋海风里的异乡记忆",
  },
  {
    code: "VE",
    nameZh: "委内瑞拉",
    nameEn: "Venezuela",
    count: 1,
    note: "加勒比海风，南美旧梦",
  },
  {
    code: "ZA",
    nameZh: "南非",
    nameEn: "South Africa",
    count: 3,
    note: "南端大陆，夜色辽阔",
  },
  {
    code: "JM",
    nameZh: "牙买加",
    nameEn: "Jamaica",
    count: 1,
    note: "海岛节奏，热烈如歌",
  },
  {
    code: "IR",
    nameZh: "伊朗",
    nameEn: "Iran",
    count: 1,
    note: "波斯旧影，眉眼深长",
  },
  {
    code: "VN",
    nameZh: "越南",
    nameEn: "Vietnam",
    count: 16,
    note: "南国雨巷，灯火微潮",
  },
  {
    code: "PH",
    nameZh: "菲律宾",
    nameEn: "Philippines",
    count: 2,
    note: "群岛夜风，笑意明亮",
  },
  {
    code: "NZ",
    nameZh: "新西兰",
    nameEn: "New Zealand",
    count: 2,
    note: "长白云下，温柔一瞬",
  },
  {
    code: "KR",
    nameZh: "韩国",
    nameEn: "South Korea",
    count: 162,
    note: "首尔霓虹，短梦如雪",
  },
  {
    code: "BR",
    nameZh: "巴西",
    nameEn: "Brazil",
    count: 2,
    note: "热带节拍，明艳人间",
  },
  {
    code: "ES",
    nameZh: "西班牙",
    nameEn: "Spain",
    count: 1,
    note: "伊比利亚月色，热烈而悠长",
  },
  {
    code: "RU",
    nameZh: "俄罗斯",
    nameEn: "Russia",
    count: 13,
    note: "北国长夜，冷光如诗",
  },
  {
    code: "FR",
    nameZh: "法国",
    nameEn: "France",
    count: 1,
    note: "法兰西夜色，浪漫无声",
  },
  {
    code: "LA",
    nameZh: "老挝",
    nameEn: "Laos",
    count: 1,
    note: "湄公河畔，慢慢人间",
  },
  {
    code: "CO",
    nameZh: "哥伦比亚",
    nameEn: "Colombia",
    count: 1,
    note: "安第斯风情，热烈明亮",
  },
  {
    code: "CN",
    nameZh: "中国",
    nameEn: "China",
    count: 59,
    note: "故土人间，旧梦新痕",
  },
  {
    code: "HK",
    nameZh: "香港",
    nameEn: "Hong Kong",
    count: 25,
    note: "维港夜雨，霓虹浮光",
  },
  {
    code: "TW",
    nameZh: "台湾",
    nameEn: "Taiwan",
    count: 27,
    note: "海峡晚风，温柔如旧",
  },
  {
    code: "MY",
    nameZh: "马来西亚",
    nameEn: "Malaysia",
    count: 29,
    note: "南洋夜雨，旧梦微温",
  },
];

export function getAmorousLevel(count: number): number {
  if (!count || count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 8) return 3;
  return 4;
}

export function getAmorousLevelLabel(count: number): string {
  const level = getAmorousLevel(count);

  if (level === 0) return "未遇";
  if (level === 1) return "初见";
  if (level === 2) return "有缘";
  if (level === 3) return "多情";
  return "长夜";
}

export const amorousAtlasStats = {
  litCountries: amorousCountries.filter((country) => country.count > 0).length,

  totalEncounters: amorousCountries.reduce(
    (sum, country) => sum + country.count,
    0
  ),

  topCountry: [...amorousCountries].sort((a, b) => b.count - a.count)[0],
};