export default function lolLength<T>(lol: T[][]): number {
  let sum = 0;
  lol.forEach((l) => {
    sum += l.length;
  });
  return sum;
}
