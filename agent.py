import os
#from dotenv import load_dotenv
from openai import OpenAI

#load_dotenv()
os.environ["OPENAI_API_KEY"] = ""

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# TOOL 1: Destination Info
def get_destination_info(location):
    prompt = f"""
Give correct factual travel information about {location}.

Return EXACTLY 3 short lines:
1. Why it is famous
2. Best time to visit
3. Top 3 tourist places
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

# TOOL 2: Budget Tool
def calculate_budget(total_budget, days):
    return {
        "Travel": int(total_budget * 0.30),
        "Hotel per day": int((total_budget * 0.40) / days),
        "Food per day": int((total_budget * 0.20) / days),
        "Local travel per day": int((total_budget * 0.10) / days)
    }

# TOOL 3: Itinerary Tool
def generate_itinerary(location, days):
    prompt = f"""
Create a {days}-day itinerary for {location}.
One line per day.
Format: Day 1: ...
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

# AI AGENT
class TravelPlanningAgent:
    def __init__(self, location, days, budget):
        self.location = location
        self.days = days
        self.budget = budget

    def execute(self):
        steps = [
            "Get destination information",
            "Calculate budget",
            "Create itinerary"
        ]

        destination = get_destination_info(self.location)
        budget = calculate_budget(self.budget, self.days)
        itinerary = generate_itinerary(self.location, self.days)

        return {
            "destination": destination,
            "budget": budget,
            "itinerary": itinerary,
            "steps": steps
        }
