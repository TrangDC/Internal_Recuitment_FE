export function calculateColumnTotal(matrix: number[][], columnIndex: number) {
  let total = 0

  for (let row of matrix) {
    total += row[columnIndex]
  }

  return total
}
