import React from 'react';

const Dashboard = ({ user }) => {
    return (
        <div className="flex justify-center mt-10">
            <div className="w-1/2 bg-gray-100 p-6 rounded-lg mr-4">
                <h2 className="text-lg font-bold mb-4">User Details</h2>
                <div>
                    <p><span className="font-semibold">Name:</span> {user.name}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <p><span className="font-semibold">Role:</span> {user.role}</p>
                    <p><span className="font-semibold">Department:</span> {user.department}</p>
                </div>
            </div>
            <div className="w-1/2 bg-gray-100 p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Menu</h2>
                <ul>
                    {user.role === 'HOD' && (
                        <>
                            <li>Approved Forms</li>
                            <li>Pending Forms</li>
                        </>
                    )}
                    {user.role === 'Faculty' && (
                        <>
                            <li>Approved Forms</li>
                            <li>Pending Forms</li>
                            <li>Fill SP101 Form</li>
                            <li>Fill SP102 Form</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
