import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, '0');
}

export function getTimeRemaining(targetDate: Date) {
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();
  
  if (timeDiff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, total: timeDiff };
}

export function getHackathonStatus() {
  // Hackathon dates in UTC+3 (converted to UTC for Date objects)
  const START_DATE = new Date('2025-05-30T10:30:00Z'); // 13:30 UTC+3 = 10:30 UTC
  const END_DATE = new Date('2025-05-31T10:30:00Z');   // 13:30 UTC+3 = 10:30 UTC
  const now = new Date();

  if (now < START_DATE) {
    return {
      status: 'pending' as const,
      targetDate: START_DATE,
      text: 'Не начался',
      description: 'До начала хакатона'
    };
  } else if (now >= START_DATE && now < END_DATE) {
    return {
      status: 'active' as const,
      targetDate: END_DATE,
      text: 'Идет хакатон!',
      description: 'До завершения'
    };
  } else {
    return {
      status: 'ended' as const,
      targetDate: END_DATE,
      text: 'Завершился',
      description: 'Хакатон окончен'
    };
  }
}

export function createFloatingParticle() {
  const colors = ['#10B981', '#F59E0B', '#34D399', '#FBBF24'];
  const particle = document.createElement('div');
  
  particle.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    border-radius: 50%;
    pointer-events: none;
    z-index: 10;
    left: ${Math.random() * 100}vw;
    top: 100vh;
    opacity: 0.6;
  `;
  
  particle.classList.add('float-particle');
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 8000);
}
