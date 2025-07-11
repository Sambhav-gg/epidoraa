import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ChevronRight, Shield, Sparkles, Users, Droplet, Sun, Wind, Sprout, Microscope, Activity, ArrowDown, Play, Star, CheckCircle } from 'lucide-react';
import { Footer } from '../components/Footer';

const Welcome = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transform: `translate(-50%, -50%)`
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-teal-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: `${mousePosition.x * 0.01}px`,
            bottom: `${mousePosition.y * 0.01}px`,
            transform: `translate(50%, 50%)`
          }}
        ></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-2000 opacity-60"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-3000 opacity-60"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-300 font-medium">Trusted by Agricultural Professionals Worldwide</span>
          </div>

          {/* Logo and Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <Leaf className="w-20 h-20 text-green-400 animate-pulse" />
              <div className="absolute inset-0 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Epidora
            </h1>
          </div>
          
          <div className="max-w-4xl mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Smart Skincare for</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Agricultural Professionals
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Experience personalized skincare recommendations powered by advanced AI,
              tailored specifically for the unique challenges of agricultural work.
            </p>
            
            {/* Original Buttons with Preserved Functionality */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                Get Started
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Already a User?
              </Link>
            </div>

            
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32">
          <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Smart Recommendations
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Get AI-powered skincare advice customized to your work environment,
              skin type, and specific needs.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Protection Focused
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Stay protected with expert advice on handling potential irritants
              and maintaining healthy skin while working.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Expert Support
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Access dermatologist-approved recommendations and get ongoing
              support for your skincare journey.
            </p>
          </div>
        </div>

        {/* Environmental Factors Section */}
        <div className="max-w-6xl mx-auto mt-32">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-white">Understanding Environmental Impact on</span>{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Skin Health</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-16"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">UV Exposure</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Prolonged sun exposure in agricultural work can lead to premature aging and increased skin cancer risk. 
                Our recommendations include specific UV protection strategies for different working conditions.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Weather Conditions</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Wind, humidity, and temperature fluctuations can affect skin barrier function. 
                We provide seasonal skincare adjustments to maintain skin health year-round.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Crop Interaction</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Different crops can cause varying skin reactions. Our system analyzes crop-specific 
                risks and recommends appropriate protective measures and treatments.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Moisture Management</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Working with irrigation systems and high humidity can affect skin hydration. 
                We help maintain optimal skin moisture balance in wet conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="max-w-6xl mx-auto mt-32 mb-24">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-white">Advanced Technology for</span>{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Skin Health</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-16"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Microscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">AI-Powered Analysis</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mt-1 flex-shrink-0">
                    <Activity className="w-3 h-3 text-green-400" />
                  </div>
                  <span>Real-time analysis of environmental conditions and their impact on skin health</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mt-1 flex-shrink-0">
                    <Activity className="w-3 h-3 text-green-400" />
                  </div>
                  <span>Personalized product recommendations based on your specific work conditions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mt-1 flex-shrink-0">
                    <Activity className="w-3 h-3 text-green-400" />
                  </div>
                  <span>Continuous learning system that adapts to seasonal changes</span>
                </li>
              </ul>
            </div>
            
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Preventive Care</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mt-1 flex-shrink-0">
                    <Activity className="w-3 h-3 text-green-400" />
                  </div>
                  <span>Early warning system for potential skin issues based on work patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mt-1 flex-shrink-0">
                    <Activity className="w-3 h-3 text-green-400" />
                  </div>
                  <span>Custom protection strategies for different agricultural activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mt-1 flex-shrink-0">
                    <Activity className="w-3 h-3 text-green-400" />
                  </div>
                  <span>Integration with weather forecasts for proactive skin protection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Welcome;
