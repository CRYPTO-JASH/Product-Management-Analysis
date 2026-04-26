from pydantic import BaseModel

class Color(BaseModel):
    id: int
    name: str
    hex: str
    type: str  
    description: str