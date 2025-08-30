import { Competition } from '@/interfaces/types'
import { Calendar, Eye, Users } from 'lucide-react'
import React from 'react'
import { ProgressBar } from '../ui/progress-bar'
import { Button } from '../ui/button'
import { getStatusColor } from '@/utils/utility'
import { Badge } from '../ui/badge'

export default function DashboardCompetetionCard({competition}: {competition: Competition}) {
  return (
                    <div key={competition.id} className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{competition.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-orange-500" />
                          {competition.participants} participants
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-red-500" />
                          Due {competition.deadline}
                        </span>
                        <span className="flex items-center gap-1">
                          {/* <DollarSign className="h-4 w-4 text-orange-500" /> */}
                          {competition.prize}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(competition.status)}>
                      {competition.status}
                    </Badge>
                  </div>
                  
                  {competition.status === 'active' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Engagement Rate</span>
                        <span>{competition.engagement}%</span>
                      </div>
                      <ProgressBar value={competition.engagement} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">{competition.category}</Badge>
                      {competition.applications > 0 && (
                        <span className="text-sm font-medium">{competition.applications} applications</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {competition.status === 'active' && (
                        <Button size="sm" variant="default">
                          Manage
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
  )
}
