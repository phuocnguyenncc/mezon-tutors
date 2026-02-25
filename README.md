# Mezon Tutors

> Smart tutor matching platform for busy professionals. Learn on your schedule.

[![Turborepo](https://img.shields.io/badge/monorepo-turborepo-blue.svg)](https://turbo.build/repo)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![NestJS](https://img.shields.io/badge/NestJS-backend-green.svg)](https://nestjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-blue.svg)](https://www.postgresql.org)

---

## Overview

**Mezon Tutors** is a B2C/B2B tutor booking platform that connects learners with qualified tutors through an intuitive, Tinder-style matching experience. All communication, scheduling, and learning sessions happen directly on Mezon—keeping everything in one place while ensuring quality and transparency for both sides.

### The Problem

- **Learners** (especially working professionals) struggle to find flexible, quality tutoring outside standard office hours
- **Tutors** (language teachers, skilled students) lack a trusted platform to monetize their expertise on their own terms

### The Solution

Mezon Tutors offers a seamless matching system where learners discover tutors based on subject, availability, and teaching style. All interactions—chat, video calls, and learning rooms—stay within the platform, with tutor-led clans and clear policies to build accountability and community.

---

## Features

### Core

- **Smart Matching** — Swipe-style discovery to find tutors that fit your goals, schedule, and budget
- **In-Platform Learning** — Chat, video calls, and virtual rooms built directly into Mezon (no external apps)
- **Tutor Clans** — Tutors create and manage their own communities with customizable policies
- **Platform Governance** — Clear rules ensuring tutors operate within Mezon (no private off-platform arrangements)

### Planned

- **Multi-Subject Expansion** — Beyond languages: programming, math, and more
- **Rewards & Gamification** — Earn skills, coins, and achievements
- **Certifications** — Skill-based credentials upon completion
- **Periodic Rewards** — Incentives for learners and tutors who stay active

---

## Target Users

| Segment | Description |
|--------|-------------|
| **B2C — Learners** | Working professionals and others learning languages who need flexible, non–9-to-5 scheduling |
| **B2B — Tutors** | English tutors, language students, and subject-matter experts looking for extra income on a trusted platform |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Monorepo | [Turborepo](https://turbo.build/repo) |
| Frontend | [Next.js 16](https://nextjs.org) (App Router, React 19) |
| Backend | [NestJS](https://nestjs.com) |
| Database | [PostgreSQL](https://www.postgresql.org) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- PostgreSQL

### Installation

```bash
# Install dependencies
yarn install

# Copy environment variables (when available)
cp .env.example .env
```

### Development

```bash
# Run both web + API (Turborepo)
yarn dev

# Or run individually
yarn dev:web   # Next.js → http://localhost:3000
yarn dev:api   # NestJS → http://localhost:4000
```

Open [http://localhost:3000](http://localhost:3000) for the web app, [http://localhost:4000](http://localhost:4000) for the API.

---

## Project Structure

```
mezon-tutors/
├── apps/
│   ├── web/          # Next.js 16 frontend
│   └── api/          # NestJS 10 backend
├── turbo.json
└── package.json
```

---

## Roadmap

- [x] Turborepo monorepo (Next.js + NestJS)
- [ ] NestJS API with PostgreSQL
- [ ] Auth & tutor/learner profiles
- [ ] Matching & discovery
- [ ] In-app chat & learning rooms
- [ ] Tutor clans & policies
- [ ] Payments & subscriptions
- [ ] Multi-subject support
- [ ] Rewards, skills, and certificates

---

## License

Private — All rights reserved.
