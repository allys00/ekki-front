export const convertToReal = (allCents) => {
  if (!allCents) return '00,00'
  const cents = allCents % 100
  let value = ''
  allCents = allCents.toString()
  for (let x = allCents.length - 1; x >= 0; x--) {
    if (x === allCents.length - 3) {
      value = `${allCents[x]}.${value}`
    } else {
      value = `${allCents[x]}${value}`
    }
  }
  value = Number(value).toLocaleString('pt-BR')
  if (cents === 0) value += ',00'
  else if (cents < 10) value += `,0${cents}`

  return value
}

export const realToCents = (real = '') => {
  return Number(real.replace(/(<|,|\.|>)/g, "").replace("R$", ""));
}