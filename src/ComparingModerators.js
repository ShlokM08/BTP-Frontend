import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PieBarInd = () => {
  const data = {
    labels: ['Moderator 1','Moderator 2', 'Moderator 3', 'Moderator 4', 'Moderator 5'],
    datasets: [
      {
        label: 'Moderators Activity',
        data: [5,10,15,7,8], 
        backgroundColor: 'rgba(153, 102, 255,0.2)',
        borderColor: 'rgba(153, 102, 255,0.2)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Moderators Activity (Per Month)'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Moderators'
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

  return (
    <div style={{ width: '400px', height: '300px', margin: '20px auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PieBarInd;
