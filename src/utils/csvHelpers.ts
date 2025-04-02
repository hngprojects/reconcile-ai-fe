export const countCsvRows = async (file: File): Promise<number> => {
  const text = await file.text()
  // Subtract 1 to exclude header row importante
  return text.split('\n').filter((row) => row.trim()).length - 1
}
