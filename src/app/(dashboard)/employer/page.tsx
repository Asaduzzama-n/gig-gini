"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {  
  Users, 

  Award, 
  ArrowRight,
  Briefcase,
  Plus,
} from "lucide-react";

import { dashboardTopPerformers, mockCompetitions1, stats } from "@/utils/mockdata";
import DashboardCompetetionCard from "@/components/shared/dashboardCompetetionCard";
import DashboardTopPerformerCard from "@/components/shared/dashboardTopPerformerCard";
import { redirect } from "next/navigation";






function EmployerDashboardContent() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, TechCorp!</h1>
            <p className="text-orange-100">Manage your competitions and discover top talent. You have 3 active competitions running.</p>
          </div>
          
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Competitions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                    My Competitions
                  </CardTitle>
                  <CardDescription>Manage your active and upcoming competitions</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button onClick={()=> redirect('/employer/competitions/create')} size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCompetitions1.map((competition) => (
                <DashboardCompetetionCard key={competition.id} competition={competition} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                Top Performers
              </CardTitle>
              <CardDescription>Outstanding candidates from your competitions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardTopPerformers.map((performer, index) => (
                <DashboardTopPerformerCard key={performer.name} performer={performer} />
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                <Users className="h-4 w-4 mr-2" />
                View All Candidates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>




    </div>
  );
}

export default function EmployerDashboard() {
  return <EmployerDashboardContent />;
}