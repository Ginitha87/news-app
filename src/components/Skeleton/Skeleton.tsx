import React from "react";
import { skeletonStructure } from "../../constants/appConstants";
import { SkeletonProps } from "./SkeletonTypes";
import "./Skeleton.css";

const Skeleton = ({ skeletonLength }: SkeletonProps) => (
  <>
    {Array.from({ length: skeletonLength }).map((_, index) => (
      <div key={index} className="custom-skeleton">
        <div className="skeleton-grid">
          {skeletonStructure.map((skeleton, idx) => (
            <div key={idx} className={skeleton.className}></div>
          ))}
        </div>

        <div className="skeleton-grid">
          <div className="skeleton large"></div>
        </div>
      </div>
    ))}
  </>
);

export default Skeleton;
