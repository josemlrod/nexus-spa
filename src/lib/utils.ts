import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

export function isSubmittingForm(formState: "idle" | "submitting" | "loading") {
  if (formState !== 'idle') {
    return true;
  }

  return false;
}
