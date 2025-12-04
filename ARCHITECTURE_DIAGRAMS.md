# 🏗️ Shopping Cart System - Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │         FRONTEND (React 18 + Vite)                         │   │
│  │         http://localhost:5173                              │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │  ┌─────────────────┐        ┌──────────────────┐          │   │
│  │  │  App.jsx        │        │  main.jsx        │          │   │
│  │  │  (Root)         │───────│  (CartProvider   │          │   │
│  │  │                 │        │   wraps all)     │          │   │
│  │  └────────┬────────┘        └──────────────────┘          │   │
│  │           │                                               │   │
│  │           ▼                                               │   │
│  │  ┌─────────────────────────────────────────┐             │   │
│  │  │      ROUTES (React Router)              │             │   │
│  │  ├─────────────────────────────────────────┤             │   │
│  │  │ / (Home)                                │             │   │
│  │  │ /plastic/electrical ────────────────┐  │             │   │
│  │  │ /admin/orders ──────────────────┐   │  │             │   │
│  │  │ ...other routes...              │   │  │             │   │
│  │  └─────────────────────────────────┼───┼──┘             │   │
│  │                                    │   │                 │   │
│  │            ┌───────────────────────┘   │                 │   │
│  │            │                           │                 │   │
│  │            ▼                           ▼                 │   │
│  │  ┌──────────────────────┐  ┌─────────────────────┐      │   │
│  │  │ ElectricalAccessories│  │ Orders_AdminPage    │      │   │
│  │  │ Page                 │  │                     │      │   │
│  │  ├──────────────────────┤  ├─────────────────────┤      │   │
│  │  │ • Fetch /api/        │  │ • Fetch /api/       │      │   │
│  │  │   electricals        │  │   orders/admin      │      │   │
│  │  │ • Display grid       │  │ • Display table     │      │   │
│  │  │ • PurchaseButton ◄──┼──┤ • Update status     │      │   │
│  │  │   for each item      │  │ • View details      │      │   │
│  │  └──────────┬───────────┘  │ • Cancel orders     │      │   │
│  │             │               └────────┬────────────┘      │   │
│  │             │                        │                   │   │
│  │    ┌────────┴────────┐       ┌───────┴────────────┐      │   │
│  │    │ useCart Hook    │       │ uses CartContext   │      │   │
│  │    │ addToCart()     │       │ for auth token     │      │   │
│  │    └────────┬────────┘       └───────────────────┘      │   │
│  │             │                                             │   │
│  │             ▼                                             │   │
│  │  ┌─────────────────────────────────────────┐             │   │
│  │  │    CartContext                          │             │   │
│  │  │    (State Management)                   │             │   │
│  │  ├─────────────────────────────────────────┤             │   │
│  │  │ State:                                  │             │   │
│  │  │ • cartItems: []                         │             │   │
│  │  │ • cartOpen: boolean                     │             │   │
│  │  │                                         │             │   │
│  │  │ Methods:                                │             │   │
│  │  │ • addToCart(item)                       │             │   │
│  │  │ • removeFromCart(id, type)              │             │   │
│  │  │ • updateQuantity(id, type, qty)         │             │   │
│  │  │ • clearCart()                           │             │   │
│  │  │ • getTotalPrice()                       │             │   │
│  │  │ • getTotalItems()                       │             │   │
│  │  │                                         │             │   │
│  │  │ Storage: localStorage (cart key)        │             │   │
│  │  └────────────┬────────────────────────────┘             │   │
│  │               │                                           │   │
│  │    ┌──────────┴──────────┐                               │   │
│  │    │                     │                               │   │
│  │    ▼                     ▼                               │   │
│  │  ┌──────────────┐   ┌──────────────────┐                │   │
│  │  │ CartSidebar  │   │ PurchaseButton   │                │   │
│  │  │ Component    │   │ Component        │                │   │
│  │  ├──────────────┤   ├──────────────────┤                │   │
│  │  │ Display:     │   │ • Quantity modal │                │   │
│  │  │ • Items list │   │ • Item preview   │                │   │
│  │  │ • Qt +/- btn │   │ • Add to cart    │                │   │
│  │  │ • Remove btn │   │   trigger        │                │   │
│  │  │ • Total      │   └──────────────────┘                │   │
│  │  │ • Checkout   │                                       │   │
│  │  │   button     │                                       │   │
│  │  │              │                                       │   │
│  │  │ Position:    │                                       │   │
│  │  │ fixed,       │                                       │   │
│  │  │ bottom-right │                                       │   │
│  │  └──────┬───────┘                                       │   │
│  │         │                                               │   │
│  │         ▼                                               │   │
│  │  ┌──────────────────┐                                   │   │
│  │  │ CheckoutModal    │                                   │   │
│  │  │ Component        │                                   │   │
│  │  ├──────────────────┤                                   │   │
│  │  │ • Form fields    │                                   │   │
│  │  │   - name         │                                   │   │
│  │  │   - email        │                                   │   │
│  │  │   - phone        │                                   │   │
│  │  │   - address      │                                   │   │
│  │  │   - notes        │                                   │   │
│  │  │ • Order summary  │                                   │   │
│  │  │ • Submit button  │                                   │   │
│  │  │   → POST         │                                   │   │
│  │  │     /api/orders  │                                   │   │
│  │  │ • Success modal  │                                   │   │
│  │  └──────────────────┘                                   │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ▲                                     │
│                           │                                     │
│                    HTTP API Calls                              │
│                    (fetch/axios)                               │
│                           │                                     │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Express.js)                     │
│                    http://localhost:7001                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ app.js (Express Application)                             │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ • CORS enabled                                            │ │
│  │ • Helmet security                                         │ │
│  │ • Morgan logging                                          │ │
│  │ • JSON parsing                                            │ │
│  │ • Static file serving (/uploads)                          │ │
│  └─────────────────────┬──────────────────────────────────────┘ │
│                        │                                         │
│                        ▼                                         │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ routes/index.js (Route Dispatcher)                        │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ GET /api/electricals ──────────┬──────► Electrical routes │ │
│  │ GET /api/spares ───────────────┼──────► Spare routes      │ │
│  │ POST /api/orders ──────────────┼──────► OrderRoutes       │ │
│  │ GET /api/orders/admin ─────────┼──────► OrderRoutes       │ │
│  │ PUT /api/orders/:id/status ────┤ OrderRoutes:            │ │
│  │ DELETE /api/orders/:id ────────┤                          │ │
│  │ ...other routes...             └──────► createOrder()    │ │
│  │                                        listOrders()      │ │
│  │                                        getOrder()        │ │
│  │                                        updateOrderStatus()│
│  │                                        deleteOrder()     │ │
│  └─────────────────────┬──────────────────────────────────────┘ │
│                        │                                         │
│                        ▼                                         │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ controllers/orderController.js                            │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │                                                            │ │
│  │  createOrder(req, res):                                   │ │
│  │  • Validate input (customer, items, totalPrice)           │ │
│  │  • Create new Order document                              │ │
│  │  • Order.save() ──────────┐                               │ │
│  │  • Return order number    │                               │ │
│  │  • TODO: sendOrderEmail   │                               │ │
│  │  • TODO: sendOrderWhatsApp│                               │ │
│  │                           │                               │ │
│  │  listOrders(req, res):    │                               │ │
│  │  • Admin auth check ──────┼──► middleware/auth.js         │ │
│  │  • Fetch with pagination  │    (JWT verification)         │ │
│  │  • Apply status filter    │                               │ │
│  │  • Return orders          │                               │ │
│  │                           │                               │ │
│  │  getOrder(req, res): ◄────┤    updateOrderStatus()        │ │
│  │  • Find by ID             │    deleteOrder()              │ │
│  │  • Return details         │    getOrderStats()            │ │
│  │                           │                               │ │
│  └───────────────────────────┼───────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ models/Order.js (Mongoose Schema)                         │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ {                                                          │ │
│  │   orderNumber: String (auto-generated: ORD-xxxxx)         │ │
│  │   customer: {                                              │ │
│  │     name: String,                                          │ │
│  │     email: String,                                         │ │
│  │     phone: String,                                         │ │
│  │     address: String,                                       │ │
│  │     notes: String                                          │ │
│  │   },                                                        │ │
│  │   items: [{                                                │ │
│  │     itemId: ObjectId,                                      │ │
│  │     itemType: String (electrical|spare-part),              │ │
│  │     title: String,                                         │ │
│  │     price: Number,                                         │ │
│  │     quantity: Number                                       │ │
│  │   }],                                                       │ │
│  │   totalPrice: Number,                                      │ │
│  │   status: String (pending|confirmed|shipped|              │ │
│  │            delivered|cancelled),                           │ │
│  │   emailSent: Boolean,                                      │ │
│  │   whatsappSent: Boolean,                                   │ │
│  │   createdAt: Date,                                         │ │
│  │   updatedAt: Date                                          │ │
│  │ }                                                          │ │
│  └─────────────────────┬──────────────────────────────────────┘ │
│                        │                                         │
│                        ▼                                         │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ config/db.js (Database Connection)                        │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ • MongoDB connection                                       │ │
│  │ • Mongoose setup                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATABASE (MongoDB)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─ dyno_db (Database)                                          │
│ └─ orders (Collection)                                         │
│    ├─ _id (ObjectId)                                           │
│    ├─ orderNumber (String)  ← Auto-generated                   │
│    ├─ customer (Object)                                        │
│    ├─ items (Array)                                            │
│    ├─ totalPrice (Number)                                      │
│    ├─ status (String)                                          │
│    ├─ emailSent (Boolean)                                      │
│    ├─ whatsappSent (Boolean)                                   │
│    ├─ createdAt (Date)  ← Auto-generated                       │
│    └─ updatedAt (Date)  ← Auto-generated                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. Customer Purchase Flow

```
Customer                UI                   CartContext           Backend                 Database
   │                    │                         │                    │                        │
   ├─ Browse items ─────►│                         │                    │                        │
   │                    │ Add to Cart             │                    │                        │
   ├─ Select qty & add ─►│─ addToCart() ──────────►│                    │                        │
   │                    │                         ├─ Save to state     │                        │
   │                    │                         ├─ Save to localStorage│                        │
   │ View cart          │ (CartSidebar appears)   │                    │                        │
   ├─ Expand sidebar ───►│                         │                    │                        │
   │                    │ (Shows items + total)   │                    │                        │
   │ Click checkout     │                         │                    │                        │
   ├──────────────────►│                         │                    │                        │
   │                    │ (CheckoutModal opens)   │                    │                        │
   │ Fill form &        │                         │                    │                        │
   │ submit order       ├─ Form validation ──────►│                    │                        │
   ├──────────────────►│                         │                    │                        │
   │                    │ POST /api/orders ──────┼───────────────────►│                        │
   │                    │                         │                    ├─ Create Order doc     │
   │                    │                         │                    ├─ Auto-gen order#      │
   │                    │◄─ 201 Created ─────────┼────────────────────┤                        │
   │                    │   {orderNumber, order}  │                    ├─ order.save() ────────┼─► Saved
   │ Success modal      │                         │                    │                        │
   ├─ See order # ─────◄│ Success notification    │                    │                        │
   │                    │ clearCart() ───────────►│                    │                        │
   │                    │                         ├─ cartItems = []    │                        │
   │                    │                         ├─ Clear localStorage│                        │
```

### 2. Admin Order Management Flow

```
Admin                   UI                    CartContext         Backend                  Database
   │                    │                         │                    │                        │
   │ Login to admin      │                         │                    │                        │
   ├────────────────────►│                         │                    │                        │
   │                    │ (JWT token stored)      │                    │                        │
   │                    │                         │                    │                        │
   │ Go to /admin/orders│                         │                    │                        │
   ├────────────────────►│                         │                    │                        │
   │                    │ (Orders_AdminPage)      │                    │                        │
   │                    │ GET /api/orders/admin ──┼───────────────────►│                        │
   │                    │  with JWT token         │                    ├─ Verify auth          │
   │                    │                         │                    ├─ Query orders         │
   │                    │◄─ 200 OK ──────────────┼────────────────────┤ from DB                │
   │                    │   [{order1}, {order2}]  │                    │                        │
   │                    │                         │                    │                        │
   │ View order details │                         │                    │                        │
   ├──────────────────►│ Click eye icon          │                    │                        │
   │                    │ (Modal opens)           │                    │                        │
   │                    │ Shows customer info     │                    │                        │
   │                    │ Shows items purchased   │                    │                        │
   │                    │                         │                    │                        │
   │ Update status      │                         │                    │                        │
   ├──────────────────►│ Click status button    │                    │                        │
   │                    │ PUT /api/orders/:id/status ───────────────►│                        │
   │                    │ {status: "confirmed"}   │                    ├─ Update status        │
   │                    │                         │                    │ order.save() ─────────┼─► Updated
   │                    │◄─ 200 OK ──────────────┼────────────────────┤                        │
   │                    │   {updated order}       │                    │                        │
   │ See status changed │                         │                    │                        │
   ├────────────────────►│ Table refreshes        │                    │                        │
   │                    │                         │                    │                        │
   │ Cancel order       │                         │                    │                        │
   ├──────────────────►│ Click trash icon       │                    │                        │
   │                    │ DELETE /api/orders/:id ───────────────────►│                        │
   │                    │                         │                    ├─ Mark cancelled       │
   │                    │                         │                    │ order.save() ─────────┼─► Cancelled
   │                    │◄─ 200 OK ──────────────┼────────────────────┤                        │
   │                    │ Order removed from list │                    │                        │
```

---

## Component Connection Map

```
┌─────────────────────────────────────────────────────────┐
│ App.jsx (Root)                                          │
│ ├─► CartProvider (from main.jsx wrapper)               │
│ └─► CartSidebar                                        │
│     ├─► useCart() ──┬─► addToCart                      │
│     │               ├─► removeFromCart                 │
│     │               ├─► updateQuantity                 │
│     │               ├─► getTotalPrice                  │
│     │               └─► clearCart                      │
│     │                                                   │
│     └─► CheckoutModal                                  │
│         ├─► Form validation                            │
│         ├─► useCart() ──► cartItems, clearCart         │
│         └─► POST /api/orders                           │
│                                                         │
├─► Routes                                               │
│   ├─► PublicLayout                                     │
│   │   ├─► ElectricalAccessories                        │
│   │   │   └─► PurchaseButton (for each item)           │
│   │   │       ├─► useCart() ──► addToCart              │
│   │   │       └─► Quantity Selector Modal              │
│   │   │                                                 │
│   │   └─► ...other public pages                        │
│   │                                                     │
│   └─► AdminLayout                                      │
│       ├─► Orders_AdminPage                             │
│       │   ├─► GET /api/orders/admin                    │
│       │   ├─► Status filter & pagination               │
│       │   ├─► Order detail modal                       │
│       │   ├─► PUT /api/orders/:id/status               │
│       │   └─► DELETE /api/orders/:id                   │
│       │                                                 │
│       └─► ...other admin pages                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

LocalStorage:
├─ cart: JSON array of cart items
└─ cartOpen: boolean (sidebar visibility)

JWT Token (localStorage):
└─ token: JWT string (for admin auth)
```

---

## Request/Response Examples

### 1. Create Order Request/Response

**Request:**

```
POST /api/orders
Content-Type: application/json

{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+94771234567",
    "address": "123 Main St, Colombo",
    "notes": "Deliver on weekends"
  },
  "items": [
    {
      "itemId": "630f1234567890abcdef1234",
      "itemType": "electrical",
      "title": "Junction Box",
      "price": 500,
      "quantity": 2
    }
  ],
  "totalPrice": 1000
}
```

**Response (201 Created):**

```json
{
  "message": "Order placed successfully",
  "orderNumber": "ORD-1701671600000-1",
  "order": {
    "_id": "630f5678567890abcdef5678",
    "orderNumber": "ORD-1701671600000-1",
    "customer": {...},
    "items": [...],
    "totalPrice": 1000,
    "status": "pending",
    "emailSent": false,
    "whatsappSent": false,
    "createdAt": "2024-12-04T13:40:00Z",
    "updatedAt": "2024-12-04T13:40:00Z"
  }
}
```

### 2. List Orders Request/Response

**Request:**

```
GET /api/orders/admin?page=1&limit=10&status=pending
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**

```json
{
  "orders": [
    {
      "_id": "630f5678567890abcdef5678",
      "orderNumber": "ORD-1701671600000-1",
      "customer": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+94771234567",
        "address": "123 Main St"
      },
      "totalPrice": 1000,
      "status": "pending",
      "createdAt": "2024-12-04T13:40:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "pages": 3,
  "limit": 10
}
```

### 3. Update Status Request/Response

**Request:**

```
PUT /api/orders/630f5678567890abcdef5678/status
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Response (200 OK):**

```json
{
  "message": "Order status updated",
  "order": {
    "_id": "630f5678567890abcdef5678",
    "status": "confirmed",
    "updatedAt": "2024-12-04T14:00:00Z",
    ...
  }
}
```

---

## Technology Stack

```
FRONTEND:
├─ React 18.x (UI Framework)
├─ React Router v6+ (Routing)
├─ Lucide Icons (Icons)
├─ Vite (Build tool)
├─ CSS3 (Styling)
└─ localStorage API (Persistence)

BACKEND:
├─ Node.js (Runtime)
├─ Express.js (Web framework)
├─ MongoDB (Database)
├─ Mongoose (ODM)
├─ JWT (Authentication)
├─ CORS (Cross-origin)
├─ Morgan (Logging)
└─ Helmet (Security)

COMMUNICATION:
├─ HTTP/REST (API protocol)
├─ JSON (Data format)
└─ fetch API (Client HTTP)
```

---

## Deployment Architecture

```
Production Environment:
┌────────────────────────────────────┐
│ Client (React App)                 │
│ - Hosted on Netlify/Vercel         │
│ - Build: npm run build             │
│ - ENV: VITE_API_BASE = prod URL    │
└────────────┬───────────────────────┘
             │
             │ HTTPS
             │
┌────────────▼───────────────────────┐
│ API Server (Express)               │
│ - Hosted on Heroku/Railway         │
│ - Port: 7001 (or environment port) │
│ - ENV: MongoDB URI, JWT secret     │
└────────────┬───────────────────────┘
             │
             │ SSL/TLS
             │
┌────────────▼───────────────────────┐
│ MongoDB (Database)                 │
│ - MongoDB Atlas (cloud)            │
│ - Or self-hosted                   │
│ - Collections: orders, electricals,│
│   spares, etc.                     │
└────────────────────────────────────┘
```

---

**Last Updated:** December 4, 2024  
**Version:** 1.0 - Production Ready
