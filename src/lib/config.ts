import fs from 'fs'
import path from 'path'

export interface SysConfig {
  // Site
  siteTitle: string
  siteDescription: string
  siteLang: string
  siteAvatar: string
  siteName: string

  // Theme
  themeHue: number
  themeMode: 'light' | 'dark' | 'system'
  wallpaperMode: 'banner' | 'fullscreen' | 'transparent' | 'solid'
  bannerImages: string[]
  bannerVideo: string
  cardOpacity: number
  solidColor: string

  // Effects
  sakuraEnabled: boolean
  sakuraCount: number
  waveEnabled: boolean

  // Sidebar widgets
  showProfile: boolean
  showAnnouncement: boolean
  showMusicPlayer: boolean
  showTimeProgress: boolean
  showCalendar: boolean
  showWeather: boolean
  showEvents: boolean
  showStats: boolean

  // Announcement
  announcementTitle: string
  announcementContent: string
  announcementType: 'info' | 'warning' | 'success'

  // Social
  socialLinks: { name: string; url: string; icon: string }[]

  // Footer
  footerHtml: string
  footerBeian: string

  // Music
  musicServer: string
  musicType: string
  musicId: string
  musicAutoPlay: boolean

  // Weather
  weatherCity: string
  weatherAdcode: string

  // Events
  events: EventItem[]

  // Stats
  siteStartDate: string

  // Admin
  adminPassword: string
}

export interface EventItem {
  name: string
  poster: string
  targetDate: string
  location: string
  ticketUrl: string
  price: string
}

export interface Stats {
  totalPosts: number
  totalCategories: number
  totalTags: number
  totalWords: number
  daysRunning: number
}

const configPath = path.join(process.cwd(), 'data/config.json')
const configDir = path.join(process.cwd(), 'data')

const defaultConfig: SysConfig = {
  siteTitle: '我的博客',
  siteDescription: '分享技术、开发与生活的个人博客',
  siteLang: 'zh-CN',
  siteAvatar: '',
  siteName: '我的博客',

  themeHue: 180,
  themeMode: 'system',
  wallpaperMode: 'banner',
  bannerImages: [],
  bannerVideo: '',
  cardOpacity: 100,
  solidColor: '#f5f5f5',

  sakuraEnabled: false,
  sakuraCount: 50,
  waveEnabled: false,

  showProfile: true,
  showAnnouncement: false,
  showMusicPlayer: false,
  showTimeProgress: true,
  showCalendar: true,
  showWeather: false,
  showEvents: false,
  showStats: true,

  announcementTitle: '公告',
  announcementContent: '欢迎来到我的博客！',
  announcementType: 'info',

  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/f-ccc', icon: 'github' },
  ],

  footerHtml: '',
  footerBeian: '',

  musicServer: 'netease',
  musicType: 'playlist',
  musicId: '',
  musicAutoPlay: false,

  weatherCity: '',
  weatherAdcode: '',

  events: [],

  siteStartDate: new Date().toISOString().split('T')[0],

  adminPassword: 'hjw',
}

export function getConfig(): SysConfig {
  try {
    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true })
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8')
      return { ...defaultConfig }
    }
    const data = fs.readFileSync(configPath, 'utf8')
    return { ...defaultConfig, ...JSON.parse(data) }
  } catch {
    return { ...defaultConfig }
  }
}

export function updateConfig(updates: Partial<SysConfig>): SysConfig {
  const current = getConfig()
  const merged = { ...current, ...updates }
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true })
  fs.writeFileSync(configPath, JSON.stringify(merged, null, 2), 'utf8')
  return merged
}

export function getStats(): Stats {
  const { getAllPosts, getAllCategories, getAllTags } = require('./posts')
  const posts = getAllPosts()
  const totalWords = posts.reduce((sum: number, p: any) => sum + (p.content?.length || 0), 0)
  const config = getConfig()
  const startDate = new Date(config.siteStartDate)
  const daysRunning = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  return {
    totalPosts: posts.length,
    totalCategories: getAllCategories().length,
    totalTags: getAllTags().length,
    totalWords,
    daysRunning: Math.max(0, daysRunning),
  }
}
