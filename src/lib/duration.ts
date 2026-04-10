export function computeDuration(
  startYM: string,
  endText: string,
  presentLabel: string,
  labels: { year: string; years: string; month: string; months: string }
): string {
  const [sy, sm] = startYM.split("-").map(Number);
  if (!sy || !sm) return "";

  const isPresent =
    endText === presentLabel ||
    endText.toLowerCase() === "present" ||
    endText.toLowerCase() === "presente";

  let ey: number;
  let em: number;
  if (isPresent) {
    const now = new Date();
    ey = now.getFullYear();
    em = now.getMonth() + 1;
  } else {
    const match = endText.match(/(\w+)\s+(\d{4})/);
    if (!match) return "";
    ey = Number(match[2]);
    const monthMap: Record<string, number> = {
      jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6,
      jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12,
      feb: 2, apr: 4, may: 5, aug: 8, sep: 9, oct: 10, dec: 12,
    };
    em = monthMap[match[1].toLowerCase().slice(0, 3)] ?? 1;
  }

  let totalMonths = (ey - sy) * 12 + (em - sm);
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? labels.year : labels.years}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? labels.month : labels.months}`);

  return parts.join(", ");
}
