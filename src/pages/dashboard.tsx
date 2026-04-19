import { DashboardCard } from '@/components/dashboard-card'
import { Users, Network, DollarSign, ClipboardCheck } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to your dashboard overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="TOTAL STUDENTS"
          value="248"
          status="+12%"
          statusVariant="success"
          icon={Users}
        />
        
        <DashboardCard
          title="ACTIVE GROUPS"
          value="12"
          status="Stable"
          statusVariant="neutral"
          icon={Network}
        />
        
        <DashboardCard
          title="MONTHLY REVENUE"
          value="48.5M UZS"
          status="+4.2M"
          statusVariant="success"
          icon={DollarSign}
        />
        
        <DashboardCard
          title="PENDING PAYMENTS"
          value="23"
          status="Attention"
          statusVariant="warning"
          icon={ClipboardCheck}
        />
      </div>
    </div>
  )
}
