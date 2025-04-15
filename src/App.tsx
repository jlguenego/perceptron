import { useState } from "react";
import Canvas, { Point } from "./components/Canvas";
import Controls from "./components/Controls";
import { Perceptron } from "./components/Perceptron";

export default function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [currentLabel, setCurrentLabel] = useState<-1 | 1>(1);
  const [learningRate, setLearningRate] = useState(0.01);
  const [maxEpochs, setMaxEpochs] = useState(100);
  const [decisionLine, setDecisionLine] = useState<{
    w1: number;
    w2: number;
    b: number;
  } | null>(null);

  const handleAddPoint = (point: Point) => {
    setPoints([...points, point]);
  };

  const handleReset = () => {
    setPoints([]);
    setDecisionLine(null);
  };

  const handleTrain = () => {
    if (points.length === 0) return;

    const perceptron = new Perceptron();
    perceptron.train(points, learningRate, maxEpochs, (epoch, errors) => {
      console.log(`Epoch ${epoch} – Erreurs : ${errors}`);
    });

    setDecisionLine(perceptron.getWeights());
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-8 bg-gray-100">
      <Canvas
        points={points}
        onAddPoint={handleAddPoint}
        currentLabel={currentLabel}
        decisionLine={decisionLine ?? undefined}
      />
      <Controls
        currentLabel={currentLabel}
        setCurrentLabel={setCurrentLabel}
        onReset={handleReset}
        onTrain={handleTrain}
        learningRate={learningRate}
        setLearningRate={setLearningRate}
        maxEpochs={maxEpochs}
        setMaxEpochs={setMaxEpochs}
      />
    </div>
  );
}
