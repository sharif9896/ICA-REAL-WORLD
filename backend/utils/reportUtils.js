export function calculateStatus(totalPresent, totalDays) {
const percentage = totalDays === 0 ? 0 : (totalPresent / totalDays) * 100;
let status = '';
if (percentage >= 75) status = 'Safe';
else if (percentage >= 65) status = 'Detain';
else status = 'Redo';
return { percentage: Number(percentage.toFixed(2)), status };
}
