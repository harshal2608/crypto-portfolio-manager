export default function formatNumber(number) {
  return number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}
