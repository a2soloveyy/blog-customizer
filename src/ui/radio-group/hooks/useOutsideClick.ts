import { useEffect, RefObject } from 'react';

export const useOutsideClick = (
	refs: RefObject<HTMLElement>[],
	callback: () => void
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const isInside = refs.some(
				(ref) => ref.current && ref.current.contains(event.target as Node)
			);
			if (!isInside) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [refs, callback]);
};
