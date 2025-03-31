export const getFormattedCurrentDate = () => {
  const date = new Date()
  return date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(',', '')
}
