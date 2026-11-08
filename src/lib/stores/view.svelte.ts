import { defaultTitleMode, type TitleMode } from '$lib/config/typography';

/** Preferências de apresentação que não pertencem à navegação. */
export const view = $state<{ titleMode: TitleMode }>({ titleMode: defaultTitleMode });
