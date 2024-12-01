'use client'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Sales',
        data: [150, 200, 170, 220, 210, 250],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind's blue-500
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Overall Revenue' },
    },
  }

  return (
    <div className="w-1/2 p-4" style={{ height: '250px' }}>
      {' '}
      {/* 250px height */}
      <div style={{ height: '100%', width: '100%' }}>
        <Bar data={data} options={options} height={500} width={1012} /> {/* Set canvas height and width */}
      </div>
    </div>
  )
}
