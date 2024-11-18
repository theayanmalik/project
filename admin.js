
const complaints = [
    { id: 1, title: "Complaint regarding harassment", status: "solved" },
    { id: 2, title: "Complaint regarding repair", status: "unsolved" },
    { id: 3, title: "Complaint regarding teaching", status: "solved" },
];


function populateComplaints(status = "solved") {
    const complaintsList = document.getElementById("complaints-list");
    complaintsList.innerHTML = ""; // Clear existing content

    const filteredComplaints = complaints.filter((complaint) => complaint.status === status);

    if (filteredComplaints.length === 0) {
        complaintsList.innerHTML = <p>No ${status} complaints found.</p>;
        return;
    }

    filteredComplaints.forEach((complaint) => {
        const card = document.createElement("div");
        card.classList.add("complaint-card");

        card.innerHTML = `
            <span>${complaint.title}</span>
            <div class="complaint-actions">
                <button onclick="viewComplaint(${complaint.id})">View</button>
                ${
                    status === "unsolved"
                        ? <button onclick="markAsSolved(${complaint.id})">Mark as Solved</button>
                        : ""
                }
            </div>
        `;
        complaintsList.appendChild(card);
    });
}

// Filter Complaints
function filterComplaints(status) {
    document.querySelectorAll(".tab-button").forEach((button) => button.classList.remove("active"));
    document.querySelector(.tab-button[onclick="filterComplaints('${status}')"]).classList.add("active");

    populateComplaints(status);
}

// Actions
function viewComplaint(id) {
    alert(Viewing details for complaint ID: ${id});
}

function markAsSolved(id) {
    const index = complaints.findIndex((complaint) => complaint.id === id);
    if (index !== -1) {
        complaints[index].status = "solved";
        populateComplaints("unsolved");
        updateStats();
    }
}

// Update Stats
function updateStats() {
    document.getElementById("total-complaints").innerText = complaints.length;
    document.getElementById("solved-complaints").innerText = complaints.filter((c) => c.status === "solved").length;
    document.getElementById("unsolved-complaints").innerText = complaints.filter((c) => c.status === "unsolved").length;
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    updateStats();
    populateComplaints("solved");
});