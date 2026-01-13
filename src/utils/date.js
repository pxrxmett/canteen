export const today = () => new Date().toISOString().slice(0,10)
export const currentMeal = () => {
  const h = new Date().getHours()
  if (h < 11) return 'breakfast'
  if (h < 16) return 'lunch'
  if (h < 21) return 'dinner'
  return 'supper'
}
