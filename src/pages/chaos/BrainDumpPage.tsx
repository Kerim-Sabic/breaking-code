import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { MESS_TAXONOMY, type MessType } from '@/types/chaos';

// Simple local pattern extraction (no AI needed)
function extractPatterns(text: string) {
  const words = text.toLowerCase().split(/\s+/);
  const sentences = text.split(/[.!?\n]+/).map(s => s.trim()).filter(Boolean);

  // Theme extraction by word frequency
  const stopWords = new Set(['the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','shall','should','may','might','must','can','could','i','me','my','we','our','you','your','he','she','it','they','them','their','this','that','these','those','and','but','or','if','then','so','than','to','of','in','for','on','with','at','by','from','as','into','about','not','no','just','also','very','too','really','like','think','know','want','need','get','make','go','see','come','take','find','give','tell','say','use','try','keep','let','put','seem','help','show','turn','move','live','feel']);
  const freq: Record<string, number> = {};
  words.forEach(w => {
    const clean = w.replace(/[^a-z]/g, '');
    if (clean.length > 3 && !stopWords.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });
  const themes = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w);

  // Priority detection
  const priorityKeywords = ['urgent', 'important', 'critical', 'must', 'need', 'asap', 'deadline', 'priority', 'first', 'now'];
  const priorities = sentences.filter(s => priorityKeywords.some(k => s.toLowerCase().includes(k)));

  // Tension detection (opposing words)
  const tensionPairs = [['want', 'should'], ['love', 'hate'], ['yes', 'no'], ['start', 'stop'], ['more', 'less'], ['fast', 'slow'], ['big', 'small'], ['new', 'old'], ['easy', 'hard'], ['but', 'however']];
  const tensions: string[] = [];
  sentences.forEach(s => {
    const lower = s.toLowerCase();
    tensionPairs.forEach(([a, b]) => {
      if (lower.includes(a) && lower.includes(b)) tensions.push(s);
    });
    if (lower.includes(' but ') || lower.includes(' however ') || lower.includes(' although ')) tensions.push(s);
  });

  // Hidden connections - sentences that share uncommon words
  const connections: string[] = [];
  for (let i = 0; i < sentences.length; i++) {
    for (let j = i + 1; j < sentences.length; j++) {
      const w1 = new Set(sentences[i].toLowerCase().split(/\s+/).filter(w => w.length > 4 && !stopWords.has(w)));
      const w2 = new Set(sentences[j].toLowerCase().split(/\s+/).filter(w => w.length > 4 && !stopWords.has(w)));
      const shared = [...w1].filter(w => w2.has(w));
      if (shared.length >= 1) {
        connections.push(`"${sentences[i].slice(0, 60)}..." ↔ "${sentences[j].slice(0, 60)}..." (via: ${shared.join(', ')})`);
      }
    }
  }

  // Suggest mess types
  const suggestedTypes: MessType[] = [];
  if (tensions.length > 0) suggestedTypes.push('dialectical-tension');
  if (themes.length > 5) suggestedTypes.push('fractal-expansion');
  if (priorities.length > 2) suggestedTypes.push('overwhelm');
  if (connections.length > 0) suggestedTypes.push('serendipitous-collision');
  if (text.includes('?')) suggestedTypes.push('exploratory');
  if (text.length > 500) suggestedTypes.push('generative');
  if (suggestedTypes.length === 0) suggestedTypes.push('generative', 'exploratory');

  return { themes, priorities: priorities.slice(0, 5), tensions: [...new Set(tensions)].slice(0, 5), connections: connections.slice(0, 5), suggestedTypes: [...new Set(suggestedTypes)] };
}

export default function BrainDumpPage() {
  const store = useChaosStore();
  const [rawText, setRawText] = useState('');
  const [analysis, setAnalysis] = useState<ReturnType<typeof extractPatterns> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDump = () => {
    if (!rawText.trim()) return;
    setIsAnalyzing(true);
    // Simulate brief processing
    setTimeout(() => {
      const result = extractPatterns(rawText);
      setAnalysis(result);
      store.addBrainDump({
        rawText,
        extractedThemes: result.themes,
        extractedPriorities: result.priorities,
        extractedTensions: result.tensions,
        hiddenConnections: result.connections,
        suggestedMessTypes: result.suggestedTypes,
        processedIdeas: [],
      });
      setIsAnalyzing(false);
    }, 800);
  };

  const createIdeaFromTheme = (theme: string) => {
    store.addIdea({
      title: theme.charAt(0).toUpperCase() + theme.slice(1),
      content: `Extracted from brain dump: "${rawText.slice(0, 200)}..."`,
      messType: analysis?.suggestedTypes[0] || 'generative',
      states: ['nebulous'],
      emotionalContext: store.currentMood,
      tags: [theme],
      connections: [],
      energy: 50,
      clarity: 30,
      urgency: 40,
    });
  };

  return (
    <div>
      <PageHeader emoji="🧠" title="Brain Dump → Pattern Extraction" subtitle="Dump everything. We'll find the signal in the noise." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <textarea
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            placeholder="Dump everything here. Don't edit. Don't filter. Don't judge. Just let it flow...

Stream of consciousness, half-thoughts, contradictions, fears, excitement, random associations — it ALL belongs here.

The messier, the better. We'll extract the patterns."
            className="w-full h-80 p-4 bg-card border border-border rounded-lg text-foreground text-sm font-mono resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground font-mono">{rawText.length} chars • {rawText.split(/\s+/).filter(Boolean).length} words</span>
            <button
              onClick={handleDump}
              disabled={!rawText.trim() || isAnalyzing}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-mono text-sm font-bold tracking-wider disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {isAnalyzing ? '⏳ Extracting Patterns...' : '🔬 Analyze Dump'}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysis && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {/* Themes */}
              <div className="p-4 bg-card border border-border rounded-lg">
                <h3 className="text-xs text-muted-foreground font-mono mb-3">🏷️ EXTRACTED THEMES</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.themes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => createIdeaFromTheme(theme)}
                      className="px-3 py-1.5 bg-secondary/50 text-foreground text-sm rounded-md hover:bg-primary/20 transition-colors border border-border"
                      title="Click to create idea"
                    >
                      {theme}
                    </button>
                  ))}
                  {analysis.themes.length === 0 && <span className="text-xs text-muted-foreground italic">No strong themes detected. Try writing more!</span>}
                </div>
              </div>

              {/* Priorities */}
              {analysis.priorities.length > 0 && (
                <div className="p-4 bg-card border border-primary/20 rounded-lg">
                  <h3 className="text-xs text-muted-foreground font-mono mb-3">🎯 DETECTED PRIORITIES</h3>
                  <ul className="space-y-1.5">
                    {analysis.priorities.map((p, i) => (
                      <li key={i} className="text-sm text-foreground font-mono">• {p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tensions */}
              {analysis.tensions.length > 0 && (
                <div className="p-4 bg-card border border-accent/20 rounded-lg">
                  <h3 className="text-xs text-muted-foreground font-mono mb-3">⚡ DETECTED TENSIONS</h3>
                  <ul className="space-y-1.5">
                    {analysis.tensions.map((t, i) => (
                      <li key={i} className="text-sm text-foreground font-mono">⚡ {t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Connections */}
              {analysis.connections.length > 0 && (
                <div className="p-4 bg-card border border-border rounded-lg">
                  <h3 className="text-xs text-muted-foreground font-mono mb-3">🔗 HIDDEN CONNECTIONS</h3>
                  <ul className="space-y-2">
                    {analysis.connections.map((c, i) => (
                      <li key={i} className="text-xs text-muted-foreground font-mono leading-relaxed">{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Mess Types */}
              <div className="p-4 bg-card border border-border rounded-lg">
                <h3 className="text-xs text-muted-foreground font-mono mb-3">🏷️ SUGGESTED MESS TYPES</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedTypes.map(type => {
                    const info = MESS_TAXONOMY[type];
                    return (
                      <div key={type} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-md text-sm">
                        <span>{info.emoji}</span>
                        <span className="text-foreground">{info.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Previous Dumps */}
      {store.brainDumps.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xs text-muted-foreground font-mono mb-4">📜 PREVIOUS BRAIN DUMPS</h3>
          <div className="space-y-3">
            {store.brainDumps.slice(0, 5).map(dump => (
              <div key={dump.id} className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-mono">{new Date(dump.timestamp).toLocaleDateString()}</span>
                  <div className="flex gap-1">
                    {dump.suggestedMessTypes.map(t => (
                      <span key={t} className="text-xs">{MESS_TAXONOMY[t].emoji}</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/70 line-clamp-2 font-mono">{dump.rawText}</p>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground font-mono">
                  <span>{dump.extractedThemes.length} themes</span>
                  <span>{dump.extractedTensions.length} tensions</span>
                  <span>{dump.hiddenConnections.length} connections</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
