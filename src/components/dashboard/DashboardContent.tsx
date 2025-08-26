// "use client";

// import { ReactNode } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { 
//   BarChart3, Users, Trophy, DollarSign, Calendar, 
//   MessageSquare, Settings, FileText, Bell, Award,
//   Target, Briefcase, Building, Activity, TrendingUp
// } from 'lucide-react';

// interface DashboardContentProps {
//   activeTab: string;
//   userRole: 'admin' | 'employer' | 'employee';
// }

// // Admin Dashboard Content Components
// const AdminOverview = () => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//       <Badge variant="secondary" className="bg-red-100 text-red-700">Admin Panel</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">2,847</div>
//           <p className="text-xs text-muted-foreground">+12% from last month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
//           <Trophy className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">156</div>
//           <p className="text-xs text-muted-foreground">+8% from last month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Revenue</CardTitle>
//           <DollarSign className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">$45,231</div>
//           <p className="text-xs text-muted-foreground">+20% from last month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">System Health</CardTitle>
//           <Activity className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">99.9%</div>
//           <p className="text-xs text-muted-foreground">Uptime this month</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Activity</CardTitle>
//         <CardDescription>Latest system events and user activities</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex items-center space-x-4">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <div className="flex-1">
//               <p className="text-sm font-medium">New user registration spike</p>
//               <p className="text-xs text-muted-foreground">2 minutes ago</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//             <div className="flex-1">
//               <p className="text-sm font-medium">Competition "Frontend Challenge" launched</p>
//               <p className="text-xs text-muted-foreground">15 minutes ago</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//             <div className="flex-1">
//               <p className="text-sm font-medium">System maintenance completed</p>
//               <p className="text-xs text-muted-foreground">1 hour ago</p>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Employer Dashboard Content Components
// const EmployerOverview = () => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
//       <Badge variant="secondary" className="bg-blue-100 text-blue-700">Employer Hub</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
//           <Trophy className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">8</div>
//           <p className="text-xs text-muted-foreground">2 ending this week</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">247</div>
//           <p className="text-xs text-muted-foreground">+15 new this week</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
//           <Calendar className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">12</div>
//           <p className="text-xs text-muted-foreground">Next: Tomorrow 2PM</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Hiring Success Rate</CardTitle>
//           <TrendingUp className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">78%</div>
//           <p className="text-xs text-muted-foreground">Above industry average</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Applications</CardTitle>
//           <CardDescription>Latest candidate applications</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">John Doe</p>
//                 <p className="text-sm text-muted-foreground">Frontend Developer Challenge</p>
//               </div>
//               <Badge>New</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">Sarah Smith</p>
//                 <p className="text-sm text-muted-foreground">UI/UX Designer Role</p>
//               </div>
//               <Badge variant="secondary">Reviewed</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">Mike Johnson</p>
//                 <p className="text-sm text-muted-foreground">Backend Engineer Position</p>
//               </div>
//               <Badge variant="outline">Interview</Badge>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>Quick Actions</CardTitle>
//           <CardDescription>Common tasks and shortcuts</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <Button className="w-full justify-start" variant="outline">
//             <Trophy className="mr-2 h-4 w-4" />
//             Create New Competition
//           </Button>
//           <Button className="w-full justify-start" variant="outline">
//             <Calendar className="mr-2 h-4 w-4" />
//             Schedule Interview
//           </Button>
//           <Button className="w-full justify-start" variant="outline">
//             <MessageSquare className="mr-2 h-4 w-4" />
//             Message Candidates
//           </Button>
//           <Button className="w-full justify-start" variant="outline">
//             <BarChart3 className="mr-2 h-4 w-4" />
//             View Analytics
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   </div>
// );

// // Employee Dashboard Content Components
// const EmployeeOverview = () => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
//       <Badge variant="secondary" className="bg-orange-100 text-orange-700">Employee</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
//           <Trophy className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">5</div>
//           <p className="text-xs text-muted-foreground">2 submissions pending</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Applications</CardTitle>
//           <Briefcase className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">12</div>
//           <p className="text-xs text-muted-foreground">3 under review</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Achievements</CardTitle>
//           <Award className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">8</div>
//           <p className="text-xs text-muted-foreground">2 new this month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
//           <Target className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">#23</div>
//           <p className="text-xs text-muted-foreground">Top 5% this month</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Upcoming Deadlines</CardTitle>
//           <CardDescription>Don't miss these important dates</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">React Developer Challenge</p>
//                 <p className="text-sm text-muted-foreground">Final submission</p>
//               </div>
//               <Badge variant="destructive">2 days</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">UI Design Contest</p>
//                 <p className="text-sm text-muted-foreground">Portfolio review</p>
//               </div>
//               <Badge variant="secondary">5 days</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">Backend API Challenge</p>
//                 <p className="text-sm text-muted-foreground">Code submission</p>
//               </div>
//               <Badge variant="outline">1 week</Badge>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Achievements</CardTitle>
//           <CardDescription>Your latest accomplishments</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <Award className="w-4 h-4 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="font-medium">Top Performer</p>
//                 <p className="text-sm text-muted-foreground">Ranked #1 in Frontend Challenge</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                 <Trophy className="w-4 h-4 text-blue-600" />
//               </div>
//               <div>
//                 <p className="font-medium">Competition Winner</p>
//                 <p className="text-sm text-muted-foreground">Won React Development Contest</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                 <Target className="w-4 h-4 text-green-600" />
//               </div>
//               <div>
//                 <p className="font-medium">Streak Master</p>
//                 <p className="text-sm text-muted-foreground">30-day submission streak</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   </div>
// );

// // Users Management Content
// const UsersContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Users className="w-5 h-5 mr-2" />
//             Total Users
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">2,847</div>
//           <p className="text-sm text-muted-foreground">+12% from last month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Briefcase className="w-5 h-5 mr-2" />
//             Employees
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">2,340</div>
//           <p className="text-sm text-muted-foreground">Active users</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Building className="w-5 h-5 mr-2" />
//             Employers
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">507</div>
//           <p className="text-sm text-muted-foreground">Companies registered</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent User Activity</CardTitle>
//         <CardDescription>Latest user registrations and activities</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                 <User className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="font-medium">John Doe</p>
//                 <p className="text-sm text-muted-foreground">Registered as Employee</p>
//               </div>
//             </div>
//             <Badge>New</Badge>
//           </div>
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <Building className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="font-medium">TechCorp Inc.</p>
//                 <p className="text-sm text-muted-foreground">Registered as Employer</p>
//               </div>
//             </div>
//             <Badge variant="secondary">Active</Badge>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Competitions Management Content
// const CompetitionsContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Competitions</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Trophy className="w-5 h-5 mr-2" />
//             Active
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">42</div>
//           <p className="text-sm text-muted-foreground">Currently running</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Calendar className="w-5 h-5 mr-2" />
//             Scheduled
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">18</div>
//           <p className="text-sm text-muted-foreground">Starting soon</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Award className="w-5 h-5 mr-2" />
//             Completed
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">156</div>
//           <p className="text-sm text-muted-foreground">This month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Users className="w-5 h-5 mr-2" />
//             Participants
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">1,247</div>
//           <p className="text-sm text-muted-foreground">Total active</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Competitions</CardTitle>
//         <CardDescription>Latest competition activities and results</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <p className="font-medium">Frontend Developer Challenge</p>
//               <p className="text-sm text-muted-foreground">React & TypeScript • 234 participants</p>
//             </div>
//             <Badge className="bg-green-100 text-green-700">Active</Badge>
//           </div>
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <p className="font-medium">UI/UX Design Contest</p>
//               <p className="text-sm text-muted-foreground">Figma Design • 89 participants</p>
//             </div>
//             <Badge className="bg-blue-100 text-blue-700">Completed</Badge>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Analytics Content
// const AnalyticsContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <BarChart3 className="w-5 h-5 mr-2" />
//             Page Views
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">45,231</div>
//           <p className="text-sm text-muted-foreground">+20% from last month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Users className="w-5 h-5 mr-2" />
//             Active Users
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">2,847</div>
//           <p className="text-sm text-muted-foreground">+12% from last month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <TrendingUp className="w-5 h-5 mr-2" />
//             Conversion Rate
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">3.2%</div>
//           <p className="text-sm text-muted-foreground">+0.5% from last month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <DollarSign className="w-5 h-5 mr-2" />
//             Revenue
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">$12,847</div>
//           <p className="text-sm text-muted-foreground">+8% from last month</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Traffic Overview</CardTitle>
//           <CardDescription>Website traffic analytics</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
//             <p className="text-gray-500">Traffic chart visualization</p>
//           </div>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>User Engagement</CardTitle>
//           <CardDescription>User interaction metrics</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
//             <p className="text-gray-500">Engagement chart visualization</p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   </div>
// );

// // Candidates Content (for Employers)
// const CandidatesContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Users className="w-5 h-5 mr-2" />
//             Total Candidates
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">247</div>
//           <p className="text-sm text-muted-foreground">All time</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <FileText className="w-5 h-5 mr-2" />
//             New Applications
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">15</div>
//           <p className="text-sm text-muted-foreground">This week</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Calendar className="w-5 h-5 mr-2" />
//             Interviews Scheduled
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">8</div>
//           <p className="text-sm text-muted-foreground">Next 7 days</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Award className="w-5 h-5 mr-2" />
//             Hired
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">23</div>
//           <p className="text-sm text-muted-foreground">This month</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Candidates</CardTitle>
//         <CardDescription>Latest candidate applications and status</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                 <User className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="font-medium">Sarah Johnson</p>
//                 <p className="text-sm text-muted-foreground">Frontend Developer • 5 years exp</p>
//               </div>
//             </div>
//             <Badge className="bg-green-100 text-green-700">Interview Scheduled</Badge>
//           </div>
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//                 <User className="w-5 h-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="font-medium">Mike Chen</p>
//                 <p className="text-sm text-muted-foreground">Full Stack Developer • 3 years exp</p>
//               </div>
//             </div>
//             <Badge className="bg-blue-100 text-blue-700">Under Review</Badge>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Interviews Content
// const InterviewsContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Calendar className="w-5 h-5 mr-2" />
//             Scheduled
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">12</div>
//           <p className="text-sm text-muted-foreground">Next 7 days</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Activity className="w-5 h-5 mr-2" />
//             Completed
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">45</div>
//           <p className="text-sm text-muted-foreground">This month</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Award className="w-5 h-5 mr-2" />
//             Success Rate
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">78%</div>
//           <p className="text-sm text-muted-foreground">Hire rate</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Upcoming Interviews</CardTitle>
//         <CardDescription>Your scheduled interviews for this week</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <p className="font-medium">Sarah Johnson - Frontend Developer</p>
//               <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM • Video Call</p>
//             </div>
//             <Button size="sm">Join Call</Button>
//           </div>
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <p className="font-medium">Mike Chen - Full Stack Developer</p>
//               <p className="text-sm text-muted-foreground">Friday, 10:00 AM • In Person</p>
//             </div>
//             <Button size="sm" variant="outline">View Details</Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Messages Content
// const MessagesContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <MessageSquare className="w-5 h-5 mr-2" />
//             Unread
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">5</div>
//           <p className="text-sm text-muted-foreground">New messages</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Users className="w-5 h-5 mr-2" />
//             Conversations
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">23</div>
//           <p className="text-sm text-muted-foreground">Active chats</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Bell className="w-5 h-5 mr-2" />
//             Notifications
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">12</div>
//           <p className="text-sm text-muted-foreground">Pending</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Messages</CardTitle>
//         <CardDescription>Your latest conversations</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex items-center space-x-3 p-4 border rounded-lg">
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <User className="w-5 h-5 text-blue-600" />
//             </div>
//             <div className="flex-1">
//               <p className="font-medium">Sarah Johnson</p>
//               <p className="text-sm text-muted-foreground">Thank you for the interview opportunity...</p>
//             </div>
//             <div className="text-right">
//               <Badge>New</Badge>
//               <p className="text-xs text-muted-foreground mt-1">2 min ago</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3 p-4 border rounded-lg">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//               <Building className="w-5 h-5 text-green-600" />
//             </div>
//             <div className="flex-1">
//               <p className="font-medium">TechCorp HR</p>
//               <p className="text-sm text-muted-foreground">We'd like to schedule a follow-up...</p>
//             </div>
//             <div className="text-right">
//               <p className="text-xs text-muted-foreground">1 hour ago</p>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Settings Content
// const SettingsContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <User className="w-5 h-5 mr-2" />
//             Profile Settings
//           </CardTitle>
//           <CardDescription>Manage your personal information</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Button className="w-full justify-start" variant="outline">
//             <User className="mr-2 h-4 w-4" />
//             Edit Profile
//           </Button>
//           <Button className="w-full justify-start" variant="outline">
//             <Settings className="mr-2 h-4 w-4" />
//             Change Password
//           </Button>
//           <Button className="w-full justify-start" variant="outline">
//             <Bell className="mr-2 h-4 w-4" />
//             Notification Preferences
//           </Button>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Settings className="w-5 h-5 mr-2" />
//             Account Settings
//           </CardTitle>
//           <CardDescription>Manage your account preferences</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Button className="w-full justify-start" variant="outline">
//             <DollarSign className="mr-2 h-4 w-4" />
//             Billing & Subscription
//           </Button>
//           <Button className="w-full justify-start" variant="outline">
//             <FileText className="mr-2 h-4 w-4" />
//             Privacy Settings
//           </Button>
//           <Button className="w-full justify-start" variant="outline">
//             <Activity className="mr-2 h-4 w-4" />
//             Activity Log
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   </div>
// );

// // Applications Content (for Employees)
// const ApplicationsContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Briefcase className="w-5 h-5 mr-2" />
//             Total Applications
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">12</div>
//           <p className="text-sm text-muted-foreground">All time</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Activity className="w-5 h-5 mr-2" />
//             Under Review
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">3</div>
//           <p className="text-sm text-muted-foreground">Pending</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Calendar className="w-5 h-5 mr-2" />
//             Interviews
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">2</div>
//           <p className="text-sm text-muted-foreground">Scheduled</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Award className="w-5 h-5 mr-2" />
//             Success Rate
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">67%</div>
//           <p className="text-sm text-muted-foreground">Interview rate</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Applications</CardTitle>
//         <CardDescription>Your latest job applications and their status</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <p className="font-medium">Frontend Developer - TechCorp</p>
//               <p className="text-sm text-muted-foreground">Applied 2 days ago • React, TypeScript</p>
//             </div>
//             <Badge className="bg-blue-100 text-blue-700">Under Review</Badge>
//           </div>
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <p className="font-medium">Full Stack Engineer - StartupXYZ</p>
//               <p className="text-sm text-muted-foreground">Applied 1 week ago • Node.js, React</p>
//             </div>
//             <Badge className="bg-green-100 text-green-700">Interview Scheduled</Badge>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Achievements Content (for Employees)
// const AchievementsContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Award className="w-5 h-5 mr-2" />
//             Total Badges
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">8</div>
//           <p className="text-sm text-muted-foreground">Earned</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Trophy className="w-5 h-5 mr-2" />
//             Competitions Won
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">3</div>
//           <p className="text-sm text-muted-foreground">First place</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Target className="w-5 h-5 mr-2" />
//             Streak
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">30</div>
//           <p className="text-sm text-muted-foreground">Days active</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <TrendingUp className="w-5 h-5 mr-2" />
//             Skill Level
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">Expert</div>
//           <p className="text-sm text-muted-foreground">Frontend Dev</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Achievements</CardTitle>
//         <CardDescription>Your latest badges and accomplishments</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="flex items-center space-x-3 p-4 border rounded-lg">
//             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
//               <Trophy className="w-6 h-6 text-yellow-600" />
//             </div>
//             <div>
//               <p className="font-medium">Competition Winner</p>
//               <p className="text-sm text-muted-foreground">Won React Challenge 2024</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3 p-4 border rounded-lg">
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//               <Award className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="font-medium">Top Performer</p>
//               <p className="text-sm text-muted-foreground">Ranked #1 in Frontend Skills</p>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Leaderboard Content (for Employees)
// const LeaderboardContent = ({ userRole }: { userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Target className="w-5 h-5 mr-2" />
//             Your Rank
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">#23</div>
//           <p className="text-sm text-muted-foreground">Global ranking</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <TrendingUp className="w-5 h-5 mr-2" />
//             Points
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">2,847</div>
//           <p className="text-sm text-muted-foreground">Total earned</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Activity className="w-5 h-5 mr-2" />
//             This Month
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">+156</div>
//           <p className="text-sm text-muted-foreground">Points gained</p>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Award className="w-5 h-5 mr-2" />
//             Percentile
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">Top 5%</div>
//           <p className="text-sm text-muted-foreground">Among all users</p>
//         </CardContent>
//       </Card>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle>Top Performers</CardTitle>
//         <CardDescription>Current leaderboard rankings</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <span className="text-sm font-bold text-yellow-600">1</span>
//               </div>
//               <div>
//                 <p className="font-medium">Alex Rodriguez</p>
//                 <p className="text-sm text-muted-foreground">Full Stack Developer</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="font-bold">4,523 pts</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
//                 <span className="text-sm font-bold text-gray-600">2</span>
//               </div>
//               <div>
//                 <p className="font-medium">Sarah Chen</p>
//                 <p className="text-sm text-muted-foreground">Frontend Specialist</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="font-bold">4,201 pts</p>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// // Generic content for other tabs
// const GenericTabContent = ({ tabId, userRole }: { tabId: string; userRole: string }) => (
//   <div className="space-y-6">
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold text-gray-900 capitalize">
//         {tabId.replace(/([A-Z])/g, ' $1').trim()}
//       </h1>
//       <Badge variant="outline" className="capitalize">{userRole}</Badge>
//     </div>
    
//     <Card>
//       <CardHeader>
//         <CardTitle className="capitalize">{tabId} Management</CardTitle>
//         <CardDescription>
//           Manage your {tabId.toLowerCase()} settings and preferences
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center justify-center h-64 text-muted-foreground">
//           <div className="text-center">
//             <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//               <Settings className="w-8 h-8" />
//             </div>
//             <p className="text-lg font-medium">Coming Soon</p>
//             <p className="text-sm">This section is under development</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

// export function DashboardContent({ activeTab, userRole }: DashboardContentProps) {
//   // Show content based on active tab and user role
//   switch (activeTab) {
//     case 'overview':
//       switch (userRole) {
//         case 'admin':
//           return <AdminOverview />;
//         case 'employer':
//           return <EmployerOverview />;
//         case 'employee':
//           return <EmployeeOverview />;
//         default:
//           return <GenericTabContent tabId={activeTab} userRole={userRole} />;
//       }
    
//     case 'users':
//       return <UsersContent userRole={userRole} />;
    
//     case 'competitions':
//       return <CompetitionsContent userRole={userRole} />;
    
//     case 'analytics':
//       return <AnalyticsContent userRole={userRole} />;
    
//     case 'candidates':
//       return <CandidatesContent userRole={userRole} />;
    
//     case 'interviews':
//       return <InterviewsContent userRole={userRole} />;
    
//     case 'messages':
//       return <MessagesContent userRole={userRole} />;
    
//     case 'settings':
//       return <SettingsContent userRole={userRole} />;
    
//     case 'applications':
//       return <ApplicationsContent userRole={userRole} />;
    
//     case 'achievements':
//       return <AchievementsContent userRole={userRole} />;
    
//     case 'leaderboard':
//       return <LeaderboardContent userRole={userRole} />;
    
//     // For other tabs, show generic content
//     default:
//       return <GenericTabContent tabId={activeTab} userRole={userRole} />;
//   }
// }