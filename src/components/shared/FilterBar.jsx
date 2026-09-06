export default function FilterBar({ children }) {
  return (
    <fieldset className="card filter-bar" disabled>
      <legend className="sr-only">
        Filtros disponíveis após a integração com a API
      </legend>
      {children}
    </fieldset>
  );
}
