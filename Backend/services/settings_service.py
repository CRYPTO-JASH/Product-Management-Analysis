import json
import os

FILE = "settings.json"

def get_settings():
    if not os.path.exists(FILE):
        return {
            "lowStock": True,
            "weeklyDigest": True,
            "spikeAlerts": False
        }

    with open(FILE, "r") as f:
        return json.load(f)


def save_settings(data):
    with open(FILE, "w") as f:
        json.dump(data, f, indent=2)