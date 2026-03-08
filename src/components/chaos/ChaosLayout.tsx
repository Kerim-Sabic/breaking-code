import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Brain, Flame, Layers, GitBranch, Heart, Clock, TrendingDown,
  Network, Pickaxe, Users, Home, Sparkles, Menu, X
} from 'lucide-react';
import { EmotionalMode, EMOTIONAL_MODES } from '@/types/chaos';

const NAV_ITEMS = [
  { path: '/chaos', icon: Home, label: 'Command Center' },
  { path: '/chaos/braindump', icon: Brain, label: 'Brain Dump' },
  { path: '/chaos/friction', icon: Flame, label: 'Friction Engine' },
  { path: '/chaos/taxonomy', icon: Layers, label: 'Mess Taxonomy' },
  { path: '/chaos/board', icon: GitBranch, label: 'Non-Linear Board' },
  { path: '/chaos/emotional', icon: Heart, label: 'Emotional Mode' },
  { path: '/chaos/fermentation', icon: Clock, label: 'Fermentation' },
  { path: '/chaos/failures', icon: TrendingDown, label: 'Failure Forward' },
  { path: '/chaos/ecosystem', icon: Network, label: 'Ecosystem Map' },
  { path: '/chaos/archaeology', icon: Pickaxe, label: 'Mess Archaeology' },
  { path: '/chaos/rooms', icon: Users, label: 'Chaos Rooms' },
];

interface ChaosLayoutProps {
  children: React.ReactNode;
  currentMood: EmotionalMode;
  onMoodChange: (mood: EmotionalMode) => void;
}

export default function ChaosLayout({ children, currentMood, onMoodChange }: ChaosLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const moodInfo = EMOTIONAL_MODES[currentMood];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <Sparkles className="w-5 h-5 text-accent" />
          <h1 className="font-display text-sm font-bold tracking-wide text-foreground">GLORIOUS MESS</h1>
        </div>

        {/* Mood indicator */}
        <div className="p-3 mx-3 mt-3 rounded-lg bg-secondary/50 border border-border">
          <div className="text-xs text-muted-foreground font-mono mb-1">Current Mode</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{moodInfo.emoji}</span>
            <span className="text-sm font-medium text-foreground">{moodInfo.label}</span>
          </div>
        </div>

        <nav className="mt-4 px-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-160px)]">
          {NAV_ITEMS.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-3 right-3">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
            ← Back to The Void
          </Link>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden p-2 bg-card border border-border rounded-md text-foreground"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="p-4 md:p-8 max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
