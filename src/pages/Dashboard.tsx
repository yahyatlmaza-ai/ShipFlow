import { useEffect, useState } from 'react'
import { supabase, type Order, type Shipment, type Customer } from '../lib/supabase'
import { Package, Truck, Users, TrendingUp } from 'lucide-react'
import '../styles/dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalShipments: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orders, shipments, customers] = await Promise.all([
          supabase.from('orders').select('*'),
          supabase.from('shipments').select('*'),
          supabase.from('customers').select('*'),
        ])

        const totalRevenue = (orders.data || []).reduce((sum: number, order: Order) => sum + order.price * order.quantity, 0)

        setStats({
          totalOrders: orders.data?.length || 0,
          totalShipments: shipments.data?.length || 0,
          totalCustomers: customers.data?.length || 0,
          totalRevenue,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Package,
      color: 'blue',
    },
    {
      title: 'Total Shipments',
      value: stats.totalShipments,
      icon: Truck,
      color: 'green',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'purple',
    },
    {
      title: 'Total Revenue',
      value: `${(stats.totalRevenue / 100).toFixed(2)} DZD`,
      icon: TrendingUp,
      color: 'orange',
    },
  ]

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="stats-grid">
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className={`stat-card ${card.color}`}>
                <div className="stat-icon">
                  <Icon size={24} />
                </div>
                <div className="stat-content">
                  <p className="stat-title">{card.title}</p>
                  <p className="stat-value">{card.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
