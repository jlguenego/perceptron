type ControlsProps = {
  currentLabel: -1 | 1;
  setCurrentLabel: (label: -1 | 1) => void;
  onReset: () => void;
  onTrain: () => void;
  learningRate: number;
  setLearningRate: (lr: number) => void;
  maxEpochs: number;
  setMaxEpochs: (epochs: number) => void;
};

export default function Controls({
  currentLabel,
  setCurrentLabel,
  onReset,
  onTrain,
  learningRate,
  setLearningRate,
  maxEpochs,
  setMaxEpochs,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded shadow w-80">
      <div>
        <label className="font-semibold block mb-1">Classe actuelle</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value={1}
              checked={currentLabel === 1}
              onChange={() => setCurrentLabel(1)}
            />
            <span className="text-blue-600 font-semibold">Bleu</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value={-1}
              checked={currentLabel === -1}
              onChange={() => setCurrentLabel(-1)}
            />
            <span className="text-red-600 font-semibold">Rouge</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Taux d’apprentissage</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={learningRate}
          onChange={(e) => setLearningRate(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Nombre maximal d’epochs
        </label>
        <input
          type="number"
          min="1"
          value={maxEpochs}
          onChange={(e) => setMaxEpochs(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="flex justify-between mt-2">
        <button
          onClick={onTrain}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Apprendre
        </button>
        <button
          onClick={onReset}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
