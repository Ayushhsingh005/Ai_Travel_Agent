function goToPlanner() {
    const landingPage = document.getElementById("landingPage");
    const plannerContainer = document.getElementById("plannerContainer");
    
    landingPage.classList.add("hidden");
    plannerContainer.classList.add("show");
}

async function planTrip() {
    const location = document.getElementById("location").value;
    const days = document.getElementById("days").value;
    const budget = document.getElementById("budget").value;

    if (!location || !days || !budget) {
        alert("Please fill all fields!");
        return;
    }

    const outputDiv = document.getElementById("output");
    const loadingDiv = document.getElementById("loading");
    
    loadingDiv.style.display = "block";
    outputDiv.innerHTML = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/plan", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                location: location,
                days: days,
                budget: budget
            })
        });

        const data = await response.json();
        
        if (data.error) {
            outputDiv.innerHTML = `<div style="color: red; padding: 15px; background: #ffebee; border-radius: 8px;"><strong>Error:</strong> ${data.error}</div>`;
        } else {
            let html = `
                <div class="destination-info">
                    <div class="info-title"> Destination Information</div>
                    <div>${data.destination.replace(/\n/g, '<br>')}</div>
                </div>

                <div class="budget-info">
                    <div class="info-title"> Budget Breakdown</div>
                    <div class="budget-grid">
                        <div class="budget-item">
                            <div class="budget-label">Travel</div>
                            <div class="budget-value">₹${data.budget.Travel.toLocaleString()}</div>
                        </div>
                        <div class="budget-item">
                            <div class="budget-label">Hotel/Day</div>
                            <div class="budget-value">₹${data.budget["Hotel per day"].toLocaleString()}</div>
                        </div>
                        <div class="budget-item">
                            <div class="budget-label">Food/Day</div>
                            <div class="budget-value">₹${data.budget["Food per day"].toLocaleString()}</div>
                        </div>
                        <div class="budget-item">
                            <div class="budget-label">Local Travel/Day</div>
                            <div class="budget-value">₹${data.budget["Local travel per day"].toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                <div class="itinerary-info">
                    <div class="info-title"> Your Itinerary</div>
                    <div style="line-height: 1.8;">${data.itinerary.replace(/\n/g, '<br>')}</div>
                </div>
            `;
            outputDiv.innerHTML = html;
        }
    } catch (error) {
        outputDiv.innerHTML = `<div style="color: red; padding: 15px; background: #ffebee; border-radius: 8px;"><strong>Connection Error:</strong> ${error.message}</div>`;
    } finally {
        loadingDiv.style.display = "none";
    }
}
