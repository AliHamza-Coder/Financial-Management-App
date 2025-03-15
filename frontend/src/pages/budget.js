import BudgetManager from '@/components/Budget'
import Sidebar from '@/components/Sidebar'

const budget = () => {
  return (
    <div style={{ display: 'flex' }}>
        <Sidebar/>
        <BudgetManager />
    </div>
  )
}

export default budget
