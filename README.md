# Clothing Brand CRUD Application

This is a basic Angular project for managing a product catalog of a clothing brand. The app demonstrates CRUD (Create, Read, Update, Delete) operations using Angular forms and PrimeNG components.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Angular CLI](https://angular.io/cli) (v18 or later)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jvc-byte/clothing-brand.git
   cd clothing-brand
   ```

2. **Install dependencies**:
For the front-end:
   ```bash
   npm install
   ```
For the back-end:
   ```bash
   cd ../server
   npm install
   ```

### Running the Application

Start the development server:
For the front-end:
```bash
cd ../clothing-brand
npm start
```
For the back-end running on port 3000:
   ```bash
   cd ../server
   node server.js
   ```
Open `http://localhost:4200` in your browser to see the application.

## Features

- **CRUD Operations**: 
  - **Create**: Add a new product to the catalog.
  - **Read**: View the list of products with details like name, price, rating, and image.
  - **Update**: Modify an existing product's details.
  - **Delete**: Remove a product from the catalog.

## Product Data

The application uses mock product data in the form of JSON objects. Each product includes an `id`, `name`, `image`, `price`, and `rating`.

Example:

```json
{
  "id": 1,
  "name": "Black Hoodie",
  "image": "images/products/image1.jpg",
  "price": "24",
  "rating": 5
}
```

## Scripts

- **`start`**: Runs the app in development mode.
- **`build`**: Builds the app for production.
- **`test`**: Runs unit tests.

## Dependencies

- **Angular**: Core framework.
- **PrimeNG**: UI components for forms, dialogs, and more.
- **PrimeIcons**: Icons used in the app.
- **RxJS**: Library for handling asynchronous operations.

## License

This project is for learning purposes and is under the MIT License.