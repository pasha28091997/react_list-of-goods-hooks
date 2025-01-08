import React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const ALPHABETICALLY = 'Sort alphabetically';
  const LENGTH = 'Sort by length';

  const getVisibleGoods = () => {
    let visibleGoods = [...goods];

    if (sortField) {
      if (sortField === ALPHABETICALLY) {
        visibleGoods = visibleGoods.sort((a, b) => a.localeCompare(b));
      } else if (sortField === LENGTH) {
        visibleGoods = visibleGoods.sort((a, b) => a.length - b.length);
      }
    }

    if (isReversed) {
      visibleGoods = visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const applySorting = (field: string) => {
    setSortField(field);
  };

  const resetList = () => {
    setGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  const isModified = () =>
    goods !== goodsFromServer || isReversed || sortField !== '';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== ALPHABETICALLY,
          })}
          onClick={() => applySorting(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== LENGTH,
          })}
          onClick={() => applySorting(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isModified() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getVisibleGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
// import React from 'react';
// import 'bulma/css/bulma.css';
// import './App.scss';

// export const goodsFromServer = [
//   'Dumplings',
//   'Carrot',
//   'Eggs',
//   'Ice cream',
//   'Apple',
//   'Bread',
//   'Fish',
//   'Honey',
//   'Jam',
//   'Garlic',
// ];

// export const App: React.FC = () => {
//   return (
//     <div className="section content">
//       <div className="buttons">
//         <button type="button" className="button is-info is-light">
//           Sort alphabetically
//         </button>

//         <button type="button" className="button is-success is-light">
//           Sort by length
//         </button>

//         <button type="button" className="button is-warning is-light">
//           Reverse
//         </button>

//         <button type="button" className="button is-danger is-light">
//           Reset
//         </button>
//       </div>

//       <ul>
//         <ul>
//           <li data-cy="Good">Dumplings</li>
//           <li data-cy="Good">Carrot</li>
//           <li data-cy="Good">Eggs</li>
//           <li data-cy="Good">Ice cream</li>
//           <li data-cy="Good">Apple</li>
//           <li data-cy="Good">...</li>
//         </ul>
//       </ul>
//     </div>
//   );
// };
