import ProjectImage from "./ProjectImage";
import ProjectProgress from "./ProjectProgress";
import ProjectInfo from "./ProjectInfo";
import ProjectLocation from "./ProjectLocation";
import ProjectStats from "./ProjectStats";
import ProjectCTA from "./ProjectCTA";

const ProjectCards = ({project, isLaunch}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <ProjectImage
        image={project.image}
        title={project.title}
        type={project.type}
      />

      <div className="p-4">
        <ProjectProgress
          current={project.current}
          goal={project.goal}
         isLaunch={isLaunch}
        />

        <ProjectInfo
          title={project.title}
          host={project.host}
          description={project.description}
          />
        
        <ProjectLocation location={project.location} />
        

        <ProjectStats supporters={project.supporters}
          daysLeft={project.daysLeft}
          isLaunch={isLaunch}
          />
        
      <ProjectCTA  isLaunch={isLaunch}/>
      </div>
    </div>
  );
};

export default ProjectCards;
