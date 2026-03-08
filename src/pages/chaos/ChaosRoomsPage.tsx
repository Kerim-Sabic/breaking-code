import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';

const ROOM_PHASES = [
  { key: 'wild', emoji: '🌪️', label: 'Wild Brainstorm', desc: 'No rules. No judgment. Pure chaos.' },
  { key: 'clustering', emoji: '🧲', label: 'Clustering', desc: 'Group related ideas. Find themes.' },
  { key: 'crystallizing', emoji: '💎', label: 'Crystallizing', desc: 'Shape themes into concepts.' },
  { key: 'actionizing', emoji: '🎯', label: 'Actionizing', desc: 'Convert concepts into action items.' },
] as const;

export default function ChaosRoomsPage() {
  const store = useChaosStore();
  const [showCreate, setShowCreate] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomTheme, setRoomTheme] = useState('');
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [newIdea, setNewIdea] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const [newAction, setNewAction] = useState('');

  // Simple in-memory room management (rooms stored in ideas as tagged items)
  const [rooms, setRooms] = useState<{
    id: string; name: string; theme: string; ideas: string[];
    crystallizedThemes: string[]; actionItems: string[];
    phase: typeof ROOM_PHASES[number]['key']; createdAt: number;
  }[]>([]);

  const createRoom = () => {
    if (!roomName.trim()) return;
    setRooms(prev => [...prev, {
      id: `room-${Date.now()}`,
      name: roomName,
      theme: roomTheme,
      ideas: [],
      crystallizedThemes: [],
      actionItems: [],
      phase: 'wild',
      createdAt: Date.now(),
    }]);
    setRoomName('');
    setRoomTheme('');
    setShowCreate(false);
  };

  const addIdeaToRoom = (roomId: string) => {
    if (!newIdea.trim()) return;
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, ideas: [...r.ideas, newIdea] } : r));
    setNewIdea('');
  };

  const addThemeToRoom = (roomId: string) => {
    if (!newTheme.trim()) return;
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, crystallizedThemes: [...r.crystallizedThemes, newTheme] } : r));
    setNewTheme('');
  };

  const addActionToRoom = (roomId: string) => {
    if (!newAction.trim()) return;
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, actionItems: [...r.actionItems, newAction] } : r));
    setNewAction('');
  };

  const advancePhase = (roomId: string) => {
    const phaseOrder = ['wild', 'clustering', 'crystallizing', 'actionizing'] as const;
    setRooms(prev => prev.map(r => {
      if (r.id !== roomId) return r;
      const idx = phaseOrder.indexOf(r.phase);
      if (idx < phaseOrder.length - 1) return { ...r, phase: phaseOrder[idx + 1] };
      return r;
    }));
  };

  const room = rooms.find(r => r.id === activeRoom);
  const phaseInfo = room ? ROOM_PHASES.find(p => p.key === room.phase) : null;

  return (
    <div>
      <PageHeader emoji="🏠" title="Collaborative Chaos Rooms" subtitle="Brainstorm without structure, then progressively crystallize into clarity" />

      {!activeRoom ? (
        <>
          <button onClick={() => setShowCreate(!showCreate)} className="mb-6 px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-md font-mono text-sm hover:bg-accent/20 transition-colors">
            + Create Chaos Room
          </button>

          {showCreate && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-card border border-border rounded-lg mb-6 space-y-3">
              <input value={roomName} onChange={e => setRoomName(e.target.value)} placeholder="Room name..." className="w-full bg-transparent border-b border-border text-foreground font-display pb-2 focus:outline-none" />
              <input value={roomTheme} onChange={e => setRoomTheme(e.target.value)} placeholder="Theme or question to explore..." className="w-full bg-secondary/30 rounded-md p-2 text-sm text-foreground font-mono focus:outline-none" />
              <button onClick={createRoom} disabled={!roomName.trim()} className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-mono text-sm font-bold disabled:opacity-40">Create</button>
            </motion.div>
          )}

          {rooms.length === 0 ? (
            <div className="p-12 bg-card border border-border rounded-lg text-center text-muted-foreground font-mono text-sm">
              No chaos rooms yet. Create one to start brainstorming.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((r, i) => {
                const phase = ROOM_PHASES.find(p => p.key === r.phase)!;
                return (
                  <motion.button
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActiveRoom(r.id)}
                    className="p-5 bg-card border border-border rounded-lg text-left hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{phase.emoji}</span>
                      <h3 className="font-display font-bold text-foreground">{r.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mb-2">{r.theme}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground font-mono">
                      <span>{r.ideas.length} ideas</span>
                      <span>{r.crystallizedThemes.length} themes</span>
                      <span>{r.actionItems.length} actions</span>
                    </div>
                    <div className="mt-2 text-xs text-accent font-mono">Phase: {phase.label}</div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </>
      ) : room && phaseInfo ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => setActiveRoom(null)} className="mb-4 text-xs text-muted-foreground font-mono hover:text-foreground">← Back to rooms</button>

          <div className="p-5 bg-card border border-border rounded-lg mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-bold text-lg text-foreground">{room.name}</h2>
              <span className="text-sm">{phaseInfo.emoji} {phaseInfo.label}</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-4">{room.theme}</p>

            {/* Phase progress */}
            <div className="flex gap-1 mb-4">
              {ROOM_PHASES.map((p, i) => (
                <div key={p.key} className={`flex-1 h-1.5 rounded-full ${ROOM_PHASES.indexOf(phaseInfo) >= i ? 'bg-primary' : 'bg-secondary'}`} />
              ))}
            </div>

            <p className="text-xs text-accent font-mono">{phaseInfo.desc}</p>
          </div>

          {/* Wild phase: add ideas */}
          {room.phase === 'wild' && (
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <input value={newIdea} onChange={e => setNewIdea(e.target.value)} onKeyDown={e => e.key === 'Enter' && addIdeaToRoom(room.id)} placeholder="Throw an idea into the chaos..." className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground font-mono focus:outline-none" />
                <button onClick={() => addIdeaToRoom(room.id)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-mono text-sm">Add</button>
              </div>
            </div>
          )}

          {/* Clustering/Crystallizing: add themes */}
          {(room.phase === 'clustering' || room.phase === 'crystallizing') && (
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <input value={newTheme} onChange={e => setNewTheme(e.target.value)} onKeyDown={e => e.key === 'Enter' && addThemeToRoom(room.id)} placeholder="What theme is emerging?" className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground font-mono focus:outline-none" />
                <button onClick={() => addThemeToRoom(room.id)} className="px-4 py-2 bg-accent/20 text-accent rounded-md font-mono text-sm">Add Theme</button>
              </div>
            </div>
          )}

          {/* Actionizing: add action items */}
          {room.phase === 'actionizing' && (
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <input value={newAction} onChange={e => setNewAction(e.target.value)} onKeyDown={e => e.key === 'Enter' && addActionToRoom(room.id)} placeholder="What's the next action?" className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground font-mono focus:outline-none" />
                <button onClick={() => addActionToRoom(room.id)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-mono text-sm">Add Action</button>
              </div>
            </div>
          )}

          {/* Ideas */}
          {room.ideas.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs text-muted-foreground font-mono mb-3">💡 IDEAS ({room.ideas.length})</h3>
              <div className="flex flex-wrap gap-2">
                {room.ideas.map((idea, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className="px-3 py-2 bg-secondary/50 rounded-md text-sm text-foreground font-mono border border-border">
                    {idea}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Themes */}
          {room.crystallizedThemes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs text-muted-foreground font-mono mb-3">🏷️ THEMES ({room.crystallizedThemes.length})</h3>
              <div className="space-y-2">
                {room.crystallizedThemes.map((theme, i) => (
                  <div key={i} className="px-3 py-2 bg-accent/10 rounded-md text-sm text-foreground font-mono border border-accent/20">{theme}</div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {room.actionItems.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs text-muted-foreground font-mono mb-3">🎯 ACTION ITEMS ({room.actionItems.length})</h3>
              <div className="space-y-2">
                {room.actionItems.map((action, i) => (
                  <div key={i} className="px-3 py-2 bg-primary/10 rounded-md text-sm text-foreground font-mono border border-primary/20">☐ {action}</div>
                ))}
              </div>
            </div>
          )}

          {/* Advance phase */}
          {room.phase !== 'actionizing' && (
            <button onClick={() => advancePhase(room.id)} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-mono text-sm font-bold">
              Advance to next phase →
            </button>
          )}
        </motion.div>
      ) : null}
    </div>
  );
}
