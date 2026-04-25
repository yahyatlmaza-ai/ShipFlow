import { useEffect, useState } from 'react'
import { supabase, type Order } from '../lib/supabase'
import { BarChart3, TrendingUp, Package, DollarSign } from 'lucide-react'
import '../styles/analytics.css'

export default function Analytics() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    ordersByStatus: {} as Record<string, number>,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')

      if (error) throw error

      const orders = data || []
      const totalRevenue = orders.reduce((sum: number, o: Order) => sum + (o.price * o.quantity), 0)
      const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0

      const ordersByStatus = orders.reduce((acc: Record<string, number>, o: Order) => {
        acc[o.status] = (acc[o.status] || 0) + 1
        return acc
      }, {})

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        avgOrderValue,
        ordersByStatus,
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="analytics-page">
      <h1>Analytics & Reports</h1>

      {loading ? (
        <div className="loading">Loading analytics...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><Package size={24} /></div>
              <div className="stat-content">
                <p>Total Orders</p>
                <p className="value">{stats.totalOrders}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><DollarSign size={24} /></div>
              <div className="stat-content">
                <p>Total Revenue</p>
                <p className="value">{stats.totalRevenue.toFixed(2)} DZD</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><TrendingUp size={24} /></div>
              <div className="stat-content">
                <p>Avg Order Value</p>
                <p className="value">{stats.avgOrderValue.toFixed(2)} DZD</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><BarChart3 size={24} /></div>
              <div className="stat-content">
                <p>Orders by Status</p>
                <p className="value">{Object.keys(stats.ordersByStatus).length} types</p>
              </div>
            </div>
          </div>

          <div className="chart-section">
            <h2>Orders by Status</h2>
            <div className="status-breakdown">
              {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                <div key={status} className="status-item">
                  <span className="status-name">{status}</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(count / stats.totalOrders) * 100}%` }}
                    />
                  </div>
                  <span className="status-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
