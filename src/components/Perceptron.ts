import { Point } from "./Canvas";

export class Perceptron {
  w1: number;
  w2: number;
  b: number;

  constructor() {
    // Initialisation aléatoire légère
    this.w1 = Math.random() * 0.2 - 0.1;
    this.w2 = Math.random() * 0.2 - 0.1;
    this.b = Math.random() * 0.2 - 0.1;
  }

  // Activation (fonction seuil)
  activate(x: number): -1 | 1 {
    return x >= 0 ? 1 : -1;
  }

  // Prédiction d'un point
  predict(x: number, y: number): -1 | 1 {
    const z = this.w1 * x + this.w2 * y + this.b;
    return this.activate(z);
  }

  // Entraînement
  train(
    data: Point[],
    learningRate: number,
    maxEpochs: number,
    onEpoch?: (epoch: number, errors: number) => void
  ) {
    for (let epoch = 0; epoch < maxEpochs; epoch++) {
      let errors = 0;

      for (const point of data) {
        const yPred = this.predict(point.x, point.y);
        const error = point.label - yPred;

        if (error !== 0) {
          // Mise à jour des poids
          this.w1 += learningRate * error * point.x;
          this.w2 += learningRate * error * point.y;
          this.b += learningRate * error;
          errors++;
        }
      }

      if (onEpoch) onEpoch(epoch + 1, errors);

      // Si aucune erreur, on peut arrêter
      if (errors === 0) break;
    }
  }

  getWeights() {
    return {
      w1: this.w1,
      w2: this.w2,
      b: this.b,
    };
  }
}
