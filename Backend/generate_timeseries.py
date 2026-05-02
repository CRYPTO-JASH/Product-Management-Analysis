import pandas as pd
import random

# 🔥 load your demo dataset (50 colors)
df = pd.read_csv("demo_data.csv")

data = []

# 12 months (better than 6 → more realistic ARIMA)
months = [
    "2024-01","2024-02","2024-03","2024-04",
    "2024-05","2024-06","2024-07","2024-08",
    "2024-09","2024-10","2024-11","2024-12"
]

for _, row in df.iterrows():
    name = row["name"]
    base = row["value"]

    # random trend direction
    trend = random.choice([-1, 1])

    for i, month in enumerate(months):
        # trend + noise
        value = base + (i * trend * random.randint(5, 12)) + random.randint(-20, 20)

        data.append({
            "date": month,
            "name": name,
            "sales": max(20, int(value))
        })

# create dataframe
ts_df = pd.DataFrame(data)

# save file
ts_df.to_csv("sales_data.csv", index=False)

print("✅ sales_data.csv created with", len(ts_df), "rows")