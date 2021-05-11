import React from 'react';
import { Line } from 'react-chartjs-2';

const TestsChart = ({ stats }) => {
  const statsLabels = stats.map((test) => test.date);
  const statsTotals = stats.map((test) => test.total);
  const statsPositives = stats.map((test) => test.positive);

  return (
    <>
      <Line
        data={{
          labels: statsLabels,
          datasets: [
            {
              label: 'Total',
              data: statsTotals,
              backgroundColor: 'rgba(204, 204, 204, 1)',
              borderColor: 'rgba(204, 204, 204, 1)',
              borderWidth: 3,
            },
            {
              label: 'Pozitive',
              data: statsPositives,
              backgroundColor: 'rgba(80, 72, 125, 1)',
              borderColor: 'rgba(80, 72, 125, 1)',
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
