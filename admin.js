// Make functions globally accessible first
window.showPendingComplaints = function() {
    currentFilter = 'pending';
    updateNavButtons('pending-btn');
    document.getElementById('complaints-title').textContent = 'Pending Complaints';
    loadComplaints('pending');
};

window.showResolvedComplaints = function() {
    currentFilter = 'resolved';
    updateNavButtons('resolved-btn');
    document.getElementById('complaints-title').textContent = 'Resolved Complaints';
    loadComplaints('resolved');
};

window.showAllComplaints = function() {
    currentFilter = 'all';
    updateNavButtons('all-btn');
    document.getElementById('complaints-title').textContent = 'All Complaints';
    loadComplaints('all');
};

window.resolveComplaint = async function(complaintId) {
    const resolutionNotes = prompt('Enter resolution notes:');
    if (!resolutionNotes) return;
    
    try {
        await complaintAPI.resolveComplaint(complaintId, resolutionNotes);
        alert('Complaint resolved successfully!');
        loadComplaints(currentFilter); // Refresh current view
    } catch (error) {
        alert('Error resolving complaint: ' + error.message);
    }
};

window.deleteComplaint = async function(complaintId) {
    if (!confirm('Are you sure you want to delete this complaint?')) return;
    
    try {
        await complaintAPI.deleteComplaint(complaintId);
        alert('Complaint deleted successfully!');
        loadComplaints(currentFilter); // Refresh current view
    } catch (error) {
        alert('Error deleting complaint: ' + error.message);
    }
};

window.logout = function() {
    // Clear all user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
    
    // Redirect to login page
    window.location.href = 'login.html';
};

// Admin Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!isAdminAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load initial data
    loadComplaints('pending');
    
    // Set user name in header
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.querySelector('.header h1').textContent = `Admin Dashboard - ${userName}`;
    }
});

// Check if user is authenticated as admin
function isAdminAuthenticated() {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    return token && userRole === 'admin';
}

// Load admin dashboard
let currentFilter = 'pending';

async function loadComplaints(filter = 'pending') {
    try {
        const data = await complaintAPI.getAdminDashboard();
        console.log("API Response:", data);

        // ✅ Extract counts properly and update stats display first
        const stats = data.counts || {};
        const statsDiv = document.getElementById('dashboard-stats');
        statsDiv.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <h3 style="color: var(--primary-color); font-size: 2rem; margin: 0;">${stats.total || 0}</h3>
                    <p>Total Complaints</p>
                </div>
                <div class="stat-card">
                    <h3 style="color: #f59e0b; font-size: 2rem; margin: 0;">${stats.unresolved || 0}</h3>
                    <p>Pending</p>
                </div>
                <div class="stat-card">
                    <h3 style="color: #10b981; font-size: 2rem; margin: 0;">${stats.solved || 0}</h3>
                    <p>Resolved</p>
                </div>
            </div>
        `;

        // ✅ Select the correct array directly based on the filter
        let complaintsToRender = [];
        if (filter === 'pending') {
            complaintsToRender = data.recentUnresolvedComplaints;
        } else if (filter === 'resolved') {
            complaintsToRender = data.recentResolvedComplaints;
        } else if (filter === 'all') { // This handles the "Show All" button
            complaintsToRender = [
                ...(data.recentUnresolvedComplaints || []),
                ...(data.recentResolvedComplaints || [])
            ];
        }

        // ✅ Handle case where no complaints are found
        const complaintsDiv = document.getElementById('complaints-list');
        if (!complaintsToRender || complaintsToRender.length === 0) {
            complaintsDiv.innerHTML = `<p style="text-align: center; color: #666; padding: 2rem;">No ${filter} complaints found.</p>`;
            return;
        }

        // ✅ Render complaints with corrected status display and resolve button logic
        complaintsDiv.innerHTML = `<div class="complaints-grid">${complaintsToRender.map(complaint => {
            const displayStatus = complaint.status === 'unresolved' ? 'Pending' : complaint.status;
            
            return `
                <div class="complaint-card">
                    <h4>${complaint.title}</h4>
                    <p>${complaint.description}</p>
                    <p><strong>Student:</strong> ${complaint.student.name} (${complaint.student.instituteEmailId})</p>
                    <p><strong>Status:</strong> ${displayStatus}</p>
                    <div class="complaint-actions">
                        ${complaint.status === 'unresolved' ? `
                            <button class="btn pending" style="background:#f59e0b;" onClick="resolveComplaint('${complaint._id}')" >Pending</button>
                            <button class="btn delete" onClick="deleteComplaint('${complaint._id}')">Delete</button>
                        ` : `
                            <button class="btn resolve" disabled style="background:#10b981; cursor:not-allowed;">Resolved</button>
                            <button class="btn delete" onClick="deleteComplaint('${complaint._id}')">Delete</button>
                        `}
                    </div>
                </div>
            `;
        }).join('')}</div>`;

    } catch (error) {
        console.error('Error loading complaints:', error);
        document.getElementById('complaints-list').innerHTML =
            '<p style="color: red; text-align: center; padding: 2rem;">Error loading complaints. Please try again.</p>';
    }
}


// Navigation functions
// function showPendingComplaints() {
//     currentFilter = 'pending';
//     updateNavButtons('pending-btn');
//     document.getElementById('complaints-title').textContent = 'Pending Complaints';
//     loadComplaints('pending');
// }

// function showResolvedComplaints() {
//     currentFilter = 'resolved';
//     updateNavButtons('resolved-btn');
//     document.getElementById('complaints-title').textContent = 'Resolved Complaints';
//     loadComplaints('resolved');
// }

// function showAllComplaints() {
//     currentFilter = 'all';
//     updateNavButtons('all-btn');
//     document.getElementById('complaints-title').textContent = 'All Complaints';
//     loadComplaints('all');
// }

function updateNavButtons(activeId) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(activeId).classList.add('active');
}

// Switch between tabs
function switchTab(tab) {
    const pendingBtn = document.getElementById('pending-tab');
    const resolvedBtn = document.getElementById('resolved-tab');
    
    if (tab === 'pending') {
        pendingBtn.style.background = 'var(--primary-color)';
        resolvedBtn.style.background = 'var(--secondary-color)';
        showPendingComplaints();
    } else {
        pendingBtn.style.background = 'var(--secondary-color)';
        resolvedBtn.style.background = 'var(--primary-color)';
        showResolvedComplaints();
    }
}

// Show resolved complaints (legacy function - now handled by loadComplaints)
// function showResolvedComplaints() {
//     loadComplaints('resolved');
// }

// Resolve complaint
// async function resolveComplaint(complaintId) {
//     const resolutionNotes = prompt('Enter resolution notes:');
//     if (!resolutionNotes) return;
    
//     try {
//         await complaintAPI.resolveComplaint(complaintId, resolutionNotes);
//         alert('Complaint resolved successfully!');
//         loadComplaints(currentFilter); // Refresh current view
//     } catch (error) {
//         alert('Error resolving complaint: ' + error.message);
//     }
// }

// Delete complaint
// async function deleteComplaint(complaintId) {
//     if (!confirm('Are you sure you want to delete this complaint?')) return;
    
//     try {
//         await complaintAPI.deleteComplaint(complaintId);
//         alert('Complaint deleted successfully!');
//         loadComplaints(currentFilter); // Refresh current view
//     } catch (error) {
//         alert('Error deleting complaint: ' + error.message);
//     }
// }

// function logout() {
//     // Clear all user data from localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('authToken');
    
//     // Redirect to login page
//     window.location.href = 'login.html';
// }
