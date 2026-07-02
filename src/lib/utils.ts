/**
 * Calculate estimated reading time in minutes.
 * Chinese chars count as 1 word each, English words as 1 word.
 * Average reading speed: ~300 words/min.
 */
export function getReadingTime(content: string): number {
  if (!content) return 1
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (content.replace(/[\u4e00-\u9fa5]/g, '').match(/[a-zA-Z]+/g) || []).length
  const totalWords = chineseChars + englishWords
  const minutes = Math.ceil(totalWords / 300)
  return Math.max(1, minutes)
}
