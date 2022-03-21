export const BenchmarkComponent = ({
  data,
  columns,
  prog,
  showHeaders,
  spacing,
}) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {Object.values(row).map((value) => (
              <td dangerouslySetInnerHTML={{ __html: value }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
