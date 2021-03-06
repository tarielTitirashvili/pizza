import React from 'react';
import { sortTypes } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedType } from '../redux/slices/filter/filterSlice';
import { selectSelectedType } from '../redux/slices/filter/selectors';

type Props = {
  selectedSortType: string;
};

const Sort = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { selectedSortType } = props;
  const dispatch = useDispatch();
  const selectedType = useSelector(selectSelectedType);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const clickOutside = (e: MouseEvent) => {
    if (sortRef.current !== null) {
      if (!e.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Sort by:</b>
        <div onClick={() => setIsOpen(!isOpen)}>
          <svg
            style={{ transform: `${isOpen ? 'rotate(0)' : 'rotate(180deg)'}` }}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <span>{selectedSortType}</span>
        </div>
      </div>
      {isOpen && (
        <div onClick={() => setIsOpen(!isOpen)} className="sort__popup">
          <ul>
            {sortTypes.map((sortType, i) => (
              <li
                className={selectedType === i ? 'active' : ''}
                onClick={() => dispatch(setSelectedType(i))}
                key={sortType.title}>
                {sortType.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
