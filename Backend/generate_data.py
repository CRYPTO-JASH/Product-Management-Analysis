import pandas as pd
import random

colors = [
    "Terracotta Red", "Sage Mist", "Ivory White", "Charcoal Black",
    "Sand Dune", "Deep Navy", "Teal Splash", "Royal Purple",
    "Emerald Shine", "Sunset Orange",
    "Crimson Red", "Midnight Blue", "Olive Green", "Sky Blue",
    "Peach Blush", "Slate Grey", "Golden Yellow", "Mint Green"
]

dates = [
    "2024-01","2024-02","2024-03","2024-04",
    "2024-05","2024-06","2024-07","2024-08",
    "2024-09","2024-10","2024-11","2024-12"
]

data = []

for color in colors:
    base = random.randint(80, 200)

    for i, d in enumerate(dates):
        # create trend + randomness
        value = base + random.randint(-30, 30) + i * random.choice([5, 10, -3])
        data.append([d, color, max(20, value)])

df = pd.DataFrame(data, columns=["date", "name", "sales"])

df.to_csv("sales_data.csv", index=False)

print("✅ sales_data.csv created successfully!")