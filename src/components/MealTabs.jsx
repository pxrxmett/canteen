const MEALS = [
  { id: 'breakfast', label: 'อาหารเช้า' },
  { id: 'lunch', label: 'อาหารกลางวัน' },
  { id: 'dinner', label: 'อาหารเย็น' },
  { id: 'supper', label: 'อาหารว่าง' }
];

function MealTabs({ selectedMeal, onSelectMeal }) {
  return (
    <div className="meal-tabs">
      {MEALS.map(m => (
        <button
          key={m.id}
          className={`meal-tab ${selectedMeal === m.id ? 'active' : ''}`}
          onClick={() => onSelectMeal(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

export default MealTabs;
