/* eslint-disable react/no-unescaped-entities */
import { useState, type FormEventHandler } from 'react';
import { FormNumericInput } from '~/ui/components/form-numeric-input';
import { FormSection } from '~/ui/components/form-section';
import { FormSelect } from '~/ui/components/form-select';
import { formatRate } from './format-rate';
import { useData } from './use-data';

export const App = () => {
  const [loanRate, setLoanRate] = useState<number>();
  const { carTypes, energies, compute } = useData();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rawData = new FormData(e.target as HTMLFormElement);
    const data: { [fieldName: string]: string } = {};
    for (const [key, value] of rawData) {
      data[key] = value as string;
    }
    setLoanRate(compute(data));
  };
  return (
    <main>
      <h1>Simulateur de prêt auto</h1>

      <p>
        La Green Bank vous offre la possibilité de financer votre véhicule à des taux d'emprunt de
        plus en plus avantageux, en récompensant votre engagement envers l'environnement.
      </p>
      <p>
        Découvrez le taux privilégié que nous pouvons vous proposer en remplissant le formulaire
        ci-dessous.
      </p>

      <form onSubmit={handleSubmit}>
        <FormSection label="Votre futur véhicule">
          <FormSelect id="carType" label="Type" values={carTypes} />
          <FormSelect id="energy" label="Energie" values={energies} />
          <FormNumericInput id="year" label="Année de fabrication" />
        </FormSection>
        <FormSection label="Votre utilisation">
          <FormNumericInput id="distance" label="Kilométrage annuel" />
          <FormNumericInput id="passengers" label="Nombre de passagers" />
        </FormSection>
        <button>Calculer le taux</button>
      </form>

      {loanRate && (
        <p className="simulation-result">
          <span>Profitez d'un taux avantageux de</span>
          <span>{formatRate(loanRate)}</span>
        </p>
      )}
    </main>
  );
};
