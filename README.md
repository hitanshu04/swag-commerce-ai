# 🚀 Swag Commerce & Analytics System

A full-stack e-commerce platform designed for bulk merchandise procurement, featuring a real-time inventory locking mechanism, a dynamic coupon engine, and a Retrieval-Augmented Generation (RAG) AI Assistant for business analytics.

## 🔗 Live Links
- **Live Demo:** [Insert Your Codespaces/Vercel Link Here]
- **Demo Video:** [Insert Your Loom Video Link Here]

## 🛠️ Tech Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express.js, RESTful API
- **Database:** MongoDB (Mongoose ODM)
- **AI Engine:** Google Gemini Pro (`@google/generative-ai`)
- **Tools:** Nodemailer (Transaction Emails), html2canvas (Digital Receipts)

---

## 🤖 AI Integration Note (Important)
**Architecture: Retrieval-Augmented Context (RAG)**

To ensure the "Admin AI Copilot" provides accurate, real-time answers (and handles edge cases like sales data), I implemented a context-injection pattern:

1.  **Data Aggregation:** Before every AI interaction, the backend executes a MongoDB aggregation pipeline to fetch:
    * `Total Revenue` (Sum of `finalTotal` from Orders collection)
    * `Low Stock SKUs` (Filtered by `stock < 15` from Products collection)
    * `Active Coupons` (Fetched from Promotional Schema)
2.  **Context Injection:** This "Ground Truth" data is serialized into a JSON object and injected into the **System Prompt** of the Gemini Model.
3.  **Hybrid Logic Fallback:** To ensure reliability, if the LLM API experiences latency, a deterministic logic engine locally calculates the metrics to guarantee an instant response to the user.

---

## ⚙️ Setup Instructions (Run Locally)

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/swag-commerce-ai.git](https://github.com/YOUR_USERNAME/swag-commerce-ai.git)
    cd swag-commerce-ai
    ```

2.  **Backend Setup**
    ```bash
    cd server
    npm install
    # Create a .env file with: MONGO_URI, GEMINI_API_KEY, EMAIL_USER, EMAIL_PASS
    node seed.js  # To populate initial products & coupons
    node server.js
    ```

3.  **Frontend Setup**
    ```bash
    cd client
    npm install
    npm run dev
    ```

---

## ✅ Key Features Implemented
1.  **Commerce Flow:** Full "Buy" experience with persistent cart and guest checkout.
2.  **Coupon Engine:** - Handles **Percentage** discounts.
    - Validates **Expiry Dates** (Try code `EXPIRED50`).
    - Supports **100% Discount** (Try code `FREE100` for $0 transaction).
3.  **Admin AI:** Answers questions about Revenue, Stock, and Inventory using real-time DB stats.