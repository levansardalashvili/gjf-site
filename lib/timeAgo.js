// "2 საათის წინ" ტიპის ფარდობითი დროის ტექსტი
export function timeAgo(dateString) {
  if (!dateString) return null;
  const then = new Date(dateString).getTime();
  const now = Date.now();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) return "წამებში";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} წუთის წინ`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} საათის წინ`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) return "გუშინ";
  if (diffDay < 7) return `${diffDay} დღის წინ`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 4) return `${diffWeek} კვირის წინ`;
  const diffMonth = Math.floor(diffDay / 30);
  return `${diffMonth} თვის წინ`;
}
