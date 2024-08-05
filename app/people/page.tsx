'use server';
import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { deletePerson, getPeople } from "./actions";
import { Person } from '@/lib/model';
import { PersonForm } from './person-form';

const PersonPage: React.FC = async() => {
    const people: Person[] = await getPeople();

    return (
        <Card>
            <CardHeader className="w-[450px]">
                <div className="flex justify-between items-center">
                    <h3>Person List</h3>
                </div>
            </CardHeader>
            <CardContent className="px-8">
                <PersonForm person={undefined}/>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>First name</TableHead>
                            <TableHead>Last name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {people.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.firstname}</TableCell>
                                <TableCell>{person.lastname}</TableCell>
                                <TableCell>{person.phone}</TableCell>
                                <TableCell>
                                    <PersonForm person={person} />
                                    <form action={deletePerson}>
                                    <input type="hidden" name="id" value={person.id} />
                                    <Button type='submit'>Delete</Button> </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default PersonPage;
