import React from 'react'
import { MetricCard } from './MetricCard'
import { BarChart3, TrendingUp, Users, Zap} from 'lucide-react'

const MetricsGrid = () => {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-6 mt-10">
                <MetricCard
                  title="Total Users"
                  value="12,484"
                  change={12.5}
                  changeLabel="vs last month"
                  icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
                  trend="up"
                />
                <MetricCard
                  title="Revenue"
                  value="$48,596"
                  change={8.2}
                  changeLabel="vs last month"
                  icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
                  trend="up"
                />
                <MetricCard
                  title="Data Points"
                  value="2.4M"
                  change={3.1}
                  changeLabel="vs last month"
                  icon={<BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />}
                  trend="down"
                />
                <MetricCard
                  title="API Performance"
                  value="98.6%"
                  change={2.3}
                  changeLabel="vs last month"
                  icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6" />}
                  trend="up"
                />
              </div>
  )
}

export default MetricsGrid