import numeral from "numeral"

export function formatMoney(value: string | number): string { 

  return numeral(value).format("0.00[,]00")
}