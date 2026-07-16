-- Voltix E-Commerce Database Schema
-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL,
    upsell_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'shipped', 'delivered')),
    upsell_added BOOLEAN NOT NULL DEFAULT FALSE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (customized for COD client submission)
-- Anyone can read products
CREATE POLICY "Allow public read access to products" ON public.products
    FOR SELECT USING (true);

-- Anyone can insert orders (necessary for checkout)
CREATE POLICY "Allow public insert access to orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Anyone can update their order (necessary for post-purchase upsell within the browser session)
CREATE POLICY "Allow public update access to orders" ON public.orders
    FOR UPDATE USING (true) WITH CHECK (true);

-- Seed products table with Voltix products
INSERT INTO public.products (id, name, base_price, upsell_price)
VALUES 
    ('voltix-horizon-ring', 'Voltix Horizon Smart Ring', 399.00, 149.00)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    base_price = EXCLUDED.base_price,
    upsell_price = EXCLUDED.upsell_price;
