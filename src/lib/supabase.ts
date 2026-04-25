import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kvvtwodimrehumvnwehj.supabase.co'
const supabaseKey = 'sb_publishable_Otb_xcNHxuK6wGcGbGLjHg_Rg2VAtYP'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types
export interface User {
  id: number
  tenant_id: number
  email: string
  full_name: string
  phone: string
  role: 'owner' | 'admin' | 'user'
  email_verified: boolean
  created_at: string
  last_login_at: string | null
}

export interface Tenant {
  id: number
  name: string
  slug: string
  plan: 'trial' | 'professional' | 'business'
  trial_end: string | null
  subscription_end: string | null
  created_at: string
}

export interface Order {
  id: number
  tenant_id: number
  reference: string
  customer_id: number | null
  agent_id: number | null
  status: 'pending' | 'processing' | 'delivered' | 'cancelled'
  product_name: string
  quantity: number
  price: number
  currency: string
  shipping_address: string
  shipping_city: string
  notes: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: number
  tenant_id: number
  name: string
  phone: string
  email: string
  address: string
  city: string
  notes: string
  created_at: string
  updated_at: string
}

export interface Shipment {
  id: number
  tenant_id: number
  order_id: number
  carrier_id: number
  tracking_number: string
  label_url: string
  status: 'pending' | 'in_transit' | 'delivered'
  delivery_type: 'home' | 'pickup'
  cost: number
  notes: string
  created_at: string
  updated_at: string
}

export interface Carrier {
  id: number
  name: string
  code: string
  api_key: string
  is_active: boolean
  created_at: string
}

export interface Store {
  id: number
  tenant_id: number
  name: string
  platform: 'shopify' | 'woocommerce' | 'magento' | 'opencart'
  api_key: string
  is_active: boolean
  created_at: string
}

export interface Notification {
  id: number
  tenant_id: number
  type: string
  title: string
  message: string
  is_read: boolean
  created_at: string
}

export interface Agent {
  id: number
  tenant_id: number
  name: string
  email: string
  phone: string
  is_active: boolean
  created_at: string
}
