import { resolveFunctionOrPrimitive } from './resolve-function-or-primitive';
import { tryCatch } from './tryCatch';

const isProduction: boolean = process.env.NODE_ENV === 'production';
const prefix: string = 'Invariant failed';

/**
 * @description
 * to resolve this error:
 * Assertions require every name in the call target to be declared with an explicit type annotation
 *
 * use function declaration instead of arrow function
 */
function invariant(
  condition: unknown,
  message?: string | ((cause: unknown) => string),
  overwrite = true,
): asserts condition {
  const [result, error] = tryCatch(() => resolveFunctionOrPrimitive(condition));

  if (result) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  }

  const customMessage = resolveFunctionOrPrimitive(message, error ?? prefix);

  const fullMessage = customMessage ? `${prefix}: ${customMessage}` : prefix;

  if (overwrite) {
    throw new Error(fullMessage);
  }

  throw error;
}

export { invariant, tryCatch };
