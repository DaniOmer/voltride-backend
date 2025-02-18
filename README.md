# VoltRide Backend

VoltRide is a project based on node.js

## Pre-requisites

## Installation Steps

## Project Structure

```bash
volride-backend/
├── src/
│   ├── modules/                                # Main directory for each module
│   │   ├── scooter/                            # "Scooter" Module
│   │   │   ├── domain/                         # Pure business logic for scooters
│   │   │   │   ├── commands/
│   │   │   │   ├── events/
│   │   │   │   ├── aggregates/
│   │   │   │   └── exceptions/
│   │   │   ├── application/                    # Use cases and DTOs specific to scooters
│   │   │   │   ├── command-handlers/
│   │   │   │   ├── query-handlers/
│   │   │   │   ├── event-handlers/
│   │   │   │   └── projections/
│   │   │   ├── infrastructure/                 # Domain-specific implementations
│   │   │   │   ├── command-db/                 # PostgreSQL
│   │   │   │   └── query-db/                   # MongoDB
│   │   │   └── interface/                      # REST API and/or CLI exposure for scooters
│   │   ├── users/                              # "Users" Module
│   │   │   ├── domain/                         # Pure business logic for scooters
│   │   │   │   ├── commands/
│   │   │   │   ├── events/
│   │   │   │   ├── aggregates/
│   │   │   │   └── exceptions/
│   │   │   ├── application/                    # Use cases and DTOs specific to users
│   │   │   │   ├── command-handlers/
│   │   │   │   ├── query-handlers/
│   │   │   │   ├── event-handlers/
│   │   │   │   └── projections/
│   │   │   ├── infrastructure/                 # Domain-specific implementations
│   │   │   │   ├── command-db/                 # PostgreSQL
│   │   │   │   └── query-db/                   # MongoDB
│   │   │   └── interface/                      # REST API and/or CLI exposure for users
│   │   └── ...                                 # Other domains (e.g., products, orders, etc.)
│   ├── shared/                                 # Modules shared across domains
│   │   ├── server/                             # Global server (Express or Fastify)
│   │   │   ├── express/
│   │   │   │   └── express-server.adapter.ts
│   │   │   └── fastify/
│   │   │       └── fastify-server.adapter.ts
│   │   ├── database/                           # Global database (SQL or NoSQL)
│   │   │   ├── mongodb/
│   │   │   │   └── mongo-database.adapter.ts
│   │   │   └── postgresql/
│   │   │       └── postgres-database.adapter.ts
│   │   ├── logger/
│   │   └── utils/
│   ├── config/                                 # Global configurations (env, secrets, etc.)
│   └── index.ts                                # Application entry point
├── docs/                                       # Specific documentation files
│   └── ...
├── .env                                        # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```
