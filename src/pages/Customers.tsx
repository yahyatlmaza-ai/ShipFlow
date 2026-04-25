import { useEffect, useState } from 'react'
import { supabase, type Customer } from '../lib/supabase'
import { Plus, Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react'
import '../styles/customers.css'

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCustomer = async (customerId: number) => {
    if (!confirm('Are you sure you want to delete this customer?')) return
    
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId)

      if (error) throw error
      setCustomers(customers.filter(c => c.id !== customerId))
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1>Customers Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          New Customer
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading customers...</div>
      ) : customers.length === 0 ? (
        <div className="empty-state">
          <p>No customers found</p>
        </div>
      ) : (
        <div className="customers-grid">
          {customers.map(customer => (
            <div key={customer.id} className="customer-card">
              <div className="card-header">
                <h3>{customer.name}</h3>
                <div className="card-actions">
                  <button className="action-btn edit" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="action-btn delete" 
                    title="Delete"
                    onClick={() => deleteCustomer(customer.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="info-item">
                  <Phone size={18} />
                  <span>{customer.phone}</span>
                </div>
                <div className="info-item">
                  <Mail size={18} />
                  <span>{customer.email || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <MapPin size={18} />
                  <span>{customer.city}</span>
                </div>
              </div>

              <div className="card-footer">
                <p className="notes">{customer.notes}</p>
                <p className="date">
                  Joined: {new Date(customer.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Customer</h2>
            <p>Customer form coming soon...</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
