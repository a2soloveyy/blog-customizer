import { forwardRef } from 'react';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = forwardRef<HTMLDivElement, ArrowButtonProps>(
	({ isOpen, onClick }, ref) => {
		return (
			<div
				ref={ref}
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				onClick={onClick}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				/>
			</div>
		);
	}
);

ArrowButton.displayName = 'ArrowButton';
