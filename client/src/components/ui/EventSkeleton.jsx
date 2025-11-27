import React from 'react';

const EventSkeleton = () => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 bg-gray-700/50" />

            <div className="p-5 space-y-4">
                {/* Badges Skeleton */}
                <div className="flex justify-between">
                    <div className="h-6 w-20 bg-gray-700/50 rounded-full" />
                    <div className="h-6 w-16 bg-gray-700/50 rounded-full" />
                </div>

                {/* Title Skeleton */}
                <div className="h-7 w-3/4 bg-gray-700/50 rounded" />

                {/* Description Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-700/50 rounded" />
                    <div className="h-4 w-2/3 bg-gray-700/50 rounded" />
                </div>

                {/* Details Skeleton */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-700/50 rounded-full" />
                        <div className="h-4 w-32 bg-gray-700/50 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-700/50 rounded-full" />
                        <div className="h-4 w-24 bg-gray-700/50 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-700/50 rounded-full" />
                        <div className="h-4 w-40 bg-gray-700/50 rounded" />
                    </div>
                </div>

                {/* Button Skeleton */}
                <div className="h-4 w-24 bg-gray-700/50 rounded mt-4" />
            </div>
        </div>
    );
};

export default EventSkeleton;
