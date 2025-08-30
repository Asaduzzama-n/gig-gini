'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Link, 
  Github, 
  Linkedin, 
  Globe, 
  Twitter, 
  Instagram,
  ExternalLink,
  Check,
  AlertCircle
} from 'lucide-react';

interface SocialLinksStepProps {
  data: any;
  onUpdate: (data: any) => void;
  userRole?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<any>;
  placeholder: string;
  validation?: (url: string) => boolean;
}

const socialPlatforms: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: '',
    icon: Linkedin,
    placeholder: 'https://linkedin.com/in/yourprofile',
    validation: (url) => url.includes('linkedin.com')
  },
  {
    platform: 'GitHub',
    url: '',
    icon: Github,
    placeholder: 'https://github.com/yourusername',
    validation: (url) => url.includes('github.com')
  },
  {
    platform: 'Portfolio',
    url: '',
    icon: Globe,
    placeholder: 'https://yourportfolio.com',
    validation: (url) => url.startsWith('http')
  },
  {
    platform: 'Twitter',
    url: '',
    icon: Twitter,
    placeholder: 'https://twitter.com/yourusername',
    validation: (url) => url.includes('twitter.com') || url.includes('x.com')
  }
];

const employerPlatforms: SocialLink[] = [
  {
    platform: 'Company Website',
    url: '',
    icon: Globe,
    placeholder: 'https://yourcompany.com',
    validation: (url) => url.startsWith('http')
  },
  {
    platform: 'LinkedIn Company',
    url: '',
    icon: Linkedin,
    placeholder: 'https://linkedin.com/company/yourcompany',
    validation: (url) => url.includes('linkedin.com/company')
  },
  {
    platform: 'Twitter',
    url: '',
    icon: Twitter,
    placeholder: 'https://twitter.com/yourcompany',
    validation: (url) => url.includes('twitter.com') || url.includes('x.com')
  }
];

export function SocialLinksStep({ data, onUpdate, userRole }: SocialLinksStepProps) {
  const platforms = userRole === 'employer' ? employerPlatforms : socialPlatforms;
  
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>(
    data.socialLinks || platforms.reduce((acc, platform) => ({
      ...acc,
      [platform.platform]: ''
    }), {})
  );

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    onUpdate({ socialLinks });
  }, [socialLinks, onUpdate]);

  const updateSocialLink = (platform: string, url: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: url }));
    
    // Clear validation error when user starts typing
    if (validationErrors[platform]) {
      setValidationErrors(prev => ({ ...prev, [platform]: '' }));
    }
  };

  const validateUrl = (platform: string, url: string) => {
    if (!url.trim()) return true; // Empty URLs are allowed
    
    const platformConfig = platforms.find(p => p.platform === platform);
    if (platformConfig?.validation && !platformConfig.validation(url)) {
      setValidationErrors(prev => ({
        ...prev,
        [platform]: `Please enter a valid ${platform} URL`
      }));
      return false;
    }
    
    setValidationErrors(prev => ({ ...prev, [platform]: '' }));
    return true;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getValidationIcon = (platform: string, url: string) => {
    if (!url.trim()) return null;
    
    const hasError = validationErrors[platform];
    const platformConfig = platforms.find(p => p.platform === platform);
    const isValid = platformConfig?.validation ? platformConfig.validation(url) : isValidUrl(url);
    
    if (hasError || !isValid) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    
    return <Check className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="h-5 w-5 text-[#FC5602]" />
            <span>
              {userRole === 'employer' ? 'Company Links' : 'Social Links & Portfolio'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const url = socialLinks[platform.platform] || '';
              const hasError = validationErrors[platform.platform];
              
              return (
                <div key={platform.platform} className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{platform.platform}</span>
                    {platform.platform === 'LinkedIn' && (
                      <Badge variant="secondary" className="text-xs">Recommended</Badge>
                    )}
                  </Label>
                  
                  <div className="relative">
                    <Input
                      value={url}
                      onChange={(e) => updateSocialLink(platform.platform, e.target.value)}
                      onBlur={() => validateUrl(platform.platform, url)}
                      placeholder={platform.placeholder}
                      className={hasError ? 'border-red-300 focus:border-red-500' : ''}
                    />
                    
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getValidationIcon(platform.platform, url)}
                    </div>
                  </div>
                  
                  {hasError && (
                    <p className="text-sm text-red-600">{hasError}</p>
                  )}
                  
                  {url && !hasError && isValidUrl(url) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#FC5602] hover:text-[#FC5602]/80 p-0 h-auto"
                      onClick={() => window.open(url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Preview link
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional Links Section */}
          <div className="border-t pt-6">
            <Label className="text-base font-medium mb-4 block">
              Additional Links (Optional)
            </Label>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Other Professional Links</Label>
                <Input
                  value={socialLinks['other1'] || ''}
                  onChange={(e) => updateSocialLink('other1', e.target.value)}
                  placeholder="https://dribbble.com/yourprofile, https://behance.net/yourprofile, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Blog or Personal Website</Label>
                <Input
                  value={socialLinks['blog'] || ''}
                  onChange={(e) => updateSocialLink('blog', e.target.value)}
                  placeholder="https://yourblog.com"
                />
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Link className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">
                  {userRole === 'employer' ? 'Company Presence Tips:' : 'Profile Tips:'}
                </h4>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  {userRole === 'employer' ? (
                    <>
                      <li>• Ensure your company website is up-to-date and professional</li>
                      <li>• LinkedIn company page helps build credibility</li>
                      <li>• Social media presence shows company culture</li>
                      <li>• Include career pages or job posting links</li>
                    </>
                  ) : (
                    <>
                      <li>• LinkedIn is highly recommended for professional networking</li>
                      <li>• GitHub showcases your coding projects and contributions</li>
                      <li>• Portfolio website demonstrates your work and skills</li>
                      <li>• Keep all profiles updated and professional</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Profile Completion Summary</h4>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => {
                const url = socialLinks[platform.platform];
                const hasUrl = url && url.trim();
                const isValid = hasUrl && (!platform.validation || platform.validation(url));
                
                return (
                  <Badge
                    key={platform.platform}
                    variant={isValid ? "default" : hasUrl ? "destructive" : "secondary"}
                    className={isValid ? "bg-green-100 text-green-800 border-green-200" : ""}
                  >
                    {platform.platform}: {isValid ? 'Added' : hasUrl ? 'Invalid' : 'Not added'}
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}