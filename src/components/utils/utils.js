export const API_key = `60d505bb48f9c02e8d1f29a621cd125f`;

export function getCardinalDirection(angle) {
  const directions = [
    "↑ North",
    "↗ North-East",
    "→ East",
    "↘ South-East",
    "↓ South",
    "↙ South-West",
    "← West",
    "↖ North-West",
  ];
  return directions[Math.round(angle / 45) % 8];
}
export function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
