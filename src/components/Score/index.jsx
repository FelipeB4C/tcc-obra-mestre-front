import './styles.css';

export const Score = ({ score, numAvaliacao }) => {
  return (
    <div className="score">
      <img src="/src/img/star.svg" alt="estrela de avaliação" />
      <p>
        {score} ({numAvaliacao})
      </p>
    </div>
  );
};
