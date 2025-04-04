import DashboardLayout from '@/components/dashboard/layout/dashboard-layout'
import { ThemeProvider } from '@/components/ui/theme-provider'

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DashboardLayout>{children}</DashboardLayout>
    </ThemeProvider>
  )
}
