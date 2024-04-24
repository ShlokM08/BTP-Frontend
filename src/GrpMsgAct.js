import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GrpMsgAct = () => {
  const [selectedMonth, setSelectedMonth] = useState('Jan');

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'No. of Messages',
        data: [10, 25, 15, 32],
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255,0.2)',
        barThickness: 40,
      }
    ]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `G1 Activity for ${selectedMonth}` 
      },
      legend: {
        display: false, 
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week'
        }
      },
      y: {
        title: {
          display: true,
          text: 'No. of Messages'
        },
        beginAtZero: true
      }
    },
    maintainAspectRatio: false
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  return (
    <div>
      <div style={{ width: '600px', height: '400px', margin: '20px auto' }}> {/* Adjusted width here */}
        <Bar data={data} options={options} />
      </div>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default GrpMsgAct;