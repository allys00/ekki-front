export const convertToReal = (allCents) => {
  if (!allCents) return '00,00'
  let value = ''
  allCents = allCents.toString()
  for (let x = allCents.length - 1; x >= 0; x--) {
    if (x === allCents.length - 3) {
      value = `${allCents[x]},${value}`
    } else if (x % 3 === 0) {
      console.log(x)
      value = `${allCents[x]}.${value}`
    } else {
      value = `${allCents[x]}${value}`
    }
  }
  return value
}

export const realToCents = (real = '') => {
  return Number(real.replace(/(<|,|\.|>)/g, "").replace("R$", ""));
}