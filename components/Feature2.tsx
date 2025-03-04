import Image from 'next/image'

const Feature2 = () => {
  return (
    <section className='max-w-[90rem] mx-auto my-[6rem] overflow-x-hidden relative md:h-[512px]'>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-24 h-full max-w-[1280px] pr-6 md:pr-0">
            <div className="relative h-[300px] md:h-full w-full bg-red-200">  
                <Image
                    src="/3_2 screen mockup.png"
                    alt="Screen Mockup"
                    fill
                />
            </div>
            <div className="w-full p-6 md:p-0">
                <Image
                    alt="Icon"
                    src="/Featured2 icon.png"
                    width={48}
                    height={48}
                    className='object-cover'
                />
                <h2 className='text-3xl font-semibold mt-6'>Let AI do the Work</h2>
                <p className='text-lg mt-4'>Watch as Ai automatically matches your transactions based on amount, description and date.</p>
                <div className="flex items-center gap-3 mt-8">
                    <Image
                        src="/Check icon.png"
                        alt="Check icon"
                        width={28}
                        height={28}
                        className='object-cover shrink-0'
                    />
                    <p className='text-lg text-[rgba(71, 84, 103, 1)]'>Instant transaction matching</p>
                </div>
                <div className="flex items-center gap-3 my-4">
                    <Image
                        src="/Check icon.png"
                        alt="Check icon"
                        width={28}
                        height={28}
                        className='object-cover shrink-0'
                    />
                    <p className='text-lg text-[rgba(71, 84, 103, 1)]'>Clear status indicators: Matched, Missing, Unmatched, Duplicate</p>
                </div>
                <div className="flex items-center gap-3 mt-8">
                    <Image
                        src="/Check icon.png"
                        alt="Check icon"
                        width={28}
                        height={28}
                        className='object-cover shrink-0'
                    />
                    <p className='text-lg text-[rgba(71, 84, 103, 1)]'>Manually match and override transactions.</p>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Feature2