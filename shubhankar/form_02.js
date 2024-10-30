
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
                <option value="">Electrical Appliances</option>
                <option value="">Plumbing</option>
                <option value="">Internet</option>
                <option value="">Other</option>
            </select><br>

            <label for="additional-info">Additional Information:</label>
            <input type="file" id="additional-info" name="additional-info"><br>

            <button type="submit">Submit</button>
        </form>
    `;


    contentDiv.innerHTML = formContent;


    contentDiv.style.display = 'block';


    contentDiv.scrollIntoView({ behavior: 'smooth' });
}
