import React from 'react';
import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
            <div className="text-gray-600 space-y-4">
              <p>
                Epidora is a smart skincare assistant designed to make skincare simpler and more personalized.
              </p>
              <p>
                Built by a team of passionate students, our mission is to help users understand their skin better 
                and find the right solutions with ease. Whether you're dealing with everyday concerns or looking 
                for thoughtful product recommendations, Epidora is here to support your skincare journey.
              </p>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-4">
              Have feedback or questions? We'd love to hear from you!
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-5 w-5" />
              <a 
                href="mailto:epidora.support@gmail.com"
                className="hover:text-green-600 transition-colors"
              >
                contact.epidora@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Epidora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}