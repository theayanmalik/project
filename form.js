
function showContent(type) {
    var contentDiv = document.getElementById('content');

    var formContent = `
        <div class="header">
            <h1>Add Complaint - ` + type + `</h1>
        </div>

        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required><br>

            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea><br>

            <label for="category">Category:</label>
            <select id="category" name="category" required>
                <option value="">Select Category</option>
            </select><br>

            <label for="additional-info">Additional Information:</label>
            <input type="file" id="additional-info" name="additional-info"><br>

            <button type="submit">Submit Your Complaint</button>
        </form>
    `;
    


    contentDiv.innerHTML = formContent;


    contentDiv.style.display = 'block';


    contentDiv.scrollIntoView({ behavior: 'smooth' });
}
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;


    if (email && password) {
        switch (role) {
            case 'student':
                window.location.href = 'index.html';
                break;
                 
            case 'faculty':
                window.location.href = 'shubhankar/index1.html';
                break;
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;
            default:
                alert('Please select a valid role.');
        }
    } else {
        alert('Please enter both email and password.');
    }
});
