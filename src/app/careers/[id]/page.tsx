"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/Footer";
import { Button } from "@/src/components/ui/button";
import { jobListings } from "@/src/data/jobDetails";

const JobDetails = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const jobId = parseInt(params.id, 10);
  const job = jobListings.find((job) => job.id === jobId);

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="w-full">
      <div className="pt-[50px] md:pt-[56px] w-full lg:px-[120px] px-[24px] flex flex-col items-center gap-[40px] md:gap-[128px]">
        <div className="w-full flex flex-col md:flex-row gap-[40px] md-gap-0 md:justify-between">
          <div className="w-full md:max-w-[690px]">
            <h2 className="text-[#0A0A0A] font-medium text-[32px] lg:text-[44px] mb-[19px]">
              {job.title}
            </h2>
            <div className="w-full mb-[53px]">
              <h3 className="font-medium text-[#0A0A0A] text-[24px] md:text-[28px] mb-[6px]">
                Job Description
              </h3>
              <p className="text-[#525252] md:text-[18px] leading-[27px]">
                {job.description}
              </p>
            </div>
            <div className="w-full mb-[53px]">
              <h3 className="font-medium text-[#0A0A0A] text-[24px] md:text-[28px] mb-[6px]">
                Key Responsibilities
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                {job.keyResponsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <h3 className="font-medium text-[#0A0A0A] text-[24px] md:text-[28px] mb-[6px]">
                Qualifications
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                {job.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-[282px]">
            <div className="w-full mb-[27px] bg-[#FAFAFA] border border-[#CBD5E1] rounded-[6px] p-[17px]">
              <h4 className="text-[20px] font-medium text-[#0A0A0A] mb-[14px]">
                About the job
              </h4>
              <div className="mb-7">
                <p className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Deadline
                </p>
                <p className="text-[18px] text-[#525252]">{job.deadline}</p>
              </div>
              <div className="mb-7">
                <p className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Work mode
                </p>
                <p className="text-[18px] text-[#525252]">{job.workMode}</p>
              </div>
              <div className="mb-7">
                <p className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Job-type
                </p>
                <p className="text-[18px] text-[#525252]">{job.jobType}</p>
              </div>
              <div className="mb-7">
                <p className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Experience level
                </p>
                <p className="text-[18px] text-[#525252]">
                  {job.experienceLevel}
                </p>
              </div>
              <div>
                <p className="leading-[24px] mb-[5px] font-medium text-[#0A0A0A]">
                  Salary
                </p>
                <p className="text-[18px] text-[#525252]">{job.salary}</p>
              </div>
            </div>
            <div className="w-full mb-[27px] bg-[#FAFAFA] border border-[#CBD5E1] rounded-[6px] p-[17px]">
              <h4 className="text-[20px] font-medium text-[#0A0A0A] mb-[14px]">
                Benefits
              </h4>
              <ul className="list-disc pl-6 flex flex-col gap-7">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Button
          className="w-full sm:w-[253px] h-[64px] mb-4 md:mb-[64px]"
          onClick={() => router.push(`/careers/${jobId}/apply`)}
        >
          Apply Now
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetails;
