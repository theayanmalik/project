// Form handling for complaint submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('complaintForm');
    const categoryIcons = document.querySelectorAll('.icon-item');
    const categorySelect = document.getElementById('complaintCategory');

    // Category icon selection
    categoryIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active class from all icons
            categoryIcons.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked icon
            this.classList.add('active');
            
            // Update select dropdown
            const category = this.dataset.category;
            categorySelect.value = getCategoryValue(category);
        });
    });

    // Map display categories to form values
    function getCategoryValue(displayCategory) {
        const categoryMap = {
            'Electrical Appliances': 'IT Support',
            'Plumbing': 'Other Issues',
            'Internet Issues': 'IT Support',
            'Other Issues': 'Other Issues'
        };
        return categoryMap[displayCategory] || 'Other Issues';
    }

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', document.getElementById('complaintTitle').value);
        formData.append('description', document.getElementById('complaintDescription').value);
        formData.append('category', document.getElementById('complaintCategory').value);
        
        // Add file if selected
        const fileInput = document.getElementById('attachments');
        if (fileInput.files[0]) {
            formData.append('file', fileInput.files[0]);
        }

        try {
            const response = await fetch('/api/complaints/submit', {
                method: 'POST',
                headers: {
                    'x-auth-token': localStorage.getItem('authToken')
                },
                body: formData
            });

            const result = await response.json();
            
            if (response.ok) {
                alert('Complaint submitted successfully!');
                form.reset();
                categoryIcons.forEach(i => i.classList.remove('active'));
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Error submitting complaint. Please try again.');
        }
    });
});

// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/login.html';
    }
}

// Call auth check on page load
checkAuth();
