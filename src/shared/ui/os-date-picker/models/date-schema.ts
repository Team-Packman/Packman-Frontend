import z from 'zod';

type Year = `${number}${number}${number}${number}`;
type Month = `${'0'}${number}` | `${'1'}${'0' | '1' | '2'}`;
type Day = `${'0' | '1' | '2'}${number}` | `${'3'}${'0' | '1'}`;

type YYYYMMDD = `${Year}-${Month}-${Day}`;

const yyyymmddSchema = z.string().date();

const parseYYYYMMDD = (date: string) => yyyymmddSchema.parse(date) as YYYYMMDD;

export type { YYYYMMDD };

export { parseYYYYMMDD, yyyymmddSchema };
