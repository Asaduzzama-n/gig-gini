import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Trophy } from 'lucide-react'
import { getRankBadgeColor } from '@/utils/utility'

export default function DashboardTopPerformerCard({performer}: {performer: any}) {
  return (
                    <div key={performer.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-600 truncate">{performer.competition}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getRankBadgeColor(performer.rank)} variant="secondary">
                        #{performer.rank}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900">{performer.score}%</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {performer.skills.slice(0, 2).map((skill: string, skillIndex: number) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {performer.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{performer.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button size="sm" className="border border-orange-500">
                    Contact
                  </Button>
                </div>
  )
}
