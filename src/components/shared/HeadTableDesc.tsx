import React from "react";

const HeadTableDesc = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default HeadTableDesc;
