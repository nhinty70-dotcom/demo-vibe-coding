import React, { useState } from 'react';
import { Vessel, Chemical, IndicatorType, VesselContents } from '../../types/chemistry';
import { INITIAL_CHEMICALS } from '../../data/chemicals';
import { INDICATORS, getPaperColorByPH, getLiquidIndicatorColorByPH, getExactPHColor } from '../../data/indicators';
import { ChemicalPanel } from './ChemicalPanel';
import { EquipmentPanel } from './EquipmentPanel';
import { LabWorkbench } from './LabWorkbench';
import { ObservationModal } from './ObservationModal';
import { saveJournalEntry } from '../../services/storage';

interface VirtualLabProps {
  onJournalUpdated: () => void;
  onExperimentPerformed: () => void;
}

export const VirtualLab: React.FC<VirtualLabProps> = ({ onJournalUpdated, onExperimentPerformed }) => {
  const [chemicals] = useState<Chemical[]>(INITIAL_CHEMICALS);
  const [vessels, setVessels] = useState<Vessel[]>([
    {
      id: 'tube_1',
      type: 'test_tube',
      capacityMl: 50,
      name: 'Ống nghiệm 1',
      contents: { volumeMl: 0, chemicals: [], temperatureC: 25, currentPH: 7, color: 'rgba(255, 255, 255, 0)' }
    },
    {
      id: 'tube_2',
      type: 'test_tube',
      capacityMl: 50,
      name: 'Ống nghiệm 2',
      contents: { volumeMl: 0, chemicals: [], temperatureC: 25, currentPH: 7, color: 'rgba(255, 255, 255, 0)' }
    },
    {
      id: 'beaker_1',
      type: 'beaker',
      capacityMl: 250,
      name: 'Cốc thủy tinh A',
      contents: { volumeMl: 0, chemicals: [], temperatureC: 25, currentPH: 7, color: 'rgba(255, 255, 255, 0)' }
    }
  ]);

  const [selectedVesselId, setSelectedVesselId] = useState<string | null>('tube_1');
  const [activeTool, setActiveTool] = useState<'dropper' | 'strip' | 'thermometer' | 'stirrer' | 'select'>('select');
  const [observationModalVesselId, setObservationModalVesselId] = useState<string | null>(null);

  const handleAddVessel = (type: 'test_tube' | 'beaker') => {
    if (vessels.length >= 6) return;
    const newId = `${type}_${Date.now()}`;
    const newCount = vessels.filter((v) => v.type === type).length + 1;
    const newVessel: Vessel = {
      id: newId,
      type,
      capacityMl: type === 'test_tube' ? 50 : 250,
      name: type === 'test_tube' ? `Ống nghiệm ${newCount}` : `Cốc thủy tinh ${String.fromCharCode(65 + newCount - 1)}`,
      contents: { volumeMl: 0, chemicals: [], temperatureC: 25, currentPH: 7, color: 'rgba(255, 255, 255, 0)' }
    };
    setVessels([...vessels, newVessel]);
    setSelectedVesselId(newId);
  };

  const handleClearAllVessels = () => {
    setVessels((prev) =>
      prev.map((v) => ({
        ...v,
        contents: { volumeMl: 0, chemicals: [], temperatureC: 25, currentPH: 7, color: 'rgba(255, 255, 255, 0)' }
      }))
    );
  };

  const handleAddChemicalToVessel = (chemicalId: string, volumeMl: number) => {
    const targetId = selectedVesselId || vessels[0]?.id;
    if (!targetId) return;

    const chem = chemicals.find((c) => c.id === chemicalId);
    if (!chem) return;

    setVessels((prev) =>
      prev.map((v) => {
        if (v.id !== targetId) return v;

        const newVol = Math.min(v.capacityMl, v.contents.volumeMl + volumeMl);
        const updatedChemicals = [...v.contents.chemicals, { chemicalId, volumeMl }];

        // Compute weighted pH & color
        let weightedPH = chem.pH;
        if (v.contents.volumeMl > 0) {
          weightedPH = (v.contents.currentPH * v.contents.volumeMl + chem.pH * volumeMl) / newVol;
        }

        // Base color transition
        let newColor = chem.color;
        if (v.contents.indicatorAdded) {
          newColor = getLiquidIndicatorColorByPH(v.contents.indicatorAdded, weightedPH, chem.color);
        }

        return {
          ...v,
          contents: {
            ...v.contents,
            volumeMl: newVol,
            chemicals: updatedChemicals,
            currentPH: weightedPH,
            color: newColor
          }
        };
      })
    );

    onExperimentPerformed();
  };

  const handleAddIndicatorToVessel = (vesselId: string, indicatorId: IndicatorType) => {
    const targetId = vesselId || selectedVesselId || vessels[0]?.id;
    if (!targetId) return;

    setVessels((prev) =>
      prev.map((v) => {
        if (v.id !== targetId) return v;

        const updatedColor = getLiquidIndicatorColorByPH(indicatorId, v.contents.currentPH, v.contents.color);

        return {
          ...v,
          contents: {
            ...v.contents,
            indicatorAdded: indicatorId,
            indicatorDrops: (v.contents.indicatorDrops || 0) + 3,
            color: updatedColor
          }
        };
      })
    );

    onExperimentPerformed();
  };

  const handleDipPaperStrip = (vesselId: string, indicatorId: IndicatorType) => {
    setVessels((prev) =>
      prev.map((v) => {
        if (v.id !== vesselId) return v;

        const stripColor = getPaperColorByPH(indicatorId, v.contents.currentPH);

        return {
          ...v,
          contents: {
            ...v.contents,
            paperStripDip: {
              indicatorType: indicatorId,
              resultColor: stripColor,
              dippedAt: Date.now()
            }
          }
        };
      })
    );

    onExperimentPerformed();
  };

  const handleMixVessels = (sourceVesselId: string, targetVesselId: string) => {
    const source = vessels.find((v) => v.id === sourceVesselId);
    const target = vessels.find((v) => v.id === targetVesselId);
    if (!source || !target || source.contents.volumeMl === 0) return;

    const addedVol = source.contents.volumeMl;
    const targetVol = target.contents.volumeMl;
    const totalVol = Math.min(target.capacityMl, targetVol + addedVol);

    const resultingPH = (target.contents.currentPH * targetVol + source.contents.currentPH * addedVol) / (targetVol + addedVol);

    // Temperature rise simulation during neutralization (if acid + base mixed)
    const isNeutralization =
      (source.contents.currentPH < 6 && target.contents.currentPH > 8) ||
      (source.contents.currentPH > 8 && target.contents.currentPH < 6);

    const tempRise = isNeutralization ? 12.5 : 0.5;

    let newColor = target.contents.color;
    if (target.contents.indicatorAdded) {
      newColor = getLiquidIndicatorColorByPH(target.contents.indicatorAdded, resultingPH, 'rgba(200,200,250,0.2)');
    }

    setVessels((prev) =>
      prev.map((v) => {
        if (v.id === sourceVesselId) {
          return {
            ...v,
            contents: { volumeMl: 0, chemicals: [], temperatureC: 25, currentPH: 7, color: 'rgba(255, 255, 255, 0)' }
          };
        }
        if (v.id === targetVesselId) {
          return {
            ...v,
            contents: {
              ...v.contents,
              volumeMl: totalVol,
              currentPH: resultingPH,
              temperatureC: v.contents.temperatureC + tempRise,
              color: newColor,
              hasReacted: true,
              reactionMessage: isNeutralization ? '⚡ Phản ứng trung hòa (Tỏa nhiệt)' : 'Hòa trộn dung dịch'
            }
          };
        }
        return v;
      })
    );

    onExperimentPerformed();
  };

  const handleEmptyVessel = (vesselId: string) => {
    setVessels((prev) =>
      prev.map((v) => {
        if (v.id !== vesselId) return v;
        return {
          ...v,
          contents: { volumeMl: 0, chemicals: [], temperatureC: 25, currentPH: 7, color: 'rgba(255, 255, 255, 0)' }
        };
      })
    );
  };

  const activeObsVessel = vessels.find((v) => v.id === observationModalVesselId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-5rem)] p-4 max-w-7xl mx-auto overflow-hidden">
      {/* Left Column: Chemical Panel */}
      <div className="lg:col-span-3 h-full overflow-hidden">
        <ChemicalPanel
          chemicals={chemicals}
          selectedVesselId={selectedVesselId}
          onAddChemicalToVessel={(chemId, vol) => handleAddChemicalToVessel(chemId, vol)}
          onAddIndicatorToVessel={(indId) => handleAddIndicatorToVessel(selectedVesselId || 'tube_1', indId as IndicatorType)}
        />
      </div>

      {/* Middle Column: Lab Workbench */}
      <div className="lg:col-span-6 h-full overflow-hidden">
        <LabWorkbench
          vessels={vessels}
          chemicals={chemicals}
          selectedVesselId={selectedVesselId}
          onSelectVessel={(id) => setSelectedVesselId(id)}
          onAddChemicalToVessel={(vId, cId, vol) => handleAddChemicalToVessel(cId, vol)}
          onAddIndicatorToVessel={(vId, indId) => handleAddIndicatorToVessel(vId, indId)}
          onDipPaperStrip={(vId, indId) => handleDipPaperStrip(vId, indId)}
          onMixVessels={(sId, tId) => handleMixVessels(sId, tId)}
          onEmptyVessel={(vId) => handleEmptyVessel(vId)}
          onOpenObservationModal={(vId) => setObservationModalVesselId(vId)}
          activeTool={activeTool}
        />
      </div>

      {/* Right Column: Equipment Panel */}
      <div className="lg:col-span-3 h-full overflow-hidden">
        <EquipmentPanel
          vesselCount={vessels.length}
          onAddVessel={(type) => handleAddVessel(type)}
          onClearAllVessels={handleClearAllVessels}
          activeTool={activeTool}
          onSelectTool={(tool) => setActiveTool(tool)}
        />
      </div>

      {/* Observation Popup Modal */}
      {activeObsVessel && (
        <ObservationModal
          isOpen={!!observationModalVesselId}
          onClose={() => setObservationModalVesselId(null)}
          vesselName={activeObsVessel.name}
          contents={activeObsVessel.contents}
          chemicalNames={activeObsVessel.contents.chemicals.map((c) => {
            const found = chemicals.find((ch) => ch.id === c.chemicalId);
            return found ? found.name : c.chemicalId;
          })}
          indicatorName={
            activeObsVessel.contents.indicatorAdded
              ? INDICATORS.find((i) => i.id === activeObsVessel.contents.indicatorAdded)?.name || 'Chỉ thị'
              : activeObsVessel.contents.paperStripDip
              ? INDICATORS.find((i) => i.id === activeObsVessel.contents.paperStripDip?.indicatorType)?.name || 'Giấy thử'
              : 'Chỉ thị vạn năng'
          }
          onSaveToJournal={(observation, pred, conclusion) => {
            saveJournalEntry({
              id: `j_${Date.now()}`,
              timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              vesselName: activeObsVessel.name,
              reactants: activeObsVessel.contents.chemicals.map((c) => {
                const found = chemicals.find((ch) => ch.id === c.chemicalId);
                return found ? found.formula : c.chemicalId;
              }),
              indicatorUsed: activeObsVessel.contents.indicatorAdded || activeObsVessel.contents.paperStripDip?.indicatorType || 'Quỳ tím',
              observation,
              studentPrediction: pred,
              conclusion
            });
            onJournalUpdated();
          }}
        />
      )}
    </div>
  );
};
