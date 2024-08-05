'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AppInfo: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
            <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                <CardHeader className="mb-4">
                    <h2 className="text-center text-3xl font-bold">
                        Welcome to the Person Management App
                    </h2>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-gray-700 mb-4">
                        This application is designed to help you manage a list of people, including their contact information. You can add, edit, and delete person records with ease. The application leverages modern technologies such as Next.js, TypeScript, and server actions to ensure a seamless experience.
                    </p>
                    <Separator className="my-4" />
                    <h3>
                        Features:
                    </h3>
                    <ul className="list-disc list-inside mb-4">
                        <li className="text-gray-700 mb-2">Add new persons to the list</li>
                        <li className="text-gray-700 mb-2">Edit existing person details</li>
                        <li className="text-gray-700 mb-2">Delete persons from the list</li>
                        <li className="text-gray-700 mb-2">Real-time validation and error handling</li>
                        <li className="text-gray-700 mb-2">Responsive and user-friendly interface</li>
                    </ul>
                    <Separator className="my-4" />
                    <div className="flex justify-center">
                        <Button>
                            Get Started
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AppInfo;
