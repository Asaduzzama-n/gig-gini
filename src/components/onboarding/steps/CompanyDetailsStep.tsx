'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Building, Upload, Users, Calendar, MapPin } from 'lucide-react';

interface CompanyDetailsStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1001-5000 employees',
  '5000+ employees'
];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Transportation',
  'Energy',
  'Government',
  'Non-profit',
  'Other'
];

const currentYear = new Date().getFullYear();
const foundedYears = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

export function CompanyDetailsStep({ data, onUpdate }: CompanyDetailsStepProps) {
  const [formData, setFormData] = useState({
    companyName: data.companyName || '',
    companyLogo: data.companyLogo || '',
    companySize: data.companySize || '',
    industry: data.industry || '',
    companyDescription: data.companyDescription || '',
    website: data.website || '',
    foundedYear: data.foundedYear || '',
    headquarters: data.headquarters || '',
    contactPerson: data.contactPerson || {
      name: '',
      role: '',
      email: '',
      phone: ''
    },
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactPersonChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactPerson: {
        ...prev.contactPerson,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-[#FC5602]" />
            <span>Company Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Logo */}
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20 rounded-lg">
              <AvatarImage src={formData.companyLogo} alt="Company Logo" />
              <AvatarFallback className="bg-[#FC5602] text-white text-xl rounded-lg">
                {formData.companyName?.charAt(0) || 'C'}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm" className="mb-2">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
              <p className="text-xs text-gray-500">
                Recommended: Square logo, at least 200x200px
              </p>
            </div>
          </div>

          {/* Basic Company Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Company Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourcompany.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Select value={formData.foundedYear} onValueChange={(value) => handleInputChange('foundedYear', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {foundedYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="headquarters">Headquarters</Label>
              <Input
                id="headquarters"
                value={formData.headquarters}
                onChange={(e) => handleInputChange('headquarters', e.target.value)}
                placeholder="City, State, Country"
              />
            </div>
          </div>

          {/* Company Description */}
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description *</Label>
            <Textarea
              id="companyDescription"
              value={formData.companyDescription}
              onChange={(e) => handleInputChange('companyDescription', e.target.value)}
              placeholder="Describe your company, mission, values, and what makes it unique..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Person Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-[#FC5602]" />
            <span>Primary Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person Name *</Label>
              <Input
                id="contactName"
                value={formData.contactPerson.name}
                onChange={(e) => handleContactPersonChange('name', e.target.value)}
                placeholder="Full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactRole">Role/Title *</Label>
              <Input
                id="contactRole"
                value={formData.contactPerson.role}
                onChange={(e) => handleContactPersonChange('role', e.target.value)}
                placeholder="e.g., HR Manager, Recruiter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactPerson.email}
                onChange={(e) => handleContactPersonChange('email', e.target.value)}
                placeholder="contact@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={formData.contactPerson.phone}
                onChange={(e) => handleContactPersonChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Building className="h-5 w-5 text-purple-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-900">Company Profile Tips:</h4>
            <ul className="text-sm text-purple-700 mt-2 space-y-1">
              <li>• A compelling company description attracts better candidates</li>
              <li>• Include your company's mission, values, and culture</li>
              <li>• Mention any awards, certifications, or notable achievements</li>
              <li>• Be authentic about your company size and growth stage</li>
              <li>• Ensure contact information is accurate for candidate communication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}