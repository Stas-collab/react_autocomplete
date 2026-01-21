import React from 'react';
import { Person } from '../types/Person';
type Props = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  filteredPeople: Person[];
  onSelect: (person: Person) => void;
};

export const Suggestions: React.FC<Props> = ({
  onInputChange,
  query,
  filteredPeople,
  onSelect,
}) => (
  <>
    <div className="dropdown is-active">
      <div className="dropdown-trigger">
        <input
          type="text"
          placeholder="Enter a part of the name"
          className="input"
          data-cy="search-input"
          value={query}
          onChange={onInputChange}
        />
      </div>

      <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
        <div className="dropdown-content">
          {filteredPeople.map(person => (
            <div
              className="dropdown-item"
              data-cy="suggestion-item"
              key={person.slug}
              onClick={() => onSelect(person)}
            >
              <p className="has-text-link">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {query && filteredPeople.length === 0 && (
      <div
        className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
        role="alert"
        data-cy="no-suggestions-message"
      >
        <p className="has-text-danger">No matching suggestions</p>
      </div>
    )}
  </>
);
