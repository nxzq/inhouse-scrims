/* eslint-disable @typescript-eslint/no-explicit-any */
export const quantile = (arr: Array<any>, q: number): number => {
  const sorted = arr.sort((a, b) => a - b)
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base])
  } else {
    return sorted[base]
  }
}

export const permutation = (array: Array<any>): Array<Array<any>> => {
  function p(array: Array<any>, temp: Array<any>) {
    let i, x
    if (!array.length) {
      result.push(temp)
    }
    for (i = 0; i < array.length; i++) {
      x = array.splice(i, 1)[0]
      p(array, temp.concat(x))
      array.splice(i, 0, x)
    }
  }

  const result: Array<any> = []
  p(array, [])
  return result
}
