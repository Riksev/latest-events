# Latest Events

A full-stack web application for browsing upcoming events, inspecting event details via dynamic routing, and managing attendee registrations with persistent cloud storage.

## Overview

**Latest Events** provides a clean, responsive interface for discovering events and registering participants online. Originally prototyped with local JSON storage, the application was re-architected to use **Supabase (PostgreSQL)** to support stateless serverless deployments on Vercel, reliable data persistence, and scalable registration management.

## Key Features

- **Dynamic Event Pages:** Structured Next.js App Router dynamic routes for browsing individual event views and metadata.
- **Persistent Event Registrations:** Real-time registration submission and retrieval backed by a PostgreSQL `registrations` table in Supabase.
- **Type-Safe Architecture:** End-to-end TypeScript coverage across UI components, data models, and API/database interactions.
- **Serverless-Ready Deployment:** Stateless backend architecture designed for seamless hosting on Vercel without local filesystem dependencies.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (ES6+)
- **UI & Styling:** React, CSS / Tailwind CSS
- **Database & BaaS:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Architecture & Engineering Notes

- **Migration from Local JSON to Supabase:** The initial prototype persisted data to a local `data.json` file, which conflicted with Vercel's read-only serverless filesystem in production. Migrating to a relational `registrations` table in Supabase eliminated filesystem coupling and ensured ACID-compliant data persistence across deployments.
- **Structured Routing:** Leverages Next.js dynamic route segments to cleanly separate event listing views from individual event detail and registration flows.

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- A [Supabase](https://supabase.com/) project with a `registrations` table

### Installation

1. **Clone the repository:**
    ```bash
    git clone [https://github.com/Riksev/latest-events.git](https://github.com/Riksev/latest-events.git)
    cd latest-events
    ```
