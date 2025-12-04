## 🛒 Shopping Cart System - Quick Start Guide

### Prerequisites

- Node.js installed
- MongoDB running locally or connection string configured
- Both server and client running in development mode

---

### 🚀 Starting the Application

#### 1. Start the Server

```bash
cd server
npm install  # If first time
npm run dev
```

Server will run on: `http://localhost:7001`

#### 2. Start the Client

```bash
cd client
npm install  # If first time
npm run dev
```

Client will run on: `http://localhost:5173`

---

### 📝 Testing the Cart System

#### Test as Customer:

1. Open `http://localhost:5173` in browser
2. Go to `/plastic/electrical` (Electrical Accessories page)
3. Click "Buy Now" button on any item
4. Select quantity (1-10) and click "Add to Cart"
5. Cart icon appears at bottom-right with badge showing item count
6. Click shopping cart icon to expand sidebar
7. Review items in cart
8. Click "Proceed to Checkout"
9. Fill in checkout form:
   - Name: Your Name
   - Email: your.email@example.com
   - Phone: +94XXXXXXXXX
   - Address: Your full address
   - Notes: (optional) Any special instructions
10. Click "Place Order"
11. See success modal with order number (ORD-xxxxx)
12. Cart clears automatically

#### Test as Admin:

1. Go to `/admin/login`
2. Login with admin credentials
3. Click "Orders" in sidebar
4. You should see the order you just placed
5. Filter by status (all should show "pending")
6. Click eye icon to view order details
7. In the modal, click "confirmed" button to update status
8. Click "Close" to dismiss modal
9. Order should now show "confirmed" status in table

---

### 💾 Database Records

Orders are saved in MongoDB with this structure:

```javascript
{
  _id: ObjectId,
  orderNumber: "ORD-1701671600000-1",
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+94771234567",
    address: "123 Main St, Colombo",
    notes: "Deliver on weekends"
  },
  items: [
    {
      itemId: ObjectId,
      itemType: "electrical",
      title: "Junction Box",
      price: 500,
      quantity: 2
    }
  ],
  totalPrice: 1000,
  status: "pending",
  emailSent: false,
  whatsappSent: false,
  createdAt: Date,
  updatedAt: Date
}
```

---

### 🔧 Component Usage

#### Using CartContext in a Component:

```jsx
import { useCart } from "../Context/CartContext";

export default function MyComponent() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const handleAdd = () => {
    addToCart({
      _id: "item_id",
      title: "Product Name",
      price: 100,
      quantity: 1,
      images: ["image_url"],
      type: "electrical",
    });
  };

  return <button onClick={handleAdd}>Add to Cart</button>;
}
```

#### Using PurchaseButton Component:

```jsx
import PurchaseButton from "../Components/PurchaseButton/PurchaseButton";

export default function ProductCard({ item }) {
  return (
    <div>
      <h3>{item.title}</h3>
      <p>Rs. {item.price}</p>
      <PurchaseButton item={item} itemType="electrical" />
    </div>
  );
}
```

---

### 📊 Admin API Endpoints

Test these in Postman or curl (replace with your actual server URL):

#### Create Order (Public)

```
POST http://localhost:7001/api/orders
Content-Type: application/json

{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+94771234567",
    "address": "123 Main St",
    "notes": "Optional notes"
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

#### List All Orders (Admin)

```
GET http://localhost:7001/api/orders/admin?page=1&limit=10&status=pending
Authorization: Bearer {your_jwt_token}
```

#### Get Single Order

```
GET http://localhost:7001/api/orders/630f1234567890abcdef1234
Authorization: Bearer {your_jwt_token}
```

#### Update Order Status

```
PUT http://localhost:7001/api/orders/630f1234567890abcdef1234/status
Authorization: Bearer {your_jwt_token}
Content-Type: application/json

{
  "status": "confirmed"
}
```

Valid status values: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

#### Cancel Order

```
DELETE http://localhost:7001/api/orders/630f1234567890abcdef1234
Authorization: Bearer {your_jwt_token}
```

#### Get Statistics

```
GET http://localhost:7001/api/orders/admin/stats
Authorization: Bearer {your_jwt_token}
```

---

### 🐛 Debugging

#### Check if CartContext is properly wrapped:

- Open browser DevTools → Components
- Look for `CartProvider` component in component tree
- It should wrap the entire `<App />` component

#### Check if order was saved:

- Open MongoDB client (MongoDB Compass or mongo shell)
- Check database: `dyno_db` (or your configured DB name)
- Collection: `orders`
- You should see your newly created order documents

#### Check browser localStorage:

- Open DevTools → Application → Local Storage
- Look for key `cart` - should contain JSON array of cart items
- Look for key `cartOpen` - should be `true` or `false`

#### Check server logs:

- If running `npm run dev` with morgan middleware, you'll see all requests logged
- Look for: `POST /api/orders` with status code (201 = success)
- Look for: `GET /api/orders/admin` with status code (200 = success)

---

### 📦 Adding Purchase Buttons to Other Pages

To add purchase buttons to spare parts pages, follow this pattern:

```jsx
// In SpareParts page or component
import PurchaseButton from "../../../Components/PurchaseButton/PurchaseButton";

// Inside component render:
<PurchaseButton
  item={sparePart}
  itemType="spare-part" // Changed item type
/>;
```

Make sure each item object has these properties:

- `_id`: Unique identifier
- `title` or `name`: Product name
- `price`: Numeric price
- `images` or `image`: Array of image URLs

---

### 🎨 Customizing Styles

#### Cart Sidebar Button Position:

Edit `client/src/Components/CartSidebar/CartSidebar.css`:

```css
.cart-sidebar {
  position: fixed;
  bottom: 20px; /* Distance from bottom */
  right: 20px; /* Distance from right */
  z-index: 999;
}
```

#### Purchase Button Colors:

Edit `client/src/Components/PurchaseButton/PurchaseButton.css`:

```css
.purchase-btn {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 100%
  ); /* Change colors here */
}
```

#### Order Status Badge Colors:

Edit `client/src/Pages/Admin/AdminPages/Orders_AdminPage.jsx`:

```javascript
const getStatusColor = (status) => {
  const colors = {
    pending: "#fbbf24", // Yellow
    confirmed: "#3b82f6", // Blue
    shipped: "#8b5cf6", // Purple
    delivered: "#10b981", // Green
    cancelled: "#ef4444", // Red
  };
  return colors[status] || "#6b7280";
};
```

---

### ❌ Common Issues & Fixes

| Issue                           | Solution                                                        |
| ------------------------------- | --------------------------------------------------------------- |
| Cart not showing items          | Ensure CartProvider wraps entire app in main.jsx                |
| Checkout form doesn't submit    | Check server is running on port 7001 & /api/orders route exists |
| Orders not loading in admin     | Verify JWT token is stored & user has admin role                |
| Images not loading in cart      | Check image URLs start with `http://localhost:7001`             |
| Cart items disappear on refresh | Check browser's localStorage is enabled                         |
| Button styled differently       | Check CSS files are imported correctly (no typos in file names) |

---

### ✅ Verification Checklist

After setup, verify:

- [ ] Server running without errors
- [ ] Client loading without console errors
- [ ] CartSidebar appears on any page (look for cart icon bottom-right)
- [ ] Can add items to cart from electrical page
- [ ] Cart persists after page refresh
- [ ] Checkout form appears when clicking "Proceed to Checkout"
- [ ] Order is created successfully (see success modal)
- [ ] Order appears in admin orders page
- [ ] Can update order status in admin
- [ ] Can view order details in admin modal

---

### 📚 Related Documentation

- See `CART_IMPLEMENTATION_SUMMARY.md` for full technical details
- See backend controller: `server/src/controllers/orderController.js`
- See frontend context: `client/src/Context/CartContext.jsx`
- See Order model: `server/src/models/Order.js`

---

### 🤝 Support

If you encounter issues:

1. Check browser console for JavaScript errors
2. Check server logs for API errors
3. Verify MongoDB connection is working
4. Ensure all dependencies are installed (`npm install`)
5. Restart both server and client
6. Check that ports 7001 (server) and 5173 (client) are not in use

---

**Last Updated:** December 4, 2024  
**Status:** ✅ Ready for Production Testing
