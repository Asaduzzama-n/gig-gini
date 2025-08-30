export function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'scheduled': return 'bg-orange-100 text-orange-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getRankBadgeColor(rank: number) {
  switch (rank) {
    case 1: return 'bg-yellow-100 text-yellow-800';
    case 2: return 'bg-gray-100 text-gray-800';
    case 3: return 'bg-orange-100 text-orange-800';
    default: return 'bg-blue-100 text-blue-800';
  }
}