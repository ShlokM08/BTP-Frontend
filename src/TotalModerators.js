import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TotalModerators = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Moderators Activity',
        data: [90, 180, 130, 170, 140, 140, 130, 132, 113, 129, 122, 146], // Example data
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 0.6)',
        borderWidth: 1
      }
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Total Moderators Activity'
      },
      legend: {
        display: false 
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'No of Messages'
        },
        beginAtZero: true,
        ticks:{
            stepSize: 25,
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ width: '900px', height: '400px', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TotalModerators;
