import type { ParamMatcher } from '@sveltejs/kit';
import { localeFromSegment } from '$lib/i18n/config';

export const match: ParamMatcher = (param) => localeFromSegment(param) !== null;
