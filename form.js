// JavaScript function to dynamically display content based on clicked card
function showContent(type) {
    var contentDiv = document.getElementById('content');

    // Define form content (as HTML string) for each category
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

    // Inject form content into the contentDiv
    contentDiv.innerHTML = formContent;

    // Show the content div (make it visible)
    contentDiv.style.display = 'block';

    // Scroll down to the content
    contentDiv.scrollIntoView({ behavior: 'smooth' });
}
