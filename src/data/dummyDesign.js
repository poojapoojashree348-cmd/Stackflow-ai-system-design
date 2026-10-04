export const foodDeliveryDesign = {
  summary: "Online Food Delivery System is a high-throughput, microservices-based web application connecting customers, restaurants, and delivery drivers with real-time tracking, secure payments, and dynamic menu management.",
  projectSummary: {
    projectName: "Online Food Delivery System",
    projectType: "Web Application",
    architecture: "Microservices Architecture",
    frontend: "React.js",
    backend: "Node.js (Express)",
    database: "MongoDB",
    authentication: "JWT",
    deployment: "Docker + AWS"
  },
  keyFeatures: [
    "User Registration / Login & Role-Based Access Control",
    "Real-time Restaurant Menu Browsing and Cart Processing",
    "Live WebSocket Order Tracking and Courier Dispatching",
    "Integrated Multi-Gateway Payments (Stripe / Razorpay)",
    "Comprehensive Restaurant & Admin Analytics Dashboards"
  ],
  systemStats: {
    estimatedRPS: "3,500 req/sec",
    latencyTarget: "< 100ms p95",
    databaseSize: "500 GB/year",
    scalabilityTier: "Kubernetes Auto-scaling Cluster"
  },
  functionalModules: [
    {
      id: "customer",
      name: "Customer Module",
      color: "blue",
      items: [
        "User Registration / Login",
        "Browse Restaurants",
        "Search Food",
        "Add to Cart",
        "Place Order",
        "Track Order",
        "Order History",
        "Payment"
      ]
    },
    {
      id: "restaurant",
      name: "Restaurant Module",
      color: "green",
      items: [
        "Restaurant Login",
        "Manage Menu",
        "Manage Orders",
        "Update Order Status",
        "View Earnings"
      ]
    },
    {
      id: "admin",
      name: "Admin Module",
      color: "amber",
      items: [
        "Admin Dashboard",
        "Manage Users",
        "Manage Restaurants",
        "Manage Orders",
        "Manage Categories",
        "Reports & Analytics"
      ]
    }
  ],
  modules: [
    {
      id: "customer",
      name: "Customer Module",
      description: "Handles customer onboarding, discovery, item search, shopping cart management, payment processing, and live order tracking.",
      responsibilities: [
        "User Registration / Login",
        "Browse Restaurants",
        "Search Food",
        "Add to Cart",
        "Place Order",
        "Track Order",
        "Order History",
        "Payment"
      ]
    },
    {
      id: "restaurant",
      name: "Restaurant Module",
      description: "Allows restaurant partners to authenticate, configure menus, manage incoming tickets, update preparation statuses, and inspect revenues.",
      responsibilities: [
        "Restaurant Login",
        "Manage Menu",
        "Manage Orders",
        "Update Order Status",
        "View Earnings"
      ]
    },
    {
      id: "admin",
      name: "Admin Module",
      description: "Empowers platform administrators with global oversight, user management, restaurant approval, platform commissions, and operational telemetry.",
      responsibilities: [
        "Admin Dashboard",
        "Manage Users",
        "Manage Restaurants",
        "Manage Orders",
        "Manage Categories",
        "Reports & Analytics"
      ]
    }
  ],
  database: {
    databaseType: "MongoDB (Document Store) + Redis (Cache)",
    tables: [
      {
        id: "tbl_users",
        name: "Users",
        description: "Stores user authentication and profile data.",
        fields: [
          { name: "user_id", type: "ObjectId", isPrimaryKey: true, description: "Unique primary identifier" },
          { name: "name", type: "String", isNullable: false, description: "Full customer name" },
          { name: "email", type: "String", isNullable: false, description: "Unique email address" },
          { name: "password", type: "String", isNullable: false, description: "Bcrypt hashed password" },
          { name: "phone", type: "String", isNullable: false, description: "Contact phone number" },
          { name: "role", type: "String", isNullable: false, description: "Enum: customer, restaurant, admin" }
        ]
      },
      {
        id: "tbl_restaurants",
        name: "Restaurants",
        description: "Stores restaurant profiles, operating hours, and locations.",
        fields: [
          { name: "res_id", type: "ObjectId", isPrimaryKey: true, description: "Unique restaurant ID" },
          { name: "user_id", type: "ObjectId", isForeignKey: true, references: "Users.user_id", description: "Owner account foreign key" },
          { name: "name", type: "String", isNullable: false, description: "Restaurant commercial title" },
          { name: "address", type: "String", isNullable: false, description: "Physical street address" },
          { name: "rating", type: "Number", isNullable: false, description: "Customer review rating (1-5)" },
          { name: "image", type: "String", isNullable: true, description: "Banner / storefront image URL" }
        ]
      },
      {
        id: "tbl_food_items",
        name: "Food_Items",
        description: "Dishes and culinary offerings provided by restaurants.",
        fields: [
          { name: "food_id", type: "ObjectId", isPrimaryKey: true, description: "Unique food item ID" },
          { name: "res_id", type: "ObjectId", isForeignKey: true, references: "Restaurants.res_id", description: "Parent restaurant foreign key" },
          { name: "name", type: "String", isNullable: false, description: "Dish item name" },
          { name: "price", type: "Number", isNullable: false, description: "Item cost in currency units" },
          { name: "category", type: "String", isNullable: false, description: "e.g. Burgers, Pizza, Beverages" },
          { name: "image", type: "String", isNullable: true, description: "Food item thumbnail URL" }
        ]
      },
      {
        id: "tbl_orders",
        name: "Orders",
        description: "Customer orders and fulfillment progression records.",
        fields: [
          { name: "order_id", type: "ObjectId", isPrimaryKey: true, description: "Unique order transaction ID" },
          { name: "user_id", type: "ObjectId", isForeignKey: true, references: "Users.user_id", description: "Ordering customer reference" },
          { name: "res_id", type: "ObjectId", isForeignKey: true, references: "Restaurants.res_id", description: "Target restaurant reference" },
          { name: "total_amount", type: "Number", isNullable: false, description: "Total billed monetary amount" },
          { name: "status", type: "String", isNullable: false, description: "Enum: placed, preparing, out_for_delivery, delivered" },
          { name: "order_time", type: "Date", isNullable: false, description: "Checkout timestamp" }
        ]
      },
      {
        id: "tbl_order_items",
        name: "Order_Items",
        description: "Line-item breakdown of individual items within an order.",
        fields: [
          { name: "order_item_id", type: "ObjectId", isPrimaryKey: true, description: "Line item unique key" },
          { name: "order_id", type: "ObjectId", isForeignKey: true, references: "Orders.order_id", description: "Parent order reference" },
          { name: "food_id", type: "ObjectId", isForeignKey: true, references: "Food_Items.food_id", description: "Selected food item reference" },
          { name: "quantity", type: "Number", isNullable: false, description: "Quantity ordered" },
          { name: "price", type: "Number", isNullable: false, description: "Unit price at time of order" }
        ]
      },
      {
        id: "tbl_payments",
        name: "Payments",
        description: "Payment transaction receipts and settlement records.",
        fields: [
          { name: "payment_id", type: "ObjectId", isPrimaryKey: true, description: "Payment transaction identifier" },
          { name: "order_id", type: "ObjectId", isForeignKey: true, references: "Orders.order_id", description: "Associated order reference" },
          { name: "amount", type: "Number", isNullable: false, description: "Settled transaction amount" },
          { name: "method", type: "String", isNullable: false, description: "Payment rail (Card, UPI, Wallet)" },
          { name: "status", type: "String", isNullable: false, description: "Enum: pending, successful, failed" },
          { name: "payment_time", type: "Date", isNullable: false, description: "Settlement confirmation timestamp" }
        ]
      }
    ],
    relationships: [
      { fromTable: "Restaurants", fromField: "user_id", toTable: "Users", toField: "user_id", type: "1:N" },
      { fromTable: "Orders", fromField: "user_id", toTable: "Users", toField: "user_id", type: "1:N" },
      { fromTable: "Food_Items", fromField: "res_id", toTable: "Restaurants", toField: "res_id", type: "1:N" },
      { fromTable: "Orders", fromField: "res_id", toTable: "Restaurants", toField: "res_id", type: "1:N" },
      { fromTable: "Order_Items", fromField: "order_id", toTable: "Orders", toField: "order_id", type: "1:N" },
      { fromTable: "Order_Items", fromField: "food_id", toTable: "Food_Items", toField: "food_id", type: "1:N" },
      { fromTable: "Payments", fromField: "order_id", toTable: "Orders", toField: "order_id", type: "1:1" }
    ]
  },
  apis: [
    {
      id: "api_1",
      method: "POST",
      endpoint: "/api/auth/register",
      description: "Register new user",
      authentication: false
    },
    {
      id: "api_2",
      method: "POST",
      endpoint: "/api/auth/login",
      description: "User login",
      authentication: false
    },
    {
      id: "api_3",
      method: "GET",
      endpoint: "/api/restaurants",
      description: "Get all restaurants",
      authentication: false
    },
    {
      id: "api_4",
      method: "GET",
      endpoint: "/api/food-items",
      description: "Get menu of a restaurant",
      authentication: false
    },
    {
      id: "api_5",
      method: "POST",
      endpoint: "/api/orders",
      description: "Place new order",
      authentication: true
    },
    {
      id: "api_6",
      method: "GET",
      endpoint: "/api/orders/{id}",
      description: "Get order details",
      authentication: true
    },
    {
      id: "api_7",
      method: "PUT",
      endpoint: "/api/orders/{id}/status",
      description: "Update order status",
      authentication: true
    },
    {
      id: "api_8",
      method: "POST",
      endpoint: "/api/payments",
      description: "Make payment",
      authentication: true
    }
  ],
  architecture: {
    pattern: "Microservices Architecture with API Gateway & WebSocket Event Mesh",
    client: { name: "Client (React.js)", type: "frontend" },
    loadBalancer: { name: "Nginx (Load Balancer)", type: "gateway" },
    services: [
      { id: "s1", name: "User Service", desc: "Authentication, user profiles, credentials" },
      { id: "s2", name: "Restaurant Service", desc: "Menus, restaurant items, inventory" },
      { id: "s3", name: "Order Service", desc: "Order orchestrator, cart management" },
      { id: "s4", name: "Payment Service", desc: "Payment gateways, escrow, refunds" }
    ],
    database: { name: "MongoDB (Database)", type: "database" },
    components: [
      { id: "c_client", name: "Client (React.js)", layer: "Client", technology: "React.js + Tailwind CSS" },
      { id: "c_nginx", name: "Nginx (Load Balancer)", layer: "Gateway", technology: "Nginx Reverse Proxy" },
      { id: "c_user", name: "User Service", layer: "Backend", technology: "Node.js (Express)" },
      { id: "c_restaurant", name: "Restaurant Service", layer: "Backend", technology: "Node.js (Express)" },
      { id: "c_order", name: "Order Service", layer: "Backend", technology: "Node.js (Express)" },
      { id: "c_payment", name: "Payment Service", layer: "Backend", technology: "Node.js (Express)" },
      { id: "c_db", name: "MongoDB (Database)", layer: "Database", technology: "MongoDB Atlas" }
    ]
  },
  technologyStack: [
    { id: "react", name: "React.js", category: "Frontend" },
    { id: "node", name: "Node.js", category: "Backend Runtime" },
    { id: "express", name: "Express.js", category: "Backend Framework" },
    { id: "mongodb", name: "MongoDB", category: "Database" },
    { id: "docker", name: "Docker", category: "Containerization" },
    { id: "aws", name: "AWS", category: "Cloud Infrastructure" },
    { id: "tailwind", name: "Tailwind CSS", category: "Styling" }
  ],
  techStack: [
    { id: "react", name: "React.js" },
    { id: "node", name: "Node.js" },
    { id: "express", name: "Express.js" },
    { id: "mongodb", name: "MongoDB" },
    { id: "docker", name: "Docker" },
    { id: "aws", name: "AWS" },
    { id: "tailwind", name: "Tailwind CSS" }
  ],
  aiRecommendations: [
    "Use Redis for caching frequently accessed data.",
    "Implement real-time order tracking using WebSockets.",
    "Use Stripe or Razorpay for secure payments.",
    "Implement Role-Based Access Control (RBAC).",
    "Use CloudWatch for monitoring and logs."
  ],
  recommendations: [
    { category: "Caching", title: "Redis Caching", description: "Use Redis for caching frequently accessed data like restaurant menus." },
    { category: "Real-time", title: "WebSockets", description: "Implement real-time order tracking using WebSockets." },
    { category: "Payments", title: "Payment Gateways", description: "Use Stripe or Razorpay for secure payments." },
    { category: "Security", title: "Access Control", description: "Implement Role-Based Access Control (RBAC)." },
    { category: "Monitoring", title: "Telemetry", description: "Use CloudWatch for monitoring and logs." }
  ],
  deploymentPlan: [
    { target: "Frontend", action: "Deploy on AWS S3 + CloudFront", icon: "globe" },
    { target: "Backend", action: "Deploy using Docker on AWS EC2", icon: "docker" },
    { target: "Database", action: "MongoDB Atlas (Cloud)", icon: "database" },
    { target: "CI/CD", action: "GitHub Actions", icon: "git" },
    { target: "Domain", action: "Route 53 + SSL (HTTPS)", icon: "lock" }
  ],
  deployment: [
    { stage: "Frontend", details: "Deploy on AWS S3 + CloudFront" },
    { stage: "Backend", details: "Deploy using Docker on AWS EC2" },
    { stage: "Database", details: "MongoDB Atlas (Cloud)" },
    { stage: "CI/CD", details: "GitHub Actions" },
    { stage: "Domain", details: "Route 53 + SSL (HTTPS)" }
  ]
};

export const smartDineDesign = foodDeliveryDesign;
