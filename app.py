from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import TravelPlanningAgent

app = Flask(__name__)
CORS(app)

@app.route("/plan", methods=["POST"])
def plan_trip():
    try:
        data = request.json

        agent = TravelPlanningAgent(
            data["location"],
            int(data["days"]),
            int(data["budget"])
        )

        result = agent.execute()
        return jsonify(result)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
