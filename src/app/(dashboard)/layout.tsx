import NavBar from '@/components/navbar/NavBar'

interface RootLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className='max-w-screen-xl px-5 pb-10 pt-24 md:mx-auto'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
