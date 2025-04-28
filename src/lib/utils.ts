import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const inDevEnvironment =
  !!process && process.env.NODE_ENV === 'development'

export const parseCSVHeaders = async (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        if (!content) {
          reject(new Error('Failed to read file content'))
          return
        }
        
        // Get first line and split by common delimiters
        const firstLine = content.split('\n')[0]
        const headers = firstLine
          .split(/[,;\t]/)
          .map(header => header.trim())
          .filter(Boolean)
          
        resolve(headers)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
