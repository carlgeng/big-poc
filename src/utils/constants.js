export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const CATEGORIES = {
  surgery: '外科手术',
  diagnosis: '诊断',
  treatment: '治疗',
  nursing: '护理',
  rehabilitation: '康复',
  prevention: '预防',
  monitoring: '监测',
  other: '其他',
};

export const PRIORITIES = {
  high: '高',
  medium: '中',
  low: '低',
};

export const STATUSES = {
  draft: '草稿',