generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// NextAuth Models
model User {
  id            Int      @id @default(autoincrement())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  role          String    @default("client") // client, provider, admin
  status        String    @default("active") // active, suspended
  points        Int       @default(0)
  earnings      Float     @default(0.0)
  location      String?   // for providers
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  bookingsAsClient  Booking[] @relation("clientBookings")
  bookingsAsProvider Booking[] @relation("providerBookings")
  services      Service[]
  schedules     Schedule[]
  ratingsGiven  Rating[] @relation("clientRatings")
  ratingsReceived Rating[] @relation("providerRatings")
  pointsTransactions PointsTransaction[]
}

model Account {
  id                 String  @id @default(cuid())
  userId             Int
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?
  user               User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       Int
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Custom Models
model Service {
  id          Int      @id @default(autoincrement())
  providerId  Int
  name        String
  description String?
  price       Float
  pointsCost  Int
  duration    Int      // in minutes
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  provider    User     @relation(fields: [providerId], references: [id])
  bookings    Booking[]
}

model Booking {
  id          Int      @id @default(autoincrement())
  clientId    Int
  providerId  Int
  serviceId   Int
  status      String   // pending, confirmed, completed, canceled
  startTime   DateTime
  endTime     DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  client      User     @relation("clientBookings", fields: [clientId], references: [id])
  provider    User     @relation("providerBookings", fields: [providerId], references: [id])
  service     Service  @relation(fields: [serviceId], references: [id])
  payment     Payment?
  rating      Rating?
}

model Payment {
  id            Int      @id @default(autoincrement())
  bookingId     Int      @unique
  paymentMethod String   // money, points
  status ACTIV        String   // pending, completed
  amount        Float?
  pointsUsed    Int?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  booking       Booking  @relation(fields: [bookingId], references: [id])
}

model PointsTransaction {
  id          Int      @id @default(autoincrement())
  userId      Int
  points      Int
  type        String   // earned, used
  description String
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}

model Rating {
  id          Int      @id @default(autoincrement())
  bookingId   Int      @unique
  clientId    Int
  providerId  Int
  rating      Int      // 1-5
  comment     String?
  createdAt   DateTime @default(now())
  booking     Booking  @relation(fields: [bookingId], references: [id])
  client      User     @relation("clientRatings", fields: [clientId], references: [id])
  provider    User     @relation("providerRatings", fields: [providerId], references: [id])
}

model Schedule {
  id          Int      @id @default(autoincrement())
  providerId  Int
  dayOfWeek   Int      // 0-6, Sunday to Saturday
  startTime   String   // e.g., "09:00"
  endTime     String   // e.g., "17:00"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  provider    User     @relation(fields: [providerId], references: [id])
}