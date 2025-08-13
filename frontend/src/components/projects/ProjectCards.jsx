import ProjectImage from "./ProjectImage";
import ProjectProgress from "./ProjectProgress";
import ProjectInfo from "./ProjectInfo";
import ProjectLocation from "./ProjectLocation";
import ProjectStats from "./ProjectStats";
import ProjectCTA from "./ProjectCTA";

const ProjectCards = ({ project, categories, getCategoryIcon, calculateProgress }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <ProjectImage
        image={project.image}
        title={project.title}
        type={project.type}
        categories={categories}
        getCategoryIcon={getCategoryIcon}
      />

      <div className="p-4">
        <ProjectProgress
          current={project.current}
          goal={project.goal}
          calculateProgress={calculateProgress}
        />

        <ProjectInfo project={project} />
        <ProjectLocation location={project.location} />
        

        <ProjectStats supporters={project.supporters} daysLeft={project.daysLeft} />

        <ProjectCTA />
      </div>
    </div>
  );
};

export default ProjectCards;
