'use client'

import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

const currencyMap: Record<string, {name: string, importance: number}> = {
  CNY: { name: 'Chinese Yuan', importance: 1 },
  EUR: { name: 'Euro', importance: 2 },
  JPY: { name: 'Japanese Yen', importance: 3 },
  GBP: { name: 'British Pound', importance: 4 },
  HKD: { name: 'Hong Kong Dollar', importance: 5 },
  CHF: { name: 'Swiss Franc', importance: 6 },
  CAD: { name: 'Canadian Dollar', importance: 7 },
  AUD: { name: 'Australian Dollar', importance: 8 },
  INR: { name: 'Indian Rupee', importance: 9 },
  KRW: { name: 'Korean Won', importance: 10 },
  SGD: { name: 'Singapore Dollar', importance: 11 },
  MXN: { name: 'Mexican Peso', importance: 12 },
  BRL: { name: 'Brazilian Real', importance: 13 },
  RUB: { name: 'Russian Ruble', importance: 14 },
  ZAR: { name: 'South African Rand', importance: 15 },
  TRY: { name: 'Turkish Lira', importance: 16 },
  TWD: { name: 'Taiwan Dollar', importance: 17 },
  PLN: { name: 'Polish Zloty', importance: 18 },
  THB: { name: 'Thai Baht', importance: 19 },
  IDR: { name: 'Indonesian Rupiah', importance: 20 },
  VND: { name: 'Vietnam Dong', importance: 21 },
  COP: { name: 'Colombian Peso', importance: 22 },
  ARS: { name: 'Argentine Peso', importance: 23 },
  PHP: { name: 'Philippine Peso', importance: 24 },
  MYR: { name: 'Malaysian Ringgit', importance: 25 },
  CUP: { name: 'Cuban Peso', importance: 26 },
  UAH: { name: 'Ukraine Hryvnia', importance: 27 },
  CZK: { name: 'Czech Koruna', importance: 28 },
  ALL: { name: 'Albanian Lek', importance: 29 },
  DZD: { name: 'Algerian Dinar', importance: 30 },
  BGN: { name: 'Bulgarian Lev', importance: 31 },
  LAK: { name: 'Laotian Kip', importance: 32 },
  KHR: { name: 'Cambodian Riel', importance: 33 },
  BDT: { name: 'Bangladeshi Taka', importance: 34 },
  PKR: { name: 'Pakistan Rupee', importance: 35 },
  QAR: { name: 'Qatari Rial', importance: 36 },
  CRC: { name: 'Costa Rican Colón', importance: 37 },
  GTQ: { name: 'Guatemalan Quetzal', importance: 38 },
  HTG: { name: 'Haitian Gourde', importance: 39 },
  FJD: { name: 'Fijian Dollar', importance: 40 },
  CLP: { name: 'Chilean Peso', importance: 41 },
  HUF: { name: 'Hungarian Forint', importance: 42 },
  IRR: { name: 'Iranian Rial', importance: 43 },
  IQD: { name: 'Iraqi Dinar', importance: 44 },
  ILS: { name: 'New Israeli Sheqel', importance: 45 },
  JMD: { name: 'Jamaican Dollar', importance: 46 },
  MVR: { name: 'Maldivian Rufiyaa', importance: 47 },
  MMK: { name: 'Mynamar Kyat', importance: 48 },
  NPR: { name: 'Nepalese Rupee', importance: 49 },
  NZD: { name: 'New Zealand Dollar', importance: 50 },
  NIO: { name: 'Nicaraguan Córdoba', importance: 51 },
  RON: { name: 'Romanian Leu', importance: 52 },
  AED: { name: 'Emirati Dirham', importance: 53 },
  SAR: { name: 'Saudi Riyal', importance: 54 },
  SEK: { name: 'Swedish Krona', importance: 55 },
  NOK: { name: 'Norwegian Krone', importance: 56 },
  DKK: { name: 'Danish Krone', importance: 57 },
  EGP: { name: 'Egyptian Pound', importance: 58 },
  NGN: { name: 'Nigerian Naira', importance: 59 },
  KES: { name: 'Kenyan Shilling', importance: 60 },
  MAD: { name: 'Moroccan Dirham', importance: 61 },
  KWD: { name: 'Kuwaiti Dinar', importance: 62 },
  OMR: { name: 'Omani Rial', importance: 63 },
  BHD: { name: 'Bahraini Dinar', importance: 64 },
  JOD: { name: 'Jordanian Dinar', importance: 65 },
  LBP: { name: 'Lebanese Pound', importance: 66 },
  USD: { name: 'US Dollar', importance: 0 }
}

function getCurrencyName(code: string) {
  return currencyMap[code]?.name || code
}

function getCurrencyImportance(code: string) {
  return currencyMap[code]?.importance ?? 999
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
        setFlags(flagMap)
      })
      .catch(err => console.error(err))
  }, [])

  // Handle Confetti
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Prevent confetti when clicking interactable elements like buttons/inputs
      const target = e.target as HTMLElement
      if (['INPUT', 'BUTTON'].includes(target.tagName)) return
      confetti({
        particleCount: 50,
        spread: 60,
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
    if (sortedMajor.length === 0) return <p>No currencies found</p>
    const currentSlide = sortedMajor[slideIndex]

    return (
      <div 
        className="glass-panel" 
        style={{ padding: '40px 20px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}
        onClick={() => setPaused(!paused)}
      >
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
        <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '5px' }}>{currentSlide.code}</h3>
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
                background: i === slideIndex ? 'var(--accent)' : 'var(--border-light)',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  const renderList = (list: typeof sortedMajor) => {
    if (list.length === 0) return <p>No currencies found</p>
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
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.code}</div>
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
    if (list.length === 0) return <p>No cryptocoins found</p>

    const formatMarketCap = (num: number) => {
      if (!num) return '0'
      if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
      if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
      if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
      return num.toLocaleString('en-US')
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {list.map(c => (
          <div key={c.id} className="glass-panel" style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={c.image} alt={c.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              <div>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{c.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{c.symbol}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  MarketCap: ${formatMarketCap(c.market_cap)}
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
    <div style={{ padding: '30px 20px', maxWidth: '800px', margin: '0 auto' }}>
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
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>World Currency</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '5px' }}>
          {activeTab === 3 ? '1 Crypto to USD' : '1 USD to other currencies'}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          As of: {activeTab === 3 ? (cryptoDate || 'Loading...') : (date || 'Loading...')}
        </p>
      </header>

      <div style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          className="glass-input" 
          placeholder="Search by country or currency name..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
        <button 
          className={`glass-button ${activeTab === 0 ? 'active' : ''}`} 
          onClick={() => setActiveTab(0)}
          style={{ flex: 1, whiteSpace: 'nowrap' }}
        >
          Slide Show
        </button>
        <button 
          className={`glass-button ${activeTab === 1 ? 'active' : ''}`} 
          onClick={() => setActiveTab(1)}
          style={{ flex: 1, whiteSpace: 'nowrap' }}
        >
          Major Currencies
        </button>
        <button 
          className={`glass-button ${activeTab === 2 ? 'active' : ''}`} 
          onClick={() => setActiveTab(2)}
          style={{ flex: 1, whiteSpace: 'nowrap' }}
        >
          Low Value
        </button>
        <button 
          className={`glass-button ${activeTab === 3 ? 'active' : ''}`} 
          onClick={() => setActiveTab(3)}
          style={{ flex: 1, whiteSpace: 'nowrap' }}
        >
          Crypto
        </button>
      </div>

      <main>
        {activeTab === 0 && renderSlideshow()}
        {activeTab === 1 && renderList(sortedMajor)}
        {activeTab === 2 && renderList(sortedLowValue)}
        {activeTab === 3 && renderCryptoList(filteredCrypto)}
      </main>
    </div>
  )
}
