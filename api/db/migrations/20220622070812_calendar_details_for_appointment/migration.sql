-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "attendees" TEXT[],
ADD COLUMN     "calendarId" TEXT,
ADD COLUMN     "calendarLink" TEXT;
