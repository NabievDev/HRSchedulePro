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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-emerald-amber rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Хакатон 2025</h1>
                <p className="text-sm text-gray-600">Инновации будущего</p>
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

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              <span>Время автоматически обновляется каждую секунду</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-white/80 backdrop-blur-sm border-t border-emerald-100 mt-auto"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-600 text-sm">© 2025 Хакатон. Построено с ❤️ для инноваций</p>
            </div>
            <div className="flex items-center space-x-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
