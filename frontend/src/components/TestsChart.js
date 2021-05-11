import React from 'react';
import { Line } from 'react-chartjs-2';

const TestsChart = ({ oneWeek }) => {
  const oneWeekLabels = oneWeek.map((test) => test.date);
  const oneWeekTotals = oneWeek.map((test) => test.total);
  const oneWeekPositives = oneWeek.map((test) => test.positive);

  return (
    <>
      <Line
        data={{
          labels: oneWeekLabels,
          datasets: [
            {
              label: 'Total',
              data: oneWeekTotals,
              backgroundColor: 'rgba(204, 204, 204, 1)',
              borderColor: 'rgba(204, 204, 204, 1)',
              borderWidth: 3,
            },
            {
              label: 'Pozitive',
              data: oneWeekPositives,
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
