import { useEffect, useState } from 'react'
import { supabase, type Shipment } from '../lib/supabase'
import { Truck, MapPin, Calendar, Package } from 'lucide-react'
import '../styles/shipments.css'

export default function Shipments() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchShipments()
  }, [])

  const fetchShipments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setShipments(data || [])
    } catch (error) {
      console.error('Error fetching shipments:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateShipmentStatus = async (shipmentId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', shipmentId)

      if (error) throw error
      setShipments(shipments.map(s => 
        s.id === shipmentId ? { ...s, status: newStatus as any } : s
      ))
    } catch (error) {
      console.error('Error updating shipment:', error)
    }
  }

  const filteredShipments = shipments.filter(s => 
    filterStatus === 'all' || s.status === filterStatus
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '📦'
      case 'in_transit': return '🚚'
      case 'delivered': return '✅'
      default: return '📦'
    }
  }

  return (
    <div className="shipments-page">
      <div className="page-header">
        <h1>Shipments Tracking</h1>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading shipments...</div>
      ) : filteredShipments.length === 0 ? (
        <div className="empty-state"><p>No shipments found</p></div>
      ) : (
        <div className="shipments-list">
          {filteredShipments.map(shipment => (
            <div key={shipment.id} className={`shipment-card status-${shipment.status}`}>
              <div className="shipment-header">
                <div className="shipment-info">
                  <span className="status-icon">{getStatusIcon(shipment.status)}</span>
                  <div>
                    <h3>Order #{shipment.order_id}</h3>
                    <p className="tracking-number">Tracking: {shipment.tracking_number}</p>
                  </div>
                </div>
                <select 
                  className="status-select"
                  value={shipment.status}
                  onChange={(e) => updateShipmentStatus(shipment.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div className="shipment-details">
                <div className="detail-item">
                  <Truck size={18} />
                  <span>{shipment.delivery_type === 'home' ? 'Home Delivery' : 'Pickup'}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={18} />
                  <span>Cost: {shipment.cost} DZD</span>
                </div>
                <div className="detail-item">
                  <Calendar size={18} />
                  <span>{new Date(shipment.created_at).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <Package size={18} />
                  <span>{shipment.notes || 'No notes'}</span>
                </div>
              </div>

              {shipment.label_url && (
                <a href={shipment.label_url} target="_blank" rel="noopener noreferrer" className="label-link">
                  View Shipping Label
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
