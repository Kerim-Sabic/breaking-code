import { Routes, Route } from 'react-router-dom';
import ChaosLayout from '@/components/chaos/ChaosLayout';
import { useChaosStore } from '@/store/chaosStore';
import ChaosCommandCenter from './chaos/ChaosCommandCenter';
import BrainDumpPage from './chaos/BrainDumpPage';
import FrictionEnginePage from './chaos/FrictionEnginePage';
import MessTaxonomyPage from './chaos/MessTaxonomyPage';
import NonLinearBoardPage from './chaos/NonLinearBoardPage';
import EmotionalModePage from './chaos/EmotionalModePage';
import FermentationPage from './chaos/FermentationPage';
import FailureForwardPage from './chaos/FailureForwardPage';
import EcosystemMapPage from './chaos/EcosystemMapPage';
import ArchaeologyPage from './chaos/ArchaeologyPage';
import ChaosRoomsPage from './chaos/ChaosRoomsPage';

export default function ChaosApp() {
  const store = useChaosStore();

  return (
    <ChaosLayout currentMood={store.currentMood} onMoodChange={store.setMood}>
      <Routes>
        <Route path="/" element={<ChaosCommandCenter />} />
        <Route path="/braindump" element={<BrainDumpPage />} />
        <Route path="/friction" element={<FrictionEnginePage />} />
        <Route path="/taxonomy" element={<MessTaxonomyPage />} />
        <Route path="/board" element={<NonLinearBoardPage />} />
        <Route path="/emotional" element={<EmotionalModePage />} />
        <Route path="/fermentation" element={<FermentationPage />} />
        <Route path="/failures" element={<FailureForwardPage />} />
        <Route path="/ecosystem" element={<EcosystemMapPage />} />
        <Route path="/archaeology" element={<ArchaeologyPage />} />
        <Route path="/rooms" element={<ChaosRoomsPage />} />
      </Routes>
    </ChaosLayout>
  );
}
