import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PieBarInd = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthlyData = {
    January: [5, 10, 15, 7, 8, 3, 4, 6, 2, 3, 4,2,3,4,5],
    February: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    March: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    April: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    May: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    June: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    July: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    August: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    September: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    October: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    November: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
    December: [6, 9, 14, 5, 7, 2, 3, 5, 4, 5, 6,2,3,4,5],
  };

  const data = {
    labels: ['Rachel', 'Jeff', 'Mike', 'Zane', 'Harvey', 'Donna', 'Litt', 'Pearson', 'Margot', 'Jay', 'Gloria','Sanju','Hardu','Aksu','Yaksu'],
    datasets: [
      {
        label: 'No. of Active Group Members',
        data: monthlyData[selectedMonth],
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Number of Active Members in Groups (${selectedMonth})`
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Groups'
        }
      },
      y: {
        title: {
          display: true,
          text: 'No. of Active Members'
        },
        beginAtZero: true
      }
    },
    maintainAspectRatio: false // This ensures we can set our own height
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> {/* Center chart vertically and horizontally */}
      <div style={{ width: '900px', margin: '20px' }}>
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <label htmlFor="month-selector">Select Month: </label>
          <select id="month-selector" value={selectedMonth} onChange={handleMonthChange}>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div style={{ height: '500px' }}> {/* Explicitly setting height here */}
            <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieBarInd;
