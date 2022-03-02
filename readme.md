# Natours - Tour Guide Application

[Natours](https://natours-tour-guide.herokuapp.com/) is a full-stack tour guide application built using Node.js, Express.js, MongoDB, and Mongoose.

The API comes with many features starting with authenticating users to access, book, and review tours

- Configuring `Multer` to upload images also `Sharp` to adjust and resize images.
- Integrating `Stripe` into the back-end and processing payments on the front-end to allow users to book and pay for the tour.
- Use `SendGrid` emails with Pug email templates to reach out to the user.
- CRUD operations for all models in addition to advanced filtering, sorting, pagination.
- `MongoDB` aggregation pipeline for data aggregation.
- Implemented efficient error handling for all routes including `MongoDB` and `Mongoose` Validation Errors and `Express` Unhandled Rejections.
- Server-Side Rendering with `Pug` Templates.
- Managing authorization and permissions with different user roles.
- Implementing security best practices, Rate Limiting, Data Sanitization, and preventing Parameter Pollution.

## Built With

- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework
- [MongoDB](https://mongodb.com/) - NoSQL database management program
- [Mongoose](https://mongoosejs.com/) - JavaScript library for creating a connection between MongoDB and Express

## Project setup

### API

#### Install Dependencies

```bash
npm install
```

#### Start Local server

```bash
npm run dev
```

## Testing

There are no Unit testing
