import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTimeRemaining, formatTimeUnit } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  isActive: boolean;
}

interface TimeDisplay {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export function CountdownTimer({ targetDate, isActive }: CountdownTimerProps) {
  const [timeDisplay, setTimeDisplay] = useState<TimeDisplay>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const updateTimer = () => {
      if (!isActive) {
        setTimeDisplay({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const timeRemaining = getTimeRemaining(targetDate);
      setTimeDisplay({
        days: formatTimeUnit(timeRemaining.days),
        hours: formatTimeUnit(timeRemaining.hours),
        minutes: formatTimeUnit(timeRemaining.minutes),
        seconds: formatTimeUnit(timeRemaining.seconds)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isActive]);

  const timeUnits = [
    { value: timeDisplay.days, label: 'Дни' },
    { value: timeDisplay.hours, label: 'Часы' },
    { value: timeDisplay.minutes, label: 'Минуты' },
    { value: timeDisplay.seconds, label: 'Секунды' }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-emerald-amber rounded-2xl p-6 sm:p-8 shadow-lg transform transition-all duration-300 cursor-pointer"
            >
              <motion.div
                key={unit.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 text-shadow"
              >
                {unit.value}
              </motion.div>
              <div className="text-emerald-100 text-sm sm:text-base font-medium uppercase tracking-wider">
                {unit.label}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
