import { useEffect, useState } from 'react'
import { supabase, type Order } from '../lib/supabase'
import { Plus, Edit2, Trash2, Eye, Search, Filter } from 'lucide-react'
import '../styles/orders.css'

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId)

      if (error) throw error
      
      setOrders(orders.map(o => 
        o.id === orderId ? { ...o, status: newStatus as any } : o
      ))
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const deleteOrder = async (orderId: number) => {
    if (!confirm('Are you sure you want to delete this order?')) return
    
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId)

      if (error) throw error
      setOrders(orders.filter(o => o.id !== orderId))
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'status-pending',
      processing: 'status-processing',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled',
    }
    return colors[status] || 'status-pending'
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Orders Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          New Order
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by reference or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={20} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>City</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="reference">{order.reference}</td>
                  <td>{order.product_name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price.toFixed(2)} {order.currency}</td>
                  <td>{order.shipping_city}</td>
                  <td>
                    <select
                      className={`status-select ${getStatusColor(order.status)}`}
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="date">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="actions">
                    <button className="action-btn view" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="action-btn edit" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Delete"
                      onClick={() => deleteOrder(order.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Order</h2>
            <p>Order creation form coming soon...</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
