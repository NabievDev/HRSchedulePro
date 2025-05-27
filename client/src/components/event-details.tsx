import { motion } from "framer-motion";
import { PlayCircle, Flag } from "lucide-react";

export function EventDetails() {
  const events = [
    {
      icon: PlayCircle,
      title: 'Начало',
      subtitle: 'Старт хакатона',
      date: '30 мая 2025',
      time: '13:30 (UTC+3)',
      bgColor: 'bg-emerald-500'
    },
    {
      icon: Flag,
      title: 'Финиш',
      subtitle: 'Завершение хакатона',
      date: '31 мая 2025',
      time: '13:30 (UTC+3)',
      bgColor: 'bg-amber-500'
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {events.map((event, index) => (
        <motion.div
          key={event.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/60 transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 ${event.bgColor} rounded-xl flex items-center justify-center`}>
              <event.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.subtitle}</p>
            </div>
          </div>
          <div className="text-lg font-semibold text-gray-900">{event.date}</div>
          <div className="text-gray-600">{event.time}</div>
        </motion.div>
      ))}
    </div>
  );
}
