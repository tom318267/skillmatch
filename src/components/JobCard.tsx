import React, { FC } from "react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  postedDate: string;
  type: string;
}

const JobCard: FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  description,
  postedDate,
  type,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:translate-y-[-2px] hover:shadow-md">
      <div className="mb-4">
        <h3 className="m-0 text-xl font-semibold text-gray-800">{title}</h3>
        <span className="mt-1 block text-sm text-gray-600">{company}</span>
      </div>

      <div className="text-gray-600">
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center text-gray-500">📍 {location}</span>
          <span className="flex items-center text-gray-500">{type}</span>
          {salary && (
            <span className="flex items-center text-gray-500">💰 {salary}</span>
          )}
        </div>

        <p className="my-4 text-sm leading-relaxed">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">Posted {postedDate}</span>
          <button className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
