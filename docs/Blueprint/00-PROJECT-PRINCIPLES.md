# Mapache 3D Commerce Platform - Project Principles

## 1. Security First

Mapache 3D GT will be designed as a secure commerce platform from day one.

The platform must never store raw credit card numbers, CVV codes, or sensitive payment credentials. Payment data will be handled by certified payment providers using tokenization.

## 2. Admin Controlled

The business owner must be able to manage the platform without editing code.

The admin panel must allow product creation, product editing, image uploads, video uploads, pricing, product ordering, landing page content, banners, categories, and promotions.

## 3. Modular Architecture

The platform will be organized into independent modules:

- CMS
- Commerce
- Customers
- Inventory
- Production
- Media
- Payments
- Analytics
- Admin

## 4. Scalable Infrastructure

The architecture must support growth from one store to multiple stores in the future.

Core infrastructure:

- Next.js
- Supabase
- AWS S3
- CloudFront
- Cloudflare
- Vercel

## 5. Media Strategy

Images, videos, STL files, banners, and product assets will be managed through a Media Library.

Large media files should be stored in AWS S3 and delivered through CloudFront.

## 6. Customer Intelligence

The platform must support customer segmentation such as:

- New customer
- Frequent customer
- VIP
- Wholesale
- Business
- Designer

## 7. Production Intelligence

The platform must understand 3D printing costs.

Each product may track:

- Material
- Print time
- Filament grams
- Filament cost
- Electricity cost
- Machine cost
- Labor cost
- Margin
- Profit

## 8. Documentation Required

Major architectural decisions must be documented before implementation.

Blueprint files will guide all development.