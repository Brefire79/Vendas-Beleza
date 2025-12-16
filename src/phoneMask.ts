export function formatPhoneBR(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 11);
  const ddd = digits.slice(0, 2);
  const part1 = digits.slice(2, 7);
  const part2 = digits.slice(7, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${ddd}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${ddd}) ${part1}-${part2}`;
  return input;
}
