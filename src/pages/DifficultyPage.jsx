import difficultyBg from '../assets/difficulty.png';

export default function DifficultyPage({ onSelect }) {
  return (
    <div className="page" style={{ backgroundImage: `url(${difficultyBg})` }}>
      <button className="difficulty-easy-hotspot" onClick={() => onSelect('easy')} />
      <button className="difficulty-medium-hotspot" onClick={() => onSelect('medium')} />
      <button className="difficulty-hard-hotspot" onClick={() => onSelect('hard')} />
    </div>
  );
}
