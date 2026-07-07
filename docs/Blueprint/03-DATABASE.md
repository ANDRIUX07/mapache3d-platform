# M3CP Database Blueprint

## Goal

The database must support:

- Products
- Customers
- Orders
- Payments
- Admin CMS
- Media Library
- 3D printing production
- Inventory
- Customer segmentation
- Analytics
- Audit logs

## Main Modules

### Security

- profiles
- roles
- user_roles
- audit_logs

### Customers

- customers
- customer_addresses
- customer_segments
- customer_notes
- customer_favorites

### Products

- products
- product_categories
- product_tags
- product_variants
- product_media
- product_costs
- product_inventory

### Media

- media_assets
- media_folders
- media_usage

### Commerce

- carts
- cart_items
- orders
- order_items
- payments
- payment_transactions
- coupons

### CMS

- site_sections
- site_blocks
- site_settings
- banners
- announcements

### Production

- printers
- materials
- filament_spools
- print_jobs
- production_queue

### Inventory

- inventory_items
- inventory_movements
- suppliers

## Payment Security Rule

The database must never store:

- Raw credit card number
- CVV
- Full sensitive card data

Allowed payment fields:

- payment_provider
- provider_customer_id
- provider_payment_method_id
- card_brand
- card_last4
- payment_status
- transaction_reference

## Product Core

Each product should support:

- Name
- Slug
- Description
- Price in GTQ
- Category
- Images
- Videos
- Stock
- Active status
- Featured status
- Sort order
- SEO metadata
- Print time
- Filament grams
- Material
- Cost calculation
- Profit margin

## Customer Core

Each customer should support:

- Name
- Email
- Phone
- Addresses
- Order history
- Total spent
- Average order value
- Segment
- Loyalty points
- Internal notes

## Production Core

Each print job should support:

- Product
- Printer
- Material
- Filament spool
- Print time
- Grams used
- Status
- Cost
- Assigned operator

## Order States

Possible order statuses:

- pending
- paid
- in_production
- ready_to_ship
- shipped
- delivered
- cancelled
- refunded

## Production States

Possible production statuses:

- queued
- printing
- post_processing
- quality_check
- packed
- completed
- failed

## RLS Rules

Supabase Row Level Security must be enabled on all sensitive tables.

General rules:

- Public users can read active products only.
- Customers can read only their own orders.
- Admins can manage products, orders, customers and CMS.
- Production users can manage print jobs only.
- Super admins can manage everything.

## Index Strategy

Important indexes:

- products.slug
- products.is_active
- products.featured
- products.sort_order
- orders.customer_id
- orders.status
- media_assets.type
- print_jobs.status
- audit_logs.created_at

## Future Expansion

The database should support:

- Multiple stores
- Multiple admins
- Wholesale pricing
- B2B customers
- AI quotes
- STL uploads
- Loyalty program
- Automatic production planning