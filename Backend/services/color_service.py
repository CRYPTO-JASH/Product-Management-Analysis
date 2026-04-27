colors_db = [
    {
        "id": 1,
        "name": "Terracotta Red",
        "hex": "#C65A3A",
        "type": "Warm",
        "description": "Bold & Earthy"
    },
    {
        "id": 2,
        "name": "Sage Mist",
        "hex": "#8AA89F",
        "type": "Cool",
        "description": "Calm & Natural"
    },
    {
        "id": 3,
        "name": "Ivory White",
        "hex": "#F4ECDD",
        "type": "Neutral",
        "description": "Light & Airy"
    },
    {
        "id": 4,
        "name": "Charcoal Smoke",
        "hex": "#2E2E2E",
        "type": "Dark",
        "description": "Dramatic & Modern"
    }
]

shades_db = [
    {
        "id": 1,
        "name": "Terracotta Red",
        "hex": "#C65A3A",
        "family": "Red",
        "mood": "Bold & Earthy",
        "rooms": ["Living Room", "Bedroom", "Accent Wall"]
    },
    {
        "id": 2,
        "name": "Sage Mist",
        "hex": "#8AA89F",
        "family": "Green",
        "mood": "Calm & Natural",
        "rooms": ["Bedroom", "Bathroom", "Kitchen"]
    },
    {
        "id": 3,
        "name": "Ivory White",
        "hex": "#F4ECDD",
        "family": "Neutral",
        "mood": "Light & Airy",
        "rooms": ["Living Room", "Hallway", "Bathroom"]
    },
    {
        "id": 4,
        "name": "Charcoal Smoke",
        "hex": "#2E2E2E",
        "family": "Gray",
        "mood": "Dramatic & Modern",
        "rooms": ["Home Office", "Living Room", "Accent Wall"]
    },
    {
        "id": 5,
        "name": "Ocean Blue",
        "hex": "#2E5A8C",
        "family": "Blue",
        "mood": "Tranquil & Deep",
        "rooms": ["Bedroom", "Bathroom", "Home Office"]
    },
    {
        "id": 6,
        "name": "Sunshine Gold",
        "hex": "#F4A460",
        "family": "Gold",
        "mood": "Warm & Welcoming",
        "rooms": ["Kitchen", "Dining Room", "Living Room"]
    }
]

def get_colors():
    return colors_db

def get_shades():
    return shades_db