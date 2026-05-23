export const CATEGORIES = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

export const CATEGORY_COLORS = {
  food:          '#FF8A65',
  housing:       '#4F7EFF',
  utilities:     '#FFD166',
  transport:     '#00D98B',
  entertainment: '#C77DFF',
  salary:        '#06D6A0',
  other:         '#8892A4',
};

// Badge style objects derived from CATEGORY_COLORS (~12% opacity background)
export const CATEGORY_STYLE = Object.fromEntries(
  Object.entries(CATEGORY_COLORS).map(([k, color]) => [k, { color, background: `${color}1f` }])
);
