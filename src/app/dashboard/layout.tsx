import { ThemeProvider } from '@/components/ui/theme-provider'
import DashboardLayout from '@/components/dashboard/layout/app-sidebar'

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
      <div className="dark:bg-background">
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </ThemeProvider>
  )
}
