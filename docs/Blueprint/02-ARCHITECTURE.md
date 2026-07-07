# M3CP Architecture

## Overview

Mapache 3D Commerce Platform is a secure commerce and CMS platform for Mapache 3D GT.

It includes:

- Public landing page
- Product catalog
- Shopping cart
- Checkout
- Admin CMS
- Product management
- Media library
- Customer management
- Order management
- Production tracking
- Payment integration

## Core Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 |
| UI | React 19 + Tailwind CSS v4 |
| Animations | Framer Motion |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Media Storage | AWS S3 |
| CDN | AWS CloudFront |
| Hosting | Vercel |
| DNS / Security | Cloudflare |
| Payments | External certified payment provider |
| Email | AWS SES or Resend |

## High Level Architecture

```text
Customer Browser
      |
      v
Cloudflare
      |
      v
Vercel / Next.js
      |
      +------------------+
      |                  |
      v                  v
Supabase            AWS S3
Database            Media Storage
Auth                Videos
RLS                 Images
Orders              STL Files
Products            Banners
      |                  |
      v                  v
Payment Gateway     CloudFront CDN