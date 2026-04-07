'use client'

import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

const currencyMap: Record<string, { name: string, importance: number }> = {
  // Major & Existing
  CNY: { name: 'Chinese Yuan (人民币)', importance: 1 },
  EUR: { name: 'Euro (欧元)', importance: 2 },
  JPY: { name: 'Japanese Yen (日元)', importance: 3 },
  GBP: { name: 'British Pound (英镑)', importance: 4 },
  HKD: { name: 'Hong Kong Dollar (港元)', importance: 5 },
  CHF: { name: 'Swiss Franc (瑞士法郎)', importance: 6 },
  CAD: { name: 'Canadian Dollar (加拿大元)', importance: 7 },
  AUD: { name: 'Australian Dollar (澳大利亚元)', importance: 8 },
  INR: { name: 'Indian Rupee (印度卢比)', importance: 9 },
  KRW: { name: 'Korean Won (韩元)', importance: 10 },
  SGD: { name: 'Singapore Dollar (新加坡元)', importance: 11 },
  MXN: { name: 'Mexican Peso (墨西哥比索)', importance: 12 },
  BRL: { name: 'Brazilian Real (巴西雷亚尔)', importance: 13 },
  RUB: { name: 'Russian Ruble (俄罗斯卢布)', importance: 14 },
  ZAR: { name: 'South African Rand (南非兰特)', importance: 15 },
  TRY: { name: 'Turkish Lira (土耳其里拉)', importance: 16 },
  TWD: { name: 'Taiwan Dollar (新台币)', importance: 17 },
  PLN: { name: 'Polish Zloty (波兰兹罗提)', importance: 18 },
  THB: { name: 'Thai Baht (泰铢)', importance: 19 },
  IDR: { name: 'Indonesian Rupiah (印尼盾)', importance: 20 },
  VND: { name: 'Vietnam Dong (越南盾)', importance: 21 },
  COP: { name: 'Colombian Peso (哥伦比亚比索)', importance: 22 },
  ARS: { name: 'Argentine Peso (阿根廷比索)', importance: 23 },
  PHP: { name: 'Philippine Peso (菲律宾比索)', importance: 24 },
  MYR: { name: 'Malaysian Ringgit (马来西亚林吉特)', importance: 25 },
  CUP: { name: 'Cuban Peso (古巴比索)', importance: 26 },
  UAH: { name: 'Ukraine Hryvnia (乌克兰格里夫纳)', importance: 27 },
  CZK: { name: 'Czech Koruna (捷克克朗)', importance: 28 },
  ALL: { name: 'Albanian Lek (阿尔巴尼亚列克)', importance: 29 },
  DZD: { name: 'Algerian Dinar (阿尔及利亚第纳尔)', importance: 30 },
  BGN: { name: 'Bulgarian Lev (保加利亚列弗)', importance: 31 },
  LAK: { name: 'Laotian Kip (老挝基普)', importance: 32 },
  KHR: { name: 'Cambodian Riel (柬埔寨瑞尔)', importance: 33 },
  BDT: { name: 'Bangladeshi Taka (孟加拉塔卡)', importance: 34 },
  PKR: { name: 'Pakistan Rupee (巴基斯坦卢比)', importance: 35 },
  QAR: { name: 'Qatari Rial (卡塔尔里亚尔)', importance: 36 },
  CRC: { name: 'Costa Rican Colón (哥斯达黎加科朗)', importance: 37 },
  GTQ: { name: 'Guatemalan Quetzal (危地马拉格查尔)', importance: 38 },
  HTG: { name: 'Haitian Gourde (海地古德)', importance: 39 },
  FJD: { name: 'Fijian Dollar (斐济元)', importance: 40 },
  CLP: { name: 'Chilean Peso (智利比索)', importance: 41 },
  HUF: { name: 'Hungarian Forint (匈牙利福林)', importance: 42 },
  IRR: { name: 'Iranian Rial (伊朗里亚尔)', importance: 43 },
  IQD: { name: 'Iraqi Dinar (伊拉克第纳尔)', importance: 44 },
  ILS: { name: 'New Israeli Sheqel (以色列新谢克尔)', importance: 45 },
  JMD: { name: 'Jamaican Dollar (牙买加元)', importance: 46 },
  MVR: { name: 'Maldivian Rufiyaa (马尔代夫拉菲亚)', importance: 47 },
  MMK: { name: 'Mynamar Kyat (缅甸元)', importance: 48 },
  NPR: { name: 'Nepalese Rupee (尼泊尔卢比)', importance: 49 },
  NZD: { name: 'New Zealand Dollar (新西兰元)', importance: 50 },
  NIO: { name: 'Nicaraguan Córdoba (尼加拉瓜科多巴)', importance: 51 },
  RON: { name: 'Romanian Leu (罗马尼亚列伊)', importance: 52 },
  AED: { name: 'Emirati Dirham (阿联酋迪拉姆)', importance: 53 },
  SAR: { name: 'Saudi Riyal (沙特里亚尔)', importance: 54 },
  SEK: { name: 'Swedish Krona (瑞典克朗)', importance: 55 },
  NOK: { name: 'Norwegian Krone (挪威克朗)', importance: 56 },
  DKK: { name: 'Danish Krone (丹麦克朗)', importance: 57 },
  EGP: { name: 'Egyptian Pound (埃及镑)', importance: 58 },
  NGN: { name: 'Nigerian Naira (尼日利亚奈拉)', importance: 59 },
  KES: { name: 'Kenyan Shilling (肯尼亚先令)', importance: 60 },
  MAD: { name: 'Moroccan Dirham (摩洛哥迪拉姆)', importance: 61 },
  KWD: { name: 'Kuwaiti Dinar (科威特第纳尔)', importance: 62 },
  OMR: { name: 'Omani Rial (阿曼里亚尔)', importance: 63 },
  BHD: { name: 'Bahraini Dinar (巴林第纳尔)', importance: 64 },
  JOD: { name: 'Jordanian Dinar (约旦第纳尔)', importance: 65 },
  LBP: { name: 'Lebanese Pound (黎巴嫩镑)', importance: 66 },
  XOF: { name: 'West African CFA franc (西非法郎)', importance: 67 },
  AFN: { name: 'Afghan Afghani (阿富汗尼)', importance: 68 },
  USD: { name: 'US Dollar (美元)', importance: 0 },

  // Expanded coverage
  AMD: { name: 'Armenian Dram (亚美尼亚德拉姆)', importance: 100 },
  ANG: { name: 'Netherlands Antillean Guilder (荷属安的列斯盾)', importance: 101 },
  AOA: { name: 'Angolan Kwanza (安哥拉宽扎)', importance: 102 },
  AWG: { name: 'Aruban Florin (阿鲁巴弗罗林)', importance: 103 },
  AZN: { name: 'Azerbaijani Manat (阿塞拜疆马纳特)', importance: 104 },
  BAM: { name: 'Bosnia-Herzegovina Convertible Mark (波黑可兑换马克)', importance: 105 },
  BBD: { name: 'Barbadian Dollar (巴巴多斯元)', importance: 106 },
  BIF: { name: 'Burundian Franc (布隆迪法郎)', importance: 107 },
  BMD: { name: 'Bermudian Dollar (百慕大元)', importance: 108 },
  BND: { name: 'Brunei Dollar (文莱元)', importance: 109 },
  BOB: { name: 'Bolivian Boliviano (玻利维亚诺)', importance: 110 },
  BSD: { name: 'Bahamian Dollar (巴哈马元)', importance: 111 },
  BTN: { name: 'Bhutanese Ngultrum (不丹努尔特鲁姆)', importance: 112 },
  BWP: { name: 'Botswana Pula (博茨瓦纳普拉)', importance: 113 },
  BYN: { name: 'Belarusian Ruble (白俄罗斯卢布)', importance: 114 },
  BZD: { name: 'Belize Dollar (伯利兹元)', importance: 115 },
  CDF: { name: 'Congolese Franc (刚果法郎)', importance: 116 },
  CVE: { name: 'Cape Verdean Escudo (佛得角埃斯库多)', importance: 117 },
  DJF: { name: 'Djiboutian Franc (吉布提法郎)', importance: 118 },
  DOP: { name: 'Dominican Peso (多米尼加比索)', importance: 119 },
  ERN: { name: 'Eritrean Nakfa (厄立特里亚纳克法)', importance: 120 },
  ETB: { name: 'Ethiopian Birr (埃塞俄比亚比尔)', importance: 121 },
  FOK: { name: 'Faroese Króna (法罗群岛克朗)', importance: 122 },
  GEL: { name: 'Georgian Lari (格鲁吉亚拉里)', importance: 123 },
  GGP: { name: 'Guernsey Pound (根西岛镑)', importance: 124 },
  GHS: { name: 'Ghanaian Cedi (加纳塞地)', importance: 125 },
  GIP: { name: 'Gibraltar Pound (直布罗陀镑)', importance: 126 },
  GMD: { name: 'Gambian Dalasi (甘比亚达拉西)', importance: 127 },
  GNF: { name: 'Guinean Franc (几内亚法郎)', importance: 128 },
  GYD: { name: 'Guyanese Dollar (圭亚那元)', importance: 129 },
  HNL: { name: 'Honduran Lempira (洪都拉斯伦皮拉)', importance: 130 },
  ISK: { name: 'Icelandic Króna (冰岛克朗)', importance: 131 },
  JEP: { name: 'Jersey Pound (泽西岛镑)', importance: 132 },
  KGS: { name: 'Kyrgyzstani Som (吉尔吉斯斯坦索姆)', importance: 133 },
  KID: { name: 'Kiribati Dollar (基里巴斯元)', importance: 134 },
  KMF: { name: 'Comorian Franc (科摩罗法郎)', importance: 135 },
  KPW: { name: 'North Korean Won (朝鲜元)', importance: 136 },
  KYD: { name: 'Cayman Islands Dollar (开曼群岛元)', importance: 137 },
  KZT: { name: 'Kazakhstani Tenge (哈萨克斯坦坚戈)', importance: 138 },
  LKR: { name: 'Sri Lankan Rupee (斯里兰卡卢比)', importance: 139 },
  LRD: { name: 'Liberian Dollar (利比里亚元)', importance: 140 },
  LSL: { name: 'Lesotho Loti (莱索托洛蒂)', importance: 141 },
  LYD: { name: 'Libyan Dinar (利比亚第纳尔)', importance: 142 },
  MDL: { name: 'Moldovan Leu (摩尔多瓦列伊)', importance: 143 },
  MGA: { name: 'Malagasy Ariary (马达加斯加阿里亚里)', importance: 144 },
  MKD: { name: 'Macedonian Denar (马其顿第纳尔)', importance: 145 },
  MNT: { name: 'Mongolian Tögrög (蒙古图格里克)', importance: 146 },
  MOP: { name: 'Macanese Pataca (澳门元)', importance: 147 },
  MRU: { name: 'Mauritanian Ouguiya (毛里塔尼亚乌吉亚)', importance: 148 },
  MUR: { name: 'Mauritian Rupee (毛里求斯卢比)', importance: 149 },
  MWK: { name: 'Malawian Kwacha (马拉维克瓦查)', importance: 150 },
  MZN: { name: 'Mozambican Metical (莫桑比克梅蒂卡尔)', importance: 151 },
  NAD: { name: 'Namibian Dollar (纳米比亚元)', importance: 152 },
  PAB: { name: 'Panamanian Balboa (巴拿马巴波亚)', importance: 153 },
  PEN: { name: 'Peruvian Sol (秘鲁索尔)', importance: 154 },
  PGK: { name: 'Papua New Guinean Kina (巴布亚新几内亚基那)', importance: 155 },
  PYG: { name: 'Paraguayan Guaraní (巴拉圭瓜拉尼)', importance: 156 },
  RSD: { name: 'Serbian Dinar (塞尔维亚第纳尔)', importance: 157 },
  RWF: { name: 'Rwandan Franc (卢旺达法郎)', importance: 158 },
  SBD: { name: 'Solomon Islands Dollar (所罗门群岛元)', importance: 159 },
  SCR: { name: 'Seychellois Rupee (塞舌尔卢比)', importance: 160 },
  SDG: { name: 'Sudanese Pound (苏丹镑)', importance: 161 },
  SHP: { name: 'Saint Helena Pound (圣赫勒拿镑)', importance: 162 },
  SLE: { name: 'Sierra Leonean Leone (塞拉利昂利昂)', importance: 163 },
  SLL: { name: 'Sierra Leonean Leone (old) (旧塞拉利昂利昂)', importance: 164 },
  SOS: { name: 'Somali Shilling (索马里先令)', importance: 165 },
  SRD: { name: 'Surinamese Dollar (苏里南元)', importance: 166 },
  SSP: { name: 'South Sudanese Pound (南苏丹镑)', importance: 167 },
  STN: { name: 'São Tomé and Príncipe Dobra (圣多美和普林西比多布拉)', importance: 168 },
  SYP: { name: 'Syrian Pound (叙利亚镑)', importance: 169 },
  SZL: { name: 'Swazi Lilangeni (斯威士兰里兰吉尼)', importance: 170 },
  TJS: { name: 'Tajikistani Somoni (塔吉克斯坦索莫尼)', importance: 171 },
  TMT: { name: 'Turkmenistani Manat (土库曼斯坦马纳特)', importance: 172 },
  TND: { name: 'Tunisian Dinar (突尼斯第纳尔)', importance: 173 },
  TOP: { name: 'Tongan Paʻanga (汤加潘加)', importance: 174 },
  TTD: { name: 'Trinidad and Tobago Dollar (特立尼达和多巴哥元)', importance: 175 },
  TVD: { name: 'Tuvaluan Dollar (图瓦卢元)', importance: 176 },
  TZS: { name: 'Tanzanian Shilling (坦桑尼亚先令)', importance: 177 },
  UGX: { name: 'Ugandan Shilling (乌干达先令)', importance: 178 },
  UYU: { name: 'Uruguayan Peso (乌拉圭比索)', importance: 179 },
  UZS: { name: 'Uzbekistani Som (乌兹别克斯坦索姆)', importance: 180 },
  VES: { name: 'Venezuelan Bolívar (委内瑞拉玻利瓦尔)', importance: 181 },
  VUV: { name: 'Vanuatu Vatu (瓦努阿图瓦图)', importance: 182 },
  WST: { name: 'Samoan Tala (萨摩亚塔拉)', importance: 183 },
  XAF: { name: 'Central African CFA franc (中非法郎)', importance: 184 },
  XCD: { name: 'East Caribbean Dollar (东加勒比元)', importance: 185 },
  XDR: { name: 'Special Drawing Rights (特别提款权)', importance: 186 },
  XPF: { name: 'CFP franc (太平洋法郎)', importance: 187 },
  YER: { name: 'Yemeni Rial (也门里亚尔)', importance: 188 },
  ZMW: { name: 'Zambian Kwacha (赞比亚克瓦查)', importance: 189 },
  ZWL: { name: 'Zimbabwean Dollar (津巴布韦元)', importance: 190 },
}

function getCurrencyName(code: string) {
  if (currencyMap[code]) return currencyMap[code].name
  try {
    const en = new Intl.DisplayNames(['en'], { type: 'currency' }).of(code)
    const zh = new Intl.DisplayNames(['zh'], { type: 'currency' }).of(code)
    if (en && en !== code) {
      return zh && zh !== code ? `${en} (${zh})` : en
    }
  } catch (e) {
    // Fallback to code if Intl fails
  }
  return code
}

function getCurrencyImportance(code: string) {
  return currencyMap[code]?.importance ?? 999
}

const cryptoMap: Record<string, string> = {
  btc: '比特币',
  eth: '以太坊',
  usdt: '泰达币',
  bnb: '币安币',
  sol: '索拉纳',
  xrp: '瑞波币',
  usdc: '美元兑换币',
  ada: '艾达币',
  doge: '狗狗币',
  avax: '雪崩协议',
  shib: '柴犬币',
  dot: '波卡',
  link: 'Chainlink',
  trx: '波场',
  matic: '马蹄网',
  bch: '比特现金',
  ltc: '莱特币',
  uni: 'Uniswap',
  apt: 'Aptos',
  xlm: '恒星币',
  atom: '阿童木',
  icp: '互联网计算机',
  xmr: '门罗币',
  ton: 'Ton币',
  wbtc: '包裹比特币',
  pepe: '佩佩蛙',
  dai: 'Dai',
  hbar: 'Hedera',
  kas: 'Kaspa',
  etc: '以太经典',
  rndr: 'Render',
  ldo: 'Lido',
  stx: 'Stacks',
  inj: 'Injective',
  op: 'Optimism',
  arb: 'Arbitrum',
  vet: '唯链',
}

function getCryptoName(symbol: string, name: string) {
  const zh = cryptoMap[symbol.toLowerCase()]
  return zh ? `${name} (${zh})` : name
}

function getCurrencySymbol(code: string) {
  try {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: code })
    const parts = formatter.formatToParts(0)
    const symbolPart = parts.find(part => part.type === 'currency')
    return symbolPart ? symbolPart.value : code
  } catch (e) {
    return code
  }
}

export default function CurrencyPage() {
  const [rates, setRates] = useState<Record<string, number>>({})
  const [cryptoData, setCryptoData] = useState<any[]>([])
  const [date, setDate] = useState('')
  const [cryptoDate, setCryptoDate] = useState('')
  const [flags, setFlags] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState(0) // 0: Slideshow, 1: Major, 2: Low Value, 3: Crypto
  const [search, setSearch] = useState('')
  const [paused, setPaused] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data.rates) {
          setRates(data.rates)
          // Format Date
          const formatedDate = new Date(data.time_last_update_utc).toLocaleString('en-US')
          setDate(formatedDate)
        }
      })
      .catch(err => console.error(err))

    const fetchCrypto = () => {
      const now = Date.now()
      const cached = localStorage.getItem('cryptoDataCache')
      const cacheTime = localStorage.getItem('cryptoDataTime')

      // Check if cache exists and is less than 5 minutes (300000 ms) old
      if (cached && cacheTime && now - parseInt(cacheTime) < 300000) {
        const data = JSON.parse(cached)
        setCryptoData(data)
        if (data.length > 0 && data[0].last_updated) {
          setCryptoDate(new Date(data[0].last_updated).toLocaleString('en-US'))
        }
        return
      }

      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            localStorage.setItem('cryptoDataCache', JSON.stringify(data))
            localStorage.setItem('cryptoDataTime', now.toString())
            setCryptoData(data)
            if (data.length > 0 && data[0].last_updated) {
              setCryptoDate(new Date(data[0].last_updated).toLocaleString('en-US'))
            }
          }
        })
        .catch(err => console.error(err))
    }

    fetchCrypto()
    const cryptoInterval = setInterval(fetchCrypto, 300000) // Poll crypto every 5 minutes

    return () => clearInterval(cryptoInterval)
  }, [])

  // Fetch Country Flags
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=currencies,flags')
      .then(res => res.json())
      .then(data => {
        const flagMap: Record<string, string> = {}
        data.forEach((country: any) => {
          if (country.currencies && country.flags && country.flags.png) {
            Object.keys(country.currencies).forEach(code => {
              if (!flagMap[code]) {
                flagMap[code] = country.flags.png
              }
            })
          }
        })
        // Overrides for common multi-country currencies to ensure primary flag
        if (flagMap['USD']) flagMap['USD'] = 'https://flagcdn.com/w320/us.png'
        if (flagMap['EUR']) flagMap['EUR'] = 'https://flagcdn.com/w320/eu.png'
        if (flagMap['GBP']) flagMap['GBP'] = 'https://flagcdn.com/w320/gb.png'
        if (flagMap['AUD']) flagMap['AUD'] = 'https://flagcdn.com/w320/au.png'
        if (flagMap['XOF']) flagMap['XOF'] = 'https://flagcdn.com/w320/ci.png'
        setFlags(flagMap)
      })
      .catch(err => console.error(err))
  }, [])

  // Handle Confetti
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Prevent confetti when clicking interactable elements like buttons/inputs
      const target = e.target as HTMLElement
      if (target.closest && target.closest('input, button, [role="button"]')) return
      confetti({
        particleCount: 150,
        spread: 80,
        shapes: ['circle', 'square', 'star'],
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      })
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const currencies = Object.keys(rates).map(code => ({
    code,
    rate: rates[code],
    name: getCurrencyName(code),
    importance: getCurrencyImportance(code)
  }))

  const filteredCurrencies = currencies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  )

  const filteredCrypto = cryptoData.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const sortedMajor = [...filteredCurrencies].sort((a, b) => a.importance - b.importance)
  const sortedLowValue = [...filteredCurrencies].sort((a, b) => b.rate - a.rate)

  useEffect(() => {
    if (activeTab !== 0 || paused || sortedMajor.length === 0) return
    const interval = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % sortedMajor.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [activeTab, paused, sortedMajor.length])

  // Reset slide index if search changes
  useEffect(() => {
    setSlideIndex(0)
  }, [search])

  const renderSlideshow = () => {
    if (Object.keys(rates).length === 0) {
      return (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p style={{ color: 'var(--text-muted)' }}>Loading Currency Data (加载中)...</p>
        </div>
      )
    }

    if (sortedMajor.length === 0) {
      return (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <p>No currencies found matching &quot;{search}&quot; (未找到货币)</p>
        </div>
      )
    }
    const safeSlideIndex = slideIndex >= sortedMajor.length ? 0 : slideIndex
    const currentSlide = sortedMajor[safeSlideIndex]

    return (
      <div
        className="glass-panel"
        style={{ padding: '40px 20px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}
        onClick={() => setPaused(!paused)}
      >
        <div style={{ position: 'absolute', top: 15, left: 20, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {safeSlideIndex + 1} of {sortedMajor.length}
        </div>
        <div style={{ position: 'absolute', top: 15, right: 20, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {paused ? '⏸ Paused' : '▶ Playing'}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
          {flags[currentSlide.code] ? (
            <img src={flags[currentSlide.code]} alt={currentSlide.code} style={{ width: '80px', height: '54px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
          ) : (
            <div style={{ width: '80px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '18px' }}>{currentSlide.code}</div>
          )}
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{currentSlide.name}</h2>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '5px' }}>{currentSlide.code} ({getCurrencySymbol(currentSlide.code)})</h3>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          {currentSlide.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Relative to 1 USD</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '5px', flexWrap: 'wrap' }}>
          {sortedMajor.map((_, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i === safeSlideIndex ? 'var(--accent)' : 'var(--border-light)',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  const renderList = (list: typeof sortedMajor) => {
    if (Object.keys(rates).length === 0) {
      return (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p style={{ color: 'var(--text-muted)' }}>Loading List (加载中)...</p>
        </div>
      )
    }

    if (list.length === 0) return <p style={{ textAlign: 'center', padding: '20px' }}>No currencies found matching &quot;{search}&quot; (未找到货币)</p>
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {list.map(c => (
          <div key={c.code} className="glass-panel" style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {flags[c.code] ? (
                <img src={flags[c.code]} alt={c.code} style={{ width: '45px', height: '30px', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              ) : (
                <div style={{ width: '45px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '12px' }}>{c.code}</div>
              )}
              <div>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{c.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.code} ({getCurrencySymbol(c.code)})</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-main)' }}>
              {c.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderCryptoList = (list: any[]) => {
    if (cryptoData.length === 0) {
      return (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p style={{ color: 'var(--text-muted)' }}>Loading Crypto Market Data (加载中)...</p>
        </div>
      )
    }

    const formatMarketCap = (num: number) => {
      if (!num) return '0'
      if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
      if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
      if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
      return num.toLocaleString('en-US')
    }

    const totalMarketCap = cryptoData.reduce((sum, c) => sum + (c.market_cap || 0), 0)
    const totalCount = cryptoData.length
    const displayedCount = list.length

    if (list.length === 0) return <p style={{ textAlign: 'center', padding: '20px' }}>No cryptocoins found matching &quot;{search}&quot; (未找到加密货币)</p>

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', borderBottom: '3px solid var(--accent)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Total Count (总数)
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)' }}>
              {search ? `${displayedCount} / ${totalCount}` : totalCount}
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', borderBottom: '3px solid var(--accent)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Total Market Cap (总市值)
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent)' }}>
              ${formatMarketCap(totalMarketCap)}
            </div>
          </div>
        </div>

        {/* List items */}
        {list.map(c => (
          <div key={c.id} className="glass-panel" style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={c.image} alt={c.name} style={{ width: '40px', height: '40px', borderRadius: '50%', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }} />
              <div>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{getCryptoName(c.symbol, c.name)}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{c.symbol}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Market Cap: ${formatMarketCap(c.market_cap)}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-main)' }}>
                ${c.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </div>
              <div style={{ fontSize: '0.85rem', color: c.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '2px' }}>
                {c.price_change_percentage_24h >= 0 ? '▲' : '▼'}
                {Math.abs(c.price_change_percentage_24h).toFixed(2)}% (24h)
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ padding: '30px 20px', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            className="glass-input"
            placeholder="Search (搜索)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <button
          className="glass-button help-trigger"
          onClick={() => setIsHelpOpen(true)}
          title="Help & Instructions"
          aria-label="Help"
        >
          ?
        </button>
      </div>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img
          src="/logo.png"
          alt="World Currency Logo"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            marginBottom: '20px',
            boxShadow: '0 0 25px var(--accent-glow)',
            objectFit: 'cover'
          }}
        />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>World Currencies (世界货币)</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '5px' }}>
          {activeTab === 3 ? '1 Crypto to USD (1 加密货币兑美元)' : '1 USD to other currencies (1 美元兑其他货币)'}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          As of (截至): {activeTab === 3 ? (cryptoDate || 'Loading...') : (date || 'Loading...')}
        </p>
      </header>


      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
        <button
          className={`glass-button ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
          style={{ flex: 1, whiteSpace: 'nowrap' }}
        >
          Slide Show (幻灯片)
        </button>
        <button
          className={`glass-button ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
          style={{ flex: 1, whiteSpace: 'nowrap' }}
        >
          Major Currencies (主要货币)
        </button>
        <button
          className={`glass-button ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => setActiveTab(2)}
          style={{ flex: 1, whiteSpace: 'nowrap' }}
        >
          Low Value (低价值)
        </button>
        <button
          className={`glass-button ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => setActiveTab(3)}
          style={{ flex: 1, whiteSpace: 'nowrap' }}
        >
          Crypto (加密货币)
        </button>
      </div>

      {activeTab !== 3 && Object.keys(rates).length > 0 && (
        <div className="glass-panel" style={{ padding: '15px', textAlign: 'center', marginBottom: '20px', borderBottom: '3px solid var(--accent)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
            Total Currencies (货币总数)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
            {search ? `${filteredCurrencies.length} / ${currencies.length}` : currencies.length}
          </div>
        </div>
      )}

      <main>
        {activeTab === 0 && renderSlideshow()}
        {activeTab === 1 && renderList(sortedMajor)}
        {activeTab === 2 && renderList(sortedLowValue)}
        {activeTab === 3 && renderCryptoList(filteredCrypto)}
      </main>

      {isHelpOpen && (
        <div className="modal-overlay" onClick={() => setIsHelpOpen(false)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()}>
            <button className="help-close" onClick={() => setIsHelpOpen(false)}>×</button>
            <h2 style={{ marginBottom: '20px', color: 'var(--text-main)', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
              How to use World Currency
            </h2>

            <div className="help-item">
              <h4><span>🌍</span> Slideshow (幻灯片)</h4>
              <p style={{ color: 'var(--text-muted)' }}>Sit back and watch the world&apos;s currencies roll by. Click anywhere on the slideshow panel to pause or resume.</p>
            </div>

            <div className="help-item">
              <h4><span>🔍</span> Smart Search (搜索)</h4>
              <p style={{ color: 'var(--text-muted)' }}>Found in the top right. Type any country name, currency name, or 3-letter code (like USD, EUR, BTC) to find it instantly.</p>
            </div>

            <div className="help-item">
              <h4><span>💎</span> Crypto Mode (加密货币)</h4>
              <p style={{ color: 'var(--text-muted)' }}>Switch to the Crypto tab to see real-time price feeds for the top 250 cryptocurrencies by market cap.</p>
            </div>

            <div className="help-item">
              <h4><span>✨</span> Interactive Fun (互动)</h4>
              <p style={{ color: 'var(--text-muted)' }}>Click anywhere on the background to celebrate with a confetti burst! (Try it!)</p>
            </div>

            <button
              className="glass-button"
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => setIsHelpOpen(false)}
            >
              Got it! (明白了)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
