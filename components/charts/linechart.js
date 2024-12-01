'use client'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

export default function LineChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Franchise Gain',
        data: [300, 400, 450, 380, 500, 600],
        borderColor: 'rgba(16, 185, 129, 0.8)', // Tailwind's green-500
        backgroundColor: 'rgba(16, 185, 129, 0.4)',
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
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
      title: { display: true, text: 'Overall Franchise Gain' },
    },
  }

  return (
    <div className="w-1/2 p-4" style={{ height: '250px' }}>
      {' '}
      {/* 250px height */}
      <div style={{ height: '100%', width: '100%' }}>
        <Line data={data} options={options} height={500} width={1012} /> {/* Set canvas height and width */}
      </div>
    </div>
  )
}
