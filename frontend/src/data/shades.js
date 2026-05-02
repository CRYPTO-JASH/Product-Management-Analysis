const families = ["Warm", "Cool", "Neutral", "Dark"];

const moods = {
  Warm: ["Bold & Earthy", "Cheerful & Vibrant", "Cozy & Rich"],
  Cool: ["Calm & Natural", "Fresh & Airy", "Serene & Soft"],
  Neutral: ["Light & Airy", "Minimal & Clean", "Soft & Elegant"],
  Dark: ["Dramatic & Modern", "Deep & Luxe", "Moody & Strong"]
};

const prefixes = [
  "Terracotta","Sage","Ivory","Charcoal","Mustard",
  "Coral","Olive","Azure","Rose","Sand","Teal","Lavender"
];

const suffixes = [
  "Mist","Bloom","Dust","Stone","Glow","Flame","Wave","Sky"
];

const getRandomHex = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const SHADES = Array.from({ length: 150 }, (_, i) => {
  const family = families[Math.floor(Math.random() * families.length)];

  return {
    id: i + 1,
    name:
      prefixes[Math.floor(Math.random() * prefixes.length)] +
      " " +
      suffixes[Math.floor(Math.random() * suffixes.length)],
    hex: getRandomHex(),
    family,
    mood: moods[family][Math.floor(Math.random() * moods[family].length)]
  };
});