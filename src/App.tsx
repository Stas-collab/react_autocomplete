import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { Suggestions } from './components/Suggestions';
import { Person } from './types/Person';
import debounce from 'lodash.debounce';

export const App: React.FC = () => {
  const [people] = useState<Person[]>(peopleFromServer);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const debounced = useMemo(
    () => debounce((v: string) => setAppliedQuery(v), 300),
    [],
  );

  useEffect(() => () => debounced.cancel(), [debounced]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = event.target.value.trim();

    setQuery(event.target.value);
    setSelectedPerson(null);
    debounced(trimmed);
  };

  const handleSelect = (person: Person) => {
    setSelectedPerson(person);
    setQuery(person.name);
  };

  const filterPeople = useMemo(() => {
    return people.filter(person => person.name.includes(appliedQuery));
  }, [appliedQuery, people]);

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        {selectedPerson && (
          <h1 className="title" data-cy="title">
            {`${selectedPerson.name} (${selectedPerson.born} - ${selectedPerson.died})`}
          </h1>
        )}
        {!selectedPerson && (
          <h1 className="title" data-cy="title">
            No selected person
          </h1>
        )}

        <Suggestions
          onInputChange={handleQueryChange}
          query={query}
          filteredPeople={filterPeople}
          onSelect={handleSelect}
        />
      </main>
    </div>
  );
};
