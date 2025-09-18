import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format percentage with sign for positive/negative changes
export function formatPercentage(value: number, showSign = false): string {
  const formatted = Math.abs(value).toFixed(1) + '%';
  if (showSign && value > 0) {
    return '+' + formatted;
  } else if (value < 0) {
    return '-' + formatted;
  }
  return formatted;
}

// Format large numbers with K/M/B suffixes
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Format Brazilian currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Format date to Brazilian format
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', options || {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d);
}

// Format datetime to Brazilian format
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
}

// Get relative time (e.g., "2 hours ago")
export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'agora mesmo';
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
  }
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
  }

  return formatDate(d);
}

// Get sentiment color based on value
export function getSentimentColor(sentiment: 'positive' | 'negative' | 'neutral' | 'mixed'): string {
  switch (sentiment) {
    case 'positive':
      return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
    case 'negative':
      return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
    case 'neutral':
      return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950';
    case 'mixed':
      return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950';
    default:
      return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950';
  }
}

// Get score color based on percentage (0-100)
export function getScoreColor(score: number): string {
  if (score >= 80) {
    return 'text-green-600 dark:text-green-400';
  }
  if (score >= 60) {
    return 'text-blue-600 dark:text-blue-400';
  }
  if (score >= 40) {
    return 'text-yellow-600 dark:text-yellow-400';
  }
  if (score >= 20) {
    return 'text-orange-600 dark:text-orange-400';
  }
  return 'text-red-600 dark:text-red-400';
}

// Get priority color
export function getPriorityColor(priority: 'critical' | 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'critical':
      return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
    case 'high':
      return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950';
    case 'low':
      return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950';
    default:
      return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950';
  }
}

// Get status color
export function getStatusColor(status: 'active' | 'inactive' | 'suspended' | 'completed' | 'paused' | 'scheduled' | 'draft'): string {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
    case 'completed':
      return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950';
    case 'scheduled':
      return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950';
    case 'paused':
      return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950';
    case 'draft':
      return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950';
    case 'inactive':
      return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950';
    case 'suspended':
      return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
    default:
      return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950';
  }
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
