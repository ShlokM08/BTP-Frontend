import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'G1',
        data: [65, 59, 80, 81, 56, 55, 40, 60, 65, 59, 80, 81],
        fill: false,
        backgroundColor: 'rgb(75,192,192)',
        borderColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'G2',
        data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86],
        fill: false,
        backgroundColor: 'rgb(255,99,132)',
        borderColor: 'rgba(255,99,132,0.2)',
      },
      {
        label: 'G3',
        data: [45, 25, 16, 36, 67, 18, 76, 45, 25, 16, 36, 67],
        fill: false,
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255,0.2)',
      }
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Groups Comparing Activity Total'
      },
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh' 
    }}>
      <div style={{ width: '900px', height: '400px' }}> {/* This will hold the chart */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
export default LineChart;
