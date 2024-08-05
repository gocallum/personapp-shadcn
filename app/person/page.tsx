'use client';

import React, { useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PersonForm } from "./person-form";
import { Person } from "../../lib/model";

const mockData: Person[] = [
    { id: 1, firstname: "John", lastname: "Doe", phone: "1234567890" },
    { id: 2, firstname: "Jane", lastname: "Smith", phone: "2345678901" },
    { id: 3, firstname: "Bob", lastname: "Brown", phone: "3456789012" },
];

const PersonPage: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>(mockData);
    const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(undefined);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEdit = (person?: Person) => {
        setSelectedPerson(person);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedPerson(undefined);
    };

    const handleSavePerson = (savedPerson: Person) => {
        if (selectedPerson) {
            setPersons((prevPersons) =>
                prevPersons.map((person) =>
                    person.id === savedPerson.id ? savedPerson : person
                )
            );
        } else {
            setPersons((prevPersons) => [...prevPersons, savedPerson]);
        }
        handleCloseDialog();
    };

    const columns: ColumnDef<Person>[] = [
        { accessorKey: "firstname", header: "First Name" },
        { accessorKey: "lastname", header: "Last Name" },
        { accessorKey: "phone", header: "Phone" },
        {
            id: "actions",
            cell: ({ row }) => {
                const person = row.original;
                return (
                    <Button variant="outline" onClick={() => handleEdit(person)}>
                        Edit
                    </Button>
                );
            },
        },
    ];

    const table = useReactTable({
        data: persons,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleEdit(undefined)}>Add Person</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedPerson ? "Edit Person" : "Add Person"}</DialogTitle>
                        </DialogHeader>
                        <PersonForm
                            person={selectedPerson}
                            onClose={handleCloseDialog}
                            onSave={handleSavePerson}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h3>Person List</h3>
                    </div>
                </CardHeader>
                <CardContent className="px-8">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default PersonPage;
