import Footer from "@/src/components/Footer";
import { Button } from "@/src/components/ui/button";

const JobDetails = () => {
  return (
    <div className="w-full">
      <div className="pt-[50px] md:pt-[56px] w-full lg:px-[120px] px-[24px] flex flex-col items-center gap-[40px] md:gap-[128px]">
        <div className="w-full flex flex-col md:flex-row gap-[40px] md-gap-0 md:justify-between">
          <div className="w-full md:max-w-[690px]">
            <h2 className="text-[#0A0A0A] font-medium text-[32px] lg:text-[44px] mb-[19px]">
              Product Designer
            </h2>
            <div className="w-full mb-[53px]">
              <h3 className="font-medium text-[#0A0A0A] text-[24px] md:text-[28px] mb-[6px]">
                Job Description
              </h3>
              <p className="text-[#525252] md:text-[18px] leading-[27px]">
                We are looking for a talented and passionate Product Designer to
                join our dynamic team. As a Product Designer at the Company, you
                will play a critical role in shaping the user experience and
                visual design of our products. You will collaborate closely with
                cross-functional teams, including product managers, engineers,
                and marketers, to create intuitive and aesthetically pleasing
                designs that meet user needs and business goals.
              </p>
            </div>
            <div className="w-full mb-[53px]">
              <h3 className="font-medium text-[#0A0A0A] text-[24px] md:text-[28px] mb-[6px]">
                Key Responsibilities
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Conduct user research and gather insights to inform design
                  decisions
                </li>
                <li>
                  Create wireframes, prototypes, and high-fidelity mockups for
                  new features and product enhancements
                </li>
                <li>
                  Collaborate with the product team to define design
                  requirements and ensure alignment with business objectives
                </li>
                <li>
                  Develop and maintain design systems to ensure consistency
                  across all products
                </li>
                <li>
                  Conduct usability testing and iterate on designs based on user
                  feedback
                </li>
                <li>
                  Stay up-to-date with industry trends and best practices in
                  design and user experience
                </li>
              </ul>
            </div>
            <div className="w-full">
              <h3 className="font-medium text-[#0A0A0A] text-[24px] md:text-[28px] mb-[6px]">
                Qualifications
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Bachelor&apos;s degree in Design, Human-Computer Interaction,
                  or a related field
                </li>
                <li>
                  3+ years of experience in product design or a similar role
                </li>
                <li>
                  Proficiency in design tools such as Figma, Sketch, Adobe XD,
                  or similar
                </li>
                <li>
                  Strong portfolio showcasing your design process,
                  problem-solving skills, and final products
                </li>
                <li>Excellent communication and collaboration skills</li>
                <li>
                  Ability to think critically and solve complex design
                  challenges
                </li>
                <li>Knowledge of HTML, CSS, and JavaScript is a plus</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-[282px]">
            <div className="w-full mb-[27px] bg-[#FAFAFA] border border-[#CBD5E1] rounded-[6px] p-[17px]">
              <h4 className="text-[20px] font-medium text-[#0A0A0A] mb-[14px]">
                About the job
              </h4>
              <div className="mb-7">
                <h5 className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Deadline
                </h5>
                <p className="text-[18px] text-[#525252]">July 19th, 2024</p>
              </div>
              <div className="mb-7">
                <h5 className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Work mode
                </h5>
                <p className="text-[18px] text-[#525252]">On-site</p>
              </div>
              <div className="mb-7">
                <h5 className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Job-type
                </h5>
                <p className="text-[18px] text-[#525252]">Internship</p>
              </div>
              <div className="mb-7">
                <h5 className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Experience level
                </h5>
                <p className="text-[18px] text-[#525252]">2-3years</p>
              </div>
              <div>
                <h5 className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Salary
                </h5>
                <p className="text-[18px] text-[#525252]">$500k-$900k</p>
              </div>
            </div>
            <div className="w-full mb-[27px] bg-[#FAFAFA] border border-[#CBD5E1] rounded-[6px] p-[17px]">
              <h4 className="text-[20px] font-medium text-[#0A0A0A] mb-[14px]">
                Benefits
              </h4>
              <ul className="list-disc pl-6 flex flex-col gap-7">
                <li>Competitive salary and benefits</li>
                <li>Flexible working hours and remote work options</li>
                <li>Opportunities for professional growth and development</li>
                <li>A collaborative and inclusive work environment</li>
              </ul>
            </div>
          </div>
        </div>
        <Button className="w-full sm:w-[253px] h-[64px] mb-4 md:mb-[64px]">
          Apply Now
        </Button>
      </div>
      <Footer />
    </div>
  );
};
export default JobDetails;
