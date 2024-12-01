'use client'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart() {
  const data = {
    labels: ['Electronics', 'Furniture', 'Clothing'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [45, 25, 30],
        backgroundColor: ['#4B5563', '#10B981', '#3B82F6'], // Tailwind grays, green, blue
      },
    ],
  }

  const options = {
    responsive: true,
    animation: {
      duration: 1200,
      easing: 'easeInOutBounce',
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sales Distribution' },
    },
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
      <Pie data={data} options={options} />
    </div>
  )
}
