import React from 'react'

const EducationPreview = ({resumeInfo}) => {
  return (
    <div className='my-5'>
        <h2 style={{color:resumeInfo?.themeColor}} className="text-center font=bold text-xm mb-2">Education Details</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {
            resumeInfo?.education.map((item , index)=>(
                <div className="" key={index}>
                    <h2 style={{color:resumeInfo?.themeColor}} className="text-sm font-bold">
                        {item?.universityName}
                    </h2>
                    <h2 className="text-sm flex justify-between">
                        {item?.degree} in {item?.major}
                        <span>
                            {item?.startDate} - {item?.endDate}
                        </span>
                    </h2>
                    <p className="text-xm my-2 text-justify"> 
                        {
                            item?.description
                        }
                    </p>
                </div>
            ))
        }
        
    </div>
  )
}

export default EducationPreview