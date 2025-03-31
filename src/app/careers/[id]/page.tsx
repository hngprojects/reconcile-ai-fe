'use client'
import { useParams, useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { jobListings } from '@/data/jobDetails'
import { motion } from 'framer-motion'

const JobDetails = () => {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const jobId = parseInt(params.id, 10)
  const job = jobListings.find((job) => job.id === jobId)

  if (!job) {
    return <div>Job not found</div>
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  }

  return (
    <div className="w-full">
      <motion.div
        className="flex w-full flex-col items-center gap-[40px] px-[24px] pt-[50px] md:gap-[128px] md:pt-[56px] lg:px-[120px]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="md-gap-0 flex w-full flex-col gap-[40px] md:flex-row md:justify-between">
          {/* Main content area */}
          <motion.div
            className="w-full md:max-w-[690px]"
            variants={sectionVariants}
          >
            <motion.h2
              className="mb-[19px] text-[32px] font-medium text-[#0A0A0A] lg:text-[44px]"
              variants={itemVariants}
            >
              {job.title}
            </motion.h2>
            <motion.div className="mb-[53px] w-full" variants={itemVariants}>
              <motion.h3
                className="mb-[6px] text-[24px] font-medium text-[#0A0A0A] md:text-[28px]"
                variants={itemVariants}
              >
                Job Description
              </motion.h3>
              <motion.p
                className="leading-[27px] text-[#525252] md:text-[18px]"
                variants={itemVariants}
              >
                {job.description}
              </motion.p>
            </motion.div>
            <motion.div className="mb-[53px] w-full" variants={itemVariants}>
              <motion.h3
                className="mb-[6px] text-[24px] font-medium text-[#0A0A0A] md:text-[28px]"
                variants={itemVariants}
              >
                Key Responsibilities
              </motion.h3>
              <motion.ul
                className="list-disc space-y-1 pl-6"
                variants={itemVariants}
              >
                {job.keyResponsibilities.map((responsibility, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {responsibility}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div className="w-full" variants={itemVariants}>
              <motion.h3
                className="mb-[6px] text-[24px] font-medium text-[#0A0A0A] md:text-[28px]"
                variants={itemVariants}
              >
                Qualifications
              </motion.h3>
              <motion.ul
                className="list-disc space-y-1 pl-6"
                variants={itemVariants}
              >
                {job.qualifications.map((qualification, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {qualification}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* Sidebar area - Now appears at the same time as main content */}
          <motion.div
            className="w-full md:w-[282px]"
            variants={sectionVariants}
          >
            <motion.div
              className="mb-[27px] w-full rounded-[6px] border border-[#CBD5E1] bg-[#FAFAFA] p-[17px]"
              variants={cardVariants}
              transition={{ delay: 0, duration: 0.5 }}
            >
              <motion.h4
                className="mb-[14px] text-[20px] font-medium text-[#0A0A0A]"
                variants={itemVariants}
              >
                About the job
              </motion.h4>
              <motion.div className="mb-7" variants={itemVariants}>
                <p className="mb-[5px] leading-[24px] font-medium text-[#0A0A0A]">
                  Deadline
                </p>
                <p className="text-[18px] text-[#525252]">{job.deadline}</p>
              </motion.div>
              <motion.div className="mb-7" variants={itemVariants}>
                <p className="mb-[5px] leading-[24px] font-medium text-[#0A0A0A]">
                  Work mode
                </p>
                <p className="text-[18px] text-[#525252]">{job.workMode}</p>
              </motion.div>
              <motion.div className="mb-7" variants={itemVariants}>
                <p className="mb-[5px] leading-[24px] font-medium text-[#0A0A0A]">
                  Job-type
                </p>
                <p className="text-[18px] text-[#525252]">{job.jobType}</p>
              </motion.div>
              <motion.div className="mb-7" variants={itemVariants}>
                <p className="mb-[5px] leading-[24px] font-medium text-[#0A0A0A]">
                  Experience level
                </p>
                <p className="text-[18px] text-[#525252]">
                  {job.experienceLevel}
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="mb-[5px] leading-[24px] font-medium text-[#0A0A0A]">
                  Salary
                </p>
                <p className="text-[18px] text-[#525252]">{job.salary}</p>
              </motion.div>
            </motion.div>
            <motion.div
              className="mb-[27px] w-full rounded-[6px] border border-[#CBD5E1] bg-[#FAFAFA] p-[17px]"
              variants={cardVariants}
              whileHover="hover"
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.h4
                className="mb-[14px] text-[20px] font-medium text-[#0A0A0A]"
                variants={itemVariants}
              >
                Benefits
              </motion.h4>
              <motion.ul
                className="flex list-disc flex-col gap-7 pl-6"
                variants={itemVariants}
              >
                {job.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {benefit}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            className="mb-4 h-[64px] w-full cursor-pointer sm:w-[253px] md:mb-[64px]"
            onClick={() => router.push(`/careers/${jobId}/apply`)}
          >
            Apply Now
          </Button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  )
}

export default JobDetails
