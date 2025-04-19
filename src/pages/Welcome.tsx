import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ChevronRight, Shield, Sparkles, Users, Droplet, Sun, Wind, Plane as Plant, Microscope, Activity } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center animate-in">
          <div className="flex items-center gap-3 mb-8 animate-float">
            <Leaf className="w-16 h-16 text-primary animate-pulse-soft" />
            <h1 className="text-5xl font-bold gradient-text">Epidora</h1>
          </div>
          
          <div className="max-w-3xl mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-8 leading-tight">
              Smart Skincare for
              <span className="gradient-text block mt-2">
                Agricultural Professionals
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Experience personalized skincare recommendations powered by advanced AI,
              tailored specifically for the unique challenges of agricultural work.
            </p>
            <div className="flex gap-6 justify-center">
              <Link
                to="/signup"
                className="btn-primary text-lg flex items-center gap-2 group"
              >
                Get Started
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-lg"
              >
                Already a User?
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24">
          <div className="glass-effect rounded-2xl p-8 hover-card">
            <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Smart Recommendations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get AI-powered skincare advice customized to your work environment,
              skin type, and specific needs.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 hover-card">
            <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Protection Focused
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stay protected with expert advice on handling potential irritants
              and maintaining healthy skin while working.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 hover-card">
            <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Expert Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Access dermatologist-approved recommendations and get ongoing
              support for your skincare journey.
            </p>
          </div>
        </div>

        {/* Environmental Factors Section */}
        <div className="max-w-6xl mx-auto mt-32">
          <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
            Understanding Environmental Impact on Skin Health
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect rounded-2xl p-8 hover-card">
              <div className="flex items-center gap-4 mb-6">
                <Sun className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-gray-800">UV Exposure</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Prolonged sun exposure in agricultural work can lead to premature aging and increased skin cancer risk. 
                Our recommendations include specific UV protection strategies for different working conditions.
              </p>
            </div>
            <div className="glass-effect rounded-2xl p-8 hover-card">
              <div className="flex items-center gap-4 mb-6">
                <Wind className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-gray-800">Weather Conditions</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Wind, humidity, and temperature fluctuations can affect skin barrier function. 
                We provide seasonal skincare adjustments to maintain skin health year-round.
              </p>
            </div>
            <div className="glass-effect rounded-2xl p-8 hover-card">
              <div className="flex items-center gap-4 mb-6">
                <Plant className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-gray-800">Crop Interaction</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Different crops can cause varying skin reactions. Our system analyzes crop-specific 
                risks and recommends appropriate protective measures and treatments.
              </p>
            </div>
            <div className="glass-effect rounded-2xl p-8 hover-card">
              <div className="flex items-center gap-4 mb-6">
                <Droplet className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-gray-800">Moisture Management</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Working with irrigation systems and high humidity can affect skin hydration. 
                We help maintain optimal skin moisture balance in wet conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="max-w-6xl mx-auto mt-32 mb-24">
          <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
            Advanced Technology for Skin Health
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-effect rounded-2xl p-8 hover-card">
              <div className="flex items-center gap-4 mb-6">
                <Microscope className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-gray-800">AI-Powered Analysis</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <Activity className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Real-time analysis of environmental conditions and their impact on skin health</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Personalized product recommendations based on your specific work conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Continuous learning system that adapts to seasonal changes</span>
                </li>
              </ul>
            </div>
            <div className="glass-effect rounded-2xl p-8 hover-card">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-gray-800">Preventive Care</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <Activity className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Early warning system for potential skin issues based on work patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Custom protection strategies for different agricultural activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Integration with weather forecasts for proactive skin protection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;