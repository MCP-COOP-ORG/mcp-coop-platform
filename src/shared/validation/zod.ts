import { z } from "zod";

/**
 * Normalized field errors map from a Zod schema.
 * Keys correspond to schema field names, values are first error message per field.
 */
export type ZodFieldErrors<TSchema extends z.ZodTypeAny> = Partial<
  Record<keyof z.infer<TSchema>, string>
>;

interface ZodValidationSuccess<TSchema extends z.ZodTypeAny> {
  success: true;
  data: z.infer<TSchema>;
  errors: Record<string, never>;
}

interface ZodValidationFailure<TSchema extends z.ZodTypeAny> {
  success: false;
  data: undefined;
  errors: ZodFieldErrors<TSchema>;
}

export type ZodValidationResult<TSchema extends z.ZodTypeAny> =
  | ZodValidationSuccess<TSchema>
  | ZodValidationFailure<TSchema>;

/**
 * Helper to run safe Zod validation and get:
 * - parsed data (on success)
 * - normalized field error map (on failure)
 *
 * Can be reused in client forms and server handlers.
 */
export const validateWithZod = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown
): ZodValidationResult<TSchema> => {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: {},
    };
  }

  const fieldErrors: Record<string, string[] | undefined> =
    result.error.flatten().fieldErrors;
  const normalizedErrors: Record<string, string> = {};

  Object.entries(fieldErrors).forEach(([key, messages]) => {
    const firstMessage = messages?.[0];
    if (firstMessage) normalizedErrors[key] = firstMessage;
  });

  return {
    success: false,
    data: undefined,
    errors: normalizedErrors as ZodFieldErrors<TSchema>,
  };
};

