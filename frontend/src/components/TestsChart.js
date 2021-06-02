import React from 'react';
import { Line } from 'react-chartjs-2';

const TestsChart = ({ stats }) => {
  var statsLabels = [];
  var statsTotals = [];
  var statsPositives = [];

  if (stats) {
    statsLabels = stats.map((test) => test.date);
    statsTotals = stats.map((test) => test.total);
    statsPositives = stats.map((test) => test.positive);
  }

  return (
    <>
      <Line
        data={{
          labels: statsLabels,
          datasets: [
            {
              label: 'Total',
              data: statsTotals,
              backgroundColor: 'rgba(162, 162, 162, 1)',
              borderColor: 'rgba(162, 162, 162, 1)',
              borderWidth: 3,
            },
            {
              label: 'Pozitive',
              data: statsPositives,
              backgroundColor: 'rgb(109,71,148,1)',
              borderColor: 'rgb(109,71,148,1)',
              borderWidth: 4,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </>
  );
};

export default TestsChart;
