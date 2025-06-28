import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectList from './ProjectList'
import type { ProjectData } from '@/types/recondashboard'

interface ProjectTabsProps {
  projects: ProjectData[];
  isLoading: boolean;
  error: string | null;
}

export default function ProjectTabs({ projects, isLoading, error }: ProjectTabsProps) {
  const inProgressProjects = projects.filter(
    (project) => project.status === 'in-progress'
  )
  const completedProjects = projects.filter(
    (project) => project.status === 'completed'
  )

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-md">
        <p className="font-medium">Error loading projects</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-6 h-11 w-full items-start bg-muted p-1">
        <TabsTrigger
          value="all"
          className="flex-1 rounded-lg py-3 text-muted-foreground data-[state=active]:bg-background dark:data-[state=active]:bg-[#000000] data-[state=active]:text-foreground dark:data-[state=active]:border dark:data-[state=active]:border-border cursor-pointer"
        >
          All Projects
        </TabsTrigger>
        <TabsTrigger
          value="in-progress"
          className="flex-1 rounded-lg py-3 text-muted-foreground data-[state=active]:bg-background dark:data-[state=active]:bg-[#000000] data-[state=active]:text-foreground dark:data-[state=active]:border dark:data-[state=active]:border-border cursor-pointer"
        >
          In Progress
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="flex-1 rounded-lg py-3 text-muted-foreground data-[state=active]:bg-background dark:data-[state=active]:bg-[#000000]  data-[state=active]:text-foreground dark:data-[state=active]:border dark:data-[state=active]:border-border cursor-pointerx  "
        >
          Completed
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-0">
        <ProjectList projects={projects} type="all" />
      </TabsContent>

      <TabsContent value="in-progress" className="mt-0">
        <ProjectList projects={inProgressProjects} type="in-progress" />
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <ProjectList projects={completedProjects} type="completed" />
      </TabsContent>
    </Tabs>
  )
}