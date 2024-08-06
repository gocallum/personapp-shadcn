# Project Overview

This project is a web application built using Next.js 14 with both client and server components. The application showcases a table of people that can be edited or added using a modal form. The project leverages Shadcn components for UI and state management, Zod for form validation, and React Hook Form for managing form state. Server actions are used to handle data operations and cache invalidation.

## Directory Structure

### `/app/people`
- **page.tsx**: Server-side component that contains the table and calls the dialog with the form (a client-side component). Utilizes server-actions for data manipulation and revalidation of the path to refresh the cache and update the table.
- **actions.ts**: Contains server actions to create, update, delete, and fetch people. Uses `revalidatePath` to refresh the cache. For now, data is stored in memory but will be persisted in a database via Prisma in the future.
- **components/ui**: Contains Shadcn UI components installed using `npx`.

### `/apps/person`
- **page.tsx**: Client-side component experimenting with the Data Table Shadcn component. This component is more sophisticated than the standard Shadcn Table component.
- **person-form.tsx**: Contains the Shadcn Dialog component to form the modal. This component also includes a form that uses Zod for validation and receives hooks from the parent to update the table on save.

### `/lib`
- **logger.ts**: Uses Pino logger for logging, helping with debugging across server components.
- **model.ts**: Defines the `Person` interface used throughout the app.
- **util.ts**: Contains utility functions used by Shadcn components.

### `/components/ui`
- Contains all Shadcn components installed via `npx`.

### `/app`
- **header.ts**: Serves as a simple navigation bar.
- **layout.tsx**: Wraps all children components with a global layout using Shadcn components.

## Layout Component

**File: /app/layout.tsx**
```typescript
import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import AppHeader from "./header"
import { cn } from "@/lib/utils"

type RootLayoutProps = {
  children: React.ReactNode;
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AppHeader />
        {children}
      </body>
    </html>
  )
}
```
### Key Logic
- **AppHeader**: Adds a navigation bar to the layout.
- **children**: Wraps all child components within the global layout.

## Server Actions

**File: /app/people/actions.ts**
```typescript
"use server"

import { Person } from '@/lib/model';
import { revalidatePath } from 'next/cache';
import { logger } from '@/lib/logger';

const validation_path: string = "/people";

let mockData: Person[] = [
    { id: 1, firstname: "John", lastname: "Doe", phone: "1234567890" },
    { id: 2, firstname: "Jane", lastname: "Smith", phone: "2345678901" },
    { id: 3, firstname: "Bob", lastname: "Brown", phone: "3456789012" },
];

async function getPeople(): Promise<Person[]> {
    logger.debug('Fetching persons');
    return mockData;
}

async function createPerson(person: Person): Promise<Person> {
    const newPerson = { ...person, id: Math.floor(Math.random() * 1000) };
    mockData.push(newPerson); // Add to the array
    logger.debug({ newPerson }, 'Created a new person');
    revalidatePath(validation_path); // Revalidate the path
    return newPerson;
}

async function updatePerson(person: Person): Promise<Person> {
    const index = mockData.findIndex(p => p.id === person.id);
    if (index !== -1) {
        mockData[index] = person; // Update the array
        logger.debug({ person }, 'Updated person');
    } else {
        logger.warn({ person }, 'Person not found for update');
    }
    revalidatePath(validation_path); // Revalidate the path
    return person;
}

async function deletePerson(formData: FormData): Promise<void> {
    const id = parseInt(formData.get("id") as string, 10);
    mockData = mockData.filter(person => person.id !== id);
    logger.debug({ id }, 'Deleted person');
    revalidatePath(validation_path); // Revalidate the path
}

export { getPeople, createPerson, updatePerson, deletePerson };
```
### Key Logic
- **Data Handling**: For now, data is stored in memory. In the future, it will be persisted in a database via Prisma.
- **Logging**: Uses Pino logger for logging actions.
- **Revalidation**: Uses `revalidatePath` to refresh the cache and update the table when data changes.

## Libraries Used

- **Next.js**: Framework for building the application.
- **React Hook Form**: For managing form state.
- **Zod**: For form validation.
- **Pino**: Logger for server-side components.
- **Shadcn**: UI components to handle state and UI logic.
- **React Table**: For rendering tables and managing table state.