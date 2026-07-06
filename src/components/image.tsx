import type * as React from 'react';
import { SanityImage, type WrapperProps } from 'sanity-image';
import { dataset, projectId } from '../sanity/client';

export const Image = <T extends React.ElementType = 'img'>(
	props: WrapperProps<T>,
) => <SanityImage projectId={projectId} dataset={dataset} {...props} />;
