import { servicesTeaserQuery } from '@/sanity/lib/queries';
import { InferType } from 'groqd';

export type ServiceTeaserData = InferType<typeof servicesTeaserQuery>[number];
