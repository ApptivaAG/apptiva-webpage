import { aboutPageQuery } from '@/sanity/lib/queries';
import { InferType } from 'groqd';

export type AboutPageQueryData = InferType<typeof aboutPageQuery>;
