import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectList from './ProjectList'
import type { ProjectData } from '@/types/recondashboard'

interface ProjectTabsProps {
  projects: ProjectData[]
}

export default function ProjectTabs({ projects }: ProjectTabsProps) {
  const inProgressProjects = projects.filter(
    (project) => project.status === 'in-progress'
  )
  const completedProjects = projects.filter(
    (project) => project.status === 'completed'
  )

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-6 h-11 w-full items-start bg-muted p-1">
        <TabsTrigger
          value="all"
          className="flex-1 rounded-lg py-3 text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border dark:data-[state=active]:border-border"
        >
          All Projects
        </TabsTrigger>
        <TabsTrigger
          value="in-progress"
          className="flex-1 rounded-lg py-3 text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border dark:data-[state=active]:border-border"
        >
          In Progress
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="flex-1 rounded-lg py-3 text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border dark:data-[state=active]:border-border"
        >
          Completed
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-0">
        <ProjectList projects={projects} />
      </TabsContent>

      <TabsContent value="in-progress" className="mt-0">
        <ProjectList projects={inProgressProjects} />
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <ProjectList projects={completedProjects} />
      </TabsContent>
    </Tabs>
  )
}
