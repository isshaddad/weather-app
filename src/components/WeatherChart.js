import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

function getHourRange(timeRange) {
  // Returns [startHour, endHour) in 24h format
  switch (timeRange) {
    case 'morning':
      return [8, 12]; // 8am-12pm
    case 'afternoon':
      return [12, 17]; // 12pm-5pm
    case 'evening':
      return [17, 21]; // 5pm-9pm
    default:
      return [0, 24];
  }
}

function toAmPm(hour) {
  const h = hour % 24;
  const ampm = h < 12 ? 'am' : 'pm';
  let display = h % 12;
  if (display === 0) display = 12;
  return `${display}${ampm}`;
}

function getCenteredHourLabels(timeRange) {
  // Center the range and show a few hours before/after
  const [start, end] = getHourRange(timeRange);
  let min = Math.max(0, start - 2);
  let max = Math.min(23, end + 2);
  // Always show at least 7 hours if possible
  if (max - min < 6) {
    if (min === 0) max = Math.min(23, min + 6);
    else min = Math.max(0, max - 6);
  }
  const base = [];
  for (let h = min; h <= max; h++) {
    base.push(h.toString().padStart(2, '0') + ':00');
  }
  return base;
}

const legendItems = [
  { label: 'Temperature (°F)', color: '#3b82f6' },
  { label: 'Rain (in)', color: '#ef4444' },
  { label: 'Wind (mph)', color: '#22c55e' },
];

export default function WeatherChart({ hours = [], timeRange = 'afternoon' }) {
  // Get all hour labels for the x-axis
  const labels = getCenteredHourLabels(timeRange);
  // Map API hours to a lookup for quick access
  const hourMap = Object.fromEntries(
    hours.map((h) => [h.datetime.slice(0, 5), h])
  );

  // Prepare data arrays for each metric
  const tempData = labels.map((l) => hourMap[l]?.temp ?? null);
  const rainData = labels.map((l) => hourMap[l]?.precip ?? 0);
  const windData = labels.map((l) => hourMap[l]?.windspeed ?? null);

  // Get the highlight range for the selected time
  const [highlightStart, highlightEnd] = getHourRange(timeRange);
  // Find the indices for the vertical lines
  const startIdx = labels.findIndex((l) => parseInt(l) === highlightStart);
  const endIdx = labels.findIndex((l) => parseInt(l) === highlightEnd);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°F)',
        data: tempData,
        borderColor: '#3b82f6', // blue
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        tension: 0.45,
        pointRadius: 0,
        borderWidth: 3,
        yAxisID: 'y',
      },
      {
        label: 'Rain (in)',
        data: rainData,
        borderColor: '#ef4444', // red
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        tension: 0.45,
        pointRadius: 0,
        borderWidth: 3,
        yAxisID: 'y1',
      },
      {
        label: 'Wind (mph)',
        data: windData,
        borderColor: '#22c55e', // green
        backgroundColor: 'rgba(34, 197, 94, 0.08)',
        tension: 0.45,
        pointRadius: 0,
        borderWidth: 3,
        yAxisID: 'y2',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y != null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
      annotation: {
        annotations: {
          afternoonStart: {
            type: 'line',
            xMin: startIdx,
            xMax: startIdx,
            borderColor: '#222',
            borderWidth: 2,
            borderDash: [6, 6],
          },
          afternoonEnd: {
            type: 'line',
            xMin: endIdx,
            xMax: endIdx,
            borderColor: '#222',
            borderWidth: 2,
            borderDash: [6, 6],
          },
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#222',
          font: {
            family: 'monospace',
            size: 12,
            weight: (ctx) => {
              // Bold if in highlight range
              const hour = parseInt(labels[ctx.index]);
              return hour >= highlightStart && hour < highlightEnd
                ? 'bold'
                : 'normal';
            },
          },
          callback: function (value, index) {
            const hour = parseInt(labels[index]);
            const ampm = toAmPm(hour);
            // Bold if in highlight range
            if (hour >= highlightStart && hour < highlightEnd) {
              return ampm;
            }
            return ampm;
          },
        },
      },
      y: {
        display: false,
        position: 'left',
      },
      y1: {
        display: false,
        position: 'right',
      },
      y2: {
        display: false,
        position: 'right',
      },
    },
    elements: {
      line: {
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
      },
    },
  };

  // Chart.js annotation plugin is not included by default, so we need to check if it's available
  // If not, the vertical lines will not show, but the rest of the chart will work

  if (!labels.length) {
    return (
      <div style={{ textAlign: 'center', color: '#aaa' }}>No hourly data</div>
    );
  }

  return (
    <div style={{ width: '100%', height: 170 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 4,
        }}
      >
        {legendItems.map((item) => (
          <span
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
            }}
          >
            <span
              style={{
                width: 18,
                height: 3,
                background: item.color,
                borderRadius: 2,
                display: 'inline-block',
              }}
            />
            <span style={{ color: item.color }}>{item.label}</span>
          </span>
        ))}
      </div>
      <Line data={data} options={options} height={140} />
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: 14,
          marginTop: 4,
        }}
      >
        {timeRange.toUpperCase()}
      </div>
    </div>
  );
}
