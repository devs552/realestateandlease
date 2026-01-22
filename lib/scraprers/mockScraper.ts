import { SoldProperty } from "./soldPropertyScraper";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export async function mockScrapeSoldProperties(
  neighborhoodId: string
): Promise<SoldProperty[]> {
  const results: SoldProperty[] = [];

  // 25 properties sold in last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  for (let i = 1; i <= 25; i++) {
    results.push({
      address: `${randomBetween(100, 999)} Mock St`,
      soldPrice: randomBetween(250000, 500000),
      soldDate: randomDate(sixMonthsAgo, new Date()),
      squareFeet: randomBetween(1200, 2500),
      yearBuilt: randomBetween(1980, 2015),
      beds: randomBetween(2, 5),
      baths: randomBetween(1, 3),
      neighborhoodId,
      distanceMiles: parseFloat((Math.random() * 1.5 + 0.1).toFixed(2)),
      hasGarage: Math.random() > 0.3,
      isBusyStreet: Math.random() > 0.7,
      nearCommercial: Math.random() > 0.85,
      nearMultiFamily:
        Math.random() > 0.9 ? "LARGE" : Math.random() > 0.7 ? "SMALL" : "NONE",
      nearFreeway: Math.random() > 0.9,
    });
  }

  // 5 properties sold ~1 year ago
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const elevenMonthsAgo = new Date();
  elevenMonthsAgo.setMonth(elevenMonthsAgo.getMonth() - 11);

  for (let i = 1; i <= 5; i++) {
    results.push({
      address: `${randomBetween(100, 999)} Old St`,
      soldPrice: randomBetween(200000, 450000),
      soldDate: randomDate(elevenMonthsAgo, oneYearAgo),
      squareFeet: randomBetween(1200, 2500),
      yearBuilt: randomBetween(1970, 2010),
      beds: randomBetween(2, 5),
      baths: randomBetween(1, 3),
      neighborhoodId,
      distanceMiles: parseFloat((Math.random() * 1.5 + 0.1).toFixed(2)),
      hasGarage: Math.random() > 0.3,
      isBusyStreet: Math.random() > 0.7,
      nearCommercial: Math.random() > 0.85,
      nearMultiFamily:
        Math.random() > 0.9 ? "LARGE" : Math.random() > 0.7 ? "SMALL" : "NONE",
      nearFreeway: Math.random() > 0.9,
    });
  }

  return results;
}
