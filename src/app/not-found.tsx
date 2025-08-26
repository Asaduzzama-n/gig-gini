"use client";

import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Illustration */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="text-9xl font-bold text-orange-200 select-none">
                404
              </div>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <Search className="w-16 h-16 text-orange-400" />
              </motion.div>
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              The page you're looking for seems to have wandered off into the digital wilderness.
            </p>
            <p className="text-gray-500">
              Don't worry, even the best explorers sometimes take a wrong turn!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button 
              onClick={handleGoBack}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>
            
            <Link href="/">
              <Button className="bg-orange-600 hover:bg-orange-700 flex items-center space-x-2 w-full sm:w-auto">
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <Link 
                  href="/dashboard" 
                  className="text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/competitions" 
                  className="text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                >
                  Competitions
                </Link>
                <Link 
                  href="/profile" 
                  className="text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                >
                  Profile
                </Link>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  If you believe this is an error, please contact our support team.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Fun Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8"
          >
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-2 h-2 bg-orange-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}