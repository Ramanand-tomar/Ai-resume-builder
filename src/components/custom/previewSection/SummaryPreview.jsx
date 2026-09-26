import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
    <p className="text-justify text-sm">
        {resumeInfo?.summery}
    </p>
  )
}

export default SummaryPreview