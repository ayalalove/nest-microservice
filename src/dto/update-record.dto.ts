import { z } from 'zod';

export const UpdateRecordSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9 ]+$/, 'Must be alphanumeric'),
  create_date: z.string().refine(
    (dateStr) => {
      const date = new Date(dateStr);
      const now = new Date();

      const dateOnly = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const todayOnly = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      return dateOnly.getTime() === todayOnly.getTime();
    },
    { message: 'Date must be today (not past or future)' }
  ),
  location: z.object({
    latitude: z.number().min(29).max(33),
    longitude: z.number().min(34).max(36),
  }),
  alerts: z.array(z.number()),
  status: z.number().min(1).max(6),
  description: z.string().optional(),
});

export type UpdateRecordDto = z.infer<typeof UpdateRecordSchema>;
