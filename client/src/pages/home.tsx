import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Calendar, Clock, Info, Github, Twitter, Linkedin } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { EventDetails } from "@/components/event-details";
import { getHackathonStatus, createFloatingParticle } from "@/lib/utils";

export default function Home() {
  const [hackathonState, setHackathonState] = useState(getHackathonStatus());

  useEffect(() => {
    const updateStatus = () => {
      setHackathonState(getHackathonStatus());
    };

    // Update status every second
    const interval = setInterval(updateStatus, 1000);

    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          createFloatingParticle();
        }, i * 400);
      }
    };

    // Initial particles
    createParticles();
    
    // Create new particles every 30 seconds
    const particleInterval = setInterval(createParticles, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Место для логотипа хакатона */}
              <div className="w-300 h-20 rounded-xl overflow-hidden bg-white/80 gradient-emerald-amber rounded-2xl p-6 sm:p-3 shadow-lg transform transition-all duration-300 cursor-pointer">
                <img
                  src="/assets/logo.png"
                  alt="Hackathon Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>30-31 мая 2025</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>24 часа</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Status and Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="mb-4">
              <StatusBadge status={hackathonState.status} text={hackathonState.text} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Обратный отсчет до хакатона
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Приготовьтесь к самому захватывающему техническому событию года. 24 часа креативности, инноваций и программирования.
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CountdownTimer
              targetDate={hackathonState.targetDate}
              isActive={hackathonState.status !== 'ended'}
            />
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <EventDetails />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
