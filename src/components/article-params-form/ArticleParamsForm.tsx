import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClick } from 'src/ui/radio-group/hooks/useOutsideClick';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const asideRef = useRef<HTMLElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	const handleToggle = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	useOutsideClick([asideRef, arrowRef], handleClose);

	const handleFontFamilyChange = useCallback(
		(option: (typeof fontFamilyOptions)[0]) => {
			setFormState((prev) => ({
				...prev,
				fontFamilyOption: option,
			}));
		},
		[]
	);

	const handleFontSizeChange = useCallback(
		(option: (typeof fontSizeOptions)[0]) => {
			setFormState((prev) => ({
				...prev,
				fontSizeOption: option,
			}));
		},
		[]
	);

	const handleFontColorChange = useCallback(
		(option: (typeof fontColors)[0]) => {
			setFormState((prev) => ({
				...prev,
				fontColor: option,
			}));
		},
		[]
	);

	const handleBackgroundColorChange = useCallback(
		(option: (typeof backgroundColors)[0]) => {
			setFormState((prev) => ({
				...prev,
				backgroundColor: option,
			}));
		},
		[]
	);

	const handleContentWidthChange = useCallback(
		(option: (typeof contentWidthArr)[0]) => {
			setFormState((prev) => ({
				...prev,
				contentWidth: option,
			}));
		},
		[]
	);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			onApply(formState);
		},
		[formState, onApply]
	);

	const handleResetForm = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			setFormState(defaultArticleState);
			onReset();
		},
		[onReset]
	);

	return (
		<>
			<ArrowButton ref={arrowRef} isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<div>
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
							placeholder='Выберите шрифт'
						/>
						<Separator />

						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
						<Separator />

						<Select
							title='Цвет текста'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							placeholder='Выберите цвет текста'
						/>
						<Separator />

						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
							placeholder='Выберите цвет фона'
						/>
						<Separator />

						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
							placeholder='Выберите ширину'
						/>
						<Separator />
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
