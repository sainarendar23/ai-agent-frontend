import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Bot, Mail, Star, TrendingUp, ArrowRight, Check, Play, Github, Briefcase, FileText, MessageSquare, Code, BarChart3 } from "lucide-react";
import Navbar from "../components/Navbar";
import WelcomeModal from "../components/WelcomeModal";
import AuthModals from "../components/AuthModals";
import PaymentModal from "../components/PaymentModal";

export default function Landing() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Show welcome modal for new users
  useState(() => {
    const hasVisited = localStorage.getItem('jobflow_visited');
    if (!hasVisited) {
      setTimeout(() => setShowWelcomeModal(true), 1000);
    }
  });

  const handleGetStarted = () => {
    setShowSignupModal(true);
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleUpgrade = () => {
    setShowPaymentModal(true);
  };

  const handleAgentSelect = (agentType: string) => {
    // Store selected agent type in localStorage for later use
    localStorage.setItem('selectedAgent', agentType);
    setShowSignupModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onLogin={handleLogin} onSignup={handleGetStarted} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your AI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Agent
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              JobFlow AI offers specialized agents for different automation needs. Select the perfect agent for your workflow 
              and let AI handle the repetitive tasks while you focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                Choose Your Agent
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your AI Agent</h2>
            <p className="text-xl text-gray-600">Specialized agents for different automation needs - Select the one that fits your workflow</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Gmail Reply Agent */}
            <Card className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Gmail Reply Agent</h3>
                  <p className="text-gray-600 mb-4">Automate email responses for job applications</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Smart email analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Automated professional replies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Resume attachment handling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Priority email detection</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleAgentSelect('gmail')} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Choose Gmail Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* GitHub README Agent */}
            <Card className="relative overflow-hidden border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Github className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">GitHub README Agent</h3>
                  <p className="text-gray-600 mb-4">Generate and maintain project documentation</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Auto-generate README files</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Code analysis & documentation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Repository monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Automated updates</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleAgentSelect('github')} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Choose GitHub Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Business Agent */}
            <Card className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Agent</h3>
                  <p className="text-gray-600 mb-4">Automate business communications & workflows</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">Client communication</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">Meeting scheduling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">Report generation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">Task automation</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleAgentSelect('business')} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Choose Business Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Can't decide? You can always change your agent later or use multiple agents.</p>
            <Button variant="outline" onClick={handleGetStarted} className="border-gray-300 hover:bg-gray-50">
              Compare All Features
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">One pricing for all agents - Use any combination of Gmail, GitHub, or Business agents</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-slate-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Free</h3>
                  <p className="text-4xl font-bold text-gray-900 mb-1">₹0</p>
                  <p className="text-gray-600 mb-6">Per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    1 agent of your choice
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Up to 10 tasks/month
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Basic automation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Email support
                  </li>
                </ul>
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Pro</h3>
                  <p className="text-4xl font-bold text-gray-900 mb-1">₹299</p>
                  <p className="text-gray-600 mb-6">Per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Up to 3 agents
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Up to 100 tasks/month
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Advanced AI automation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Analytics dashboard
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleUpgrade}>
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-slate-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Enterprise</h3>
                  <p className="text-4xl font-bold text-gray-900 mb-1">₹999</p>
                  <p className="text-gray-600 mb-6">Per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Unlimited agents
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Unlimited tasks
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Custom AI training
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-emerald-500 mr-3" />
                    24/7 support
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About JobFlow AI</h2>
            <p className="text-xl text-gray-600">Empowering job seekers with intelligent automation</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                JobFlow AI was created to help job seekers focus on what matters most - finding their dream job. 
                We automate the tedious task of managing email responses, so you can spend more time preparing 
                for interviews and networking.
              </p>
              <p className="text-gray-600 mb-6">
                Our intelligent AI understands the context of your job application emails and responds appropriately, 
                ensuring you never miss an opportunity while maintaining professional communication.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Built with cutting-edge AI technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Secure and privacy-focused</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Easy to set up and use</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Join Thousands of Job Seekers</h4>
                <p className="text-gray-600 mb-6">
                  Who have automated their email responses and increased their interview success rate.
                </p>
                <Button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={() => {
          setShowWelcomeModal(false);
          localStorage.setItem('jobflow_visited', 'true');
        }}
        onGetStarted={() => {
          setShowWelcomeModal(false);
          setShowSignupModal(true);
        }}
      />

      <AuthModals
        showLoginModal={showLoginModal}
        showSignupModal={showSignupModal}
        onCloseLogin={() => setShowLoginModal(false)}
        onCloseSignup={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
}
