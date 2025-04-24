import ProjectCard from './ProjectCard'
import type { ProjectData } from '@/types/recondashboard'

interface ProjectListProps {
  projects: ProjectData[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
