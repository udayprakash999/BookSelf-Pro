# BookShelf Pro

BookShelf Pro is a responsive web application that helps users manage their reading lists effectively. Users can categorize their books or articles into **Wishlist**, **Currently Reading**, and **Read** sections. Additionally, the application features search functionality, and users can save their data to a file for future reference.

---

## Features

- **Add Items**: Easily add books or articles to your reading list with a title, author, and description.
- **Search Functionality**: Quickly search for books or articles by title or author.
- **Categorized Sections**:
  - Wishlist: Books or articles you plan to read.
  - Currently Reading: Books or articles you are currently reading.
  - Read: Books or articles you have completed.
- **Save Data to File**: Save your reading list to a file in PDF format.
- **Responsive Design**: The application adjusts to different screen sizes for a seamless user experience.

---

## Technologies Used

### Frontend:
- **HTML5**: For the structure of the web page.
- **CSS3**: For styling and creating a responsive layout using Flexbox.
- **JavaScript**: For interactivity, such as adding items, searching, and saving data.

### External Libraries:
- **jsPDF**: To generate and save the reading list in PDF format.
- **jsPDF-AutoTable**: For creating organized table structures in the PDF.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/BookShelf-Pro.git
   ```

2. Navigate to the project folder:
   ```bash
   cd BookShelf-Pro
   ```

3. Open the `index.html` file in your preferred web browser.

---

## File Structure

```
BookShelf-Pro/
├── assets/                 # Images and icons
├── style.css               # Styling for the application
├── script.js               # JavaScript for interactivity
├── index.html              # Main HTML file
├── README.md               # Project documentation
```

---

## How to Use

1. **Add Books/Articles**:
   - Enter the title, author, and description of the book/article.
   - Click the **Add to Wishlist** button to save it in the Wishlist section.

2. **Search**:
   - Use the search bar at the top to filter books/articles by title or author.

3. **Move Between Sections**:
   - Move items between the Wishlist, Currently Reading, and Read sections by implementing JavaScript functionality (to be added).

4. **Save to PDF**:
   - Click the **Save Data to File** button to download your reading list in PDF format.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.


## Acknowledgments

- Icons: [FlatIcon](https://www.flaticon.com/)
- PDF Generation: [jsPDF](https://github.com/parallax/jsPDF) and [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)

