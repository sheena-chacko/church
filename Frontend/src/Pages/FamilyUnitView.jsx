import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllFamilyUnitsAPI } from "../Services/familyUnitService";

const FamilyUnitView = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["family-units"],
        queryFn: getAllFamilyUnitsAPI
    });

    if (isLoading) {
        return <p className="text-center text-lg text-gray-600 animate-pulse">⏳ Loading Family Units...</p>;
    }

    if (isError) {
        return <p className="text-center text-lg text-red-600 font-semibold">❌ Failed to load Family Units</p>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-md rounded-xl border border-gray-200">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">🏡 Family Units</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="border p-4 text-lg">#</th>
                            <th className="border p-4 text-lg">Name</th>
                            <th className="border p-4 text-lg">Short Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((unit, index) => (
                            <tr 
                                key={unit._id} 
                                className="text-center text-gray-700 bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-200"
                            >
                                <td className="border p-4 font-medium">{index + 1}</td>
                                <td className="border p-4">{unit.name}</td>
                                <td className="border p-4">{unit.shortCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FamilyUnitView;
