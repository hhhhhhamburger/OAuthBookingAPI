# OAuthBookingAPI

COMP S381F course project — Express.js apps covering Facebook OAuth login and a MongoDB booking RESTful API.

## Project Structure

```
OAuthBookingAPI/
├── task1/          # Facebook OAuth login (Passport + EJS)
└── task2/          # MongoDB booking CRUD API
```

## Requirements

- [Node.js](https://nodejs.org/) (v14+)
- MongoDB Atlas account (for Task 2)
- Facebook App credentials (for Task 1)

---

## Task 1 — Facebook OAuth Login

Express app with Passport Facebook strategy. Users log in via Facebook, then see a protected content page.

### Features

- Session-based authentication with `express-session`
- Facebook OAuth via `passport-facebook`
- Protected routes (`/`, `/content`)
- Login / logout flow with EJS views

### Setup

```bash
cd task1
npm install
```

Update Facebook app credentials in `server.js`:

- `clientID`
- `clientSecret`
- `callbackURL` (default: `http://localhost:8099/auth/facebook/callback`)

In the [Facebook Developers](https://developers.facebook.com/) console, add the same callback URL under Valid OAuth Redirect URIs.

### Run

```bash
npm start
# or: npm run dev  (with nodemon)
```

Open: [http://localhost:8099](http://localhost:8099)

### Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/login` | Login page |
| GET | `/auth/facebook` | Start Facebook OAuth |
| GET | `/auth/facebook/callback` | OAuth callback |
| GET | `/content` | Protected page (requires login) |
| GET | `/logout` | Log out and redirect |

---

## Task 2 — MongoDB Booking API

RESTful API for booking documents stored in MongoDB (`bookings` collection).

### Features

- Connect to MongoDB Atlas
- Find / update / delete bookings by `bookingid`
- Request body parsing with `express-formidable`

### Setup

```bash
cd task2
npm install
```

Update the MongoDB connection string in `server.js` (`mongourl`) to your own Atlas URI.

### Run

```bash
npm start
```

Server: [http://localhost:8099](http://localhost:8099)

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/booking/:bookingid` | Find booking(s) by `bookingid` |
| PUT | `/api/booking/:bookingid` | Update `mobile` field (`mobile` in form body) |
| DELETE | `/api/booking/:bookingid` | Delete booking(s) by `bookingid` |

### Example Requests

```bash
# Get a booking
curl http://localhost:8099/api/booking/B001

# Update mobile
curl -X PUT http://localhost:8099/api/booking/B001 -F "mobile=91234567"

# Delete a booking
curl -X DELETE http://localhost:8099/api/booking/B001
```

---

## Tech Stack

| Task | Stack |
|------|--------|
| Task 1 | Express, Passport, passport-facebook, express-session, EJS |
| Task 2 | Express, MongoDB driver, express-formidable |

## Notes

- Task 1 and Task 2 both default to port **8099**. Run only one at a time, or change `PORT`.
- Do not commit real secrets to a public repo. Prefer environment variables for Facebook and MongoDB credentials in production or shared repositories.

## License

Coursework for COMP S381F (HKMU).
