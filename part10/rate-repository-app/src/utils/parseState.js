export const parseStat = (stat) => {
  if (stat < 1000) return stat.toString();
  if (stat < 1000000) return (stat / 1000).toFixed(1) + "k";
  else return (stat / 1000000).toFixed(1) + "M";
};
