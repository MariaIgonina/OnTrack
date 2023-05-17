import React from "react";
type OutputDetailsType = {
  outputDetails: any
}
const OutputDetails = ({ outputDetails }: OutputDetailsType) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3 text-gray-100">
      <p className="text-sm">
        Status:{" "}
        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-800 bg-stone-100">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-800 bg-stone-100">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-800 bg-stone-100">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};
export default OutputDetails;