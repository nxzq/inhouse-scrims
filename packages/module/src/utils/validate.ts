import { z } from 'zod'

export const inputSchema = z
  .object({
    name: z.string(),
    elo: z
      .string()
      .toLowerCase()
      .regex(
        /(iron(\d{0}[1-4])?|bronze(\d{0}[1-4])?|silver(\d{0}[1-4])?|gold(\d{0}[1-4])?|platinum(\d{0}[1-4])?|diamond(\d{0}[1-4])?|master|grandmaster|challenger)/
      ),
    roles: z
      .string()
      .toLowerCase()
      .regex(/(top|jug|mid|bot|sup)/)
      .array()
      .min(0)
      .max(2),
  })
  .required()
  .array()
  .length(10)
  .min(10)
  .max(10)
